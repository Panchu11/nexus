# 🔧 Phase 1 Technical Specifications

## Feature 1: Share to X Button

### UI/UX
```
Location: OrbModal header (next to close button)
Icon: Twitter/X icon from lucide-react
Text: "Share"
Hover: Highlight effect
```

### Functionality
```typescript
// Pre-fill text format
"I appreciate [Member Name] for: [Appreciation Message]"
"Check out the Sentient Team Appreciation Board!"
"[Link to board]"

// URL format
https://x.com/intent/tweet?text=[encoded_text]&url=[board_url]
```

### Database
```sql
ALTER TABLE comments ADD COLUMN share_count INTEGER DEFAULT 0;
ALTER TABLE comments ADD COLUMN is_shared_on_x BOOLEAN DEFAULT FALSE;
```

### Implementation
- Add share button in OrbModal.tsx
- Create share URL with text encoding
- Track share count in database
- Open X in new tab

---

## Feature 2: Badges System

### Badge Definitions
```typescript
interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockCondition: (data) => boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const BADGES = [
  {
    id: 'first_appreciator',
    name: 'First Appreciator',
    description: 'Be the first to appreciate someone',
    icon: '🌟',
    rarity: 'common'
  },
  {
    id: 'super_fan',
    name: 'Super Fan',
    description: '10+ appreciations for one person',
    icon: '🔥',
    rarity: 'rare'
  },
  {
    id: 'team_player',
    name: 'Team Player',
    description: 'Appreciate all 8 team members',
    icon: '👥',
    rarity: 'epic'
  },
  {
    id: 'wordsmith',
    name: 'Wordsmith',
    description: 'Write 100+ character appreciation',
    icon: '✍️',
    rarity: 'rare'
  },
  {
    id: 'consistent',
    name: 'Consistent',
    description: '7-day appreciation streak',
    icon: '📅',
    rarity: 'epic'
  },
  {
    id: 'viral',
    name: 'Viral',
    description: 'Share appreciation on X',
    icon: '🚀',
    rarity: 'rare'
  }
];
```

### Database
```sql
CREATE TABLE user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_identifier TEXT NOT NULL,
  badge_id TEXT NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_identifier, badge_id)
);
```

### Display
- Show badges on each comment
- Show badge progress in modal
- Display badge count on user profile

---

## Feature 3: Light Mode

### Theme Variables
```css
:root {
  --bg-primary: #000000;
  --bg-secondary: #1a1a1a;
  --text-primary: #ffffff;
  --text-secondary: #a0a0a0;
  --border-color: #333333;
}

[data-theme="light"] {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --text-primary: #000000;
  --text-secondary: #666666;
  --border-color: #e0e0e0;
}
```

### Implementation
- Create ThemeContext.tsx
- Add toggle button in header
- Store preference in localStorage
- Apply theme on page load

### Files
```
src/context/ThemeContext.tsx
src/components/ThemeToggle.tsx
```

---

## Feature 4: Search Functionality

### Search Features
```typescript
interface SearchOptions {
  query: string;
  memberId?: string;
  dateRange?: { start: Date; end: Date };
  minLength?: number;
}

// Search in:
// - Comment message
// - Member name
// - X handle
// - Date range
```

### UI
```
Location: Top of page (sticky)
Input: Search bar with icon
Results: Real-time filtering
Highlight: Matching text highlighted
```

### Implementation
- Add SearchBar component
- Filter comments in real-time
- Highlight matching text
- Show result count

---

## Feature 5: Appreciation Cards

### Card Template
```
┌─────────────────────────────┐
│  Sentient Logo              │
├─────────────────────────────┤
│  "I appreciate [Member]"    │
│                             │
│  "[Appreciation Message]"   │
│                             │
│  - [X Handle]               │
│  [Date]                     │
├─────────────────────────────┤
│  sentient-team.vercel.app   │
└─────────────────────────────┘
```

### Implementation
- Use html2canvas to generate image
- Create card component
- Add download button
- Add share button

### Dependencies
```bash
npm install html2canvas
```

---

## Feature 6: Analytics Dashboard

### Charts
```
1. Total Appreciations (Line Chart)
   - X-axis: Date
   - Y-axis: Count
   - Show trend

2. Member Rankings (Bar Chart)
   - X-axis: Member name
   - Y-axis: Appreciation count
   - Top 8 members

3. Appreciation Distribution (Pie Chart)
   - Show % per member

4. Sentiment Analysis (Gauge)
   - Positive/Neutral/Negative

5. Word Cloud
   - Most common words in appreciations

6. Top Appreciators (Table)
   - User, Count, Badges
```

### Database Queries
```sql
-- Total appreciations by date
SELECT DATE(created_at), COUNT(*) 
FROM comments 
GROUP BY DATE(created_at)
ORDER BY DATE(created_at);

-- Appreciations by member
SELECT member_id, COUNT(*) 
FROM comments 
GROUP BY member_id 
ORDER BY COUNT(*) DESC;

-- Top appreciators
SELECT x_handle, COUNT(*) 
FROM comments 
GROUP BY x_handle 
ORDER BY COUNT(*) DESC 
LIMIT 10;
```

### Dependencies
```bash
npm install recharts
```

---

## Feature 7: Leaderboards

### Leaderboard Types
```
1. Most Appreciated Members
   - This week
   - This month
   - All time

2. Most Active Appreciators
   - This week
   - This month
   - All time

3. Longest Streak
   - Consecutive days appreciating

4. Viral Appreciations
   - Most shared on X
```

### Database Queries
```sql
-- Most appreciated this week
SELECT member_id, COUNT(*) as count
FROM comments
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY member_id
ORDER BY count DESC;

-- Most active appreciators
SELECT x_handle, COUNT(*) as count
FROM comments
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY x_handle
ORDER BY count DESC;
```

---

## Feature 8: Weekly Challenges

### Challenge Definitions
```typescript
interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: string;
  target: number;
  reward: string;
  checkCondition: (data) => boolean;
}

const CHALLENGES = [
  {
    id: 'appreciate_three',
    title: 'Appreciate 3 People',
    description: 'Appreciate 3 different team members',
    target: 3,
    reward: '🏆 Challenge Master'
  },
  {
    id: 'long_message',
    title: 'Wordsmith',
    description: 'Write 100+ character appreciation',
    target: 100,
    reward: '✍️ Wordsmith Badge'
  },
  {
    id: 'share_on_x',
    title: 'Go Viral',
    description: 'Share appreciation on X',
    target: 1,
    reward: '🚀 Viral Badge'
  },
  {
    id: 'appreciate_all',
    title: 'Team Player',
    description: 'Appreciate all 8 team members',
    target: 8,
    reward: '👥 Team Player Badge'
  }
];
```

### Database
```sql
CREATE TABLE challenge_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_identifier TEXT NOT NULL,
  challenge_id TEXT NOT NULL,
  progress INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  week_starting DATE NOT NULL
);
```

### Reset Logic
- Challenges reset every Monday
- Track progress per week
- Show completion status

---

## 📦 Dependencies to Install

```bash
npm install recharts html2canvas date-fns
```

**Versions:**
- recharts: ^2.10.0
- html2canvas: ^1.4.1
- date-fns: ^2.30.0

---

## 🗄️ Database Migration

```sql
-- Add columns to comments table
ALTER TABLE comments ADD COLUMN share_count INTEGER DEFAULT 0;
ALTER TABLE comments ADD COLUMN is_shared_on_x BOOLEAN DEFAULT FALSE;
ALTER TABLE comments ADD COLUMN character_count INTEGER;

-- Create badges table
CREATE TABLE user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_identifier TEXT NOT NULL,
  badge_id TEXT NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_identifier, badge_id)
);

-- Create challenge progress table
CREATE TABLE challenge_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_identifier TEXT NOT NULL,
  challenge_id TEXT NOT NULL,
  progress INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  week_starting DATE NOT NULL
);

-- Create indexes
CREATE INDEX idx_user_badges_user ON user_badges(user_identifier);
CREATE INDEX idx_challenge_progress_user ON challenge_progress(user_identifier);
CREATE INDEX idx_challenge_progress_week ON challenge_progress(week_starting);
```

---

## 🎯 Implementation Order

1. **Share to X** - Quickest, highest impact
2. **Badges** - Builds on comments
3. **Light Mode** - Easy UI enhancement
4. **Search** - Improves UX
5. **Appreciation Cards** - Fun feature
6. **Analytics** - Requires new page
7. **Leaderboards** - Requires new page
8. **Challenges** - Most complex

---

**Ready to start implementing? Let's begin with Share to X! 🚀**

