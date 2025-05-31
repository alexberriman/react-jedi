#!/usr/bin/env bash

PORT=6006
INCLUDE_TAGS=""
FAIL_ON_CONSOLE=true

# Parse CLI args
for arg in "$@"; do
  if [[ "$arg" == --includeTags=* ]]; then
    INCLUDE_TAGS="${arg#--includeTags=}"
  fi
  # Check if we're testing error-boundary
  if [[ "$arg" == "error-boundary" ]]; then
    FAIL_ON_CONSOLE=false
  fi
done

# Reuse or start Storybook
if lsof -i:$PORT >/dev/null; then
  echo "🧪 Reusing existing Storybook on port $PORT"
else
  echo "🚀 Starting Storybook"
  npm run storybook &
fi

# Wait for Storybook to be ready
npx wait-on "http://localhost:$PORT/iframe.html"

# Build command
CMD="npx test-storybook --testTimeout=60000"
if [[ "$FAIL_ON_CONSOLE" == true ]]; then
  CMD+=" --failOnConsole"
fi
if [[ -n "$INCLUDE_TAGS" ]]; then
  CMD+=" --includeTags $INCLUDE_TAGS"
fi

# Run tests
echo "🧪 Running: $CMD"
eval "$CMD"
