#\!/bin/bash

# Fix focus-trap.test.ts
sed -i 's/const containerRef = createRef<HTMLDivElement>();/const containerRef = { current: container };/g' focus-trap.test.ts
sed -i '/Object.defineProperty(containerRef, .current., {/,+3d' focus-trap.test.ts

# Fix roving-tabindex.test.ts
sed -i '1i import { createMockRef } from "./test-utils";' roving-tabindex.test.ts
sed -i 's/const containerRef = createRef<HTMLDivElement>();/const containerRef = { current: container };/g' roving-tabindex.test.ts
sed -i '/Object.defineProperty(containerRef, .current., {/,+3d' roving-tabindex.test.ts

# Fix keyboard-hooks.test.ts
sed -i '1i import { createMockRef } from "./test-utils";' keyboard-hooks.test.ts
sed -i 's/const containerRef = createRef<HTMLDivElement>();/const containerRef = { current: container };/g' keyboard-hooks.test.ts
sed -i '/Object.defineProperty(containerRef, .current., {/,+3d' keyboard-hooks.test.ts

chmod +x fix_tests.sh
