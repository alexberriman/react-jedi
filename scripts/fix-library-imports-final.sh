#!/bin/bash
echo "Fixing malformed import statements..."

# Fix the regex pattern issue from previous script
find /home/alex/Documents/repos/react-jedi/src -type f \( -name "*.ts" -o -name "*.tsx" \) | while read file; do
  # Fix the ["'] pattern that was incorrectly introduced
  sed -i "s/from \[\"\'\]//g" "$file"
  
  # Now properly fix @/ imports based on file location
  dir=$(dirname "$file")
  
  # Determine relative path based on location
  if [[ "$dir" == */src/lib/* ]]; then
    # In lib directory
    sed -i 's|from "@/types/|from "../types/|g' "$file"
    sed -i 's|from "@/lib/|from "./|g' "$file"
    sed -i 's|from "@/components/|from "../components/|g' "$file"
  elif [[ "$dir" == */src/components/* ]]; then
    # In components directory  
    sed -i 's|from "@/components/ui/|from "./|g' "$file"
    sed -i 's|from "@/types/|from "../../types/|g' "$file"
    sed -i 's|from "@/lib/|from "../../lib/|g' "$file"
  fi
done

echo "Import fixes complete"