#!/bin/bash

# Improved Image migration script for WordPress to Eleventy
# Run this from your new site directory: /home/mhenke/Projects/mike-henke-website/

SOURCE_DIR="$HOME/Downloads/wpress-npm/output/posts"
TARGET_DIR="/home/mhenke/Projects/mike-henke-website/output/posts"
LOG_FILE="image-migration.log"

echo "Starting improved image migration..." | tee $LOG_FILE
echo "Source: $SOURCE_DIR" | tee -a $LOG_FILE
echo "Target: $TARGET_DIR" | tee -a $LOG_FILE
echo "================================" | tee -a $LOG_FILE

# Verify directories exist
if [ ! -d "$SOURCE_DIR" ]; then
    echo "ERROR: Source directory does not exist: $SOURCE_DIR" | tee -a $LOG_FILE
    exit 1
fi

if [ ! -d "$TARGET_DIR" ]; then
    echo "ERROR: Target directory does not exist: $TARGET_DIR" | tee -a $LOG_FILE
    exit 1
fi

# Counters
total_source_posts=0
total_target_posts=0
posts_with_images_in_source=0
posts_with_images_copied=0
total_images_copied=0
missing_posts=()

echo "Analyzing directories..." | tee -a $LOG_FILE

# Count posts in source and target
total_source_posts=$(find "$SOURCE_DIR" -mindepth 1 -maxdepth 1 -type d | wc -l)
total_target_posts=$(find "$TARGET_DIR" -mindepth 1 -maxdepth 1 -type d | wc -l)

echo "Source posts: $total_source_posts" | tee -a $LOG_FILE
echo "Target posts: $total_target_posts" | tee -a $LOG_FILE

# Count posts with images in source
posts_with_images_in_source=$(find "$SOURCE_DIR"/*/images -type d 2>/dev/null | wc -l)
echo "Source posts with images: $posts_with_images_in_source" | tee -a $LOG_FILE
echo "================================" | tee -a $LOG_FILE

# Function to copy images for a post
copy_post_images() {
    local post_name="$1"
    local source_images_dir="$SOURCE_DIR/$post_name/images"
    local target_post_dir="$TARGET_DIR/$post_name"
    local target_images_dir="$target_post_dir/images"
    
    if [ -d "$source_images_dir" ]; then
        # Count images in source
        image_count=$(find "$source_images_dir" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.webp" -o -iname "*.svg" \) | wc -l)
        
        if [ $image_count -gt 0 ]; then
            echo "✓ Copying $image_count images for: $post_name" | tee -a $LOG_FILE
            
            # Create target directories if they don't exist
            mkdir -p "$target_images_dir"
            
            # Copy all image files
            find "$source_images_dir" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.webp" -o -iname "*.svg" \) -exec cp {} "$target_images_dir/" \;
            
            posts_with_images_copied=$((posts_with_images_copied + 1))
            total_images_copied=$((total_images_copied + image_count))
            
            return 0
        fi
    fi
    return 1
}

echo "Processing posts with images..." | tee -a $LOG_FILE

# Process only posts that exist in both source and target
for source_post_dir in "$SOURCE_DIR"/*; do
    if [ -d "$source_post_dir" ]; then
        post_name=$(basename "$source_post_dir")
        target_post_dir="$TARGET_DIR/$post_name"
        
        if [ -d "$target_post_dir" ]; then
            # Target exists, try to copy images
            copy_post_images "$post_name"
        else
            # Track missing posts (but only if they have images)
            if [ -d "$SOURCE_DIR/$post_name/images" ]; then
                image_count=$(find "$SOURCE_DIR/$post_name/images" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.webp" -o -iname "*.svg" \) | wc -l)
                if [ $image_count -gt 0 ]; then
                    missing_posts+=("$post_name ($image_count images)")
                fi
            fi
        fi
    fi
done

echo "================================" | tee -a $LOG_FILE
echo "MIGRATION SUMMARY:" | tee -a $LOG_FILE
echo "✓ Posts with images successfully copied: $posts_with_images_copied" | tee -a $LOG_FILE
echo "✓ Total images copied: $total_images_copied" | tee -a $LOG_FILE

if [ ${#missing_posts[@]} -gt 0 ]; then
    echo "" | tee -a $LOG_FILE
    echo "⚠ Posts with images that couldn't be copied (target directory missing):" | tee -a $LOG_FILE
    printf '%s\n' "${missing_posts[@]}" | head -10 | tee -a $LOG_FILE
    if [ ${#missing_posts[@]} -gt 10 ]; then
        echo "... and $((${#missing_posts[@]} - 10)) more" | tee -a $LOG_FILE
    fi
    echo "" | tee -a $LOG_FILE
    echo "To copy these, first ensure the post directories exist in:" | tee -a $LOG_FILE
    echo "$TARGET_DIR" | tee -a $LOG_FILE
fi

echo "================================" | tee -a $LOG_FILE
echo "Migration complete! Check $LOG_FILE for full details." | tee -a $LOG_FILE

# Quick verification
if [ $total_images_copied -gt 0 ]; then
    echo ""
    echo "Quick verification - first few copied image directories:"
    find "$TARGET_DIR" -name "images" -type d | head -5 | while read dir; do
        echo "  $dir ($(ls "$dir" | wc -l) files)"
    done
fi
