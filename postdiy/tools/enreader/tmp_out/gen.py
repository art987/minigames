# -*- coding: utf-8 -*-
"""为 p10013-p10018 生成逐意群中文注解 cn/p1000N.json（只写新输出，不改任何现有文件）"""
import json, os, re

BASE = r'c:\Users\ThinkPad\Documents\GitHub\minigames2026\postdiy\tools\enreader\data\professions'
OUTDIR = r'c:\Users\ThinkPad\Documents\GitHub\minigames2026\postdiy\tools\enreader\data\professions\cn'
TMP = r'c:\Users\ThinkPad\Documents\GitHub\minigames2026\postdiy\tools\enreader\tmp_out'
PIDS = [f'p100{i}' for i in range(13, 19)]

DICT = {
    'a': '一个', 'about': '关于', 'access': '访问', 'accurate': '准确的', 'action': '行动',
    'actions': '行动事项', 'actual': '实际的', 'add': '添加', 'addressed': '已处理', 'advice': '建议',
    'affect': '影响', 'after': '在……之后', 'afternoon': '下午', 'agree': '同意', 'alert': '告警',
    'all': '所有', 'also': '也', 'am': '是', 'an': '一个', 'and': '和',
    'another': '另一个', 'anything': '任何事', 'api': 'API', 'appeared': '出现', 'application': '应用',
    'approach': '方法', 'approved': '已批准', 'are': '是', 'arrange': '安排', 'as': '作为',
    'ask': '询问', 'at': '在', 'authentication': '身份验证', 'author': '作者', 'available': '可用的',
    'avoid': '避免', 'back': '回', 'backup': '备份', 'basic': '基本的', 'be': '是',
    'because': '因为', 'become': '变成', 'been': '已经', 'before': '在……之前', 'behind': '背后',
    'blame': '指责', 'blocker': '阻碍项', 'blocking': '阻碍着', 'branch': '分支', 'breaking': '拆分',
    'browser': '浏览器', 'bug': 'bug', 'busy': '忙', 'by': '通过', 'can': '可以',
    'cannot': '无法', 'carefully': '仔细地', 'case': '情况', 'catch': '捕获', 'cause': '原因',
    'causes': '导致', 'causing': '导致', 'certain': '某些', 'change': '更改', 'changed': '已更改',
    'changes': '变更', 'changing': '更改中', 'check': '检查', 'checked': '已检查', 'checks': '检查',
    'clear': '清晰的', 'closing': '关闭', 'clues': '线索', 'code': '代码', 'coding': '编码',
    'comment': '评论', 'comments': '意见', 'communicate': '沟通', 'communication': '沟通', 'complete': '完成',
    'completed': '已完成', 'conditions': '条件', 'configuration': '配置', 'confirm': '确认', 'confirmed': '已确认',
    'confirms': '确认', 'connecting': '连接', 'consider': '考虑', 'consistent': '一致的', 'console': '控制台',
    'contains': '包含', 'continuing': '继续', 'controlled': '可控的', 'conversation': '对话', 'coordinate': '协调',
    'coordination': '协调', 'correctly': '正确地', 'could': '可以', 'create': '创建', 'creating': '创建',
    'credentials': '凭证', 'current': '当前的', 'customer': '客户', 'dashboard': '仪表盘', 'data': '数据',
    'database': '数据库', 'day': '天', "day's": '当天的', 'decided': '决定', 'delays': '延误',
    'deploy': '部署', 'deployed': '已部署', 'deploying': '正在部署', 'deployment': '部署', 'deployments': '部署',
    'description': '描述', 'develop': '开发', 'developer': '开发者', 'development': '开发', 'different': '不同的',
    'discover': '发现', 'discussion': '讨论', 'display': '显示', 'do': '做', 'document': '记录',
    'documentation': '文档', 'does': '做', 'down': '向下', 'duplicated': '重复的', 'during': '在……期间',
    'each': '每个', 'early': '及早', 'easier': '更容易', 'effects': '影响', 'empty': '空的',
    'empty-field': '空字段', 'endpoints': '端点', 'engineer': '工程师', 'environment': '环境', 'error': '错误',
    'errors': '错误', 'especially': '尤其是', 'every': '每个', 'everyone': '每个人', 'example': '例子',
    'existing': '现有的', 'expected': '预期的', 'explain': '说明', 'explaining': '说明', 'explains': '说明',
    'exposing': '暴露', 'external': '外部的', 'factual': '基于事实的', 'failure': '失败', 'failures': '失败',
    'faster': '更快', 'feature': '功能', 'features': '功能', 'field': '字段', 'final': '最终的',
    'find': '找到', 'finished': '已完成', 'finally': '最后', 'first': '首先', 'fix': '修复',
    'fixed': '已修复', 'fixes': '修复', 'follow': '按照', 'follow-up': '后续', 'follows': '遵循',
    'for': '为了', 'form': '表单', 'format': '格式', 'found': '找到', 'friday': '周五',
    'from': '从', 'front-end': '前端', 'further': '进一步', 'give': '给', 'goal': '目的',
    'goes': '进行', 'good': '良好的', 'guesses': '猜测', 'guessing': '猜测', 'habits': '习惯',
    'had': '已经', 'handle': '处理', 'handled': '已处理', 'handling': '处理', 'happens': '发生',
    'harder': '更难', 'has': '有', 'have': '有', 'help': '帮助', 'helps': '有助于',
    'history': '历史', 'how': '如何', 'i': '我', 'identify': '确定', 'if': '如果',
    'immediately': '立即', 'impact': '影响', 'important': '重要的', 'improve': '改进', 'in': '在……中',
    'incident': '事故', 'incidents': '事故', 'include': '包含', 'included': '包含', 'increased': '增加',
    'inform': '通知', 'information': '信息', 'informed': '通知', 'instead': '而不是', 'integrating': '集成',
    'integration': '集成', 'interface': '接口', 'into': '到……里', 'invalid': '无效的', 'investigate': '排查',
    'investigating': '排查中', 'investigation': '排查', 'is': '是', 'issue': '问题', 'issues': '问题',
    'it': '它', 'items': '事项', 'its': '它的', 'keep': '保持', 'keeps': '保持',
    'kept': '保持', 'key': '关键', 'kind': '种类', 'know': '知道', 'knowledge': '知识',
    'knows': '知道', 'larger': '更大', 'late': '较晚的', 'later': '稍后', 'latest': '最新的',
    'learn': '了解到', 'leave': '留', 'less': '更少', 'letting': '让', 'limits': '限制',
    'list': '列表', 'logging': '记录日志', 'logic': '逻辑', 'login': '登录', 'logs': '日志',
    'long': '冗长', 'longer': '更长', 'look': '查看', 'made': '完成', 'main': '主要的',
    'make': '使', 'makes': '使', 'making': '做', 'matches': '匹配', 'may': '可能',
    'me': '我', 'meeting': '会议', 'mention': '提到', 'merged': '已合并', 'message': '消息',
    'method': '方法', 'might': '可能', 'missing': '缺失', 'mistakes': '失误', 'module': '模块',
    'monitor': '监控', 'monitoring': '监控', 'more': '更多', 'morning': '早上', 'my': '我的',
    'naming': '命名', 'need': '需要', 'needed': '需要', 'needs': '需要', 'network': '网络',
    'new': '新的', 'next': '下一步', 'no': '没有', 'normal': '正常', 'not': '不',
    'notes': '记录', 'now': '现在', 'of': '的', 'offer': '提供', 'often': '经常',
    'on': '在……上', 'once': '一旦', 'one': '一个', 'ones': '那些', 'only': '只',
    'open': '公开', 'or': '或', 'original': '原始的', 'other': '其他', 'others': '其他人',
    'our': '我们的', 'outdated': '过时的', 'over': '随着', 'page': '页面', 'parameters': '参数',
    'part': '部分', 'parts': '部分', 'pass': '通过', 'passed': '已通过', 'passes': '通过',
    'payment': '支付', 'payments': '支付', 'people': '人员', 'performance': '性能', 'person': '人',
    'personal': '个人的', 'plan': '计划', 'plans': '计划', 'possible': '可能', 'postman': 'Postman',
    'practical': '切实可行的', 'preparation': '准备', 'prepare': '准备', 'prepared': '准备好', 'presentation': '演示',
    'prevent': '防止', 'previous': '之前的', 'priorities': '优先事项', 'problem': '问题', 'problems': '问题',
    'processing': '处理', 'production': '生产环境', 'profile': '资料', 'progress': '进展', 'prove': '证明',
    'provider': '服务商', 'pull': '拉取', 'purpose': '目的', 'quality': '质量', 'quick': '快速的',
    'rate': '速率', 'rather': '而不', 'reaches': '达到', 'readability': '可读性', 'reading': '阅读',
    'reason': '原因', 'recent': '最近的', 'record': '记录', 'recovered': '已恢复', 'recovery': '恢复',
    'reduce': '减少', 'registration': '注册', 'regular': '定期的', 'release': '发布', 'released': '已发布',
    'relevant': '相关的', 'reliable': '可靠的', 'repeatedly': '反复', 'reply': '回复', 'report': '汇报',
    'reported': '报告', 'reproduce': '复现', 'request': '请求', 'requests': '请求', 'required': '必需的',
    'requirements': '需求', 'requires': '需要', 'respectful': '尊重他人', 'response': '响应', 'responses': '响应',
    'responsible': '负责', 'restore': '恢复', 'result': '结果', 'retry': '重试', 'returned': '返回',
    'review': '评审', 'reviewed': '已评审', 'reviewer': '评审人', 'reviewers': '评审人', 'reviews': '评审',
    'risk': '风险', 'risks': '风险', 'roll': '回滚', 'rollback': '回滚', 'root': '根源',
    'rules': '规则', 'run': '运行', 'safer': '更安全', 'same': '相同的', 'sample': '示例',
    'say': '说', 'saying': '说', 'schedule': '排期', 'screenshots': '截图', 'secure': '安全的',
    'security': '安全', 'see': '看到', 'send': '发送', 'sent': '已发送', 'separate': '单独的',
    'serious': '严重的', 'server': '服务器', 'service': '服务', "service's": '服务的', 'services': '服务',
    'settings': '设置', 'several': '几个', 'share': '分享', 'sharply': '大幅', 'shipping': '上线',
    'short': '简短的', 'shortly': '很快', 'should': '应该', 'show': '展示', 'side': '端',
    'similar': '类似的', 'simply': '只是', 'slow': '缓慢的', 'small': '小的', 'smaller': '更小的',
    'smooth': '顺利', 'so': '所以', 'solve': '解决', 'some': '一些', 'something': '某事',
    'sometimes': '有时', 'specific': '具体的', 'spot': '发现', 'stable': '稳定的', 'staging': '预发环境',
    'stand-up': '站会', 'start': '开始', 'started': '已开始', 'status': '状态', 'step': '步骤',
    'steps': '步骤', 'still': '仍然', 'submitting': '提交', 'successful': '成功的', 'such': '这样的',
    'suggest': '建议', 'suggestion': '建议', 'suitable': '合适的', 'suite': '套件', 'support': '支持',
    'sure': '确保', 'system': '系统', 'take': '花费', 'taking': '花费', 'task': '任务',
    'team': '团队', "team's": '团队的', 'teammate': '队友', 'teams': '团队', 'technical': '技术的',
    'temporarily': '临时地', 'temporary': '临时的', 'test': '测试', 'tester': '测试人员', 'testing': '测试',
    'tests': '测试', 'than': '比', 'that': '（连词）', 'the': '该', 'their': '他们的',
    'then': '然后', 'they': '他们', 'this': '这', 'time': '时间', 'timeline': '进度',
    'timeouts': '超时', 'to': '到', 'today': '今天', 'token': '令牌', 'tokens': '令牌',
    'too': '太', 'tool': '工具', 'tracking': '跟踪', 'tried': '尝试过', 'try': '尝试',
    'unavailable': '不可用', 'unclear': '不清晰', 'under': '在……下', 'understand': '理解', 'understands': '理解',
    'unexpected': '意外的', 'unnecessary': '不必要的', 'unrelated': '无关的', 'until': '直到', 'update': '更新',
    'us': '我们', 'usage': '用量', 'useful': '有用的', 'user': '用户', 'users': '用户',
    'usually': '通常', 'validation': '校验', 'variables': '变量', 'verify': '验证', 'version': '版本',
    'wait': '等待', 'was': '是', 'way': '方式', 'we': '我们', 'what': '什么',
    'when': '当……时', 'whether': '是否', 'which': '（引导从句）', 'while': '当……时', 'who': '谁',
    'whole': '整个', 'why': '为什么', 'will': '将', 'with': '与', 'without': '没有',
    'work': '工作', 'workaround': '临时方案', 'working': '正在做', 'works': '有效', 'write': '写',
    'writing': '编写', 'wrong': '错误的', 'wrote': '写了', 'yesterday': '昨天',
}

# 动词原形集合：用于判断 "to + 动词" → 不定式 "去"
VERBS = {
    'share', 'coordinate', 'make', 'do', 'give', 'prove', 'offer', 'take', 'arrange', 'avoid',
    'become', 'keep', 'say', 'explain', 'work', 'spot', 'support', 'solve', 'fix', 'check',
    'test', 'review', 'deploy', 'create', 'build', 'run', 'update', 'send', 'ask', 'write',
    'confirm', 'handle', 'monitor', 'improve', 'reduce', 'prevent', 'find', 'show', 'learn',
    'start', 'finish', 'complete', 'release', 'restore', 'recover', 'investigate', 'reproduce',
    'wait', 'retry', 'merge', 'pull', 'push', 'submit', 'verify', 'document', 'add', 'agree',
    'catch', 'identify', 'inform', 'see', 'blame', 'help', 'mention', 'report', 'reply',
    'communicate', 'prepare', 'look', 'read', 'respond', 'ship', 'go', 'come', 'get', 'use',
    'understand', 'focus', 'display', 'roll',
}

# 完成时/被动分词集合：have/has/had + 分词 → 已经
PASTP = {
    'tried', 'finished', 'reviewed', 'passed', 'addressed', 'merged', 'released', 'included',
    'checked', 'been', 'handled', 'fixed', 'deployed', 'sent', 'recovered', 'prepared',
    'increased', 'started', 'made', 'completed', 'informed', 'written', 'approved',
}

# 句级覆盖：(pid, 句序号, chunk序号) -> 中文
OVR = {
    # p10013
    ('p10013', 5, 4): '对',        # easier for a teammate
    ('p10013', 7, 6): '进行',      # give a long presentation
    ('p10013', 13, 15): '依据',    # work with outdated information
    # p10014
    ('p10014', 2, 3): '和',        # the same steps as the tester
    ('p10014', 3, 0): '接下来',    # Next, I review...
    ('p10014', 3, 12): '寻找',     # ...for useful clues
    ('p10014', 4, 8): '缺少',      # without a required field
    ('p10014', 6, 11): '以便',     # so users know...
    ('p10014', 7, 2): '针对',      # a test for the empty-field case
    ('p10014', 7, 16): '',         # check for side effects
    ('p10014', 7, 17): '其他',     # side effects
    ('p10014', 9, 8): '做',        # the changes we made
    ('p10014', 10, 10): '引入',    # without creating new ones
    ('p10014', 10, 12): '问题',    # new ones
    ('p10014', 13, 16): '导致',    # no longer cause the error
    # p10015
    ('p10015', 2, 3): '发起',      # open a pull request
    ('p10015', 3, 8): '它们',      # when they help reviewers (指截图/步骤)
    ('p10015', 7, 10): '变成',     # making the discussion personal
    ('p10015', 10, 9): '罗列',     # a list of mistakes
    ('p10015', 12, 8): '为',       # breaking the work into smaller parts
    # p10016
    ('p10016', 0, 4): '物流',      # shipping information
    ('p10016', 3, 9): '用',        # test ... with a tool
    ('p10016', 4, 7): '有效',      # the credentials work
    ('p10016', 5, 4): '保存',      # keep the API key
    ('p10016', 5, 8): '于',        # ...on the server
    ('p10016', 8, 17): '界面',     # user interface
    ('p10016', 10, 3): '',         # depends on
    ('p10016', 10, 4): '不只',     # more than making...
    ('p10016', 10, 5): '是',
    ('p10016', 11, 10): '方案',    # a plan for unexpected failures
    ('p10016', 11, 11): '应对',
    ('p10016', 11, 13): '故障',
    ('p10016', 13, 14): '以',      # with less risk
    # p10017
    ('p10017', 11, 18): '对',      # works for users
    ('p10017', 13, 2): '明确',     # agree on who will monitor
    ('p10017', 13, 3): '',         # agree on
    # p10018
    ('p10018', 0, 1): '一天',      # Late one afternoon
    ('p10018', 4, 13): '聚焦',     # we focused on the latest changes
    ('p10018', 4, 14): '于',
    ('p10018', 5, 7): '正',        # was taking too long
    ('p10018', 5, 9): '长时间',    # too long
    ('p10018', 6, 4): '对',        # the impact on users
    ('p10018', 6, 13): '同时',     # while continuing...
    ('p10018', 7, 7): '恢复',      # returned to normal
    ('p10018', 9, 6): '时间线',    # the timeline
    ('p10018', 10, 6): '复盘',     # incident review
    ('p10018', 12, 2): '让',       # kept customer support informed
    ('p10018', 12, 6): '知情',
    ('p10018', 8, 12): '用于',     # for further testing
}

def norm(t):
    return re.sub(r'[.,!?;:]+$', '', t).lower()

def translate(pid, si, chunks):
    out = []
    n = len(chunks)
    for i, c in enumerate(chunks):
        if (pid, si, i) in OVR:
            out.append(OVR[(pid, si, i)]); continue
        t = c['text']
        low = norm(t)
        prev = norm(chunks[i - 1]['text']) if i > 0 else ''
        nxt = norm(chunks[i + 1]['text']) if i < n - 1 else ''
        # to + 动词原形
        if low == 'to' and nxt in VERBS:
            out.append('为了' if i == 0 else '去'); continue
        # for example
        if low == 'for' and nxt == 'example':
            out.append('例如'); continue
        if low == 'example' and prev == 'for':
            out.append(''); continue
        # so that / write down
        if low == 'that' and prev == 'so':
            out.append('以便'); continue
        if low == 'down' and prev == 'write':
            out.append('记下'); continue
        # rather than
        if low == 'rather' and nxt == 'than':
            out.append(''); continue
        if low == 'than' and prev == 'rather':
            out.append('而不是'); continue
        # responsible for
        if low == 'for' and prev == 'responsible':
            out.append(''); continue
        # make sure
        if low == 'make' and nxt == 'sure':
            out.append(''); continue
        # do/does not, could not
        if low in ('do', 'does') and nxt == 'not':
            out.append(''); continue
        if low == 'not' and prev in ('do', 'does'):
            out.append('不'); continue
        if low == 'could' and nxt == 'not':
            out.append('无法'); continue
        if low == 'not' and prev == 'could':
            out.append(''); continue
        # no longer
        if low == 'no' and nxt == 'longer':
            out.append('不再'); continue
        if low == 'longer' and prev == 'no':
            out.append(''); continue
        # every time
        if low == 'every' and nxt == 'time':
            out.append('每次'); continue
        if low == 'time' and prev == 'every':
            out.append(''); continue
        # such as
        if low == 'such' and nxt == 'as':
            out.append('比如'); continue
        if low == 'as' and prev == 'such':
            out.append(''); continue
        # have/has/had + 分词
        if low in ('have', 'has', 'had') and nxt in PASTP:
            out.append('已经'); continue
        if low == 'been' and prev in ('have', 'has', 'had'):
            out.append(''); continue
        # be after 情态动词
        if low == 'be' and prev in ('can', 'could', 'will', 'should', 'may', 'must', 'cannot', 'to'):
            out.append(''); continue
        # roll back
        if low == 'back' and prev == 'roll':
            out.append(''); continue
        # goes wrong
        if low == 'goes' and nxt == 'wrong':
            out.append('出'); continue
        if low == 'wrong' and prev == 'goes':
            out.append('问题'); continue
        # similar to
        if low == 'to' and prev == 'similar':
            out.append(''); continue
        # release notes
        if low == 'notes' and prev == 'release':
            out.append('说明'); continue
        # api key
        if low == 'key' and prev == 'api':
            out.append('密钥'); continue
        # working on / focus on / agree on / impact on / depends on
        if low == 'on' and prev == 'working':
            out.append(''); continue
        if low == 'on' and prev == 'focus':
            out.append('于'); continue
        if low == 'working' and nxt == 'on':
            out.append('正在开发'); continue
        if low == 'focus' and nxt == 'on':
            out.append('聚焦'); continue
        if low in DICT:
            out.append(DICT[low]); continue
        out.append('')  # 未收录兜底
    return out

def load(pid):
    p = os.path.join(BASE, f'{pid}.js')
    raw = open(p, encoding='utf-8').read()
    raw = raw[raw.index('{'): raw.rindex('}') + 1]
    return json.loads(raw)

def main():
    os.makedirs(OUTDIR, exist_ok=True)
    report = []
    for pid in PIDS:
        d = load(pid)
        cn = []
        for si, s in enumerate(d['sentences']):
            cn.append(translate(pid, si, s['chunks']))
        obj = {'id': pid, 'cn': cn}
        outp = os.path.join(OUTDIR, f'{pid}.json')
        with open(outp, 'w', encoding='utf-8', newline='\n') as f:
            json.dump(obj, f, ensure_ascii=False, separators=(',', ':'))
        lines = [f'===== {pid}  sentences={len(d["sentences"])}']
        for si, s in enumerate(d['sentences']):
            texts = [c['text'] for c in s['chunks']]
            pairs = ' | '.join(f'{t}→{cn[si][k]}' for k, t in enumerate(texts))
            lines.append(f'[{si}] {s["en"]}')
            lines.append(f'    CN句: {s["cn"]}')
            lines.append(f'    {pairs}')
        report.append('\n'.join(lines))
    with open(os.path.join(TMP, 'selfcheck.txt'), 'w', encoding='utf-8') as f:
        f.write('\n\n'.join(report))

if __name__ == '__main__':
    main()
    print('done')
