import re, io
tjs = io.open(r'assets/js/templates.js', encoding='utf-8').read()
ids = re.findall(r"\{ id: '([A-Za-z]+\d+)', title:", tjs)
print('templates.js entries:', len(ids))
html = io.open('price-maker.html', encoding='utf-8').read()
links = re.findall(r'assets/css/templates/([A-Za-z]+\d+)\.css', html)
print('html links:', len(links), 'unique:', len(set(links)))
dup = sorted(k for k in set(links) if links.count(k) > 1)
print('duplicates:', dup if dup else 'none')
missing_css = [i for i in ids if not __import__('os').path.exists('assets/css/templates/%s.css' % i)]
print('missing css files:', missing_css if missing_css else 'none')
