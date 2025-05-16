#!/usr/bin/env python3
import os
import re
from pathlib import Path

def get_relative_path(from_file, to_file):
    """Calculate the relative path between two files"""
    from_path = Path(from_file).parent
    to_path = Path(to_file)
    
    try:
        relative = os.path.relpath(to_path, from_path)
        # Convert to module path
        return './' + relative.replace(os.sep, '/') if not relative.startswith('..') else relative.replace(os.sep, '/')
    except:
        return None

def fix_imports_in_file(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    
    modified = False
    
    # Fix utils imports
    if 'from "../../lib/utils"' in content and '/components/ui/' in file_path:
        depth = file_path.count('/components/ui/') and len(file_path.split('/components/ui/')[1].split('/')) - 1
        correct_path = "../" * (depth + 1) + "lib/utils"
        content = content.replace('from "../../lib/utils"', f'from "{correct_path}"')
        modified = True
    
    # Fix button imports in nested components
    if 'from "./button"' in content and '/components/ui/' in file_path and file_path.count('/') > file_path.replace('/components/ui/', '').count('/'):
        content = content.replace('from "./button"', 'from "../button"')
        modified = True
    
    # Fix component self-references
    if '/components/ui/' in file_path:
        # Extract component directory
        parts = file_path.split('/components/ui/')
        if len(parts) > 1:
            component_path = parts[1]
            if '/' in component_path:  # It's in a subdirectory
                component_dir = component_path.split('/')[0]
                # Fix imports like from "./chart" in chart/chart.tsx
                content = re.sub(r'from "\./(' + component_dir + r')"', r'from "../\1"', content)
                modified = True
    
    if modified:
        with open(file_path, 'w') as f:
            f.write(content)
        print(f"Fixed imports in {file_path}")

# Process all TypeScript files
for root, dirs, files in os.walk('/home/alex/Documents/repos/react-jedi/src'):
    for file in files:
        if file.endswith('.ts') or file.endswith('.tsx'):
            file_path = os.path.join(root, file)
            if '.stories.' not in file and '.test.' not in file:
                try:
                    fix_imports_in_file(file_path)
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")

print("Path fixes complete")