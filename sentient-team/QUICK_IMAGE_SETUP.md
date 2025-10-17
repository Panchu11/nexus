# 🖼️ Quick Image Setup - Copy & Paste Guide

## 📍 Where to Place Files

### Logo Location
```
sentient-team/public/logo.png
```
**Appears:** Top of hero section, above the title

### Team Photos Location
```
sentient-team/public/team/sandeep.jpg
sentient-team/public/team/himanshu.jpg
sentient-team/public/team/abhishek.jpg
sentient-team/public/team/vivek.jpg
sentient-team/public/team/oleg.jpg
sentient-team/public/team/sachi.jpg
sentient-team/public/team/sewoong.jpg
sentient-team/public/team/yura.jpg
```
**Appears:** Inside circular orbs on the team section

---

## 📋 Team Member Image Names (Copy Exactly)

| # | Name | Filename | X Handle |
|---|------|----------|----------|
| 1 | Sandeep Nailwal | `sandeep.jpg` | @sandeepnailwal |
| 2 | Himanshu Tyagi | `himanshu.jpg` | @hstyagi |
| 3 | Abhishek Saxena | `abhishek.jpg` | @abhishek095 |
| 4 | Vivek Kolli | `vivek.jpg` | @vivekkolli |
| 5 | Oleg Golev | `oleg.jpg` | @oleg_golev |
| 6 | Sachi | `sachi.jpg` | @0xsachi |
| 7 | Sewoong Oh | `sewoong.jpg` | @sewoong79 |
| 8 | Yura | `yura.jpg` | @namyura_ |

---

## 🎯 Image Specifications

### Logo
- **Filename:** `logo.png` (or `.svg`)
- **Size:** 500x500px minimum
- **Format:** PNG or SVG
- **Background:** Transparent recommended
- **Color:** Light colors work best

### Team Photos
- **Filename:** Exactly as shown in table above
- **Size:** 500x500px minimum
- **Format:** JPG or PNG
- **Aspect Ratio:** Square (1:1)
- **Quality:** High quality, clear face visible

---

## 📁 Folder Structure

After adding all images, your folder should look like:

```
sentient-team/
└── public/
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

---

## ✅ Step-by-Step

1. **Create folder** (if needed):
   - `sentient-team/public/team/`

2. **Add logo**:
   - Copy your Sentient logo to `sentient-team/public/logo.png`

3. **Add team photos**:
   - Copy 8 team member photos to `sentient-team/public/team/`
   - Name them exactly as shown in the table above

4. **Refresh browser**:
   - Go to http://localhost:3000
   - Press Ctrl+Shift+R (hard refresh)
   - Logo and photos should appear!

---

## 🎨 What You'll See

### Logo
- Appears at the top of the page
- Above "Sentient Team Appreciation Board" title
- Size: 64px on mobile, 80px on desktop

### Team Photos
- 8 circular orbs with team member photos
- Arranged in grid: 1 column (mobile), 2 columns (tablet), 4 columns (desktop)
- Each orb has:
  - Team member photo
  - Name below
  - Designation
  - Appreciation count
  - Progress percentage
  - X profile link

---

## ⚠️ Troubleshooting

### Logo Not Showing?
- ✅ Check filename is `logo.png` or `logo.svg`
- ✅ Check it's in `public/` folder (not `public/team/`)
- ✅ Hard refresh: Ctrl+Shift+R

### Team Photos Not Showing?
- ✅ Check filenames match exactly (case-sensitive)
- ✅ Check files are in `public/team/` folder
- ✅ Check all 8 files are present
- ✅ Hard refresh: Ctrl+Shift+R

### Fallback Avatars Showing?
- This means images failed to load
- Check file paths and names
- Open browser console (F12) for errors

---

## 🔄 Update Images Later

To change any image:
1. Replace the file in `public/` or `public/team/`
2. Keep the same filename
3. Hard refresh browser (Ctrl+Shift+R)
4. New image appears

---

## 📝 File Size Tips

Optimize images before uploading:
- Use JPG for photos (smaller than PNG)
- Compress with: TinyPNG.com, ImageOptim, or FileOptimizer
- Recommended: < 500KB per image

---

## ✨ Done!

Once all images are in place:
- ✅ Logo displays at top
- ✅ All 8 team photos in orbs
- ✅ Beautiful neon aesthetic
- ✅ Fully functional appreciation system

Enjoy! 🚀

