#!/bin/bash

# Script to fix import paths in src/components/ui/*/*.tsx files

echo "Fixing import paths in component files..."

# Find all .tsx files in src/components/ui subdirectories
files=$(find src/components/ui -name "*.tsx" -type f | grep -v "\.stories\.tsx$" | grep -v "\.test\.tsx$")

# Counter for files processed
count=0

for file in $files; do
    echo "Processing: $file"
    
    # Create backup
    cp "$file" "$file.bak"
    
    # Fix imports from "../../lib/" to "../../../lib/"
    sed -i 's|from "../../lib/|from "../../../lib/|g' "$file"
    
    # Fix imports from "../../types/" to "../../../types/" 
    sed -i 's|from "../../types/|from "../../../types/|g' "$file"
    
    # Fix imports from "../component" to "./component"
    # This handles various import patterns
    sed -i 's|from "\.\./\([^/]*\)"|from "./\1"|g' "$file"
    
    # Check if file was modified
    if ! cmp -s "$file" "$file.bak"; then
        echo "  ✓ Fixed imports in $file"
        ((count++))
        rm "$file.bak"
    else
        echo "  - No changes needed in $file"
        rm "$file.bak"
    fi
done

echo ""
echo "Import path fixes complete!"
echo "Total files processed: $(echo "$files" | wc -l)"
echo "Files modified: $count"

# Find any remaining incorrect imports for review
echo ""
echo "Checking for any remaining issues..."
remaining=$(grep -r 'from "../../lib/\|from "../../types/\|from "../[^.]' src/components/ui --include="*.tsx" | grep -v "\.stories\.tsx" | grep -v "\.test\.tsx" || true)

if [ -n "$remaining" ]; then
    echo "⚠️  Found remaining imports that may need attention:"
    echo "$remaining"
else
    echo "✅ All import paths appear to be fixed!"
fi