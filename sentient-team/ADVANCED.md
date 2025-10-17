# 🔧 Advanced Customization & Features

## Custom Styling

### Change Primary Colors

Edit `src/app/globals.css`:

```css
/* Change neon accent colors */
:root {
  --accent-cyan: #00d9ff;
  --accent-magenta: #a200ff;
  --accent-pink: #ec4899;
}
```

### Modify Background Gradient

Edit `src/app/page.tsx`:

```typescript
{/* Gradient Overlay */}
<div className="fixed inset-0 bg-gradient-to-b from-violet-950/20 via-black to-black pointer-events-none" />
```

Change `from-violet-950/20` to:
- `from-blue-950/20` - Blue tint
- `from-purple-950/20` - Purple tint
- `from-indigo-950/20` - Indigo tint

### Custom Font

Edit `src/app/layout.tsx`:

```typescript
import { Poppins } from "next/font/google";

const poppins = Poppins({
  variable: "--font-custom",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

// Use in body className
```

## Advanced Animations

### Adjust Particle Physics

Edit `src/components/BackgroundParticles.tsx`:

```typescript
// Particle velocity (higher = faster)
vx: (Math.random() - 0.5) * 0.5,  // Change 0.5 to 1.0 for faster
vy: (Math.random() - 0.5) * 0.5,

// Particle size
radius: Math.random() * 2 + 1,  // Change for bigger/smaller

// Particle count
for (let i = 0; i < 50; i++) {  // Change 50 for more/fewer
```

### Custom Orb Animation

Edit `src/components/TeamOrb.tsx`:

```typescript
const floatingVariants = {
  animate: {
    y: [0, -30, 0],      // Vertical range
    x: [0, 15, 0],       // Horizontal range
    rotate: [0, 5, 0],   // Add rotation
    transition: {
      duration: 6 + index * 0.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
```

### Add Pulse Effect

```typescript
// In TeamOrb.tsx, add to motion.div
animate={{
  boxShadow: [
    "0 0 20px rgba(0, 217, 255, 0.3)",
    "0 0 40px rgba(162, 0, 255, 0.5)",
    "0 0 20px rgba(0, 217, 255, 0.3)",
  ],
}}
transition={{ duration: 2, repeat: Infinity }}
```

## Data Enhancements

### Add Reaction Types

Modify `src/utils/storage.ts`:

```typescript
export interface Comment {
  id: string;
  xHandle: string;
  message: string;
  timestamp: number;
  reaction?: "👍" | "❤️" | "🔥" | "🚀";  // Add this
}
```

### Add Timestamps Display

Edit `src/components/OrbModal.tsx`:

```typescript
<p className="text-xs text-gray-500 mt-2">
  {new Date(comment.timestamp).toLocaleString()}  // More detailed
</p>
```

### Add Comment Editing

```typescript
// In storage.ts
editComment: (memberId: string, commentId: string, newMessage: string) => {
  const comments = storage.getComments(memberId);
  const comment = comments.find(c => c.id === commentId);
  if (comment) {
    comment.message = newMessage;
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${memberId}`, JSON.stringify(comments));
  }
}
```

## UI Enhancements

### Add Dark/Light Theme Toggle

```typescript
// In page.tsx
const [isDark, setIsDark] = useState(true);

<button onClick={() => setIsDark(!isDark)}>
  {isDark ? "☀️" : "🌙"}
</button>
```

### Add Leaderboard View

Create `src/components/Leaderboard.tsx`:

```typescript
export default function Leaderboard() {
  const rankings = TEAM_MEMBERS.map(member => ({
    ...member,
    count: storage.getAppreciationCount(member.id),
  })).sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-2">
      {rankings.map((member, idx) => (
        <div key={member.id} className="flex justify-between">
          <span>{idx + 1}. {member.name}</span>
          <span>{member.count} appreciations</span>
        </div>
      ))}
    </div>
  );
}
```

### Add Search/Filter

```typescript
const [searchTerm, setSearchTerm] = useState("");

const filtered = TEAM_MEMBERS.filter(member =>
  member.name.toLowerCase().includes(searchTerm.toLowerCase())
);
```

## Performance Optimization

### Enable Image Optimization

Replace img tags with Next.js Image:

```typescript
import Image from "next/image";

<Image
  src={member.avatar}
  alt={member.name}
  width={128}
  height={128}
  className="w-full h-full object-cover"
/>
```

### Lazy Load Components

```typescript
import dynamic from "next/dynamic";

const OrbModal = dynamic(() => import("./OrbModal"), {
  loading: () => <div>Loading...</div>,
});
```

### Optimize Bundle Size

```bash
# Analyze bundle
npm run build --analyze

# Check what's taking space
npm install --save-dev @next/bundle-analyzer
```

## Backend Integration (Future)

### Add API Route

Create `src/app/api/comments/route.ts`:

```typescript
export async function POST(request: Request) {
  const { memberId, xHandle, message } = await request.json();
  
  // Save to database
  // Return response
  
  return Response.json({ success: true });
}
```

### Add Database

```bash
npm install @supabase/supabase-js
```

Then use Supabase for persistent storage.

## Analytics & Tracking

### Add Event Tracking

```typescript
// In components
const trackEvent = (event: string, data?: any) => {
  if (typeof window !== "undefined") {
    // Send to analytics service
    console.log(`Event: ${event}`, data);
  }
};

// Usage
onClick={() => trackEvent("orb_clicked", { memberId: member.id })}
```

### Add View Counter

```typescript
// In storage.ts
addView: (memberId: string) => {
  const key = `views_${memberId}`;
  const current = parseInt(localStorage.getItem(key) || "0");
  localStorage.setItem(key, (current + 1).toString());
}
```

## Accessibility Improvements

### Add ARIA Labels

```typescript
<button
  aria-label={`View appreciation for ${member.name}`}
  onClick={() => setIsOpen(true)}
>
  {/* content */}
</button>
```

### Add Keyboard Navigation

```typescript
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };
  window.addEventListener("keydown", handleKeyPress);
  return () => window.removeEventListener("keydown", handleKeyPress);
}, []);
```

## Testing

### Add Unit Tests

```bash
npm install --save-dev jest @testing-library/react
```

Create `__tests__/storage.test.ts`:

```typescript
import { storage } from "@/utils/storage";

describe("storage", () => {
  it("should add comment", () => {
    storage.addComment("test", "@user", "Great work!");
    const comments = storage.getComments("test");
    expect(comments).toHaveLength(1);
  });
});
```

### Run Tests

```bash
npm test
```

## SEO Optimization

### Add Meta Tags

Edit `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Sentient Team Appreciation Board",
  description: "Express your appreciation for the Sentient AGI team",
  keywords: ["Sentient", "AGI", "Team", "Appreciation"],
  openGraph: {
    title: "Sentient Team Appreciation Board",
    description: "Express your appreciation for the Sentient AGI team",
    type: "website",
    url: "https://sentient-team.vercel.app",
  },
};
```

### Add Sitemap

Create `public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://sentient-team.vercel.app</loc>
    <lastmod>2024-01-01</lastmod>
  </url>
</urlset>
```

---

**Ready to take your appreciation board to the next level? 🚀**

