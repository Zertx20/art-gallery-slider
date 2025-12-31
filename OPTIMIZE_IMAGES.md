# Image Optimization Script

This script helps optimize your gallery images for faster loading.

## Manual Optimization Steps

Since ImageMagick isn't available, here are manual ways to optimize your images:

### Option 1: Online Tools
1. Use [Squoosh](https://squoosh.app/) or [TinyPNG](https://tinypng.com/)
2. Upload each JPG file
3. Set quality to 85-90%
4. Resize to max 800x800 pixels
5. Download optimized versions

### Option 2: Photo Editing Software
1. Open images in Photoshop/GIMP/etc.
2. Resize to 800x800 pixels (maintain aspect ratio)
3. Export as JPG with quality 85%
4. Replace original files in `/public`

### Option 3: Install ImageMagick
```bash
# Windows (using Chocolatey)
choco install imagemagick.app

# Then run:
magick mogrify -resize 800x800 -quality 85 -strip public/*.JPG
```

## Expected Results
- Original: 2-5MB per image
- Optimized: 200-500KB per image
- Loading time improvement: 70-90%

## Current Image Sizes
- IMG_6842.JPG: 5.1MB
- IMG_2792.JPG: 4.1MB  
- IMG_4741.JPG: 3.9MB
- IMG_7360.JPG: 3.5MB
- IMG_0596.JPG: 3.4MB
- IMG_1581.JPG: 2.0MB
- IMG_7298 (2).JPG: 2.6MB
