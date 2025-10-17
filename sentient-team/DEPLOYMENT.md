# 🚀 Deployment Guide - Sentient Team Appreciation Board

## Quick Deploy to Vercel (Recommended)

### Option 1: Using Vercel CLI (Fastest)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Set project name: sentient-team
# - Framework: Next.js
# - Root directory: ./
# - Build command: npm run build
# - Output directory: .next
```

Your site will be live at `https://sentient-team.vercel.app` (or custom domain)

### Option 2: GitHub + Vercel Dashboard (Recommended for Teams)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit: Sentient Team Appreciation Board"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sentient-team.git
git push -u origin main
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

3. **Custom Domain (Optional)**
   - In Vercel dashboard → Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

### Option 3: Manual Deployment

```bash
# Build for production
npm run build

# Test production build locally
npm start

# Deploy the .next folder to your hosting
# (Netlify, AWS, Google Cloud, etc.)
```

## Environment Setup

### Vercel Environment Variables (Optional)

If you add backend features later:

1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add variables (none needed for current version)
3. Redeploy

## Pre-Deployment Checklist

- [ ] All team member avatars added to `public/team/`
- [ ] Team data in `src/data/team.ts` is correct
- [ ] X profile links are valid
- [ ] Tested locally: `npm run dev`
- [ ] Build succeeds: `npm run build`
- [ ] No console errors in DevTools
- [ ] Responsive design tested on mobile
- [ ] All animations working smoothly

## Post-Deployment

### Verify Deployment

1. Visit your deployed URL
2. Check all orbs load correctly
3. Test clicking an orb → modal opens
4. Submit a test appreciation
5. Verify data persists on page refresh
6. Test on mobile device

### Monitor Performance

- Vercel Analytics (free tier available)
- Check Core Web Vitals
- Monitor build times

### Update Content

To update team members or colors:

1. Edit `src/data/team.ts`
2. Commit and push to GitHub
3. Vercel auto-deploys on push
4. Changes live in ~1 minute

## Troubleshooting Deployment

### Build Fails

```bash
# Check for errors locally
npm run build

# Common issues:
# - Missing dependencies: npm install
# - TypeScript errors: npm run lint
# - Port already in use: kill process on port 3000
```

### Images Not Loading

- Verify images in `public/team/` folder
- Check file names match exactly
- Ensure images are < 5MB
- Try PNG format if JPG fails

### Slow Performance

- Optimize images (use TinyPNG)
- Enable Vercel Analytics
- Check for large dependencies
- Use `npm run build --analyze`

### Data Not Persisting

- Check localStorage is enabled
- Not in private/incognito mode
- Browser hasn't cleared cache
- Check browser console for errors

## Scaling & Optimization

### For High Traffic

1. **Enable Caching**
   - Vercel handles this automatically
   - Static assets cached globally

2. **Optimize Images**
   - Use Next.js Image component (future enhancement)
   - Compress avatars to < 100KB each

3. **Monitor Usage**
   - Vercel free tier: 100GB bandwidth/month
   - Sufficient for most use cases

### Cost Estimation

- **Vercel Free Tier**: $0/month
  - Unlimited deployments
  - 100GB bandwidth
  - Perfect for this project

- **Vercel Pro**: $20/month (if needed)
  - Priority support
  - Advanced analytics
  - Team collaboration

## Rollback

If something goes wrong:

```bash
# Vercel Dashboard → Deployments
# Click on previous deployment
# Click "Redeploy"
```

## Custom Domain Setup

### Using Vercel Domains

1. Vercel Dashboard → Settings → Domains
2. Add domain
3. Update DNS at your registrar
4. Wait 24-48 hours for propagation

### Using External Domain

1. Point DNS to Vercel nameservers:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
   - `ns3.vercel-dns.com`
   - `ns4.vercel-dns.com`

2. Or add CNAME record:
   - `cname.vercel-dns.com`

## Monitoring & Maintenance

### Weekly Checks

- [ ] Site loads correctly
- [ ] No console errors
- [ ] Animations smooth
- [ ] Mobile responsive

### Monthly Checks

- [ ] Review Vercel analytics
- [ ] Check for dependency updates
- [ ] Test all features
- [ ] Backup data (export from localStorage)

## Backup & Recovery

### Export Data

```javascript
// Run in browser console on deployed site
const data = {};
Object.keys(localStorage).forEach(key => {
  if (key.startsWith('sentient_team_')) {
    data[key] = JSON.parse(localStorage.getItem(key));
  }
});
console.log(JSON.stringify(data, null, 2));
// Copy output and save to file
```

### Restore Data

```javascript
// Run in browser console
const data = { /* paste exported data */ };
Object.entries(data).forEach(([key, value]) => {
  localStorage.setItem(key, JSON.stringify(value));
});
```

## Support & Help

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **GitHub Issues**: Create issue in your repo

---

**Your Sentient Team Appreciation Board is now live! 🎉**

Share the link with your community and start collecting appreciations!

