---
name: "image-compressor"
description: "Compresses PNG images using various optimization techniques. Invoke when user needs to compress PNG files, reduce file sizes, or optimize images for web use."
---

# Image Compressor

This skill provides comprehensive PNG image compression capabilities using modern optimization techniques.

## Features

- **PNG Compression**: Optimizes PNG files using various algorithms
- **Size Threshold**: Targets files larger than specified size (e.g., 100KB)
- **Quality Preservation**: Maintains visual quality while reducing file size
- **Batch Processing**: Handles multiple files and directories efficiently
- **Backup Creation**: Creates backups before compression operations

## Usage Scenarios

Invoke this skill when:
- User wants to compress PNG images larger than a specific size
- Need to optimize images for web performance
- Reducing file sizes for storage or bandwidth optimization
- Batch processing multiple image files

## Implementation Methods

### 1. Using ImageMagick (Recommended)
```bash
# Install ImageMagick first if not available
magick input.png -strip -quality 85 output.png
```

### 2. Using pngquant
```bash
pngquant --quality=65-80 input.png --output output.png
```

### 3. Using optipng
```bash
optipng -o7 input.png -out output.png
```

### 4. Using Python PIL/Pillow
```python
from PIL import Image
import os

def compress_png(input_path, output_path, quality=85):
    with Image.open(input_path) as img:
        img.save(output_path, 'PNG', optimize=True, quality=quality)
```

## Best Practices

- Always create backups before compression
- Test compression quality on sample images first
- Use appropriate quality settings for the use case
- Consider using multiple compression tools for best results
- Verify file integrity after compression