#!/bin/bash

# Script to fix encoding issues in blog posts
# This fixes the common "Â" character encoding problem from WordPress import

echo "Starting encoding fix for blog posts..."

# Count total files with encoding issues
total_files=$(grep -r "Â" output/posts/ --include="*.md" | cut -d: -f1 | sort -u | wc -l)
echo "Found $total_files files with encoding issues"

# Get list of files with encoding issues
files_with_issues=$(grep -l "Â" output/posts/**/*.md)

# Counter for processed files
counter=0

# Process each file
for file in $files_with_issues; do
    if [ -f "$file" ]; then
        echo "Processing: $file"
        
        # Create backup
        cp "$file" "$file.backup"
        
        # Fix the encoding issues
        # Replace "Â " (non-breaking space issue) with regular space
        sed -i 's/Â / /g' "$file"
        
        # Replace standalone "Â" with nothing (remove orphaned characters)
        sed -i 's/Â//g' "$file"
        
        # Fix common double spaces that might result
        sed -i 's/  / /g' "$file"
        
        counter=$((counter + 1))
        echo "Fixed $counter/$total_files: $(basename "$file")"
    fi
done

echo "Encoding fix complete! Fixed $counter files."
echo "Backups saved with .backup extension"
