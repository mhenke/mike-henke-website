#!/bin/bash

# Copy the specific portfolio images that were found
SOURCE_BASE="$HOME/Downloads/wpress-npm"
TARGET_DIR="./assets/images"

echo "Copying portfolio images..."
echo "=========================="

# Create target directory if it doesn't exist
mkdir -p "$TARGET_DIR"

# Array of the specific files found
portfolio_files=(
    "output/custom/portfolio/innovate-omaha/images/innovate-omaha.png"
    "output/custom/portfolio/restaurant-to-room/images/r-to-r.jpg"
    "output/custom/portfolio/data-driven-firebase/images/data-driven.jpg"
    "output/custom/portfolio/acf-hhs/images/acf-hhs-gov-e1433696036573.png"
    "output/custom/portfolio/resource-insurance-consultants/images/ric-datatrack.png"
    "output/custom/portfolio/cameron-ranch/images/cam.jpg"
)

copied_count=0

for file in "${portfolio_files[@]}"; do
    source_file="$SOURCE_BASE/$file"
    filename=$(basename "$file")
    
    if [ -f "$source_file" ]; then
        echo "✓ Copying: $filename"
        cp "$source_file" "$TARGET_DIR/"
        copied_count=$((copied_count + 1))
    else
        echo "❌ Not found: $source_file"
    fi
done

echo "=========================="
echo "Portfolio images copied: $copied_count"

if [ $copied_count -gt 0 ]; then
    echo ""
    echo "Verifying copied files:"
    for file in "${portfolio_files[@]}"; do
        filename=$(basename "$file")
        if [ -f "$TARGET_DIR/$filename" ]; then
            echo "  ✓ $filename"
        fi
    done
fi

echo ""
echo "Current assets/images directory now contains:"
ls -la "$TARGET_DIR" | wc -l
echo "files total"
