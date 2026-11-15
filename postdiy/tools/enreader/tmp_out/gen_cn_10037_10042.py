# -*- coding: utf-8 -*-
"""为 p10037~p10042 重切意群并写中文注解到 data/professions/cn/（不修改任何现有文件）。"""
import json, os, re, sys

BASE = r"c:\Users\ThinkPad\Documents\GitHub\minigames2026\postdiy\tools\enreader"
PROF = os.path.join(BASE, "data", "professions")
OUT = os.path.join(PROF, "cn")

# 每篇每句手工重切：(英文组, 中文注解)，拼接后必须还原原句
DATA = {
    "p10037": [
        [("Working in an international company", "在国际公司工作"),
         ("often means", "通常意味着"),
         ("communicating with colleagues and clients", "与同事和客户沟通"),
         ("by email.", "通过邮件")],
        [("A well-written email can save time,", "一封好邮件能省时间"),
         ("prevent misunderstandings,", "避免误解"),
         ("and help people make decisions more quickly.", "并帮人更快做决定")],
        [("If some information is missing,", "如果信息不全"),
         ("it is better to", "最好"),
         ("ask specific questions", "问具体的问题"),
         ("rather than make assumptions.", "而非自行猜测")],
        [("A professional email", "一封专业的邮件"),
         ("usually starts with", "通常以…开头"),
         ("a suitable greeting", "恰当的问候语"),
         ("and a clear opening sentence.", "和清晰的开场句")],
        [("The main message", "正文内容"),
         ("should be organized into short paragraphs,", "应分成简短段落"),
         ("with each paragraph covering one point.", "每段讲一个重点")],
        [("Could you please", "能否请您"),
         ("review the attached document", "审核附件文件"),
         ("by Thursday?", "在周四之前")],
        [("Before sending the email,", "发送邮件之前"),
         ("the writer should check", "作者应检查"),
         ("the recipient's name,", "收件人姓名"),
         ("attachments, spelling, and tone.", "附件、拼写和语气")],
        [("Clear email communication", "清晰的邮件沟通"),
         ("reflects professional working habits", "体现职业工作习惯"),
         ("and helps build trust", "有助于建立信任"),
         ("across international teams.", "在国际团队之间")],
    ],
    "p10038": [
        [("An international team", "一支国际团队"),
         ("holds a weekly online meeting", "每周开线上会议"),
         ("to discuss", "讨论"),
         ("the progress of a new project.", "新项目的进展")],
        [("Since everyone works in a different time zone,", "由于时区各不相同"),
         ("the meeting is scheduled in advance", "会议提前安排"),
         ("and the agenda is shared", "议程会被共享"),
         ("with all participants.", "发给所有参会者")],
        [("At the beginning of the meeting,", "会议开始时"),
         ("the team leader", "团队负责人"),
         ("briefly reviews", "简要回顾"),
         ("the main topics.", "主要议题")],
        [("Each department", "各部门"),
         ("then gives an update", "随后汇报进展"),
         ("on its work.", "说明本部门工作")],
        [("She politely raises the concern", "她礼貌地提出问题"),
         ("and explains", "并解释"),
         ("the possible impact on the project.", "对项目的可能影响")],
        [("If someone does not understand a point,", "如果有人没听懂"),
         ("they can ask the speaker", "可以请发言者"),
         ("to clarify it.", "进一步解释")],
        [("Before the meeting ends,", "会议结束前"),
         ("the team leader summarizes the key decisions", "负责人总结关键决策"),
         ("and confirms the next steps.", "并确认下一步")],
        [("Each task", "每项任务"),
         ("is assigned to", "都会分配给"),
         ("a responsible person", "具体负责人"),
         ("with a clear deadline.", "并定好截止日期")],
    ],
    "p10039": [
        [("An international business specialist", "国际业务专员"),
         ("is responsible for", "负责"),
         ("maintaining relationships", "维护客户关系"),
         ("with several overseas clients.", "与几位海外客户")],
        [("The specialist needs to understand", "专员需要先了解"),
         ("the client's requirements", "客户的具体需求"),
         ("before making a recommendation.", "再提出建议")],
        [("The client explains that", "客户解释说"),
         ("product quality is the main priority,", "产品质量最优先"),
         ("but the delivery date is also important.", "但交期也很重要")],
        [("These questions help the company", "这些问题帮公司"),
         ("prepare a suitable proposal", "制定合适的方案"),
         ("instead of offering a general solution.", "而非笼统解决办法")],
        [("The email includes product specifications,", "邮件包含产品规格"),
         ("available quantities, estimated production time,", "可供数量与生产时间"),
         ("and possible shipping methods.", "以及可选运输方式")],
        [("The specialist", "业务专员"),
         ("does not make an immediate promise.", "没有立即作出承诺")],
        [("The company later provides", "公司随后提供"),
         ("a revised quotation", "修订后的报价"),
         ("with a more competitive price.", "价格更有竞争力")],
        [("Professional client communication", "专业的客户沟通"),
         ("requires more than polite language.", "不止是礼貌用语")],
    ],
    "p10040": [
        [("An employee in an international company", "国际公司的一名员工"),
         ("is preparing a weekly project update", "正在准备每周项目进展"),
         ("for the regional manager.", "给区域经理")],
        [("The manager wants to understand", "经理想了解"),
         ("what has been completed,", "哪些已经完成"),
         ("what is still in progress,", "哪些仍在进行"),
         ("and whether any problems", "以及是否有问题"),
         ("may affect the final deadline.", "可能影响最终截止日期")],
        [("The employee begins by", "员工首先"),
         ("reviewing the project plan", "查看项目计划"),
         ("and collecting updates", "并收集最新进展"),
         ("from each department.", "来自各个部门")],
        [("The operations team reports that", "运营团队报告说"),
         ("a supplier has not confirmed", "供应商尚未确认"),
         ("the delivery date for an important component.", "重要零部件的交货日期")],
        [("Each item includes", "每项都包含"),
         ("a short description,", "简短描述"),
         ("the person responsible,", "负责人"),
         ("and the expected completion date.", "以及预计完成日期")],
        [("The report explains the current situation", "报告说明现状"),
         ("and suggests contacting an alternative supplier", "并建议联系备选供应商"),
         ("if confirmation is not received by Wednesday.", "若周三前未收到确认")],
        [("Before sending the report,", "发送报告之前"),
         ("the employee checks that", "员工检查是否"),
         ("the information is accurate.", "信息准确无误")],
        [("A useful progress report", "有用的进度报告"),
         ("should be clear, factual,", "应清晰而客观"),
         ("and focused on decisions.", "并聚焦于决策")],
    ],
    "p10041": [
        [("A company is expecting", "公司将迎来"),
         ("two business visitors", "两位商务访客"),
         ("from Singapore next Monday.", "下周一从新加坡来")],
        [("The visitors will spend one day", "访客将停留一天"),
         ("at the company's office", "在公司办公室"),
         ("to learn about its products", "了解公司产品"),
         ("and discuss a possible partnership.", "并探讨合作可能")],
        [("Before the visitors arrive,", "访客到达之前"),
         ("the specialist confirms their flight details,", "专员确认航班信息"),
         ("hotel information, and expected arrival time.", "酒店与预计抵达时间")],
        [("The specialist also prepares", "专员还准备了"),
         ("a short company introduction", "简短的公司简介"),
         ("and product presentation in English.", "和英文产品介绍")],
        [("After introducing the team members,", "介绍团队之后"),
         ("the specialist gives a brief overview", "专员简要介绍"),
         ("of the company.", "公司整体情况")],
        [("The specialist answers the questions clearly", "专员清楚作答"),
         ("and invites colleagues from the production department", "并请生产部同事"),
         ("to explain technical details when necessary.", "必要时解释技术细节")],
        [("Before the guests leave,", "客人离开之前"),
         ("the specialist summarizes the main discussion points", "专员总结讨论要点"),
         ("and confirms the follow-up actions.", "并确认后续行动")],
        [("Careful preparation and thoughtful communication", "周到的准备与沟通"),
         ("help create a positive first impression", "带来好的第一印象"),
         ("and support future cooperation.", "并助力未来合作")],
    ],
    "p10042": [
        [("An international project team", "国际项目团队"),
         ("includes employees", "包括员工"),
         ("from China, France, and the United States.", "来自中美法三国")],
        [("Differences in communication styles", "沟通方式差异"),
         ("and working habits", "和工作习惯"),
         ("sometimes create misunderstandings.", "有时造成误解")],
        [("The team leader notices the tension", "负责人察觉紧张气氛"),
         ("and encourages everyone", "并鼓励大家"),
         ("to explain their ideas", "说出自己的想法"),
         ("in a respectful way.", "以尊重的方式")],
        [("The team agrees to", "团队一致同意"),
         ("share important decisions in writing", "书面分享重要决策"),
         ("after each discussion", "每次讨论之后"),
         ("so that everyone has the same information.", "确保大家信息一致")],
        [("To avoid scheduling problems,", "为避免日程冲突"),
         ("the team uses a shared calendar", "团队使用共享日历"),
         ("and confirms meeting times in advance.", "并提前确认会议时间")],
        [("When a deadline is difficult to meet,", "当截止日期难以达成"),
         ("employees are expected to", "员工应当"),
         ("explain the reason early", "尽早说明原因"),
         ("rather than wait until the last minute.", "而非拖到最后一刻")],
        [("Asking questions,", "主动提问"),
         ("listening carefully,", "认真倾听"),
         ("and checking understanding", "并确认理解"),
         ("can prevent many misunderstandings.", "能避免许多误解")],
        [("Working across cultures", "跨文化协作"),
         ("requires patience and flexibility.", "需要耐心与灵活")],
        [("When team members respect different perspectives", "当成员尊重不同观点"),
         ("and communicate openly,", "并保持开放沟通"),
         ("they can build stronger working relationships.", "就能建立更牢固的关系")],
    ],
}

strip_tok = lambda s: re.sub(r"[^\w\s']", " ", s, flags=re.UNICODE).split()


def load_article(fid):
    path = os.path.join(PROF, fid + ".js")
    text = open(path, encoding="utf-8").read()
    m = re.search(r"window\.ENR_DAY\s*=\s*", text)
    obj, _ = json.JSONDecoder().raw_decode(text[m.end():])
    return obj


def render(fid, sents):
    lines = ["{", '  "id": "%s",' % fid, '  "sents": [']
    for si, chunks in enumerate(sents):
        lines.append("    {")
        lines.append('      "chunks": [')
        for ci, c in enumerate(chunks):
            comma = "," if ci < len(chunks) - 1 else ""
            lines.append('        { "t": %s, "m": %s }%s'
                         % (json.dumps(c["t"], ensure_ascii=False), json.dumps(c["m"], ensure_ascii=False), comma))
        lines.append("      ]")
        lines.append("    }" + ("," if si < len(sents) - 1 else ""))
    lines += ["  ]", "}"]
    return "\n".join(lines) + "\n"


os.makedirs(OUT, exist_ok=True)
all_ok = True
stats = []
for fid, hand in DATA.items():
    art = load_article(fid)
    src_sents = art["sentences"]
    fails = []
    if len(hand) != len(src_sents):
        fails.append("句数不匹配 hand=%d src=%d" % (len(hand), len(src_sents)))
    n_chunks = 0
    n_words = 0
    out_sents = []
    for si, (s, chunks) in enumerate(zip(src_sents, hand)):
        joined = " ".join(t for t, _ in chunks)
        if strip_tok(joined) != strip_tok(s["en"]):
            fails.append("句%d token 不一致" % (si + 1))
            continue
        for t, m in chunks:
            if not t.strip() or not m.strip():
                fails.append("句%d 存在空 t/m" % (si + 1))
            w = len(strip_tok(t))
            n_words += w
            if w > 10:
                fails.append("句%d 组超 10 词: %r" % (si + 1, t))
        n_chunks += len(chunks)
        out_sents.append([{"t": t, "m": m} for t, m in chunks])
    ok = not fails
    all_ok &= ok
    if ok:
        path = os.path.join(OUT, fid + ".json")
        with open(path, "w", encoding="utf-8", newline="\n") as f:
            f.write(render(fid, out_sents))
        # 回读复验
        back = json.load(open(path, encoding="utf-8"))
        assert back["id"] == fid and len(back["sents"]) == len(src_sents)
        for si, (sent, s) in enumerate(zip(back["sents"], src_sents)):
            joined = " ".join(c["t"] for c in sent["chunks"])
            if strip_tok(joined) != strip_tok(s["en"]):
                fails.append("回读句%d 不一致" % (si + 1))
        ok = not fails
        all_ok &= ok
    avg = n_words / n_chunks if n_chunks else 0
    stats.append((fid, len(src_sents), n_chunks, avg))
    print("%s %s | 句数=%d 组数=%d 平均组词=%.2f %s"
          % ("PASS" if ok else "FAIL", fid, len(src_sents), n_chunks, avg,
             ("" if ok else " -> " + "; ".join(fails))))

raw = open(os.path.join(OUT, "p10037.json"), "rb").read()
print("BOM check:", "OK(无BOM)" if not raw.startswith(b"\xef\xbb\xbf") else "FAIL(有BOM)")
print("ALL PASS" if all_ok else "HAS FAILURES")
sys.exit(0 if all_ok else 1)
