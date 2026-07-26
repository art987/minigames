/**
 * 云函数：biz-init-data
 * 功能：使用内置种子数据，批量插入到对应集合，并创建索引
 * 返回：{ code: 0, data: { insertedCounts: {...} } }
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command

// 种子数据：从内置 seed-data.js 加载
const seedData = require('./seed-data')

/**
 * 安全获取集合数据（集合不存在时返回空数组）
 * 自动分页获取所有记录
 */
async function safeGet(collectionName, query) {
  try {
    const MAX_LIMIT = 100 // 云开发单次最多100条
    // 先获取总数
    const countResult = await (query
      ? db.collection(collectionName).where(query).count()
      : db.collection(collectionName).count())
    const total = countResult.total || 0
    if (total === 0) return []

    // 分页获取所有数据
    const allData = []
    const batchTimes = Math.ceil(total / MAX_LIMIT)
    for (let i = 0; i < batchTimes; i++) {
      const result = await (query
        ? db.collection(collectionName).where(query).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
        : db.collection(collectionName).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get())
      allData.push(...(result.data || []))
    }
    return allData
  } catch (e) {
    // 集合不存在时返回空数组
    if (e.message && e.message.includes('collection not exist')) {
      return []
    }
    throw e
  }
}

/**
 * 清空集合中的所有数据
 * @param {string} collectionName - 集合名称
 * @returns {number} 删除的条数
 */
async function batchClear(collectionName) {
  let deletedCount = 0
  try {
    const existing = await safeGet(collectionName)
    if (existing.length === 0) return 0

    // 分批删除（每次最多20条）
    const batchSize = 20
    for (let i = 0; i < existing.length; i += batchSize) {
      const batch = existing.slice(i, i + batchSize)
      const deletePromises = batch.map(doc =>
        db.collection(collectionName).doc(doc._id).remove()
      )
      const results = await Promise.allSettled(deletePromises)
      deletedCount += results.filter(r => r.status === 'fulfilled').length
    }
    console.log(`[biz-init-data] 已清空 ${collectionName}，删除 ${deletedCount} 条`)
  } catch (e) {
    console.error(`[biz-init-data] 清空 ${collectionName} 失败:`, e.message)
  }
  return deletedCount
}

/**
 * 批量插入数据到指定集合
 * 云开发 SDK 的 add 方法单次最多插入数据有限制，需要分批处理
 * @param {string} collectionName - 集合名称
 * @param {Array} records - 待插入的数据数组
 * @returns {number} 成功插入的条数
 */
async function batchInsert(collectionName, records) {
  if (!records || records.length === 0) return 0

  let insertedCount = 0
  const now = new Date()

  // 为每条记录添加时间戳
  const recordsWithTimestamp = records.map(record => ({
    ...record,
    createTime: record.createTime || now,
    updateTime: record.updateTime || now
  }))

  // 云开发单次操作建议不超过20条，分批插入
  const batchSize = 20
  for (let i = 0; i < recordsWithTimestamp.length; i += batchSize) {
    const batch = recordsWithTimestamp.slice(i, i + batchSize)
    try {
      const result = await db.collection(collectionName).add({ data: batch })
      insertedCount += (result._ids || result.ids || []).length
    } catch (error) {
      console.error(`[biz-init-data] 插入 ${collectionName} 批次 ${i} 失败:`, error.message || error)
      // 尝试逐条插入该批次
      for (const record of batch) {
        try {
          await db.collection(collectionName).add({ data: [record] })
          insertedCount += 1
        } catch (e) {
          console.error(`[biz-init-data] 逐条插入 ${collectionName} 失败:`, e.message)
        }
      }
    }
  }

  return insertedCount
}

/**
 * 创建数据库索引
 * 注意：云开发 SDK 不直接支持创建索引，索引需在控制台手动创建
 * 这里仅做记录提示
 */
function logIndexInfo() {
  const indexInfo = {
    biz_problems: ['code(唯一)', 'status+sortOrder(复合)'],
    biz_symptoms: ['problemId+status+sortOrder(复合)', 'problemId+industryFilter(复合)'],
    biz_diagnosis_paths: ['problemId+industry+stage(复合)', 'problemId+priority(复合)'],
    biz_solutions: ['status+sortOrder(复合)', 'problemIds(多值)', 'tags(多值)'],
    biz_cases: ['status+sortOrder(复合)', 'industry+problemType(复合)', 'tags(多值)'],
    biz_tools: ['status+category+sortOrder(复合)', 'problemIds(多值)'],
    biz_tags: ['name+type(复合唯一)', 'type+sortOrder(复合)'],
    biz_diagnosis_records: ['userId+createTime(复合)', 'problemId+createTime(复合)', 'createTime(普通)'],
    biz_favorites: ['userId+targetType+targetId(复合唯一)', 'userId+targetType+createTime(复合)'],
    biz_admin_users: ['username(唯一)'],
    biz_users: ['phone(唯一)', 'inviteCode(普通)']
  }

  console.log('[biz-init-data] 索引配置参考（需在云开发控制台手动创建）：')
  Object.entries(indexInfo).forEach(([collection, indexes]) => {
    console.log(`  ${collection}: ${indexes.join(', ')}`)
  })
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

    // 使用内置种子数据
    const data = {
      problems: seedData.problems,
      symptoms: seedData.symptoms,
      diagnosis_paths: seedData.diagnosisPaths,
      solutions: seedData.solutions,
      cases: seedData.cases,
      tools: seedData.tools,
      tags: seedData.tags,
      admin_users: seedData.adminUsers
    }
    if (!data.problems || data.problems.length === 0) {
      return { code: -1, message: '种子数据为空' }
    }

    // ===== 0. 确保所有集合已创建 =====
    const collections = [
      'biz_problems', 'biz_symptoms', 'biz_diagnosis_paths',
      'biz_solutions', 'biz_cases', 'biz_tools',
      'biz_tags', 'biz_admin_users', 'biz_diagnosis_records',
      'biz_favorites', 'biz_users'
    ]
    for (const col of collections) {
      try {
        await db.createCollection(col)
        console.log(`[biz-init-data] 集合 ${col} 创建成功`)
      } catch (e) {
        // 集合已存在时会报错，忽略
        if (e.message && e.message.includes('already exist')) {
          console.log(`[biz-init-data] 集合 ${col} 已存在`)
        } else {
          console.warn(`[biz-init-data] 创建集合 ${col} 时出错:`, e.message)
        }
      }
    }

    // force 模式：先清空所有种子数据集合，再重新插入
    const force = params.force !== false // 默认 true，传 false 则走增量模式
    const insertedCounts = {}

    if (force) {
      // ===== force模式：先清空所有集合 =====
      const seedCollections = [
        'biz_problems', 'biz_symptoms', 'biz_diagnosis_paths',
        'biz_solutions', 'biz_cases', 'biz_tools', 'biz_tags'
      ]
      console.log('[biz-init-data] force模式：清空种子数据集合...')
      for (const col of seedCollections) {
        await batchClear(col)
      }
    }

    // ===== 1. 插入问题分类数据 =====
    let problemsToInsert
    if (force) {
      problemsToInsert = data.problems
    } else {
      // 增量模式：只插入不存在的
      const existingProblems = await safeGet('biz_problems')
      const existingCodes = new Set(existingProblems.map(p => p.code))
      problemsToInsert = data.problems.filter(p => !existingCodes.has(p.code))
    }

    // 为症状和诊断路径建立 problemCode → _id 的映射
    const problemIdMap = {}
    const allProblems = await safeGet('biz_problems')
    allProblems.forEach(p => {
      problemIdMap[p.code] = p._id
    })

    insertedCounts.problems = await batchInsert('biz_problems', problemsToInsert)

    // 刷新问题ID映射（插入后重新查询）
    if (problemsToInsert.length > 0) {
      const refreshedProblems = await safeGet('biz_problems')
      refreshedProblems.forEach(p => {
        problemIdMap[p.code] = p._id
      })
    }

    // ===== 2. 插入症状数据 =====
    // 为症状补充 problemId 字段（用 problemCode 查找对应 _id）
    const symptomsWithId = data.symptoms.map(s => {
      const { problemCode, ...rest } = s
      return {
        ...rest,
        problemId: problemIdMap[problemCode] || ''
      }
    }).filter(s => s.problemId) // 过滤掉找不到问题ID的症状

    insertedCounts.symptoms = await batchInsert('biz_symptoms', symptomsWithId)

    // ===== 3. 插入诊断路径数据 =====
    // 为诊断路径补充 problemId，并将 solutionIds/caseIds/toolIds 暂置空（后续关联）
    const pathsWithId = data.diagnosis_paths.map(p => {
      const { problemCode, ...rest } = p
      return {
        ...rest,
        problemId: problemIdMap[problemCode] || '',
        solutionIds: p.solutionIds || [],
        caseIds: p.caseIds || [],
        toolIds: p.toolIds || []
      }
    }).filter(p => p.problemId)

    insertedCounts.diagnosis_paths = await batchInsert('biz_diagnosis_paths', pathsWithId)

    // ===== 4. 插入解决方案数据 =====
    // 为方案补充 problemIds（用问题ID映射）
    const solutionsWithId = data.solutions.map(s => ({
      ...s,
      problemIds: s.problemIds || []
    }))

    insertedCounts.solutions = await batchInsert('biz_solutions', solutionsWithId)

    // ===== 5. 插入案例数据 =====
    const casesWithId = data.cases.map(c => ({
      ...c,
      relatedSolutionIds: c.relatedSolutionIds || []
    }))

    insertedCounts.cases = await batchInsert('biz_cases', casesWithId)

    // ===== 6. 插入工具数据 =====
    const toolsWithId = data.tools.map(t => ({
      ...t,
      problemIds: t.problemIds || []
    }))

    insertedCounts.tools = await batchInsert('biz_tools', toolsWithId)

    // ===== 7. 插入标签数据 =====
    if (force) {
      insertedCounts.tags = await batchInsert('biz_tags', data.tags)
    } else {
      // 增量模式：只插入不存在的标签
      const existingTags = await safeGet('biz_tags')
      const existingTagKeys = new Set(
        existingTags.map(t => `${t.name}_${t.type}`)
      )
      const newTags = data.tags.filter(t => !existingTagKeys.has(`${t.name}_${t.type}`))
      insertedCounts.tags = await batchInsert('biz_tags', newTags)
    }

    // ===== 8. 插入管理员账号 =====
    // 管理员始终用增量模式（不清空）
    const existingAdmins = await safeGet('biz_admin_users', { username: 'admin' })

    if (existingAdmins.length === 0) {
      await db.collection('biz_admin_users').add({
        data: data.admin_users.map(a => ({
          ...a,
          createTime: new Date()
        }))
      })
      insertedCounts.admin_users = data.admin_users.length
    } else {
      insertedCounts.admin_users = 0
      console.log('[biz-init-data] 管理员账号已存在，跳过插入')
    }

    // ===== 9. 建立关联关系 =====
    // 查询刚插入的数据ID，更新诊断路径中的关联ID
    await updatePathRelations(problemIdMap)

    // 输出索引创建提示
    logIndexInfo()

    return {
      code: 0,
      data: { insertedCounts }
    }
  } catch (error) {
    console.error('[biz-init-data] 数据初始化失败:', error)
    return {
      code: -1,
      message: '数据初始化失败: ' + error.message
    }
  }
}

/**
 * 更新诊断路径中的关联ID
 * 将诊断路径中暂空的 solutionIds/caseIds/toolIds 填充为实际插入的记录ID
 */
async function updatePathRelations(problemIdMap) {
  try {
    // 查询所有诊断路径
    const paths = await safeGet('biz_diagnosis_paths', { status: 1 })

    if (paths.length === 0) return

    // 查询所有方案、案例、工具
    const [solutionList, caseList, toolList] = await Promise.all([
      safeGet('biz_solutions', { status: 1 }),
      safeGet('biz_cases', { status: 1 }),
      safeGet('biz_tools', { status: 1 })
    ])

    // 为每条诊断路径关联匹配的方案/案例/工具
    for (const path of paths) {
      const updateData = {}

      // 如果路径还没有关联方案，则根据问题ID匹配方案
      if (!path.solutionIds || path.solutionIds.length === 0) {
        const matchedSolutions = solutionList.filter(s =>
          s.problemIds && s.problemIds.includes(path.problemId)
        )
        if (matchedSolutions.length > 0) {
          updateData.solutionIds = matchedSolutions.map(s => s._id)
        }
      }

      // 如果路径还没有关联案例，则根据问题类型匹配案例
      if (!path.caseIds || path.caseIds.length === 0) {
        // 通过问题code查找关联的案例
        const problemCode = Object.keys(problemIdMap).find(
          code => problemIdMap[code] === path.problemId
        )
        if (problemCode) {
          const matchedCases = caseList.filter(c => c.problemType === problemCode)
          if (matchedCases.length > 0) {
            updateData.caseIds = matchedCases.map(c => c._id)
          }
        }
      }

      // 如果路径还没有关联工具，则匹配通用工具
      if (!path.toolIds || path.toolIds.length === 0) {
        // 选择前3个运营/营销类工具
        const matchedTools = toolList
          .filter(t => t.category === '运营' || t.category === '营销')
          .slice(0, 3)
        if (matchedTools.length > 0) {
          updateData.toolIds = matchedTools.map(t => t._id)
        }
      }

      // 执行更新
      if (Object.keys(updateData).length > 0) {
        updateData.updateTime = new Date()
        await db.collection('biz_diagnosis_paths').doc(path._id).update({
          data: updateData
        })
        console.log(`[biz-init-data] 已更新诊断路径 ${path._id} 的关联数据`)
      }
    }
  } catch (error) {
    console.error('[biz-init-data] 更新关联关系失败:', error)
  }
}
