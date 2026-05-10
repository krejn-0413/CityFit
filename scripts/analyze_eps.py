import re
import sys
import os

eps_path = r'c:\Users\ivanz\Documents\trae_projects\MKTG AI\CityFit-main\CityFit-main\中国10.eps'
out_path = r'c:\Users\ivanz\Documents\trae_projects\MKTG AI\CityFit-main\CityFit-main\scripts\eps_analysis.txt'

with open(eps_path, 'rb') as f:
    raw = f.read()

text = raw.decode('latin-1')
lines = text.split('\n')

with open(out_path, 'w', encoding='utf-8') as out:
    out.write(f'Total lines: {len(lines)}\n\n')
    
    path_ops = {}
    for line in lines:
        line = line.strip()
        if line and not line.startswith('%') and len(line) < 50:
            tokens = line.split()
            if tokens:
                last = tokens[-1]
                if last.isalpha() and len(last) <= 3 and not last.startswith('%%'):
                    path_ops[last] = path_ops.get(last, 0) + 1
    
    out.write(f'Path operators:\n')
    for op, count in sorted(path_ops.items(), key=lambda x: -x[1]):
        out.write(f'  {op}: {count}\n')
    
    out.write(f'\nLines 100-250:\n')
    for i in range(100, min(250, len(lines))):
        out.write(f'{i}: {lines[i][:120]}\n')
    
    out.write(f'\nLines 5000-5200:\n')
    for i in range(5000, min(5200, len(lines))):
        out.write(f'{i}: {lines[i][:120]}\n')
    
    out.write(f'\nLines 19000-19375:\n')
    for i in range(19000, min(19375, len(lines))):
        out.write(f'{i}: {lines[i][:120]}\n')
    
    ai_data_start = None
    for i, line in enumerate(lines):
        if 'AI12_Data' in line or 'BeginData' in line or 'BeginBinary' in line:
            ai_data_start = i
            out.write(f'\nBinary data starts at line {i}: {line[:100]}\n')
            break
    
    stream_count = 0
    for i, line in enumerate(lines):
        if 'BeginStream' in line:
            stream_count += 1
            if stream_count <= 5:
                out.write(f'Stream at line {i}: {line[:100]}\n')
    out.write(f'\nTotal streams: {stream_count}\n')

print(f'Analysis written to {out_path}')
