#!/bin/bash

# Script to run story tests in batches and collect results

echo "Running Storybook tests..."
echo "=========================="

# Array to store results
declare -a test_results

# Find all story files
story_files=$(find src/components -name "*.stories.tsx" -type f | sort)

# Count total files
total_files=$(echo "$story_files" | wc -l)
echo "Found $total_files story files"
echo

# Run tests in batches
batch_size=5
current_batch=0
passed_count=0
failed_count=0
failed_files=""

for file in $story_files; do
    echo "Testing: $file"
    
    # Run the test
    if VITEST_STORYBOOK=true npx vitest run "$file" --reporter=default 2>&1 | grep -q "Test Files  1 passed"; then
        echo "✅ PASSED"
        ((passed_count++))
    else
        echo "❌ FAILED"
        ((failed_count++))
        failed_files="$failed_files\n$file"
    fi
    
    ((current_batch++))
    
    # Add a small delay between batches
    if [ $((current_batch % batch_size)) -eq 0 ]; then
        echo "Processed $current_batch/$total_files files..."
        sleep 1
    fi
done

echo
echo "=========================="
echo "Test Summary"
echo "=========================="
echo "Total files: $total_files"
echo "Passed: $passed_count"
echo "Failed: $failed_count"
echo
if [ $failed_count -gt 0 ]; then
    echo "Failed files:"
    echo -e "$failed_files"
fi