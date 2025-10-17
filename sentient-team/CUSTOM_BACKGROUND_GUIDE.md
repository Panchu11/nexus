# 🎨 Custom Background Image Guide for Appreciation Cards

## 📍 Where to Place Your Image

### Step 1: Prepare Your Image
- **File Name:** `card-bg.jpg` (or `.png`)
- **Location:** `public/` folder in your project root
- **Recommended Size:** 600x400px or larger
- **Format:** JPG or PNG
- **File Size:** Keep under 500KB for best performance

### Step 2: Add the Image to Your Project

```
sentient-team/
├── public/
│   ├── logo.jpg
│   ├── favicon.ico
│   └── card-bg.jpg  ← Place your image here
├── src/
├── package.json
└── ...
```

### Step 3: How It Works

The appreciation card generator automatically looks for `card-bg.jpg` in the public folder. When you generate a card:

1. The background image is loaded
2. A semi-transparent dark overlay (60% opacity) is applied for text readability
3. The appreciation text is displayed on top
4. The card is converted to an image using html2canvas

### Example File Structure

```
public/
├── card-bg.jpg          ← Your custom background
├── logo.jpg             ← Existing logo
└── favicon.ico          ← Existing favicon
```

---

## 🎯 How to Use Custom Background

### Option 1: Using a Neon/Tech Background
Perfect for the Sentient AGI theme:
- Dark tech patterns
- Neon colors (cyan, fuchsia, purple)
- Gradient backgrounds
- Abstract geometric designs

### Option 2: Using a Team Photo
- Team gathering photo
- Office background
- Brand-themed background
- Custom artwork

### Option 3: Using a Gradient
- Solid gradient from dark to light
- Neon gradient (cyan to fuchsia)
- Custom color gradient

---

## 🔧 Technical Details

### Card Generation Process

```typescript
// The card generator automatically:
1. Creates a 600x400px container
2. Sets background-image: url(/card-bg.jpg)
3. Applies background-size: cover
4. Applies background-position: center
5. Adds overlay: rgba(0, 0, 0, 0.6)
6. Renders text on top
7. Converts to PNG using html2canvas
```

### Overlay Opacity

The overlay opacity is set to **60%** (0.6) for optimal text readability. If you want to adjust this:

**File:** `src/utils/cardGenerator.ts`

```typescript
// Line ~35: Change the overlay opacity
overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'; // 0.6 = 60%
// Change to:
overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // 0.5 = 50% (lighter)
overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; // 0.7 = 70% (darker)
```

---

## 📸 Recommended Image Specifications

### Dimensions
- **Width:** 600px (minimum)
- **Height:** 400px (minimum)
- **Aspect Ratio:** 3:2 (600x400, 900x600, 1200x800)

### File Format
- **JPG:** Best for photos (smaller file size)
- **PNG:** Best for graphics (supports transparency)

### Color Scheme
- **Dark backgrounds:** Better for text readability
- **Neon accents:** Matches the app aesthetic
- **High contrast:** Ensures text is visible

### Example Backgrounds
1. **Tech Pattern:** Dark grid with neon lines
2. **Gradient:** Cyan to fuchsia gradient
3. **Abstract:** Geometric shapes in dark colors
4. **Photo:** Team photo with dark overlay
5. **Solid:** Dark color with subtle texture

---

## ✅ Testing Your Custom Background

### Step 1: Add Image
1. Save your image as `card-bg.jpg`
2. Place it in the `public/` folder
3. Restart the dev server (if needed)

### Step 2: Generate a Card
1. Open the app at `http://localhost:3001`
2. Click on any team member's orb
3. Click the "Card" tab
4. Click "🎨 Generate Card"
5. Your custom background should appear!

### Step 3: Download & Share
1. Click "Download" to save as PNG
2. Click "Share on X" to post on X with pre-filled text
3. Click "Share" to share via Web Share API

---

## 🚀 Share to X Feature

When you click "Share on X" on a card:

1. **Opens X in a new tab**
2. **Pre-fills the post with:**
   - Team member name
   - Appreciation message
   - Hashtags (#SentientAGI #Appreciation)
   - Link to the app

### Example X Post
```
I appreciate [Member Name] for: "[Message]"

🌟 Check out the Sentient Team Appreciation Board!

#SentientAGI #Appreciation
```

---

## 🎨 All Refinements Made

### ✅ Search Bar Removed
- Removed from main page
- All team members now always visible
- Cleaner UI

### ✅ Share to X on Cards
- New "Share on X" button
- Opens X in separate tab
- Pre-filled with appreciation text
- Cyan-colored button for consistency

### ✅ Custom Background Support
- Place image in `public/card-bg.jpg`
- Automatic dark overlay for readability
- Responsive and scalable

### ✅ All Pages Styled Consistently
- **Analytics Page:** Dark theme with particles
- **Leaderboard Page:** Dark theme with particles
- **Challenges Page:** Dark theme with particles
- All match main page aesthetic

### ✅ Enhanced UI/UX
- Better button layouts
- Improved spacing
- Consistent color scheme
- Smooth animations
- Better hover effects

---

## 📝 File Locations

### Key Files Modified
- `src/app/page.tsx` - Removed search bar
- `src/components/AppreciationCard.tsx` - Added Share to X
- `src/utils/cardGenerator.ts` - Added background support
- `src/app/analytics/page.tsx` - Updated styling
- `src/app/leaderboard/page.tsx` - Updated styling
- `src/app/challenges/page.tsx` - Updated styling

### Image Location
- `public/card-bg.jpg` - Your custom background (add this)

---

## 🎉 You're All Set!

Your Sentient Team Appreciation Board now has:
- ✅ Custom background support for cards
- ✅ Share to X functionality
- ✅ Consistent styling across all pages
- ✅ Refined UI/UX
- ✅ No search bar clutter

**Ready to deploy! 🚀**

---

**Built with ❤️ by Panchu for Sentient AGI**

