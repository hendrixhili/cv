# Deployment Guide

This guide covers multiple deployment options for your Hendrix Portfolio application.

## Free Deployment Options

### 1. Vercel (Recommended)

**Perfect for GitHub deployment with automatic CI/CD:**

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/hendrix-portfolio.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Connect your GitHub account
   - Import your repository
   - Configure environment variables:
     - `DATABASE_URL`: Your PostgreSQL connection string
     - `SESSION_SECRET`: A random secret key
   - Deploy automatically

3. **Database Options**:
   - **Vercel Postgres** (easiest): Built-in PostgreSQL database
   - **Supabase** (free): Create database at [supabase.com](https://supabase.com)
   - **Railway** (free tier): PostgreSQL hosting

### 2. Railway

**Great for full-stack applications:**

1. **Connect GitHub**: Link your repository at [railway.app](https://railway.app)
2. **Add Database**: Railway provides PostgreSQL automatically
3. **Set Environment Variables**: Railway will auto-configure most settings
4. **Deploy**: Automatic deployment from GitHub

### 3. Render

**Another solid free option:**

1. **Connect Repository**: At [render.com](https://render.com)
2. **Create Web Service**: Choose your GitHub repository
3. **Configure**:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
4. **Add Database**: Render provides free PostgreSQL
5. **Set Environment Variables**

## Database Setup

### Free PostgreSQL Options:

1. **Supabase** (Recommended):
   - Create account at [supabase.com](https://supabase.com)
   - Create new project
   - Get connection string from Settings > Database
   - Use in `DATABASE_URL` environment variable

2. **Railway**:
   - Automatically provides PostgreSQL when you deploy
   - Connection string available in dashboard

3. **Vercel Postgres**:
   - Available in Vercel dashboard
   - Integrates seamlessly with Vercel deployments

### Environment Variables Setup:

```bash
# Required
DATABASE_URL=postgresql://user:password@host:port/database
SESSION_SECRET=your-super-secret-key-here

# Optional
NODE_ENV=production
```

## Build Configuration

The project includes all necessary build scripts:

```json
{
  "scripts": {
    "build": "tsc && vite build",
    "start": "node dist/server/index.js",
    "dev": "NODE_ENV=development tsx server/index.ts"
  }
}
```

## Production Checklist

Before deploying:

- [ ] Set strong `SESSION_SECRET` (use random generator)
- [ ] Configure `DATABASE_URL` with your PostgreSQL connection
- [ ] Set `NODE_ENV=production`
- [ ] Test locally with `npm run build && npm start`
- [ ] Verify database schema is created: `npm run db:push`

## Custom Domain Setup

After deployment, you can add your custom domain:

1. **Vercel**: Add domain in project settings
2. **Railway**: Configure custom domain in dashboard
3. **Render**: Add custom domain in service settings

Configure DNS:
- Add CNAME record pointing to your deployment URL
- Or A record if using IP address

## SSL/HTTPS

All recommended platforms automatically provide SSL certificates:
- Vercel: Automatic SSL
- Railway: Automatic SSL
- Render: Automatic SSL

## Monitoring

Consider adding:
- **Error tracking**: Sentry
- **Analytics**: Google Analytics
- **Uptime monitoring**: UptimeRobot

## Support

If you encounter issues:
1. Check the deployment logs in your platform dashboard
2. Verify environment variables are set correctly
3. Test database connectivity
4. Check that all dependencies are installed

Common issues:
- Database connection timeout: Check DATABASE_URL format
- Session errors: Verify SESSION_SECRET is set
- Build failures: Check Node.js version compatibility