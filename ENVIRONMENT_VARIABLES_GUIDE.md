# Environment Variables Setup Guide

## Required Environment Variables for Production

### 1. DATABASE_URL
**What it is:** The connection string to your production database
**Format:** `file:./dev.db` for SQLite (simplest) or PostgreSQL/MySQL connection string
**How to get it:** 
- For SQLite: `file:./prod.db` (creates a new database file)
- For PostgreSQL: `postgresql://username:password@host:port/database`
- For MySQL: `mysql://username:password@host:port/database`

**Example for SQLite (recommended for production):**
```
DATABASE_URL=file:./prod.db
```

### 2. JWT_SECRET
**What it is:** A secret key used to sign JWT tokens for authentication
**Format:** Any random string of at least 32 characters
**How to get it:** Generate a random string using:
```bash
openssl rand -base64 32
```
**Example:**
```
JWT_SECRET=your-super-secret-jwt-key-here-at-least-32-characters-long
```

### 3. NEXTAUTH_SECRET
**What it is:** A secret key used by NextAuth for session encryption
**Format:** Any random string of at least 32 characters
**How to get it:** Generate another random string:
```bash
openssl rand -base64 32
```
**Example:**
```
NEXTAUTH_SECRET=another-super-secret-key-for-nextauth-encryption
```

### 4. NEXTAUTH_URL
**What it is:** The base URL of your deployed application
**Format:** Your domain with https://
**Example:**
```
NEXTAUTH_URL=https://myfamilynewsletter.com
```

### 5. SENDGRID_API_KEY
**What it is:** API key for SendGrid email service
**Format:** Starts with "SG." followed by random characters
**How to get it:**
1. Go to https://sendgrid.com
2. Sign up for a free account
3. Go to Settings → API Keys
4. Create a new API key with "Full Access" permissions
5. Copy the key (starts with "SG.")

**Example:**
```
SENDGRID_API_KEY=SG.your-very-long-sendgrid-api-key-here
```

## Quick Setup Commands

Generate secure secrets:
```bash
# Generate JWT_SECRET
openssl rand -base64 32

# Generate NEXTAUTH_SECRET  
openssl rand -base64 32
```

## Vercel Setup Instructions

1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add each variable with its value
4. Click "Save"

## Local Development Setup

Create a `.env.local` file in your project root:
```bash
DATABASE_URL=file:./dev.db
JWT_SECRET=your-local-jwt-secret-here
NEXTAUTH_SECRET=your-local-nextauth-secret-here
NEXTAUTH_URL=http://localhost:3000
SENDGRID_API_KEY=your-sendgrid-api-key-here
```

## Important Notes

- **Never share your secrets** in public repositories or with others
- **Use different secrets** for production and development
- **Keep your SendGrid API key secure** - it can be used to send emails
- **Database URL** should point to your actual production database
- **NEXTAUTH_URL** must match your actual deployed domain

## Testing Email Functionality

Once set up, you can test email functionality by:
1. Creating a new user account
2. Sending an invitation to another email
3. The system should send emails via SendGrid

If emails aren't working, check your SendGrid API key and ensure your domain is verified in SendGrid settings.