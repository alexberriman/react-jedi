#!/bin/bash

# Update UI component stories from "UI/" to "Components/UI/"
for file in \
  src/components/ui/badge/badge.stories.tsx \
  src/components/ui/blockquote/blockquote.stories.tsx \
  src/components/ui/box/box.stories.tsx \
  src/components/ui/breadcrumb/breadcrumb.stories.tsx \
  src/components/ui/button/button.stories.tsx \
  src/components/ui/call-to-action/call-to-action.stories.tsx \
  src/components/ui/card/card.stories.tsx \
  src/components/ui/carousel/carousel.stories.tsx \
  src/components/ui/collapsible/collapsible.stories.tsx \
  src/components/ui/container/container.stories.tsx \
  src/components/ui/flex/flex.stories.tsx \
  src/components/ui/form/form.stories.tsx \
  src/components/ui/grid/grid.stories.tsx \
  src/components/ui/heading/heading.stories.tsx \
  src/components/ui/image/image.stories.tsx \
  src/components/ui/input/input.stories.tsx \
  src/components/ui/label/label.stories.tsx \
  src/components/ui/pricing-table/pricing-table.stories.tsx \
  src/components/ui/progress/progress.stories.tsx \
  src/components/ui/separator/separator.stories.tsx \
  src/components/ui/skeleton/skeleton.stories.tsx \
  src/components/ui/slider/slider.stories.tsx \
  src/components/ui/switch/switch.stories.tsx \
  src/components/ui/testimonial/testimonial.stories.tsx \
  src/components/ui/text/text.stories.tsx \
  src/components/ui/tooltip/tooltip.stories.tsx
do
  sed -i 's/^  title: "UI\//  title: "Components\/UI\//g' "$file"
done

# Update Layout stories from "Layout/" to "Components/Layout/"
for file in \
  src/components/ui/masonry/masonry.stories.tsx \
  src/components/ui/scroll-area/scroll-area.stories.tsx
do
  sed -i 's/^  title: "Layout\//  title: "Components\/Layout\//g' "$file"
done

# Update specific categorizations for proper organization
# Move marketing components that are incorrectly categorized
sed -i 's/^  title: "UI\/CallToAction"/  title: "Components\/Marketing\/CallToAction"/g' src/components/ui/call-to-action/call-to-action.stories.tsx
sed -i 's/^  title: "UI\/PricingTable"/  title: "Components\/Marketing\/PricingTable"/g' src/components/ui/pricing-table/pricing-table.stories.tsx
sed -i 's/^  title: "UI\/Testimonial"/  title: "Components\/Marketing\/Testimonial"/g' src/components/ui/testimonial/testimonial.stories.tsx

# Fix forms categorization
sed -i 's/^  title: "UI\/Form"/  title: "Components\/Form\/Form"/g' src/components/ui/form/form.stories.tsx
sed -i 's/^  title: "Components\/Forms\/Textarea"/  title: "Components\/Form\/Textarea"/g' src/components/ui/textarea/textarea.stories.tsx
sed -i 's/^  title: "UI\/Input"/  title: "Components\/Form\/Input"/g' src/components/ui/input/input.stories.tsx
sed -i 's/^  title: "UI\/Label"/  title: "Components\/Form\/Label"/g' src/components/ui/label/label.stories.tsx
sed -i 's/^  title: "UI\/Checkbox"/  title: "Components\/Form\/Checkbox"/g' src/components/ui/checkbox/checkbox.stories.tsx
sed -i 's/^  title: "UI\/RadioGroup"/  title: "Components\/Form\/RadioGroup"/g' src/components/ui/radio-group/radio-group.stories.tsx
sed -i 's/^  title: "UI\/Select"/  title: "Components\/Form\/Select"/g' src/components/ui/select/select.stories.tsx
sed -i 's/^  title: "UI\/Switch"/  title: "Components\/Form\/Switch"/g' src/components/ui/switch/switch.stories.tsx
sed -i 's/^  title: "UI\/Slider"/  title: "Components\/Form\/Slider"/g' src/components/ui/slider/slider.stories.tsx
sed -i 's/^  title: "UI\/Toggle"/  title: "Components\/Form\/Toggle"/g' src/components/ui/toggle/toggle.stories.tsx
sed -i 's/^  title: "UI\/ToggleGroup"/  title: "Components\/Form\/ToggleGroup"/g' src/components/ui/toggle-group/toggle-group.stories.tsx

# Fix layout components
sed -i 's/^  title: "UI\/Container"/  title: "Components\/Layout\/Container"/g' src/components/ui/container/container.stories.tsx
sed -i 's/^  title: "UI\/Flex"/  title: "Components\/Layout\/Flex"/g' src/components/ui/flex/flex.stories.tsx
sed -i 's/^  title: "UI\/Grid"/  title: "Components\/Layout\/Grid"/g' src/components/ui/grid/grid.stories.tsx
sed -i 's/^  title: "UI\/Box"/  title: "Components\/Layout\/Box"/g' src/components/ui/box/box.stories.tsx

# Navigation components that are incorrectly categorized
sed -i 's/^  title: "UI\/Breadcrumb"/  title: "Components\/Navigation\/Breadcrumb"/g' src/components/ui/breadcrumb/breadcrumb.stories.tsx

# Fix data display
sed -i 's/^  title: "Components\/Table"/  title: "Components\/DataDisplay\/Table"/g' src/components/ui/table/table.stories.tsx
sed -i 's/^  title: "Components\/DataTable"/  title: "Components\/DataDisplay\/DataTable"/g' src/components/ui/data-table/data-table.stories.tsx
sed -i 's/^  title: "UI\/Progress"/  title: "Components\/DataDisplay\/Progress"/g' src/components/ui/progress/progress.stories.tsx
sed -i 's/^  title: "UI\/Skeleton"/  title: "Components\/DataDisplay\/Skeleton"/g' src/components/ui/skeleton/skeleton.stories.tsx

# Fix existing Components/* categories that need adjustment
sed -i 's/^  title: "Components\/Advanced\/Tabs"/  title: "Components\/DataDisplay\/Tabs"/g' src/components/ui/tabs/tabs.stories.tsx

# Fix context menu to proper overlay category
sed -i 's/^  title: "Components\/ContextMenu"/  title: "Components\/Overlay\/ContextMenu"/g' src/components/ui/context-menu/context-menu.stories.tsx

echo "Story categories updated successfully"