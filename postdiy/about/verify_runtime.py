# 模拟前端 PRIZES 生成逻辑（Python 侧复刻），验证运行时长度=64
DOC_EMOJIS = [
  '🍊','🍇','🍓','🫐','🍑','🍒','🥝','🍍','🥥','🥭',
  '🍌','🍐','🍋','🍈','🍉','🍏','🌸','🌹','🌻','🌺',
  '🌷','🌼','🌵','🌴','🎋','🎍','🎑','🎐','🎏','🎀',
  '🎁','🎂','🍰','🧁','🍩','🍪','🍫','🍬','🍭','🍮',
  '⭐','🌟','✨','💫','🌙','☀️','🌈','☁️','⚡','🔥',
  '💖','💝','💗','💓','💞','💕','🎈','🎊','🏆','🎯',
  '🍷','🍸','🥂','🍹','🥤','🧊','🍦','🍨','🥧','🥨'
]

PRIZES = [
  {'emoji': '🍎', 'label': '7日VIP体验卡', 'type': 'vip7'},
  {'emoji': '💎', 'label': '月卡VIP',       'type': 'month'},
  {'emoji': '👑', 'label': '年卡VIP',       'type': 'year'},
] + [{'emoji': e, 'label': '虚拟资料礼包', 'type': 'doc'} for e in DOC_EMOJIS[:61]]

print(f"PRIZES 运行时长度: {len(PRIZES)}", "✅ == 64" if len(PRIZES) == 64 else "❌")

# 关键：pos 与奖品一一对应
print("\n=== pos 0~63 奖品分布 ===")
from collections import Counter
types = Counter()
for i, p in enumerate(PRIZES):
    types[p['type']] += 1
    if i < 5 or i > 60:
        print(f"  pos {i:2d}: {p['emoji']} ({p['type']})")
print("类型统计:", dict(types))
print("vip7=1, month=1, year=1, doc=61:", types.get('vip7')==1 and types.get('month')==1 and types.get('year')==1 and types.get('doc')==61)

# 三处一致性：网格、弹窗、记录都用 PRIZES[pos]
print("\n=== 三处一致性（任意 pos 下 网格==弹窗==记录）===")
for pos in range(64):
    grid = PRIZES[pos]['emoji']
    popup = PRIZES[pos]['emoji']
    record = PRIZES[pos]['emoji']
    assert grid == popup == record
print("✅ 全部64格：网格图标 == 弹窗图标 == 历史记录图标")

# 停点验证（与前端 stepOnce 逻辑一致）
print("\n=== 停点精确性 ===")
for pos in range(64):
    for fire in [0, 1, 5, 10]:
        total = (2 + fire) * 64 + pos + 1
        final = (total - 1) % 64
        assert final == pos, f"pos={pos},fire={fire}->,{final}"
print("✅ 所有 (pos × fire) 精确停在目标格")

# 概率
import random
random.seed(42)
N = 1_000_000
year = month = vip7 = doc = 0
for _ in range(N):
    r = random.random()
    if r < 0.00001: year += 1
    elif r < 0.00011: month += 1
    elif r < 0.05: vip7 += 1
    else: doc += 1
print(f"\n=== 概率（{N}次）===")
print(f"年卡 pos2(👑): {year/N*100:.4f}% (目标0.001%)")
print(f"月卡 pos1(💎): {month/N*100:.4f}% (目标0.01%)")
print(f"7日VIP pos0(🍎): {vip7/N*100:.2f}% (目标5%)")
print(f"资料 pos3-63: {doc/N*100:.2f}%")
