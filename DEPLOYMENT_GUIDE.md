# 🚀 Deployment Guide - Connect to Your Own URL

This guide walks you through deploying your Family Newsletter application to your own domain.

---

## 🎯 Deployment Options

### Option 1: **Vercel** (Recommended - Easiest)
- Free hosting
- Automatic deployments
- Built-in CDN
- Perfect for Next.js

### Option 2: **Netlify** 
- Also free
- Git-based deployment
- Good alternative

### Option 3: **Traditional Hosting**
- VPS/Cloud server
- More control
- More complex setup

---

## 📋 Pre-Deployment Checklist

### ✅ Before You Start
1. **Domain Name** - Purchase from Namecheap, GoDaddy, etc.
2. **Git Repository** - Push code to GitHub/GitLab
3. **Environment Variables** - Prepare production values
4. **Database** - Set up production database
5. **Email Service** - Configure SendGrid for production

---

## 🚀 Option 1: Deploy to Vercel (15 minutes)

### Step 1: Prepare Your Code

1. **Push to GitHub**
```bash
cd family-newsletter
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/family-newsletter.git
git push -u origin main
```

2. **Update Environment Variables**
Create `.env.production`:
```bash
# Database (SQLite for simplicity, or use PostgreSQL)
DATABASE_URL="file:./prod.db"

# JWT Secret (generate a strong random key)
JWT_SECRET="your-super-secure-jwt-secret-key-2025"

# App URL (your domain)
NEXT_PUBLIC_APP_URL="https://yourdomain.com"

# SendGrid (production)
SENDGRID_API_KEY="SG.your-production-api-key"
SENDGRID_FROM_EMAIL="newsletter@yourdomain.com"
SENDGRID_FROM_NAME="Your Family Newsletter"

# Cron API Key (generate random)
CRON_API_KEY="your-secure-cron-api-key-2025"
```

### Step 2: Deploy to Vercel

1. **Go to Vercel**
   - Visit https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "New Project"
   - Import from GitHub
   - Select your repository

3. **Configure Environment Variables**
   - Add all variables from `.env.production`
   - Click "Deploy"

4. **Wait for Deployment**
   - Takes 2-3 minutes
   - You'll get a Vercel URL like `https://family-newsletter.vercel.app`

### Step 3: Connect Your Domain

1. **In Vercel Dashboard**
   - Go to your project settings
   - Click "Domains"
   - Add your domain: `yourdomain.com`

2. **Update DNS Records**
   - Go to your domain registrar
   - Add CNAME record:
     ```
     Host: @
     Value: cname.vercel-dns.com
     TTL: 1 hour
     ```

3. **Wait for DNS Propagation**
   - Takes 5-30 minutes
   - Check with: `dig yourdomain.com`

---

## 🌐 Option 2: Deploy to Netlify (20 minutes)

### Step 1: Prepare Build Settings

1. **Create `netlify.toml`**
```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "9"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

2. **Update Build Command**
In `package.json`:
```json
"scripts": {
  "build": "next build",
  "start": "next start",
  "dev": "next dev"
}
```

### Step 2: Deploy to Netlify

1. **Go to Netlify**
   - Visit https://netlify.com
   - Sign up with GitHub

2. **Import from Git**
   - Click "Import from Git"
   - Connect GitHub
   - Select repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Add environment variables

4. **Deploy**
   - Click "Deploy site"
   - Wait 3-5 minutes

### Step 3: Connect Custom Domain

1. **In Netlify Dashboard**
   - Go to Site settings > Domain management
   - Click "Add custom domain"
   - Enter your domain

2. **Update DNS**
   - Add CNAME or A records as provided by Netlify
   - Usually: `yourdomain.com` → `your-site.netlify.app`

---

## 🔧 Option 3: Traditional VPS/Cloud Hosting (45 minutes)

### Step 1: Set Up Server

**Recommended Providers:**
- DigitalOcean ($5/month)
- AWS EC2
- Google Cloud
- Linode

**Server Setup:**
```bash
# Ubuntu 20.04+ commands
sudo apt update && sudo apt upgrade -y
sudo apt install nodejs npm nginx -y

# Install PM2 for process management
sudo npm install -g pm2

# Create app directory
mkdir /var/www/family-newsletter
cd /var/www/family-newsletter
```

### Step 2: Deploy Application

1. **Copy Files to Server**
```bash
# From your local machine
scp -r family-newsletter/* root@your-server-ip:/var/www/family-newsletter/
```

2. **Install Dependencies**
```bash
cd /var/www/family-newsletter
npm install
npm run build
```

3. **Set Up Environment**
```bash
# Create production environment file
cp .env.example .env.production
nano .env.production  # Edit with production values
```

### Step 3: Configure Nginx

**Create Nginx config:**
```nginx
# /etc/nginx/sites-available/family-newsletter
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Enable site:**
```bash
sudo ln -s /etc/nginx/sites-available/family-newsletter /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 4: Set Up PM2

**Create PM2 config:**
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'family-newsletter',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

**Start with PM2:**
```bash
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

### Step 5: Set Up SSL (Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

---

## 🗄️ Production Database Setup

### Option 1: SQLite (Simple)
```bash
# Create production database
touch prod.db
# Update DATABASE_URL in .env.production
DATABASE_URL="file:./prod.db"
```

### Option 2: PostgreSQL (Recommended)
```bash
# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Create database
sudo -u postgres createdb family_newsletter
sudo -u postgres psql
# CREATE USER newsletter_user WITH PASSWORD 'your_password';
# GRANT ALL PRIVILEGES ON DATABASE family_newsletter TO newsletter_user;

# Update DATABASE_URL
DATABASE_URL="postgresql://newsletter_user:your_password@localhost:5432/family_newsletter"
```

### Run Database Migration
```bash
npm install
npx prisma generate
npx prisma migrate deploy
```

---

## 📧 Production Email Setup

### 1. SendGrid Production Setup
```bash
# In SendGrid dashboard
# 1. Verify your domain
# 2. Set up sender authentication
# 3. Get production API key
# 4. Update environment variables
```

### 2. Test Email Sending
```bash
# Create test user
curl -X POST http://yourdomain.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@yourdomain.com","password":"test123","name":"Test User"}'
```

---

## 🔒 Security Checklist

### Production Security
- [ ] Use HTTPS (SSL certificate)
- [ ] Set strong JWT secret
- [ ] Use production SendGrid API key
- [ ] Set secure cron API key
- [ ] Configure firewall
- [ ] Set up rate limiting
- [ ] Use environment variables for secrets
- [ ] Enable CORS properly
- [ ] Set secure headers

### Domain Security
- [ ] Enable DNSSEC
- [ ] Set up DMARC for email
- [ ] Configure SPF records
- [ ] Use secure passwords
- [ ] Enable 2FA where possible

---

## 🚀 Post-Deployment Steps

### 1. Create Super Admin
```bash
# SSH into your server
cd /var/www/family-newsletter
node make-super-admin.js admin@yourdomain.com SecurePassword123 "Admin User"
```

### 2. Set Up Cron Job (for notifications)
```bash
# Add to crontab
crontab -e
# Add line:
0 9 * * * curl -X POST https://yourdomain.com/api/notifications/check -H "Authorization: Bearer your-cron-api-key"
```

### 3. Test All Features
- [ ] Login as super admin
- [ ] Test password reset
- [ ] Test user impersonation
- [ ] Test email sending
- [ ] Test notifications
- [ ] Test multiple newsletters

---

## 🛠️ Troubleshooting

### Common Issues

**1. Build Fails**
```bash
# Clear cache
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

**2. Database Connection Issues**
```bash
# Check database
npx prisma db push
npx prisma migrate deploy
```

**3. Email Not Sending**
- Check SendGrid API key
- Verify sender email
- Check spam folder
- Review SendGrid dashboard

**4. SSL Certificate Issues**
```bash
# Renew certificate
sudo certbot renew --dry-run
```

---

## 📊 Monitoring & Maintenance

### Set Up Monitoring
- **Uptime monitoring**: UptimeRobot, Pingdom
- **Error tracking**: Sentry, LogRocket
- **Performance**: Google Analytics, GTmetrix

### Regular Maintenance
- Weekly: Check logs, update dependencies
- Monthly: Review security, backup database
- Quarterly: Performance review, feature updates

---

## 🎯 Next Steps After Deployment

### Immediate (Week 1)
1. ✅ Create your super admin account
2. ✅ Invite first family members
3. ✅ Create your first newsletter
4. ✅ Test all features end-to-end

### Short Term (Month 1)
1. 🔄 Set up monitoring
2. 📊 Add analytics
3. 🔍 SEO optimization
4. 💬 Set up support channels

### Long Term (Quarterly)
1. 📈 Performance optimization
2. 🚀 Feature enhancements
3. 🔒 Security updates
4. 📋 Regular maintenance

---

## 💡 Pro Tips

### Performance
- Use CDN for static assets
- Enable gzip compression
- Optimize images
- Use caching headers

### Security
- Keep dependencies updated
- Use security headers
- Monitor for vulnerabilities
- Regular security audits

### Scalability
- Use connection pooling
- Implement rate limiting
- Consider load balancing
- Plan for database scaling

---

## 🆘 Need Help?

**Documentation:**
- All guides in `/family-newsletter/` directory
- `IMPLEMENTATION_COMPLETE.md` - Feature overview
- `SUPER_ADMIN_GUIDE.md` - Admin usage
- `EMAIL_SETUP_GUIDE.md` - Email configuration

**Support Resources:**
- Application logs
- Browser console
- Network tab
- Database queries

---

## ✨ Summary

**Your Family Newsletter application is now ready for production deployment!**

Choose your deployment method:
- 🚀 **Vercel** - Easiest, recommended
- 🔧 **Netlify** - Good alternative
- 🖥️ **VPS** - Full control

**Estimated Time:**
- Vercel: 15 minutes
- Netlify: 20 minutes  
- VPS: 45 minutes

**Ready to bring your family together with beautiful newsletters!** 📧✨

---

*Last Updated: 2025-10-21*