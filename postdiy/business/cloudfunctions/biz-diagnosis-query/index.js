/**
 * 云函数：biz-diagnosis-query
 * 功能：根据用户选择的问题、行业、阶段、症状，匹配诊断路径并返回完整诊断结果
 * 输入：{ problemCode, industry, stage, symptomIds }
 * 返回：{ code: 0, data: diagnosisResult }
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command

/**
 * 根据ID列表批量查询集合数据
 * @param {string} collectionName - 集合名称
 * @param {Array} ids - ID列表
 * @returns {Array} 查询结果数组
 */
async function fetchByIds(collectionName, ids) {
  if (!ids || ids.length === 0) return []
  // 云开发 SDK 限制单次查询最多100条，且 in 操作最多支持500个值
  const result = await db.collection(collectionName)
    .where({ _id: _.in(ids) })
    .get()
  return result.data || []
}

/**
 * 匹配诊断路径
 * 核心逻辑：
 * 1. 查询 biz_diagnosis_paths（problemCode匹配 + industry匹配或all + stage匹配或all）
 * 2. 按症状交集计算 matchScore（每个匹配+100分，行业精确+50，阶段精确+30）
 * 3. 取最高分的路径
 * 4. 无匹配时回退到通用路径
 */
async function matchDiagnosisPath(problemId, problemCode, industry, stage, symptomIds) {
  // 第1步：查询所有匹配的诊断路径
  // 条件：problemId匹配 + industry为传入值或all + stage为传入值或all + 启用状态
  const pathsResult = await db.collection('biz_diagnosis_paths')
    .where({
      problemId: problemId,
      industry: _.in([industry, 'all']),
      stage: _.in([stage, 'all']),
      status: 1
    })
    .orderBy('priority', 'desc')
    .get()

  const paths = pathsResult.data || []

  if (paths.length === 0) {
    return null
  }

  // 第2步：按症状匹配度计算分数
  const scored = paths.map(path => {
    let score = path.priority || 0 // 基础分为优先级

    if (path.symptomMatchMode === 'all') {
      // 全部匹配模式：用户选择的症状必须包含路径的所有症状
      const allMatch = path.symptomIds.every(sid => symptomIds.includes(sid))
      score = allMatch ? score + 1000 : -1 // 不匹配直接排除
    } else {
      // 任一匹配模式：计算交集
      const intersection = path.symptomIds.filter(sid => symptomIds.includes(sid))
      score += intersection.length * 100 // 每个匹配症状加100分

      // 行业精确匹配加分
      if (path.industry === industry) score += 50

      // 阶段精确匹配加分
      if (path.stage === stage) score += 30
    }

    return { ...path, matchScore: score }
  })

  // 第3步：过滤不匹配的，取得分最高的
  const valid = scored
    .filter(p => p.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)

  if (valid.length > 0) {
    return valid[0]
  }

  // 第4步：无精确匹配，回退到通用路径（industry=all + stage=all）
  const fallback = paths.find(p => p.industry === 'all' && p.stage === 'all')
  if (fallback) {
    return { ...fallback, matchScore: 0 }
  }

  // 最终回退：返回第一条路径
  return { ...paths[0], matchScore: 0 }
}

/**
 * 组装完整诊断结果
 * 并行查询关联的 solutions/cases/tools
 */
async function assembleDiagnosisResult(path) {
  // 并行查询关联数据
  const [solutions, cases, tools] = await Promise.all([
    fetchByIds('biz_solutions', path.solutionIds),
    fetchByIds('biz_cases', path.caseIds),
    fetchByIds('biz_tools', path.toolIds)
  ])

  return {
    pathId: path._id,
    judgment: path.judgment,
    severity: path.severity,
    causes: (path.causes || []).sort((a, b) => (b.weight || 0) - (a.weight || 0)),
    solutions: solutions,
    todayTasks: path.todayTasks || [],
    weekPlan: path.weekPlan || [],
    cases: cases,
    tools: tools,
    matchScore: path.matchScore
  }
}

exports.main = async (event, context) => {
  try {
    // 兼容HTTP触发器：从event.body解析参数
    let params = event
    if (event.body && typeof event.body === 'string') {
      try {
        params = JSON.parse(event.body)
      } catch (e) {
        return { code: -1, message: '请求参数格式错误' }
      }
    }
    const { problemCode, industry, stage, symptomIds } = params

    // 参数校验
    if (!problemCode) {
      return { code: -1, message: '缺少问题编码参数 problemCode' }
    }

    // 查询问题详情，获取 problemId
    const problemResult = await db.collection('biz_problems')
      .where({ code: problemCode, status: 1 })
      .get()

    if (!problemResult.data || problemResult.data.length === 0) {
      return { code: -1, message: '未找到对应的问题分类' }
    }

    const problem = problemResult.data[0]
    const problemId = problem._id

    // 匹配诊断路径
    const matchedPath = await matchDiagnosisPath(
      problemId,
      problemCode,
      industry || 'all',
      stage || 'all',
      symptomIds || []
    )

    if (!matchedPath) {
      return { code: -1, message: '未找到匹配的诊断路径' }
    }

    // 组装完整诊断结果
    const diagnosisResult = await assembleDiagnosisResult(matchedPath)

    // 附加问题基本信息
    diagnosisResult.problem = {
      _id: problem._id,
      name: problem.name,
      code: problem.code,
      icon: problem.icon,
      color: problem.color
    }

    return {
      code: 0,
      data: diagnosisResult
    }
  } catch (error) {
    console.error('[biz-diagnosis-query] 诊断查询失败:', error)
    return {
      code: -1,
      message: '诊断查询失败: ' + error.message
    }
  }
}
