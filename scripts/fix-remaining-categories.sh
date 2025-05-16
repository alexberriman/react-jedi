#!/bin/bash

# Fix remaining categorizations

# Radio Group
sed -i 's/^  title: "Components\/UI\/RadioGroup"/  title: "Components\/Form\/RadioGroup"/g' src/components/ui/radio-group/radio-group.stories.tsx

# Select
sed -i 's/^  title: "Components\/UI\/Select"/  title: "Components\/Form\/Select"/g' src/components/ui/select/select.stories.tsx

# Toggle
sed -i 's/^  title: "Components\/UI\/Toggle"/  title: "Components\/Form\/Toggle"/g' src/components/ui/toggle/toggle.stories.tsx

# Toggle Group
sed -i 's/^  title: "Components\/UI\/ToggleGroup"/  title: "Components\/Form\/ToggleGroup"/g' src/components/ui/toggle-group/toggle-group.stories.tsx

# More components that need proper categorization
sed -i 's/^  title: "Components\/UI\/AspectRatio"/  title: "Components\/Media\/AspectRatio"/g' src/components/ui/aspect-ratio/aspect-ratio.stories.tsx
sed -i 's/^  title: "Components\/UI\/Avatar"/  title: "Components\/Media\/Avatar"/g' src/components/ui/avatar/avatar.stories.tsx
sed -i 's/^  title: "Components\/UI\/Image"/  title: "Components\/Media\/Image"/g' src/components/ui/image/image.stories.tsx

# Typography components
sed -i 's/^  title: "Components\/UI\/Heading"/  title: "Components\/Typography\/Heading"/g' src/components/ui/heading/heading.stories.tsx
sed -i 's/^  title: "Components\/UI\/Text"/  title: "Components\/Typography\/Text"/g' src/components/ui/text/text.stories.tsx
sed -i 's/^  title: "Components\/UI\/BlockQuote"/  title: "Components\/Typography\/BlockQuote"/g' src/components/ui/blockquote/blockquote.stories.tsx

# Layout components that are using the wrong categorization
sed -i 's/^  title: "Components\/UI\/Box"/  title: "Components\/Layout\/Box"/g' src/components/ui/box/box.stories.tsx
sed -i 's/^  title: "Components\/UI\/Flex"/  title: "Components\/Layout\/Flex"/g' src/components/ui/flex/flex.stories.tsx
sed -i 's/^  title: "Components\/UI\/Grid"/  title: "Components\/Layout\/Grid"/g' src/components/ui/grid/grid.stories.tsx

echo "Fixed remaining categorizations"