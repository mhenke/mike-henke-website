#!/bin/bash

# Final summary of all assets and images
echo "🎯 FINAL ASSETS & IMAGES SUMMARY"
echo "=================================="
echo ""

# Global assets
echo "📁 GLOBAL ASSETS (./assets/):"
if [ -d "./assets" ]; then
    total_assets=$(find ./assets -type f | wc -l)
    image_assets=$(find ./assets/images -type f 2>/dev/null | wc -l)
    echo "  📄 Total files: $total_assets"
    echo "  🖼️ Images: $image_assets"
    echo "  📋 Other assets:"
    find ./assets -maxdepth 1 -type f | while read file; do
        echo "    - $(basename "$file")"
    done
else
    echo "  ❌ No global assets directory"
fi

echo ""

# Post images
echo "📁 POST IMAGES (./output/posts/):"
post_dirs_with_images=$(find ./output/posts/*/images -type d 2>/dev/null | wc -l)
total_post_images=$(find ./output/posts/*/images -type f 2>/dev/null | wc -l)
echo "  📂 Posts with images: $post_dirs_with_images"
echo "  🖼️ Total post images: $total_post_images"

echo ""

# Portfolio/Custom content
echo "📁 PORTFOLIO/CUSTOM CONTENT:"
if [ -d "./output/custom" ]; then
    echo "  ✓ Custom content directory exists"
    
    if [ -d "./output/custom/portfolio" ]; then
        portfolio_projects=$(find ./output/custom/portfolio -maxdepth 1 -type d | grep -v "^./output/custom/portfolio$" | wc -l)
        portfolio_images=$(find ./output/custom/portfolio/*/images -type f 2>/dev/null | wc -l)
        echo "  📂 Portfolio projects: $portfolio_projects"
        echo "  🖼️ Portfolio images: $portfolio_images"
    fi
    
    # Show other custom content types
    find ./output/custom -maxdepth 1 -type d | grep -v "^./output/custom$" | while read dir; do
        content_type=$(basename "$dir")
        if [ "$content_type" != "portfolio" ]; then
            echo "  📁 $(basename "$dir")"
        fi
    done
else
    echo "  ❌ No custom content directory"
fi

echo ""

# Summary statistics
echo "📊 TOTAL SUMMARY:"
total_images=$((${image_assets:-0} + ${total_post_images:-0} + ${portfolio_images:-0}))
echo "  🖼️ Total images across site: $total_images"
echo "  📄 Global assets: ${total_assets:-0}"
echo "  📝 Posts with images: ${post_dirs_with_images:-0}"

echo ""

# Next steps
echo "🚀 NEXT STEPS:"
echo "1. Update your .eleventy.js to include all image paths"
echo "2. Run 'npm run build' to verify everything builds correctly"
echo "3. Check that images display properly in your site"
echo ""

# Show sample of what's available
echo "🔍 SAMPLE ASSETS AVAILABLE:"
echo "Global images:"
ls ./assets/images/ 2>/dev/null | head -5 | sed 's/^/  - /'

echo "Sample post images:"
find ./output/posts/*/images -name "*.jpg" -o -name "*.png" | head -3 | while read img; do
    echo "  - $img"
done

if [ -d "./output/custom/portfolio" ]; then
    echo "Portfolio images:"
    find ./output/custom/portfolio/*/images -type f | head -3 | while read img; do
        echo "  - $img"
    done
fi

echo ""
echo "=================================="
echo "Assets summary complete! 🎉"
