# 手动修复脚本：确保所有肌肉条目都有images字段

# 定义肌肉名称到拼音的映射
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

# 读取文件
with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 备份原始文件
import shutil
shutil.copy2('data.js', 'data_backup_manual.js')

# 找到肌肉数据数组的开始和结束位置
start_pos = content.find('const muscleData = [')
end_pos = content.find('];', start_pos) + 2

if start_pos == -1 or end_pos == -1:
    print("错误：找不到肌肉数据数组")
    exit(1)

# 提取肌肉数据部分
muscle_data_section = content[start_pos:end_pos]

# 分割成单个肌肉条目
import re
muscle_entries = re.findall(r'\{[^}]+\}', muscle_data_section)

print(f"找到 {len(muscle_entries)} 个肌肉条目")

# 处理每个肌肉条目
processed_entries = []
for entry in muscle_entries:
    # 检查是否已经有images字段
    if '"images":' in entry:
        processed_entries.append(entry)
        continue
    
    # 提取肌肉名称
    name_match = re.search(r'"name":"([^"]+)"', entry)
    if name_match:
        muscle_name = name_match.group(1)
        pinyin_name = muscle_pinyin_map.get(muscle_name, muscle_name.replace("-", "").replace(" ", "").replace("/", ""))
        
        # 在最后一个字段后添加images字段
        if entry.endswith('}'):
            # 去掉最后的}
            base_entry = entry[:-1]
            # 添加images字段
            new_entry = base_entry + ',"images":["medias/' + pinyin_name + '.jpg"]}'
            processed_entries.append(new_entry)
        else:
            processed_entries.append(entry)
    else:
        processed_entries.append(entry)

# 重建肌肉数据部分
new_muscle_data_section = 'const muscleData = [\n' + ',\n'.join(processed_entries) + '\n];'

# 替换原内容
new_content = content[:start_pos] + new_muscle_data_section + content[end_pos:]

# 写回文件
with open('data.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"已成功为 {len(processed_entries)} 个肌肉条目添加images字段！")

# 验证结果
with open('data.js', 'r', encoding='utf-8') as f:
    content_after = f.read()
    
# 统计有多少肌肉条目有images字段
images_count = content_after.count('"images":[')
muscles_count = content_after.count('"name":"')

print(f"总肌肉条目数: {muscles_count}")
print(f"已添加images字段的肌肉条目数: {images_count}")
print(f"剩余需要处理的肌肉条目数: {muscles_count - images_count}")

# 显示前几个已处理的肌肉条目作为示例
processed_muscles = re.findall(r'"name":"([^"]+)".*?"images":\[', content_after)
if processed_muscles:
    print("\n已处理的肌肉示例:")
    for i, muscle in enumerate(processed_muscles[:10]):
        print(f"  {i+1}. {muscle}")

# 检查是否有任何肌肉没有images字段
muscles_without_images = re.findall(r'"name":"([^"]+)"(?!.*"images":\[)[^}]*\}', content_after)
if muscles_without_images:
    print(f"\n仍有 {len(muscles_without_images)} 个肌肉没有images字段:")
    for i, muscle in enumerate(muscles_without_images[:10]):
        print(f"  {i+1}. {muscle}")
    if len(muscles_without_images) > 10:
        print(f"  ... 还有 {len(muscles_without_images) - 10} 个")
else:
    print("\n所有肌肉都已成功添加images字段！")

print("\n已创建备份文件: data_backup_manual.js")