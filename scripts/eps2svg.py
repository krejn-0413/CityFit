import re
import sys
import struct

def parse_ai_eps_to_svg(eps_path, svg_path):
    with open(eps_path, 'rb') as f:
        raw = f.read()
    
    text = raw.decode('latin-1')
    
    bbox_match = re.search(r'%%HiResBoundingBox:\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)', text)
    if not bbox_match:
        bbox_match = re.search(r'%%BoundingBox:\s*(\d+)\s+(\d+)\s+(\d+)\s+(\d+)', text)
    if not bbox_match:
        print("Cannot find BoundingBox")
        return
    
    x0, y0, x1, y1 = [float(g) for g in bbox_match.groups()]
    w = x1 - x0
    h = y1 - y0
    
    paths = []
    current_path = []
    all_colors = []
    current_fill = None
    current_stroke = None
    current_stroke_width = 1
    current_color = None
    
    lines = text.split('\n')
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        
        if line.startswith('%'):
            i += 1
            continue
        
        fill_match = re.match(r'^([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+(\d+)\s+([a-z])$', line)
        if fill_match:
            r, g, b, mode, op = fill_match.groups()
            r, g, b = float(r), float(g), float(b)
            if mode == '1':
                current_color = (r, g, b)
                if op == 'f':
                    current_fill = f'rgb({int(r*255)},{int(g*255)},{int(b*255)})'
                elif op == 's':
                    current_stroke = f'rgb({int(r*255)},{int(g*255)},{int(b*255)})'
            i += 1
            continue
        
        g_match = re.match(r'^([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+k$', line)
        if g_match:
            c, m, y, k = [float(x) for x in g_match.groups()]
            r = 255 * (1 - c) * (1 - k)
            g = 255 * (1 - m) * (1 - k)
            b = 255 * (1 - y) * (1 - k)
            current_fill = f'rgb({int(r)},{int(g)},{int(b)})'
            current_color = (r/255, g/255, b/255)
            i += 1
            continue
        
        g_match2 = re.match(r'^([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+K$', line)
        if g_match2:
            c, m, y, k = [float(x) for x in g_match2.groups()]
            r = 255 * (1 - c) * (1 - k)
            g = 255 * (1 - m) * (1 - k)
            b = 255 * (1 - y) * (1 - k)
            current_stroke = f'rgb({int(r)},{int(g)},{int(b)})'
            i += 1
            continue
        
        gray_match = re.match(r'^([\d.]+)\s+g$', line)
        if gray_match:
            v = float(gray_match.group(1))
            c = int(v * 255)
            current_fill = f'rgb({c},{c},{c})'
            i += 1
            continue
        
        gray_match2 = re.match(r'^([\d.]+)\s+G$', line)
        if gray_match2:
            v = float(gray_match2.group(1))
            c = int(v * 255)
            current_stroke = f'rgb({c},{c},{c})'
            i += 1
            continue
        
        sw_match = re.match(r'^([\d.]+)\s+w$', line)
        if sw_match:
            current_stroke_width = float(sw_match.group(1))
            i += 1
            continue
        
        m_match = re.match(r'^([\d.]+)\s+([\d.]+)\s+m$', line)
        if m_match:
            x, y = float(m_match.group(1)), float(m_match.group(2))
            sy = h - y + y0
            current_path = [f'M{x:.2f},{sy:.2f}']
            i += 1
            continue
        
        l_match = re.match(r'^([\d.]+)\s+([\d.]+)\s+l$', line)
        if l_match:
            x, y = float(l_match.group(1)), float(l_match.group(2))
            sy = h - y + y0
            current_path.append(f'L{x:.2f},{sy:.2f}')
            i += 1
            continue
        
        c_match = re.match(r'^([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+c$', line)
        if c_match:
            x1c, y1c, x2c, y2c, xc, yc = [float(x) for x in c_match.groups()]
            sy1 = h - y1c + y0
            sy2 = h - y2c + y0
            syc = h - yc + y0
            current_path.append(f'C{x1c:.2f},{sy1:.2f} {x2c:.2f},{sy2:.2f} {xc:.2f},{syc:.2f}')
            i += 1
            continue
        
        if line == 'f' or line == 'F' or line == 'f*' or line == 'B' or line == 'b' or line == 'b*' or line == 'n':
            if current_path:
                d = ' '.join(current_path)
                if line == 'n':
                    paths.append({
                        'd': d,
                        'fill': 'none',
                        'stroke': current_stroke or 'none',
                        'stroke_width': current_stroke_width
                    })
                else:
                    paths.append({
                        'd': d,
                        'fill': current_fill or current_stroke or '#333333',
                        'stroke': current_stroke or 'none',
                        'stroke_width': current_stroke_width
                    })
                current_path = []
            i += 1
            continue
        
        if line == 'S' or line == 's':
            if current_path:
                d = ' '.join(current_path)
                if line == 's':
                    d += ' Z'
                paths.append({
                    'd': d,
                    'fill': 'none',
                    'stroke': current_stroke or current_fill or '#333333',
                    'stroke_width': current_stroke_width
                })
                current_path = []
            i += 1
            continue
        
        h_match = re.match(r'^([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+re$', line)
        if h_match:
            rx, ry, rw, rh = [float(x) for x in h_match.groups()]
            sy = h - ry - rh + y0
            d = f'M{rx:.2f},{sy:.2f} L{rx+rw:.2f},{sy:.2f} L{rx+rw:.2f},{sy+rh:.2f} L{rx:.2f},{sy+rh:.2f} Z'
            current_path = [d]
            i += 1
            continue
        
        if line in ('W', 'W*', 'q', 'Q', 'BT', 'ET', 'EMC', 'ri', 'gs', 'CS', 'cs', 'SC', 'sc', 'SCN', 'scn', 'G', 'RG', 'J', 'j', 'M', 'd', 'i', 'cm', 'Tf', 'Tm', 'Td', 'TD', 'T*', 'Tj', 'TJ', "'", '"'):
            if line == 'Q':
                current_fill = None
                current_stroke = None
            i += 1
            continue
        
        if line == 'N' or line == 'n':
            current_path = []
            i += 1
            continue
        
        re_match = re.match(r'^([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+re$', line)
        if re_match:
            i += 1
            continue
        
        i += 1
    
    svg_paths = []
    for p in paths:
        d = p['d']
        if not d or d.strip() == '':
            continue
        attrs = f'd="{d}"'
        if p['fill'] != 'none':
            attrs += f' fill="{p["fill"]}"'
        else:
            attrs += ' fill="none"'
        if p['stroke'] != 'none':
            attrs += f' stroke="{p["stroke"]}" stroke-width="{p["stroke_width"]}"'
        svg_paths.append(f'  <path {attrs}/>')
    
    svg_content = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x0} {y0} {w} {h}" width="{w}" height="{h}">
{'\n'.join(svg_paths)}
</svg>'''
    
    with open(svg_path, 'w', encoding='utf-8') as f:
        f.write(svg_content)
    
    print(f"Converted {len(svg_paths)} paths to SVG: {svg_path}")
    print(f"ViewBox: {x0} {y0} {w} {h}")

if __name__ == '__main__':
    eps_path = r'c:\Users\ivanz\Documents\trae_projects\MKTG AI\CityFit-main\CityFit-main\中国10.eps'
    svg_path = r'c:\Users\ivanz\Documents\trae_projects\MKTG AI\CityFit-main\CityFit-main\public\assets\china-map.svg'
    parse_ai_eps_to_svg(eps_path, svg_path)
