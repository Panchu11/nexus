# 🎨 Quick Start: Custom Background for Cards

## 3 Simple Steps

### Step 1️⃣: Prepare Your Image
```
✓ File name: card-bg.jpg (or .png)
✓ Size: 600x400px (or larger)
✓ Format: JPG or PNG
✓ File size: Under 500KB
```

### Step 2️⃣: Place in Public Folder
```
sentient-team/
├── public/
│   ├── logo.jpg
│   ├── card-bg.jpg  ← Your image here
│   └── favicon.ico
```

### Step 3️⃣: Generate Cards!
```
1. Open http://localhost:3001
2. Click any team member's orb
3. Click "Card" tab
4. Click "🎨 Generate Card"
5. Your background appears! ✨
```

---

## 🎯 What You Get

### Automatic Features
✅ Background image loaded
✅ Dark overlay applied (60% opacity)
✅ Text readable on top
✅ Converted to PNG
✅ Ready to download/share

### Share to X
✅ Click "Share on X" button
✅ Opens X in new tab
✅ Pre-filled with:
   - Team member name
   - Appreciation message
   - Hashtags
   - App link

---

## 📸 Image Ideas

### Tech/Neon
- Dark grid pattern
- Neon lines (cyan/fuchsia)
- Abstract geometric
- Matches app aesthetic

### Team Photo
- Team gathering
- Office background
- Brand-themed
- Custom artwork

### Gradient
- Cyan to fuchsia
- Dark to light
- Custom colors
- Solid or gradient

---

## 🔧 Customize Overlay

**File:** `src/utils/cardGenerator.ts` (Line ~35)

```typescript
// Current: 60% opacity
overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';

// Lighter (50%):
overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

// Darker (70%):
overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
```

---

## ✨ All Refinements

✅ **Custom Background** - Place image in public/
✅ **Share to X** - New button on cards
✅ **Search Removed** - Cleaner UI
✅ **Consistent Styling** - All pages match
✅ **Better UX** - Improved buttons & layout

---

## 🚀 Ready to Go!

Your app is running at: **http://localhost:3001**

All pages working:
- ✅ Main page (all 8 members visible)
- ✅ Analytics dashboard
- ✅ Leaderboards
- ✅ Challenges
- ✅ Card generation
- ✅ Share to X

**Just add your background image and you're done!** 🎉

---

**Built with ❤️ by Panchu for Sentient AGI**

