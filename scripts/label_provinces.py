import re

svg_path = r'c:\Users\ivanz\Documents\trae_projects\MKTG AI\CityFit-main\CityFit-main\public\assets\converteverything.io-d4Bqj5E6b3.svg'

with open(svg_path, 'r', encoding='utf-8') as f:
    text = f.read()

province_map = {
    'path5': '黑龙江',
    'path6': '吉林',
    'path7': '辽宁',
    'path8': '河北',
    'path9': '北京',
    'path10': '山西',
    'path11': '天津',
    'path12': '山东',
    'path13': '江苏',
    'path14': '安徽',
    'path15': '浙江',
    'path16': '河南',
    'path17': '湖北',
    'path18': '湖南',
    'path19': '江西',
    'path20': '云南',
    'path22': '广西',
    'path23': '福建',
    'path24': '台湾',
    'path25': '广东',
    'path26': '海南',
    'path28': '甘肃',
    'path29': '青海',
    'path30': '陕西',
    'path31': '宁夏',
    'path32': '新疆',
    'path33': '西藏',
    'path34': '四川重庆',
}

GRAY = '#b0b0b0'

for path_id, province_name in province_map.items():
    pattern = rf'(<path\s+id="{path_id}"\s+)'
    replacement = rf'\1data-province="{province_name}" '
    text = re.sub(pattern, replacement, text)

for path_id in province_map.keys():
    pattern = rf'(id="{path_id}"[^>]*style="fill:)([^;"]+)(;[^"]*")'
    text = re.sub(pattern, rf'\1{GRAY}\3', text)

with open(svg_path, 'w', encoding='utf-8') as f:
    f.write(text)

print(f"Done - labeled {len(province_map)} provinces and changed colors to gray")
