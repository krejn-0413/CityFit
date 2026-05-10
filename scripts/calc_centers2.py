import re

svg_path = r'c:\Users\ivanz\Documents\trae_projects\MKTG AI\CityFit-main\CityFit-main\public\assets\converteverything.io-d4Bqj5E6b3.svg'

with open(svg_path, 'r', encoding='utf-8') as f:
    text = f.read()

path_pattern = re.findall(r'id="(path\d+)"\s+data-province="([^"]+)"\s+d="([^"]*)"\s+style="[^"]*"\s+transform="matrix\(([^)]+)\)"', text)

for pid, province, d, matrix_str in path_pattern:
    vals = [float(v) for v in matrix_str.split(',')]
    a, b, c, dd, e, f = vals
    
    coords = re.findall(r'[-\d.]+', d)
    xs = [float(coords[i]) for i in range(0, len(coords), 2)]
    ys = [float(coords[i]) for i in range(1, len(coords), 2)]
    
    if xs and ys:
        raw_cx = sum(xs) / len(xs)
        raw_cy = sum(ys) / len(ys)
        
        svg_x = a * raw_cx + c * raw_cy + e
        svg_y = b * raw_cx + dd * raw_cy + f
        
        print(f'{pid} {province}: svg_center=({svg_x:.1f}, {svg_y:.1f})')
