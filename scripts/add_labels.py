import re

svg_path = r'c:\Users\ivanz\Documents\trae_projects\MKTG AI\CityFit-main\CityFit-main\public\assets\converteverything.io-d4Bqj5E6b3.svg'

with open(svg_path, 'r', encoding='utf-8') as f:
    text = f.read()

new_map = {
    'path21': '贵州',
    'path27': '内蒙古',
}

GRAY = '#b0b0b0'

for path_id, province_name in new_map.items():
    pattern = rf'(<path\s+id="{path_id}"\s+)'
    replacement = rf'\1data-province="{province_name}" '
    text = re.sub(pattern, replacement, text)

for path_id in new_map.keys():
    pattern = rf'(id="{path_id}"[^>]*style="fill:)([^;"]+)(;[^"]*")'
    text = re.sub(pattern, rf'\1{GRAY}\3', text)

with open(svg_path, 'w', encoding='utf-8') as f:
    f.write(text)

print(f"Done - added 贵州 and 内蒙古")
