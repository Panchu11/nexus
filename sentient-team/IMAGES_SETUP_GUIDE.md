# 📸 Images Setup Guide - Sentient Team Appreciation Board

## Quick Summary

| Item | Location | Filename | Size | Format |
|------|----------|----------|------|--------|
| **Logo** | `public/` | `logo.png` | 500x500px | PNG/SVG |
| **Team Photos** | `public/team/` | See table below | 500x500px | JPG/PNG |

---

## 🎯 Logo Setup

### Where to Place
```
sentient-team/
└── public/
    └── logo.png  ← Place your Sentient logo here
```

### Filename
- **Name:** `logo.png`
- **Alternative:** `logo.svg` (if you have SVG version)

### Specifications
- **Size:** 500x500px (minimum)
- **Format:** PNG or SVG (transparent background recommended)
- **Aspect Ratio:** Square (1:1)
- **Color:** Works best with light colors on dark background

### How It Appears
The logo will appear at the top of the hero section, above the title "Sentient Team Appreciation Board"

---

## 👥 Team Member Photos Setup

### Where to Place
```
sentient-team/
└── public/
    └── team/
        ├── sandeep.jpg
        ├── himanshu.jpg
        ├── abhishek.jpg
        ├── vivek.jpg
        ├── oleg.jpg
        ├── sachi.jpg
        ├── sewoong.jpg
        └── yura.jpg
```

### Team Member Image Names

| Team Member | Filename | X Handle |
|-------------|----------|----------|
| Sandeep Nailwal | `sandeep.jpg` | @sandeepnailwal |
| Himanshu Tyagi | `himanshu.jpg` | @hstyagi |
| Abhishek Saxena | `abhishek.jpg` | @abhishek095 |
| Vivek Kolli | `vivek.jpg` | @vivekkolli |
| Oleg Golev | `oleg.jpg` | @oleg_golev |
| Sachi | `sachi.jpg` | @0xsachi |
| Sewoong Oh | `sewoong.jpg` | @sewoong79 |
| Yura | `yura.jpg` | @namyura_ |

### Image Specifications
- **Size:** 500x500px (minimum)
- **Format:** JPG or PNG
- **Aspect Ratio:** Square (1:1)
- **Quality:** High quality, clear face visible
- **Background:** Can be any background (will be cropped to circle)

### How They Appear
- Each image displays in a circular orb
- Images are cropped to fit the circle
- If image fails to load, a gradient avatar with initials appears as fallback

---

## 📁 Step-by-Step Setup Instructions

### Step 1: Create the Team Folder
If `public/team/` folder doesn't exist, create it:

```bash
# Windows (PowerShell)
New-Item -ItemType Directory -Path "public/team" -Force

# Mac/Linux
mkdir -p public/team
```

### Step 2: Add Logo
1. Prepare your Sentient logo (500x500px, PNG or SVG)
2. Copy it to: `sentient-team/public/logo.png`
3. If using SVG: `sentient-team/public/logo.svg`

### Step 3: Add Team Photos
1. Prepare 8 team member photos (500x500px each, JPG or PNG)
2. Name them exactly as shown in the table above
3. Copy them to: `sentient-team/public/team/`

### Step 4: Verify
Check that your folder structure looks like this:
```
sentient-team/public/
├── logo.png                    ← Sentient logo
├── team/
│   ├── sandeep.jpg
│   ├── himanshu.jpg
│   ├── abhishek.jpg
│   ├── vivek.jpg
│   ├── oleg.jpg
│   ├── sachi.jpg
│   ├── sewoong.jpg
│   └── yura.jpg
└── (other files)
```

### Step 5: Refresh Browser
1. Save all files
2. Refresh your browser at `http://localhost:3000`
3. Logo and team photos should now appear!

---

## 🎨 Image Recommendations

### Logo
- **Best Format:** SVG (scalable, crisp)
- **Fallback:** PNG with transparent background
- **Color:** Light colors work best (white, cyan, magenta)
- **Style:** Should represent Sentient AGI brand

### Team Photos
- **Best Format:** JPG (smaller file size)
- **Fallback:** PNG (if transparency needed)
- **Composition:** Head shot, face clearly visible
- **Lighting:** Well-lit, professional quality
- **Background:** Any background (will be cropped)

---

## ⚠️ Troubleshooting

### Logo Not Showing
- ✅ Check filename is exactly `logo.png` or `logo.svg`
- ✅ Check file is in `public/` folder (not `public/team/`)
- ✅ Check file format is PNG or SVG
- ✅ Refresh browser (Ctrl+Shift+R for hard refresh)

### Team Photos Not Showing
- ✅ Check filenames match exactly (case-sensitive on Linux/Mac)
- ✅ Check files are in `public/team/` folder
- ✅ Check file format is JPG or PNG
- ✅ Check file size is reasonable (< 5MB each)
- ✅ Refresh browser (Ctrl+Shift+R for hard refresh)

### Fallback Avatars Showing
- This means images failed to load
- Check file paths and names
- Check browser console for errors (F12)
- Verify files exist in correct location

---

## 🔄 Changing Images Later

To update any image:
1. Replace the file in `public/` or `public/team/`
2. Keep the same filename
3. Refresh browser (Ctrl+Shift+R for hard refresh)
4. New image will appear

---

## 📝 File Size Tips

To optimize file sizes:
- Use JPG for photos (smaller than PNG)
- Compress images before uploading
- Recommended tools:
  - TinyPNG.com
  - ImageOptim (Mac)
  - FileOptimizer (Windows)

---

## ✅ Checklist

- [ ] Logo prepared (500x500px, PNG/SVG)
- [ ] Logo placed at `public/logo.png`
- [ ] Team folder created at `public/team/`
- [ ] All 8 team photos prepared (500x500px each)
- [ ] Team photos named correctly (see table above)
- [ ] Team photos placed in `public/team/`
- [ ] Browser refreshed
- [ ] Logo appears in hero section
- [ ] All team photos appear in orbs

---

## 🎉 Done!

Once all images are in place, your Sentient Team Appreciation Board will be complete with:
- ✅ Sentient logo at the top
- ✅ All 8 team member photos in circular orbs
- ✅ Beautiful neon aesthetic
- ✅ Fully functional appreciation system

Enjoy! 🚀

