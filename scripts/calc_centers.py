import re

svg_path = r'c:\Users\ivanz\Documents\trae_projects\MKTG AI\CityFit-main\CityFit-main\public\assets\converteverything.io-d4Bqj5E6b3.svg'

with open(svg_path, 'r', encoding='utf-8') as f:
    text = f.read()

path_pattern = re.findall(r'id="(path\d+)"\s+data-province="([^"]+)"\s+d="([^"]+)"', text)

for pid, province, d in path_pattern:
    coords = re.findall(r'[-\d.]+', d)
    xs = [float(coords[i]) for i in range(0, len(coords), 2)]
    ys = [float(coords[i]) for i in range(1, len(coords), 2)]
    if xs and ys:
        cx = sum(xs) / len(xs)
        cy = sum(ys) / len(ys)
        print(f'{pid} {province}: center=({cx:.0f}, {cy:.0f})')
