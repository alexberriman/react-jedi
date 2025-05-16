#!/bin/bash
echo "Fixing imports in library src directory..."

# Fix imports in lib directory
find /home/alex/Documents/repos/react-jedi/src/lib -type f -name "*.ts" -o -name "*.tsx" | \
  xargs grep -l "from ['\"]@/" | \
  xargs sed -i -E 's|from ["'"'"']@/|from ["'"'"']../|g'

# Fix imports in components directory (adjust relative paths)
find /home/alex/Documents/repos/react-jedi/src/components -type f -name "*.tsx" ! -name "*.stories.tsx" ! -name "*.test.tsx" | \
  xargs grep -l "from ['\"]@/components/ui" | \
  xargs sed -i -E 's|from ["'"'"']@/components/ui/([^"'"'"']*)|from ["'"'"']./\1|g'

find /home/alex/Documents/repos/react-jedi/src/components -type f -name "*.tsx" ! -name "*.stories.tsx" ! -name "*.test.tsx" | \
  xargs grep -l "from ['\"]@/types" | \
  xargs sed -i -E 's|from ["'"'"']@/types/|from ["'"'"']../../types/|g'

echo "Import fixes complete"