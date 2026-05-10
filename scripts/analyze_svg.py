import re

svg_path = r'c:\Users\ivanz\Documents\trae_projects\MKTG AI\CityFit-main\CityFit-main\public\assets\converteverything.io-d4Bqj5E6b3.svg'

with open(svg_path, 'r', encoding='utf-8') as f:
    text = f.read()

paths = re.findall(r'<path\s+[^>]*id="([^"]+)"', text)
fills = re.findall(r'style="fill:([^;]+);', text)

print(f'Total paths: {len(paths)}')
print(f'Unique fills: {set(fills)}')
print()

for i, (pid, fill) in enumerate(zip(paths, fills)):
    print(f'{pid}: fill={fill}')
    if i > 60:
        print('...(showing first 60)')
        break
