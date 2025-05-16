#!/bin/bash

# Fix calendar export
echo "Fixing calendar export..."
cd /home/alex/Documents/repos/react-jedi/src/components/ui/calendar
if [ -f calendar-component.tsx ]; then
  grep -q "calendar-component" index.ts || echo 'export * from "./calendar-component";' >> index.ts
fi

# Fix sidebar exports
echo "Fixing sidebar exports..."
cd /home/alex/Documents/repos/react-jedi/src/components/ui/sidebar
if [ -f sidebar-component.tsx ]; then
  grep -q "sidebar-component" index.ts || echo 'export * from "./sidebar-component";' >> index.ts
fi
if [ -f sidebar-inset-component.tsx ]; then
  grep -q "sidebar-inset-component" index.ts || echo 'export * from "./sidebar-inset-component";' >> index.ts  
fi
if [ -f sidebar-trigger-component.tsx ]; then
  grep -q "sidebar-trigger-component" index.ts || echo 'export * from "./sidebar-trigger-component";' >> index.ts
fi

# Fix data-table export
echo "Fixing data-table export..."
cd /home/alex/Documents/repos/react-jedi/src/components/ui/data-table
if [ -f data-table-component.tsx ]; then
  grep -q "data-table-component" index.ts || echo 'export * from "./data-table-component";' >> index.ts
fi

# Fix carousel export
echo "Fixing carousel export..."
cd /home/alex/Documents/repos/react-jedi/src/components/ui/carousel
if [ -f carousel-component.tsx ]; then
  grep -q "carousel-component" index.ts || echo 'export * from "./carousel-component";' >> index.ts
fi

# Fix combobox export
echo "Fixing combobox export..."
cd /home/alex/Documents/repos/react-jedi/src/components/ui/combobox
grep -q '\* from ".*combobox' index.ts || sed -i '1i export * from "./combobox";' index.ts

# Fix pagination export
echo "Fixing pagination export..."
cd /home/alex/Documents/repos/react-jedi/src/components/ui/pagination
if [ -f pagination-component.tsx ]; then
  grep -q "pagination-component" index.ts || echo 'export * from "./pagination-component";' >> index.ts
fi

echo "Export fixes complete!"