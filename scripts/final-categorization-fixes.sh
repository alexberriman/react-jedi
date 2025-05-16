#!/bin/bash

# Fix remaining inconsistencies

# Fix Data Display inconsistency (should be DataDisplay not "Data Display")
sed -i 's/^  title: "Components\/Data Display\/Chart"/  title: "Components\/DataDisplay\/Chart"/g' src/components/ui/chart/chart.stories.tsx

# Move more form components
sed -i 's/^  title: "Components\/UI\/Input"/  title: "Components\/Form\/Input"/g' src/components/ui/input/input.stories.tsx
sed -i 's/^  title: "Components\/UI\/Label"/  title: "Components\/Form\/Label"/g' src/components/ui/label/label.stories.tsx
sed -i 's/^  title: "Components\/UI\/Slider"/  title: "Components\/Form\/Slider"/g' src/components/ui/slider/slider.stories.tsx
sed -i 's/^  title: "Components\/UI\/Switch"/  title: "Components\/Form\/Switch"/g' src/components/ui/switch/switch.stories.tsx

# Move marketing components
sed -i 's/^  title: "Components\/UI\/CallToAction"/  title: "Components\/Marketing\/CallToAction"/g' src/components/ui/call-to-action/call-to-action.stories.tsx
sed -i 's/^  title: "Components\/UI\/PricingTable"/  title: "Components\/Marketing\/PricingTable"/g' src/components/ui/pricing-table/pricing-table.stories.tsx
sed -i 's/^  title: "Components\/UI\/Testimonial"/  title: "Components\/Marketing\/Testimonial"/g' src/components/ui/testimonial/testimonial.stories.tsx

# Move data display components
sed -i 's/^  title: "Components\/UI\/Progress"/  title: "Components\/DataDisplay\/Progress"/g' src/components/ui/progress/progress.stories.tsx
sed -i 's/^  title: "Components\/UI\/Skeleton"/  title: "Components\/DataDisplay\/Skeleton"/g' src/components/ui/skeleton/skeleton.stories.tsx

# Form is actually a special case - it's not an input component but a form container
# Keep it as UI since it's a core UI component for form structure
# But we can move it to Layout since forms are layout-related
sed -i 's/^  title: "Components\/UI\/Form"/  title: "Components\/Layout\/Form"/g' src/components/ui/form/form.stories.tsx

# Move navigation
sed -i 's/^  title: "Components\/UI\/Breadcrumb"/  title: "Components\/Navigation\/Breadcrumb"/g' src/components/ui/breadcrumb/breadcrumb.stories.tsx

# Move more overlay components
sed -i 's/^  title: "Components\/UI\/Dialog"/  title: "Components\/Overlay\/Dialog"/g' src/components/ui/dialog/dialog.stories.tsx
sed -i 's/^  title: "Components\/UI\/Drawer"/  title: "Components\/Overlay\/Drawer"/g' src/components/ui/drawer/drawer.stories.tsx
sed -i 's/^  title: "Components\/UI\/DropdownMenu"/  title: "Components\/Overlay\/DropdownMenu"/g' src/components/ui/dropdown-menu/dropdown-menu.stories.tsx
sed -i 's/^  title: "Components\/UI\/Menubar"/  title: "Components\/Overlay\/Menubar"/g' src/components/ui/menubar/menubar.stories.tsx
sed -i 's/^  title: "Components\/UI\/Popover"/  title: "Components\/Overlay\/Popover"/g' src/components/ui/popover/popover.stories.tsx
sed -i 's/^  title: "Components\/UI\/Sheet"/  title: "Components\/Overlay\/Sheet"/g' src/components/ui/sheet/sheet.stories.tsx
sed -i 's/^  title: "Components\/UI\/Toast"/  title: "Components\/Overlay\/Toast"/g' src/components/ui/toast/toast.stories.tsx
sed -i 's/^  title: "Components\/UI\/Tooltip"/  title: "Components\/Overlay\/Tooltip"/g' src/components/ui/tooltip/tooltip.stories.tsx
sed -i 's/^  title: "Components\/UI\/AlertDialog"/  title: "Components\/Overlay\/AlertDialog"/g' src/components/ui/alert-dialog/alert-dialog.stories.tsx

echo "Final categorization fixes complete"