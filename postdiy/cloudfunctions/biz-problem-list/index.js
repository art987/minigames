/**
 * 云函数：biz-problem-list
 * 功能：获取问题列表，聚合诊断次数统计
 * 返回：{code: 0, data: problems}
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate

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

    // 查询所有启用的问题，按 sortOrder 降序排列
    const problemResult = await db.collection('biz_problems')
      .where({ status: 1 })
      .orderBy('sortOrder', 'desc')
      .get()

    const problems = problemResult.data || []

    // 聚合查询：统计每个问题的诊断次数
    // 从 biz_diagnosis_records 集合中按 problemId 分组计数
    const aggregation = db.collection('biz_diagnosis_records')
      .aggregate()
      .group({
        _id: '$problemId',
        count: $.sum(1)
      })
      .end()

    const aggResult = await aggregation
    const countMap = {}
    if (aggResult.data) {
      aggResult.data.forEach(item => {
        countMap[item._id] = item.count
      })
    }

    // 将诊断次数合并到问题列表中
    problems.forEach(problem => {
      problem.diagnosisCount = countMap[problem._id] || problem.diagnosisCount || 0
    })

    return {
      code: 0,
      data: problems
    }
  } catch (error) {
    console.error('[biz-problem-list] 获取问题列表失败:', error)
    return {
      code: -1,
      message: '获取问题列表失败: ' + error.message
    }
  }
}
