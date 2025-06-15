#!/bin/bash

# Script to fix WordPress code block format issues in blog posts
# Converts old [code language="..."] format to proper markdown code blocks

echo "Starting code block format fix for blog posts..."

# Find files with WordPress-style code blocks
files_with_code=$(grep -l '\\\[code.*\\\]' output/posts/**/*.md)

if [ -z "$files_with_code" ]; then
    echo "No files found with WordPress-style code blocks."
    exit 0
fi

# Count total files with code formatting issues
total_files=$(echo "$files_with_code" | wc -l)
echo "Found $total_files files with WordPress-style code blocks"

# Counter for processed files
counter=0

# Process each file
for file in $files_with_code; do
    if [ -f "$file" ]; then
        echo "Processing: $file"
        
        # Create backup if not already exists
        if [ ! -f "$file.backup" ]; then
            cp "$file" "$file.backup"
        fi
        
        # Fix WordPress code blocks
        # Replace \[code language="..."\] with proper markdown code blocks
        sed -i 's/\\[code language="coldfusion"\\]/```coldfusion/g' "$file"
        sed -i 's/\\[code language="javascript"\\]/```javascript/g' "$file"
        sed -i 's/\\[code language="xml"\\]/```xml/g' "$file"
        sed -i 's/\\[code language="html"\\]/```html/g' "$file"
        sed -i 's/\\[code language="css"\\]/```css/g' "$file"
        sed -i 's/\\[code language="sql"\\]/```sql/g' "$file"
        sed -i 's/\\[code language="bash"\\]/```bash/g' "$file"
        sed -i 's/\\[code language="java"\\]/```java/g' "$file"
        sed -i 's/\\[code\\]/```/g' "$file"
        
        # Replace closing \[/code\] with closing code block
        sed -i 's/\\\\[\/code\\]/```/g' "$file"
        sed -i 's/\\[\/code\\]/```/g' "$file"
        
        counter=$((counter + 1))
        echo "Fixed $counter/$total_files: $(basename "$file")"
    fi
done

echo "Code block format fix complete! Fixed $counter files."
echo "Backups saved with .backup extension (if not already existing)"
