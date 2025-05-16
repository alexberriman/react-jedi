#!/usr/bin/env python3
import os
import re

def fix_imports(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Fix broken import patterns
    content = re.sub(r'from \["\'\]([^"\']+)', r'from "\1', content)
    
    # Fix imports based on file location
    if '/src/lib/' in file_path:
        # Fix imports in lib directory
        content = re.sub(r'from ["\']@/types/', 'from "../../types/', content)
        content = re.sub(r'from ["\']@/lib/', 'from "../', content)
        content = re.sub(r'from ["\']@/components/', 'from "../../components/', content)
    elif '/src/components/' in file_path:
        # Fix imports in components directory
        content = re.sub(r'from ["\']@/components/ui/', 'from "./', content)
        content = re.sub(r'from ["\']@/types/', 'from "../../types/', content)
        content = re.sub(r'from ["\']@/lib/', 'from "../../lib/', content)
    
    with open(file_path, 'w') as f:
        f.write(content)

# Find all TypeScript files
for root, dirs, files in os.walk('/home/alex/Documents/repos/react-jedi/src'):
    for file in files:
        if file.endswith('.ts') or file.endswith('.tsx'):
            file_path = os.path.join(root, file)
            try:
                fix_imports(file_path)
            except Exception as e:
                print(f"Error processing {file_path}: {e}")

print("Import fixes complete")