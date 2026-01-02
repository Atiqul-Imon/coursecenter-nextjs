# Deployment Guide

This guide covers deploying Course Centre to Vercel and other platforms.

## 🚀 Quick Start (Vercel)

### 1. Prepare Your Repository

```bash
# Ensure all files are committed
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure environment variables (see below)
5. Click "Deploy"

### 3. Environment Variables

Set these in Vercel project settings:

```env
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your-secure-random-secret-key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
NODE_ENV=production
```

### 4. Run Database Migrations

After first deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Pull environment variables
vercel env pull .env.local

# Run migrations
npx prisma migrate deploy
```

## 📦 Database Setup

### Option 1: Vercel Postgres

1. In Vercel dashboard, go to Storage
2. Create a Postgres database
3. Copy the connection string to `DATABASE_URL`

### Option 2: External PostgreSQL

Use providers like:
- **Supabase** (Recommended for free tier)
- **Neon** (Serverless PostgreSQL)
- **Railway** (Easy setup)
- **AWS RDS** (Enterprise)

## 🔐 Security Checklist

- [ ] `JWT_SECRET` is a strong random string (32+ characters)
- [ ] Database connection uses SSL
- [ ] Environment variables are set in Vercel (not in code)
- [ ] ImageKit credentials are secure
- [ ] Admin account created with strong password
- [ ] HTTPS enabled (automatic on Vercel)

## 🔄 Continuous Deployment

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request

## 📊 Monitoring

- Check build logs in Vercel dashboard
- Monitor database connections
- Set up error tracking (optional)
- Monitor API response times

## 🐛 Troubleshooting

### Build Fails

1. Check build logs in Vercel
2. Verify all dependencies in `package.json`
3. Ensure TypeScript compiles without errors
4. Check environment variables

### Database Connection Issues

1. Verify `DATABASE_URL` format
2. Check database allows external connections
3. Verify SSL requirements
4. Test connection locally first

### Image Upload Issues

1. Verify ImageKit credentials
2. Check ImageKit CORS settings
3. Verify `IMAGEKIT_URL_ENDPOINT` format
4. Test upload locally first

## 🔧 Maintenance

### Update Dependencies

```bash
npm update
npm run build  # Test locally first
git add package*.json
git commit -m "Update dependencies"
git push
```

### Database Migrations

```bash
# Create migration
npx prisma migrate dev --name migration_name

# Deploy to production
npx prisma migrate deploy
```

### Backup Database

Regular backups are essential:
- Use your database provider's backup feature
- Set up automated daily backups
- Test restore process regularly

## 📝 Post-Deployment Checklist

- [ ] Homepage loads correctly
- [ ] Admin panel accessible
- [ ] User registration works
- [ ] Login works
- [ ] Course creation works
- [ ] Image uploads work
- [ ] Database queries work
- [ ] API routes respond correctly
- [ ] Mobile responsive design works
- [ ] GDPR features work (cookie consent, etc.)

## 🆘 Support

For deployment issues:
1. Check Vercel build logs
2. Review environment variables
3. Test locally with production env vars
4. Check database connectivity
5. Review Next.js documentation

