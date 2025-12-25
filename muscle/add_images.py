import re

# 读取data.js文件
with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 定义肌肉名称到拼音的映射（去重版）
muscle_pinyin_map = {
    "枕额肌": "zheneji",
    "额肌": "eji",
    "眼轮匝肌": "yanlunzaji",
    "口轮匝肌": "koulunzaji",
    "鼻肌": "biji",
    "耳廓肌": "erkuoji",
    "咬肌": "yaoji",
    "颞肌": "nieji",
    "翼内肌": "yineiji",
    "翼外肌": "yiwaiji",
    "颈阔肌": "jingkuoji",
    "胸锁乳突肌": "xiongsuorutuji",
    "舌骨肌": "sheguji",
    "斜角肌": "xiejiaoji",
    "头长肌": "touchangji",
    "颈长肌": "jingchangji",
    "斜方肌": "xiefangji",
    "背阔肌": "beikuoji",
    "肩胛提肌": "jianjiatiji",
    "菱形肌": "lingxingji",
    "竖脊肌-棘肌": "shujiji-jiji",
    "竖脊肌-最长肌": "shujiji-zuichangji",
    "竖脊肌-髂肋肌": "shujiji-qieleji",
    "夹肌": "jiaji",
    "胸大肌": "xiongdaji",
    "胸小肌": "xiongxiaoji",
    "前锯肌": "qianjuji",
    "肋间外肌": "leijianwaiji",
    "肋间内肌": "leijianneiji",
    "膈肌": "geji",
    "腹直肌": "fuzhiji",
    "腹外斜肌": "fuwai xieji",
    "腹内斜肌": "funei xieji",
    "腹横肌": "fuhengji",
    "腰方肌": "yaofangji",
    "腰大肌": "yaodaji",
    "盆底肌": "pendiji",
    "三角肌": "sanjiaoji",
    "冈上肌": "gangshangji",
    "冈下肌": "gangxiaji",
    "小圆肌": "xiaoyuanji",
    "大圆肌": "dayuanji",
    "肩胛下肌": "jianjiaxiaji",
    "肱二头肌": "gongertouji",
    "肱肌": "gongji",
    "肱三头肌": "gongsantouji",
    "肘肌": "zhouji",
    "肱桡肌": "gongraoji",
    "旋前圆肌": "xuanqianyuanji",
    "桡侧腕屈肌": "raocewanquji",
    "掌长肌": "zhangchangji",
    "指浅屈肌": "zhiqianquji",
    "尺侧腕屈肌": "chicewanquji",
    "拇长屈肌": "muchangquji",
    "指深屈肌": "zhishenquji",
    "旋前方肌": "xuanqianfangji",
    "桡侧腕长伸肌": "raocewanchangshenji",
    "桡侧腕短伸肌": "raocewanduanshenji",
    "指伸肌": "zhishenji",
    "小指伸肌": "xiaozhishenji",
    "尺侧腕伸肌": "chicewanshenji",
    "旋后肌": "xuanhouji",
    "拇长展肌": "muchangzhanji",
    "拇短伸肌": "muduanshenji",
    "拇长伸肌": "muchangshenji",
    "示指伸肌": "shizhishenji",
    "拇短展肌": "muduanzhanji",
    "拇短屈肌": "muduanquji",
    "拇对掌肌": "muduizhangji",
    "拇收肌": "mushouji",
    "小指展肌": "xiaozhizhanji",
    "小指短屈肌": "xiaozhiduanquji",
    "小指对掌肌": "xiaozhiduizhangji",
    "蚓状肌": "yinzhuangji",
    "骨间掌侧肌": "gujianzhangceji",
    "骨间背侧肌": "gujianbeiceji",
    "髂腰肌": "qiaoyaoji",
    "梨状肌": "lizhuangji",
    "臀大肌": "tundaji",
    "臀中肌": "tunzhongji",
    "臀小肌": "tunxiaoji",
    "股四头肌": "gusitouji",
    "缝匠肌": "fengjiangji",
    "阔筋膜张肌": "kuojinmozhangji",
    "股二头肌": "guertouji",
    "半腱肌": "banjianji",
    "半膜肌": "banmoji",
    "耻骨肌": "chiguji",
    "长收肌": "changshouji",
    "短收肌": "duanshouji",
    "大收肌": "dashouji",
    "股薄肌": "gubaoji",
    "胫骨前肌": "jingguqianji",
    "趾长伸肌": "zhichangshenji",
    "腓肠肌": "feichangji",
    "比目鱼肌": "bimuyuji",
    "趾长屈肌": "zhichangquji",
    "胫骨后肌": "jingguhouji",
    "腓骨长肌": "feiguchangji",
    "腓骨短肌": "feiguduanji",
    "趾短伸肌": "zhiduanshenji",
    "拇展肌": "muzhanji",
    "小趾展肌": "xiaozhizhanji",
    "小趾短屈肌": "xiaozhiduanquji",
    "小趾对跖肌": "xiaozhiduizhiji",
    "趾短屈肌": "zhiduanquji",
    "足底方肌": "zudifangji",
    "骨间足底肌": "gujianzudiji"
}

# 正则表达式匹配肌肉数据行（改进版）
pattern = r'(\{"part":"[^"]+","group":"[^"]+","name":"([^"]+)","start":"[^"]+","end":"[^"]+","action":"[^"]+")(?:(?:","videos":\[[^\]]*\])?)(?:(?:","images":\[[^\]]*\])?)(\})'

def add_images_field(match):
    muscle_name = match.group(2)
    pinyin_name = muscle_pinyin_map.get(muscle_name, muscle_name.replace("-", "").replace(" ", "").replace("/", ""))
    
    # 如果已经有images字段，保留原样
    if '"images"' in match.group(0):
        return match.group(0)
    
    # 添加images字段
    return f'{match.group(1)},"images":["medias/{pinyin_name}.jpg"]{match.group(3)}'

# 替换所有匹配的行
new_content = re.sub(pattern, add_images_field, content)

# 写回文件
with open('data.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("已成功为所有肌肉数据添加images字段！")