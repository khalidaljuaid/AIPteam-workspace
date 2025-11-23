# 🚀 How to Deploy to Your GitHub (Free!)

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `team-workspace` (or any name you prefer)
3. Keep it **Public** (for free deployment)
4. **Do not** initialize with README (we already have one)
5. Click "Create repository"

## Step 2: Push to GitHub

Copy the commands from GitHub and run them in terminal:

```bash
cd /Users/khali./Documents/AIPweb/team-workspace

# This repo is already initialized, so just add remote and push:
git remote add origin https://github.com/YOUR-USERNAME/team-workspace.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

## Step 3: Deploy to Vercel (Free Forever!)

### Option A: Using Vercel Website
1. Go to https://vercel.com
2. Click "Sign up with GitHub"
3. Click "Import Project"
4. Select your `team-workspace` repository
5. Click "Deploy"

That's it! Your site will be live at: `https://team-workspace-xyz.vercel.app`

### Option B: Using Vercel CLI
```bash
npm install -g vercel
cd /Users/khali./Documents/AIPweb/team-workspace
vercel login
vercel
```

## Step 4: Configure Environment (Important!)

For production, you'll want to use PostgreSQL instead of SQLite:

### Free PostgreSQL Options:

**1. NeonDB (Recommended - Free tier):**
- Go to https://neon.tech
- Sign up free
- Create a new project
- Copy the connection string
- Add to Vercel environment variables:
  - `DATABASE_URL` = your Neon connection string

**2. Railway (Also free tier):**
- Go to https://railway.app
- Create PostgreSQL database
- Get connection string
- Add to Vercel

**3. Keep SQLite (Simple but not recommended for production):**
- Just deploy as-is
- Works but data resets on redeploy

### Update Schema for Production:

If using PostgreSQL, update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Changed from sqlite
}
```

Then in Vercel:
1. Settings → Environment Variables
2. Add `DATABASE_URL` = your PostgreSQL connection string
3. Redeploy

## Step 5: Run Migrations on Production

After deploying with PostgreSQL:

```bash
# Install Vercel CLI
npm install -g vercel

# Link to your project
vercel link

# Run migrations
vercel env pull .env.local
npx prisma migrate deploy
```

## Current Status

✅ **Code committed to Git**
✅ **Ready to push to GitHub**
✅ **Compatible with free hosting**
✅ **All dependencies included**

## What You Get For Free:

### Vercel Free Tier Includes:
- ✅ Unlimited deployments
- ✅ Custom domains
- ✅ Free SSL certificates
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ 100GB bandwidth/month
- ✅ Auto-scaling

### Free Database Options:
1. **NeonDB**: 0.5 GB storage, unlimited requests
2. **Railway**: 500 hours/month
3. **Supabase**: 500 MB database

## Access Your App

After deployment:
- Production URL: `https://your-app.vercel.app`
- Custom domain: Add in Vercel settings (free!)

## Making Updates

Every time you push to GitHub, Vercel automatically:
1. Pulls your code
2. Builds the app
3. Deploys updates
4. Makes it live

```bash
# Make changes to code
git add .
git commit -m "Add new feature"
git push

# That's it! Vercel auto-deploys
```

## 🔗 How to Share Your Website
Once deployed, Vercel gives you a permanent link.

1. **Go to your Vercel Dashboard**: https://vercel.com/dashboard
2. Click on your project (`team-workspace` or similar).
3. Under **"Domains"**, you will see your live link.
   - It usually looks like: `https://team-workspace-xyz.vercel.app`
4. **Copy this link** and send it to your team!

**Tip:** You can also buy a custom domain (like `aipioneers.com`) and connect it for free in Vercel Settings → Domains.

## First Time Setup After Deploy

1. Visit your live site
2. Register an admin account
3. Create teams
4. Add members
5. Import data if needed

## Troubleshooting

**Build fails?**
- Check Vercel logs
- Ensure all env variables are set
- Run `npm run build` locally first

**Database connection fails?**
- Verify `DATABASE_URL` is correct
- Run migrations: `npx prisma migrate deploy`
- Check database is accessible from Vercel

**CSS not loading?**
- Clear Vercel cache
- Rebuild deployment

## Cost Breakdown

- GitHub: **$0/month** (public repo)
- Vercel: **$0/month** (free tier)
- NeonDB: **$0/month** (free tier)
- Custom domain: **~$10/year** (optional, from Google Domains/Namecheap)

**Total: FREE! 🎉**

## Next Steps

1. Push code to your GitHub
2. Deploy to Vercel
3. Set up production database
4. Add your team members
5. Customize branding
6. Import your Google Sheets data

---

**Your platform is ready! Time to get your 70 team members onboard! 🚀**
