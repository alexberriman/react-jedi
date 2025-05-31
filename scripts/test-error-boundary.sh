#!/usr/bin/env bash

PORT=6006

# Reuse or start Storybook
if lsof -i:$PORT >/dev/null; then
  echo "🧪 Reusing existing Storybook on port $PORT"
else
  echo "🚀 Starting Storybook"
  npm run storybook &
fi

# Wait for Storybook to be ready
npx wait-on "http://localhost:$PORT/iframe.html"

# Run error boundary tests without --failOnConsole
echo "🧪 Running error boundary tests without --failOnConsole"
npx test-storybook --testTimeout=60000 --testPathPattern="error-boundary"