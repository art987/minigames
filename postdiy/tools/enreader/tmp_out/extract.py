import json, re, os

BASE = r'c:\Users\ThinkPad\Documents\GitHub\minigames2026\postdiy\tools\enreader\data\professions'
OUT = r'c:\Users\ThinkPad\Documents\GitHub\minigames2026\postdiy\tools\enreader\tmp_out'

def load(pid):
    p = os.path.join(BASE, f'{pid}.js')
    raw = open(p, encoding='utf-8').read()
    raw = raw[raw.index('{'): raw.rindex('}') + 1]
    return json.loads(raw)

words = {}
for i in range(13, 19):
    pid = f'p100{i}'
    d = load(pid)
    print(f'{pid}: sentences={len(d["sentences"])}')
    for s in d['sentences']:
        for c in s['chunks']:
            t = c['text']
            words[t] = words.get(t, 0) + 1

uniq = sorted(set(re.sub(r'[.,!?;:]+$', '', w) for w in words))
print('TOTAL uniq:', len(uniq))
with open(os.path.join(OUT, 'words.txt'), 'w', encoding='utf-8') as f:
    f.write('\n'.join(uniq))
