# Icon Optimization Guide

This guide explains how to create an optimized icon for HACS display.

## Issue

The current `heat-pump-flow.png` is 783KB and 1024x1024 pixels, which may:
- Be too large for HACS to display efficiently
- Have details that are hard to see at small sizes (24x24, 48x48)
- Not provide enough contrast in the HACS interface

## Solution

We've created `icon-optimized.svg` with improvements for small-size visibility:

### Key Improvements:
1. **Higher Contrast**: Darker background (#1a2332) makes elements stand out
2. **Bolder Strokes**: 5-12px strokes instead of thin 2-4px lines
3. **Glow Effects**: SVG filters add subtle glow to key elements
4. **Simpler Design**: Fewer fine details that disappear at small sizes
5. **Better Colors**: Vibrant gradients (hot: red/orange, cold: blue/cyan)

## Creating the Optimized Icon

### Option 1: Online Conversion (Easiest)

1. Go to https://cloudconvert.com/svg-to-png
2. Upload `icon-optimized.svg`
3. Set output size to **256x256** (HACS recommended size)
4. Set quality to **High**
5. Download the PNG
6. Replace `icon.png` in the repository root
7. Commit and push

### Option 2: Using ImageMagick (Command Line)

If you have ImageMagick installed:

```bash
# Create 256x256 version (recommended for HACS)
convert -background none -density 300 -resize 256x256 icon-optimized.svg icon.png

# Optional: Create higher resolution version
convert -background none -density 300 -resize 512x512 icon-optimized.svg icon-512.png

# Optimize PNG size
optipng -o7 icon.png
```

### Option 3: Using Inkscape

1. Open `icon-optimized.svg` in Inkscape
2. File → Export PNG Image
3. Set width/height to **256** pixels
4. Set DPI to **96**
5. Export as `icon.png`
6. Use a PNG optimizer like [TinyPNG](https://tinypng.com/) to compress

## Target Specifications

For optimal HACS display:

- **Size**: 256x256 px (or 512x512 for high-DPI)
- **Format**: PNG with transparency
- **File Size**: Under 100KB (preferably under 50KB)
- **Bit Depth**: 8-bit color (RGB)
- **Location**: Repository root as `icon.png`

## Verification

After replacing `icon.png`:

1. Check file size: `ls -lh icon.png` (should be < 100KB)
2. Check dimensions: `file icon.png` (should show 256x256)
3. Commit and push to GitHub
4. Wait a few minutes for HACS to sync
5. Check in HACS → Frontend → Heat Pump Flow Card

## Design Rationale

The optimized icon emphasizes:

- **Compressor/Fan** (left): Clear circular fan with bold spokes
- **Heat Pump Unit** (center): Dark box with colored indicator lights
- **House** (right): Simple house silhouette with warm window
- **Flow Lines**: Thick curved pipes showing hot (red) and cold (blue) water
- **COP Badge** (bottom): Green efficiency indicator
- **Glow Effects**: Make elements "pop" even at tiny sizes

## Testing at Different Sizes

To preview how it looks at various sizes:

```bash
# Create test versions
convert icon-optimized.svg -resize 24x24 test-24.png
convert icon-optimized.svg -resize 48x48 test-48.png
convert icon-optimized.svg -resize 96x96 test-96.png
convert icon-optimized.svg -resize 256x256 test-256.png
```

Open each test file to verify elements are visible.

## Troubleshooting

### Icon Not Showing in HACS

1. **Clear HACS cache**:
   - Go to HACS → 3-dot menu → Custom repositories
   - Remove and re-add the repository

2. **Verify file location**: Icon must be in repository root as `icon.png`

3. **Check file size**: HACS may ignore icons over 1MB

4. **Force refresh**:
   - In HACS, click the repository
   - Click "Redownload"
   - Wait 5-10 minutes

### Icon Looks Blurry

- Increase export DPI to 150 or 300
- Use vector-to-raster conversion instead of browser screenshot
- Ensure PNG is created at exact target size, not scaled after

### Icon Has White Background

- SVG should have `fill="#1a2332"` for background
- When converting, use `-background none` (ImageMagick)
- Or ensure transparency is preserved during conversion

## Future Improvements

Consider creating:
- **Animated GIF**: Show flow animation for HACS preview
- **Dark/Light Variants**: Different versions for different themes
- **Size Variants**: Provide 128x128, 256x256, 512x512 options
