# 🌟 Sentient Team Appreciation Board

An interactive, visually rich web experience showcasing the @SentientAGI core team with dynamic animations, appreciation tracking, and local data persistence.

## ✨ Features

- **🎯 Interactive Floating Orbs**: Smooth Framer Motion animations with hover effects
- **💬 Appreciation Comments**: Submit and view appreciations for each team member
- **📊 Progress Tracking**: Visual progress bars that fill based on appreciation count
- **🎨 Neon Aesthetic**: Dark gradient background with cyan/magenta/violet color scheme
- **✅ No Backend Required**: All data stored locally in browser localStorage
- **📱 Fully Responsive**: Works seamlessly on mobile, tablet, and desktop
- **🚀 Zero External APIs**: No paid services or third-party authentication needed
- **⚡ Fast & Optimized**: Built with Next.js 15 and optimized for performance

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router) + React 19
- **Styling**: TailwindCSS + Custom CSS animations
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Storage**: Browser localStorage (no backend)
- **Deployment**: Vercel (free tier)

## 📦 Installation

```bash
# Clone or navigate to the project
cd sentient-team

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment to Vercel

```bash
# Build for production
npm run build

# Deploy to Vercel
npm run deploy
# or use Vercel CLI: vercel
```

## 📁 Project Structure

```
sentient-team/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main page with hero & team grid
│   │   ├── layout.tsx        # Root layout with metadata
│   │   └── globals.css       # Global styles & animations
│   ├── components/
│   │   ├── TeamOrb.tsx       # Individual team member orb
│   │   ├── OrbModal.tsx      # Appreciation modal
│   │   └── BackgroundParticles.tsx  # Animated background
│   ├── data/
│   │   └── team.ts           # Team members data
│   └── utils/
│       └── storage.ts        # localStorage utilities
├── public/
│   └── team/                 # Team member avatars (optional)
└── package.json
```

## 🎯 How It Works

### 1. **Team Orbs**
- Each team member is represented as a floating orb
- Orbs have smooth floating animations with staggered timing
- Hover effects scale the orb and increase glow intensity
- Click to open the appreciation modal

### 2. **Appreciation System**
- Users can submit appreciations with optional X handle
- Comments are stored in localStorage with timestamps
- Progress bar fills based on comment count (10 comments = 100%)
- All data persists across browser sessions

### 3. **Data Storage**
- Uses browser localStorage with key prefix `sentient_team_`
- Each team member has their own comment array
- No server-side storage needed
- Data is private to each user's browser

### 4. **Animations**
- Framer Motion for smooth orb movements
- Canvas-based particle background
- SVG progress rings with smooth transitions
- Staggered entrance animations

## 🎨 Customization

### Add/Edit Team Members

Edit `src/data/team.ts`:

```typescript
{
  id: "unique-id",
  name: "Full Name",
  designation: "Role at Sentient",
  x: "https://x.com/handle",
  avatar: "/team/filename.jpg",
  color: "from-cyan-400 to-blue-500",
}
```

### Add Team Avatars

Place images in `public/team/` folder:
- Recommended: 500x500px PNG or JPG
- Fallback: Gradient avatar with initials if image fails to load

### Customize Colors

Edit color gradients in `src/data/team.ts` using Tailwind classes:
- `from-cyan-400 to-blue-500`
- `from-violet-500 to-fuchsia-500`
- etc.

## 📊 Data Structure

### Comment Object
```typescript
interface Comment {
  id: string;           // Unique timestamp-based ID
  xHandle: string;      // User's X handle (or "Anonymous")
  message: string;      // Appreciation message
  timestamp: number;    // Unix timestamp
}
```

### Team Member Object
```typescript
interface TeamMember {
  id: string;           // Unique identifier
  name: string;         // Full name
  designation: string;  // Role/title
  x: string;           // X profile URL
  avatar: string;      // Avatar image path
  color: string;       // Tailwind gradient class
}
```

## 🔧 Available Scripts

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Notes

- All data is stored locally in the browser
- Clearing browser cache will delete all appreciations
- No user tracking or analytics
- No external API calls
- Fully GDPR compliant (no data collection)

## 🚀 Future Enhancements

- Export/import appreciation data
- Share appreciation links
- Leaderboard view
- Dark/light theme toggle
- Real-time sync across tabs
- Email notifications (optional)

## 📄 License

MIT License - Feel free to use and modify

## 🙏 Credits

Built with ❤️ for the Sentient AGI community

---

**Questions?** Check the code comments or open an issue!
