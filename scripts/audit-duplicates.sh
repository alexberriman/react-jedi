#!/bin/bash

cd /home/alex/Documents/repos/react-jedi/src/components/ui

echo "Files to delete (have directory equivalents):"
echo "============================================"

# Common pattern: component.tsx file exists alongside component/ directory
for file in *.tsx; do
    if [ -f "$file" ]; then
        # Extract component name without extension
        component=$(basename "$file" .tsx)
        
        # Skip special files that end with -component
        if [[ "$component" =~ -component$ ]]; then
            continue
        fi
        
        # Check if a corresponding directory exists
        if [ -d "$component" ]; then
            echo "- $file (directory: $component/)"
        fi
    fi
done

echo ""
echo "Files that look special (kept):"
echo "==============================="
for file in *-component.tsx; do
    if [ -f "$file" ]; then
        echo "- $file"
    fi
done