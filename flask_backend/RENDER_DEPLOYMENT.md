# Deploying Flask Backend to Render

This guide provides step-by-step instructions for deploying the Bhashini Vocal Resume Flask backend to Render.

## Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Environment Variables**: Have all API keys and credentials ready

## Step-by-Step Deployment Guide

### Step 1: Prepare Your Repository

1. Ensure all deployment files are in your repository:
   - ✅ `flask_backend/render.yaml` - Render configuration
   - ✅ `flask_backend/build.sh` - Build script
   - ✅ `flask_backend/init_db.py` - Database initialization
   - ✅ `flask_backend/requirements.txt` - Python dependencies
   - ✅ `flask_backend/app.py` - Main application

2. Make the build script executable:
   ```bash
   chmod +x flask_backend/build.sh
   ```

3. Commit and push all changes to GitHub:
   ```bash
   git add .
   git commit -m "Add Render deployment configuration"
   git push origin main
   ```

### Step 2: Create a New Web Service on Render

1. **Log in to Render Dashboard**
   - Go to [dashboard.render.com](https://dashboard.render.com)

2. **Create New Web Service**
   - Click "New +" button in the top right
   - Select "Web Service"

3. **Connect Your Repository**
   - Choose "Connect a repository"
   - Authorize Render to access your GitHub account
   - Select your repository: `BhashiniVocalResume`

4. **Configure the Service**
   - **Name**: `bhashini-vocal-resume-backend` (or your preferred name)
   - **Region**: Choose closest to your users (e.g., Oregon, Singapore)
   - **Branch**: `main` (or your deployment branch)
   - **Root Directory**: `flask_backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `./build.sh`
   - **Start Command**: `gunicorn app:app`
   - **Plan**: Select "Free" (or paid plan for better performance)

### Step 3: Configure Environment Variables

In the Render dashboard, add the following environment variables:

#### Required Variables (from your .env file):

1. **DATABASE_URL**

2. **BHASHINI_USER_ID**

3. **BHASHINI_API_KEY**

4. **OPENROUTER_API_KEY**

5. **SERPAPI_KEY**

6. **GMAIL_USER**

7. **GMAIL_PASS**

#### Auto-Generated Variables:

8. **JWT_SECRET_KEY**
   - Let Render generate this automatically
   - Or set a strong random string

#### Pre-configured Variables:

9. **FLASK_ENV**: `production`
10. **FLASK_DEBUG**: `False`
11. **SMTP_HOST**: `smtp.gmail.com`
12. **SMTP_PORT**: `587`
13. **UPLOAD_FOLDER**: `/tmp/uploads`
14. **MAX_CONTENT_LENGTH**: `16777216`

15. **CORS_ORIGINS**
   ```
   https://bhashini-vocal-resume-t6jy.vercel.app,http://localhost:3000
   ```
   ⚠️ **Important**: Update this with your actual frontend URL after deployment

### Step 4: Add Persistent Disk (Optional but Recommended)

1. In the Render dashboard, go to your service settings
2. Scroll to "Disks" section
3. Click "Add Disk"
4. Configure:
   - **Name**: `uploads`
   - **Mount Path**: `/tmp/uploads`
   - **Size**: `1 GB` (Free tier allows up to 1GB)

### Step 5: Deploy

1. Click "Create Web Service" button
2. Render will automatically:
   - Clone your repository
   - Install system dependencies (FFmpeg)
   - Install Python dependencies
   - Initialize the database
   - Start your application

3. Monitor the deployment logs for any errors

### Step 6: Verify Deployment

1. **Check Service Status**
   - Wait for the deployment to complete (usually 5-10 minutes)
   - Status should show "Live" with a green indicator

2. **Get Your Backend URL**
   - Copy the URL from Render dashboard (e.g., `https://bhashini-vocal-resume-backend.onrender.com`)

3. **Test the API**
   - Open: `https://your-service-name.onrender.com/health`
   - You should see: `{"status": "healthy"}`

4. **Test Database Connection**
   - The logs should show: "Using database: postgresql://..."
   - No database errors should appear

### Step 7: Update Frontend Configuration

Update your Next.js frontend to use the new backend URL:

1. In your frontend `.env.local` or `.env.production`:
   ```
   NEXT_PUBLIC_API_URL=https://your-service-name.onrender.com
   ```

2. Redeploy your frontend (Vercel will auto-deploy if connected to GitHub)

### Step 8: Update CORS Origins

1. Go back to Render dashboard
2. Update the `CORS_ORIGINS` environment variable with your actual frontend URL:
   ```
   https://your-frontend-app.vercel.app,http://localhost:3000
   ```
3. Save and redeploy

## Troubleshooting

### Common Issues:

1. **Build Fails - FFmpeg Not Found**
   - Ensure `build.sh` includes: `apt-get install -y ffmpeg`
   - Check build logs for installation errors

2. **Database Connection Error**
   - Verify `DATABASE_URL` is correct
   - Ensure Neon database is active
   - Check if database allows connections from Render's IP

3. **Import Errors**
   - Verify all dependencies are in `requirements.txt`
   - Check Python version compatibility

4. **CORS Errors**
   - Update `CORS_ORIGINS` with correct frontend URL
   - Ensure no trailing slashes in URLs

5. **File Upload Issues**
   - Verify disk is mounted at `/tmp/uploads`
   - Check disk space usage in Render dashboard

6. **Service Crashes After Deployment**
   - Check logs for error messages
   - Verify all environment variables are set
   - Ensure `gunicorn` is in requirements.txt

### Viewing Logs:

1. Go to Render dashboard
2. Select your service
3. Click "Logs" tab
4. Filter by error level if needed

### Redeploying:

1. **Manual Deploy**: Click "Manual Deploy" → "Deploy latest commit"
2. **Auto Deploy**: Push changes to GitHub (if auto-deploy is enabled)

## Performance Optimization

### Free Tier Limitations:

- Service spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- 750 hours/month free (enough for one service)

### Upgrade Recommendations:

For production use, consider upgrading to:
- **Starter Plan** ($7/month): No spin-down, better performance
- **Standard Plan** ($25/month): More resources, faster response times

## Monitoring

### Health Checks:

Render automatically monitors your service. You can also:

1. Add custom health check endpoint in `app.py`:
   ```python
   @app.route('/health')
   def health():
       return jsonify({"status": "healthy", "timestamp": datetime.datetime.utcnow().isoformat()})
   ```

2. Set up external monitoring (e.g., UptimeRobot, Pingdom)

### Metrics:

- View CPU, Memory, and Network usage in Render dashboard
- Monitor response times and error rates
- Set up alerts for service downtime

## Security Best Practices

1. **Never commit sensitive data**
   - Use environment variables for all secrets
   - Add `.env` to `.gitignore`

2. **Rotate API Keys Regularly**
   - Update keys in Render dashboard
   - No code changes needed

3. **Enable HTTPS Only**
   - Render provides free SSL certificates
   - Set `JWT_COOKIE_SECURE=True` in production

4. **Limit CORS Origins**
   - Only allow your frontend domain
   - Remove `localhost` in production

## Backup and Recovery

### Database Backups:

1. Neon provides automatic backups
2. Export data regularly using:
   ```bash
   pg_dump $DATABASE_URL > backup.sql
   ```

### Code Backups:

- GitHub serves as your code backup
- Tag releases for easy rollback:
  ```bash
  git tag -a v1.0.0 -m "Production release"
  git push origin v1.0.0
  ```

## Support

- **Render Documentation**: [render.com/docs](https://render.com/docs)
- **Render Community**: [community.render.com](https://community.render.com)
- **GitHub Issues**: Report bugs in your repository

## Next Steps

1. ✅ Backend deployed on Render
2. ⬜ Update frontend with backend URL
3. ⬜ Test all API endpoints
4. ⬜ Set up monitoring and alerts
5. ⬜ Configure custom domain (optional)
6. ⬜ Enable auto-deploy from GitHub

---