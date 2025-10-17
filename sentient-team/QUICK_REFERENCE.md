# 🚀 Quick Reference - Sentient Team Appreciation Board

## ⚡ Quick Start (2 minutes)

```bash
cd sentient-team
npm install
npm run dev
# Open http://localhost:3000
```

## 📁 Key Files

| File | What to Edit |
|------|-------------|
| `src/data/team.ts` | Team members, colors, X handles |
| `src/app/page.tsx` | Hero text, layout |
| `src/components/TeamOrb.tsx` | Orb animations, styling |
| `src/components/OrbModal.tsx` | Modal styling, form |
| `src/utils/storage.ts` | Progress threshold |
| `public/team/` | Team member avatars |

## 🎨 Common Customizations

### Change Team Member Color
```typescript
// In src/data/team.ts
color: "from-cyan-400 to-blue-500"  // Change this
```

### Change Hero Title
```typescript
// In src/app/page.tsx
<span className="...">Sentient Team</span>  // Change this
```

### Adjust Progress Threshold
```typescript
// In src/utils/storage.ts
return Math.min((count / 10) * 100, 100);  // Change 10
```

### Add Team Avatar
```
1. Save image as public/team/{name}.jpg
2. Image auto-loads in orb
3. Fallback gradient if image fails
```

## 🚀 Deploy to Vercel

```bash
npm i -g vercel
vercel
# Follow prompts
```

## 📊 Data Storage

### View Data
```javascript
// In browser console
localStorage.getItem('sentient_team_sandeep')
```

### Clear Data
```javascript
// In browser console
Object.keys(localStorage).forEach(key => {
  if (key.startsWith('sentient_team_')) {
    localStorage.removeItem(key);
  }
});
```

## 🎬 Animation Speeds

### Orb Float Speed
```typescript
// In src/components/TeamOrb.tsx
duration: 6 + index * 0.5  // Change 6 for base speed
```

### Particle Count
```typescript
// In src/components/BackgroundParticles.tsx
for (let i = 0; i < 50; i++) {  // Change 50
```

## 🔧 Available Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Check code
```

## 📱 Responsive Breakpoints

| Device | Columns | Breakpoint |
|--------|---------|-----------|
| Mobile | 1 | < 768px |
| Tablet | 2 | 768-1024px |
| Desktop | 4 | > 1024px |

## 🎨 Color Gradients

```
from-cyan-400 to-blue-500
from-violet-500 to-fuchsia-500
from-pink-500 to-rose-500
from-orange-400 to-red-500
from-green-400 to-emerald-500
from-yellow-400 to-amber-500
from-indigo-500 to-purple-500
from-teal-400 to-cyan-500
```

## 🔍 Troubleshooting

| Issue | Solution |
|-------|----------|
| Images not loading | Check `public/team/` folder |
| Animations stuttering | Update browser, disable extensions |
| Data not persisting | Check localStorage enabled |
| Modal not opening | Check browser console for errors |
| Build fails | Run `npm install` again |

## 📚 Documentation

| File | Purpose |
|------|---------|
| README.md | Overview & quick start |
| GUIDE.md | Complete user guide |
| DEPLOYMENT.md | Deployment instructions |
| ADVANCED.md | Advanced customization |
| PROJECT_SUMMARY.md | Project overview |
| IMPLEMENTATION_CHECKLIST.md | Completion status |
| QUICK_REFERENCE.md | This file |

## 🌐 Browser Support

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+
✅ Mobile browsers

## 💾 Data Structure

```typescript
// localStorage key: sentient_team_{memberId}
[
  {
    id: "timestamp-random",
    xHandle: "@username",
    message: "Great work!",
    timestamp: 1234567890
  }
]
```

## 🎯 Team Members

1. Sandeep Nailwal - Co-founder
2. Himanshu Tyagi - Co-founder
3. Abhishek Saxena - Head of Strategy & Growth
4. Vivek Kolli - Strategist & Integrator
5. Oleg Golev - Product Lead
6. Sachi - Miss Sentient
7. Sewoong Oh - Machine Learning Guru
8. Yura - BD Wizard

## 🔐 Privacy

✅ No data sent to servers
✅ No tracking
✅ No cookies
✅ No external APIs
✅ GDPR compliant

## 📞 Help

1. Check browser console (F12)
2. Review relevant documentation
3. Check code comments
4. Try different browser

## ✨ Features

✅ Interactive floating orbs
✅ Appreciation comments
✅ Progress tracking
✅ Neon aesthetic
✅ Responsive design
✅ No backend needed
✅ Zero external APIs
✅ Smooth animations

## 🎉 Status

**✅ PRODUCTION READY**

All features complete and tested.
Ready to deploy and share!

---

**Built with ❤️ for Sentient AGI**

