# 🚀 Supabase Setup Guide - Global Comments Storage

## Why Supabase?

✅ **Free tier** - Perfect for this project
✅ **Real-time updates** - Comments appear instantly for everyone
✅ **PostgreSQL database** - Reliable and scalable
✅ **Easy to use** - Simple setup
✅ **No backend needed** - Managed service

---

## 📋 Step-by-Step Setup

### Step 1: Create Supabase Account

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub or email
4. Create a new organization (or use existing)

### Step 2: Create a New Project

1. Click "New Project"
2. **Project name:** `sentient-team`
3. **Database password:** Create a strong password (save it!)
4. **Region:** Choose closest to you
5. Click "Create new project"
6. Wait 2-3 minutes for project to initialize

### Step 3: Create the Comments Table

1. Go to **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Copy and paste this SQL:

```sql
-- Create comments table
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id TEXT NOT NULL,
  x_handle TEXT NOT NULL DEFAULT 'Anonymous',
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_comments_member_id ON comments(member_id);

-- Enable Row Level Security
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read comments
CREATE POLICY "Allow public read" ON comments
  FOR SELECT USING (true);

-- Allow anyone to insert comments
CREATE POLICY "Allow public insert" ON comments
  FOR INSERT WITH CHECK (true);
```

4. Click **"Run"** (or Ctrl+Enter)
5. You should see "Success" message

### Step 4: Get Your API Keys

1. Go to **Settings** (bottom left)
2. Click **"API"**
3. Copy these values:
   - **Project URL** (under "Project URL")
   - **anon public** key (under "Project API keys")

### Step 5: Add Environment Variables

1. Open `.env.local` in your project root:
   ```
   sentient-team/.env.local
   ```

2. Add these lines (replace with your actual values):
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. Save the file

### Step 6: Restart Dev Server

```bash
npm run dev
```

---

## ✅ Verification

1. Go to http://localhost:3000
2. Click on a team member's orb
3. Submit an appreciation comment
4. Check Supabase dashboard:
   - Go to **Table Editor**
   - Click **"comments"**
   - You should see your comment!

---

## 🔄 Real-Time Updates

Comments now:
- ✅ Appear instantly for everyone
- ✅ Update in real-time across all browsers
- ✅ Persist permanently in database
- ✅ Show globally on Vercel deployment

---

## 📊 Database Schema

```
comments table:
├── id (UUID) - Unique identifier
├── member_id (TEXT) - Team member ID
├── x_handle (TEXT) - X/Twitter handle
├── message (TEXT) - Comment text
└── created_at (TIMESTAMP) - When comment was created
```

---

## 🔐 Security Notes

✅ **Row Level Security (RLS)** enabled
✅ **Public read** - Anyone can view comments
✅ **Public insert** - Anyone can add comments
✅ **No authentication needed** - Perfect for public board

---

## 🚀 Deploy to Vercel

When deploying to Vercel:

1. Go to Vercel project settings
2. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy!

Comments will work globally on Vercel!

---

## 🆘 Troubleshooting

### Comments not saving?
- ✅ Check `.env.local` has correct values
- ✅ Verify Supabase project is active
- ✅ Check browser console (F12) for errors
- ✅ Restart dev server: `npm run dev`

### Can't see comments in Supabase?
- ✅ Go to Table Editor → comments
- ✅ Check if table exists
- ✅ Verify RLS policies are enabled
- ✅ Check SQL query ran successfully

### Getting CORS errors?
- ✅ This is normal - Supabase handles it
- ✅ Check browser console for actual error
- ✅ Verify API keys are correct

---

## 📝 Example Comment Data

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "member_id": "sandeep",
  "x_handle": "@yourhandle",
  "message": "Amazing work on the project!",
  "created_at": "2024-10-17T10:30:00Z"
}
```

---

## 🎉 Done!

Your Sentient Team Appreciation Board now has:
- ✅ Global comment storage
- ✅ Real-time updates
- ✅ Permanent data persistence
- ✅ Ready for Vercel deployment

Enjoy! 🚀

