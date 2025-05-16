#!/bin/bash
echo "Fixing imports in library src directory..."

# Fix imports in lib directory
find /home/alex/Documents/repos/react-jedi/src/lib -type f \( -name "*.ts" -o -name "*.tsx" \) | while read file; do
  # Skip test files
  if [[ "$file" == *".test."* ]] || [[ "$file" == *".stories."* ]]; then
    continue
  fi
  
  # Fix @/types imports
  sed -i 's|from "@/types/|from "../types/|g' "$file"
  sed -i 's|from "@/lib/|from "../lib/|g' "$file"
  sed -i 's|from "@/components/|from "../components/|g' "$file"
  sed -i 's|from "@/hooks/|from "../hooks/|g' "$file"
done

# Fix imports in components directory
find /home/alex/Documents/repos/react-jedi/src/components -type f -name "*.tsx" | while read file; do
  # Skip test and story files
  if [[ "$file" == *".test."* ]] || [[ "$file" == *".stories."* ]]; then
    continue
  fi
  
  # Fix @/components/ui imports (self-referencing in the same directory)
  sed -i 's|from "@/components/ui/|from "./|g' "$file"
  
  # Fix @/types imports from components
  sed -i 's|from "@/types/|from "../../types/|g' "$file"
  
  # Fix @/lib imports from components 
  sed -i 's|from "@/lib/|from "../../lib/|g' "$file"
done

echo "Import fixes complete"