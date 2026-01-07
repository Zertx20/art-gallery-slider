# Quick Image Compression for Windows

## Option 1: PowerShell Script (Fastest)
```powershell
# Run this in your project folder
Get-ChildItem "public\*.JPG" | ForEach-Object {
    $compressed = "public\$($_.BaseName)_small$($_.Extension)"
    # Using built-in Windows compression
    Add-Type -AssemblyName System.Drawing
    $img = [System.Drawing.Image]::FromFile($_.FullName)
    $img.Save($compressed, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $img.Dispose()
    Write-Host "Compressed $($_.Name) -> $compressed"
}
```

## Option 2: Online Tool (Easiest)
1. Go to https://squoosh.app/
2. Upload each JPG file from your `public` folder
3. Set quality to 75%
4. Resize to 800x800 pixels
5. Download and replace the original files

## Option 3: Install ImageMagick (Best Quality)
```powershell
# Install first
choco install imagemagick.app

# Then run this
Get-ChildItem "public\*.JPG" | ForEach-Object {
    magick convert $_.FullName -resize 800x800 -quality 75 -strip $_.FullName
    Write-Host "Compressed $($_.Name)"
}
```

## Expected Results:
- **Before**: 2-5MB per image
- **After**: 200-400KB per image  
- **Speed improvement**: 80-90% faster loading

## Your Current Images:
- IMG_6842.JPG: 5.1MB → ~300KB
- IMG_2792.JPG: 4.1MB → ~250KB
- IMG_4741.JPG: 3.9MB → ~240KB
- IMG_7360.JPG: 3.5MB → ~220KB
- IMG_0596.JPG: 3.4MB → ~210KB
- IMG_7298 (2).JPG: 2.6MB → ~160KB
- IMG_1581.JPG: 2.0MB → ~120KB

**Recommendation**: Use Option 2 (Squoosh) - it's free, no installation needed, and gives great results.
