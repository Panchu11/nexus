# 🚀 **NEXUS - VERCEL DEPLOYMENT GUIDE**

---

## 📋 **Prerequisites**

Before deploying to Vercel, you need:

1. ✅ GitHub account (already done!)
2. ✅ Vercel account (free at https://vercel.com)
3. ✅ Supabase project with credentials
4. ✅ Repository pushed to GitHub (already done!)

---

## 🔑 **Step 1: Your Supabase Credentials**

### Your Project Details:

- **Project ID:** `ksybvugqrvixjuzidegb`
- **Project URL:** `https://ksybvugqrvixjuzidegb.supabase.co`
- **Region:** Likely Singapore or closest to you

### Your Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://ksybvugqrvixjuzidegb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzeWJ2dWdxcnZpeGp1emlkZWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MzUyODksImV4cCI6MjA3NjIxMTI4OX0.-OgU98wJjzlwrRidgML8U3PQp4h9UAw_aToOOyB4ovA
```

### ⚠️ **IMPORTANT:**
- These are **PUBLIC** keys (safe to share)
- They only allow read/write to public data
- Never share your **SECRET** key
- Keep these credentials safe in Vercel

---

## 🌐 **Step 2: Deploy to Vercel**

### Option A: Using Vercel Dashboard (Easiest)

1. Go to https://vercel.com/dashboard
2. Click **Add New** → **Project**
3. Select **Import Git Repository**
4. Search for `nexus` repository
5. Click **Import**
6. Configure project:
   - **Project Name:** `nexus`
   - **Framework Preset:** Next.js
   - **Root Directory:** `sentient-team`
7. Click **Deploy**

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts
```

---

## 🔐 **Step 3: Add Environment Variables to Vercel**

### In Vercel Dashboard:

1. Go to https://vercel.com/dashboard
2. Click on your **nexus** project
3. Go to **Settings** → **Environment Variables**
4. Add these two variables:

**Variable 1:**
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://ksybvugqrvixjuzidegb.supabase.co
```

**Variable 2:**
```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzeWJ2dWdxcnZpeGp1emlkZWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MzUyODksImV4cCI6MjA3NjIxMTI4OX0.-OgU98wJjzlwrRidgML8U3PQp4h9UAw_aToOOyB4ovA
```

5. Click **Save**
6. Go to **Deployments** tab
7. Click the three dots on the latest deployment
8. Click **Redeploy**

### How to Redeploy:

1. Go to **Deployments** tab
2. Click the three dots on the latest deployment
3. Click **Redeploy**

---

## ✅ **Step 4: Verify Deployment**

1. Wait for deployment to complete (usually 2-3 minutes)
2. Click the deployment URL
3. Test these features:
   - ✅ Main page loads
   - ✅ Analytics page works
   - ✅ Leaderboard page works
   - ✅ Challenges page works
   - ✅ Theme toggle works
   - ✅ Can add appreciation comments
   - ✅ Can share to X

---

## 🎯 **Your Deployment URL**

After deployment, your app will be at:
```
https://nexus-[random-id].vercel.app
```

Or with a custom domain:
```
https://your-custom-domain.com
```

---

## 🔧 **Troubleshooting**

### Issue: "Cannot find module"
- **Solution:** Make sure `sentient-team` is set as Root Directory

### Issue: "Environment variables not found"
- **Solution:** Redeploy after adding environment variables

### Issue: "Database connection error"
- **Solution:** Check Supabase credentials are correct

### Issue: "Theme toggle not working"
- **Solution:** Clear browser cache and refresh

---

## 📊 **Supabase Database Setup**

### Create Comments Table:

```sql
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id TEXT NOT NULL,
  x_handle TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  is_shared_on_x BOOLEAN DEFAULT FALSE,
  share_count INTEGER DEFAULT 0
);

-- Create index for faster queries
CREATE INDEX idx_comments_member_id ON comments(member_id);
```

### Enable Row Level Security (RLS):

1. Go to Supabase Dashboard
2. Select your project
3. Go to **SQL Editor**
4. Run the SQL above
5. Go to **Authentication** → **Policies**
6. Enable RLS for `comments` table
7. Add policy: Allow all (for public access)

---

## 🚀 **Deployment Checklist**

- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Supabase credentials obtained
- [ ] Environment variables added to Vercel
- [ ] Deployment completed
- [ ] All pages tested
- [ ] Theme toggle tested
- [ ] Comments working
- [ ] Share to X working

---

## 📞 **Quick Reference**

### Vercel Dashboard
```
https://vercel.com/dashboard
```

### Your Repository
```
https://github.com/Panchu11/nexus
```

### Supabase Dashboard
```
https://supabase.com/dashboard
```

---

## 🎉 **You're Live!**

Your NEXUS app is now deployed and accessible to the world! 🌍

### Next Steps:
1. Share your deployment URL with your team
2. Monitor analytics in Vercel dashboard
3. Collect feedback from users
4. Plan Phase 2 features

---

**Built with ❤️ by Panchu for Sentient AGI**

**Welcome to NEXUS! 🌟**

