# 🎯 Sentient Team Appreciation Board - Complete Guide

## 🚀 Quick Start

### 1. Installation
```bash
cd sentient-team
npm install
npm run dev
```

Visit `http://localhost:3000` - you should see the beautiful appreciation board!

### 2. First Time Setup
- No configuration needed!
- All data is stored locally in your browser
- Team members are pre-configured
- Just add team avatars (optional)

## 📸 Adding Team Member Avatars

### Step 1: Prepare Images
- Size: 500x500px (square)
- Format: JPG or PNG
- Quality: High resolution for best appearance

### Step 2: Place in Public Folder
```
public/
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

### Step 3: Verify
- Refresh the page
- Images should appear in the orbs
- If image fails to load, fallback gradient with initials appears

## 🎨 Customizing the Experience

### Change Team Member Colors

Edit `src/data/team.ts`:

```typescript
{
  id: "sandeep",
  name: "Sandeep Nailwal",
  designation: "Co-founder, Sentient",
  x: "https://x.com/sandeepnailwal",
  avatar: "/team/sandeep.jpg",
  color: "from-violet-500 to-fuchsia-500",  // ← Change this
}
```

Available Tailwind gradients:
- `from-cyan-400 to-blue-500`
- `from-violet-500 to-fuchsia-500`
- `from-pink-500 to-rose-500`
- `from-orange-400 to-red-500`
- `from-green-400 to-emerald-500`
- `from-yellow-400 to-amber-500`
- `from-indigo-500 to-purple-500`
- `from-teal-400 to-cyan-500`

### Modify Hero Section Text

Edit `src/app/page.tsx`:

```typescript
<span className="text-sm font-medium text-cyan-300">
  Meet the Minds Behind Sentient AGI  {/* ← Change this */}
</span>

<span className="bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
  Sentient Team  {/* ← Change this */}
</span>
```

### Adjust Progress Bar Threshold

Edit `src/utils/storage.ts`:

```typescript
getProgressPercentage: (memberId: string): number => {
  const count = storage.getAppreciationCount(memberId);
  return Math.min((count / 10) * 100, 100);  // ← Change 10 to different number
  // 10 = 100% at 10 comments
  // 5 = 100% at 5 comments
  // 20 = 100% at 20 comments
}
```

## 💾 Data Management

### View Stored Data

Open browser DevTools (F12) → Application → Local Storage:
- Keys start with `sentient_team_`
- Each key contains JSON array of comments
- Example: `sentient_team_sandeep`

### Export Data

```javascript
// Run in browser console
const data = {};
Object.keys(localStorage).forEach(key => {
  if (key.startsWith('sentient_team_')) {
    data[key] = JSON.parse(localStorage.getItem(key));
  }
});
console.log(JSON.stringify(data, null, 2));
```

### Clear All Data

```javascript
// Run in browser console
Object.keys(localStorage).forEach(key => {
  if (key.startsWith('sentient_team_')) {
    localStorage.removeItem(key);
  }
});
```

## 🎬 Animation Customization

### Adjust Orb Float Speed

Edit `src/components/TeamOrb.tsx`:

```typescript
const floatingVariants = {
  animate: {
    y: [0, -30, 0],
    x: [0, 15, 0],
    transition: {
      duration: 6 + index * 0.5,  // ← Change 6 for base speed
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
```

### Adjust Particle Count

Edit `src/components/BackgroundParticles.tsx`:

```typescript
// Create particles
for (let i = 0; i < 50; i++) {  // ← Change 50 for more/fewer particles
  particles.push({
    // ...
  });
}
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

```bash
# Option 1: Using Vercel CLI
npm i -g vercel
vercel

# Option 2: Connect GitHub repo to Vercel dashboard
# 1. Push code to GitHub
# 2. Go to vercel.com
# 3. Import project
# 4. Deploy!
```

### Deploy to Other Platforms

```bash
# Build for production
npm run build

# Start production server
npm start
```

Then deploy the `.next` folder to your hosting platform.

## 🔍 Troubleshooting

### Images Not Loading
- Check file names match exactly (case-sensitive)
- Verify images are in `public/team/` folder
- Try refreshing the page
- Check browser console for errors

### Animations Not Smooth
- Update to latest Chrome/Firefox
- Disable browser extensions
- Check GPU acceleration is enabled
- Try different browser

### Data Not Persisting
- Check localStorage is enabled
- Not in private/incognito mode
- Browser hasn't cleared cache
- Check browser console for errors

### Modal Not Opening
- Check browser console for errors
- Verify JavaScript is enabled
- Try different browser
- Clear browser cache

## 📱 Mobile Optimization

The site is fully responsive:
- **Mobile**: Single column grid, touch-friendly buttons
- **Tablet**: 2-column grid
- **Desktop**: 4-column grid

Test on mobile:
```bash
# Get your local IP
ipconfig getifaddr en0  # macOS
hostname -I            # Linux
ipconfig               # Windows

# Access from mobile on same network
http://YOUR_IP:3000
```

## 🔐 Privacy & Security

- ✅ No data sent to servers
- ✅ No tracking or analytics
- ✅ No cookies
- ✅ No external API calls
- ✅ GDPR compliant
- ✅ Data only in user's browser

## 📚 File Reference

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Main page component |
| `src/components/TeamOrb.tsx` | Individual orb component |
| `src/components/OrbModal.tsx` | Appreciation modal |
| `src/components/BackgroundParticles.tsx` | Animated background |
| `src/data/team.ts` | Team members data |
| `src/utils/storage.ts` | localStorage utilities |
| `src/app/globals.css` | Global styles |

## 🆘 Need Help?

1. Check browser console (F12) for errors
2. Review code comments in source files
3. Check this guide for common issues
4. Verify all dependencies are installed

## 🎉 You're All Set!

Your Sentient Team Appreciation Board is ready to go! 🚀

---

**Built with ❤️ for Sentient AGI**

