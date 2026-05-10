import re

svg_path = r'c:\Users\ivanz\Documents\trae_projects\MKTG AI\CityFit-main\CityFit-main\public\assets\converteverything.io-d4Bqj5E6b3.svg'

with open(svg_path, 'r', encoding='utf-8') as f:
    text = f.read()

text = re.sub(
    r'\s*<path\s+id="path35-REMOVED"[^/]*/>\s*',
    '\n',
    text,
    flags=re.DOTALL
)

text = re.sub(
    r'\s*<path\s+id="path35"[^/]*/>\s*',
    '\n',
    text,
    flags=re.DOTALL
)

with open(svg_path, 'w', encoding='utf-8') as f:
    f.write(text)

print("Done - text path removed")
