# Environment Configuration Guide

## Overview
This Next.js portfolio uses environment variables for sensitive configuration (EmailJS credentials). This guide explains the setup and best practices.

## Files Explained

### `.env.local` (⚠️ NEVER commit to Git)
- Contains your actual secret credentials
- Created by you locally for development
- **ALWAYS in `.gitignore`** - Git will never track it
- Used by: Development (`npm run dev`)

### `.env.example`
- Template file showing what environment variables are needed
- Safe to commit to Git (no real secrets)
- Use this as reference when setting up new environments
- Copy this to `.env.local` and fill in real values

### `.gitignore`
- Prevents `.env.local` and other sensitive files from being committed
- Already includes `.env*` pattern to catch all env files

## Setup Instructions

### 1. Local Development Setup

```bash
# Copy the example file to create your local env file
cp .env.example .env.local

# Edit .env.local with your actual credentials
# You can use any editor or:
# Windows: notepad .env.local
# macOS/Linux: nano .env.local
```

### 2. Fill In Your EmailJS Credentials

Get these values from [EmailJS Dashboard](https://dashboard.emailjs.com/admin/account):

1. **NEXT_PUBLIC_EMAILJS_PUBLIC_KEY**
   - From: Dashboard → Account tab → API Keys (Public Key)
   - Prefixed with `NEXT_PUBLIC_` because it's used in browser code
   - Safe to expose to frontend

2. **NEXT_PUBLIC_EMAILJS_SERVICE_ID**
   - From: Dashboard → Email Services → Your Service
   - Example: `service_lk5py8k`

3. **NEXT_PUBLIC_EMAILJS_TEMPLATE_ID**
   - From: Dashboard → Email Services → Templates
   - Example: `template_cckk6wf`

### 3. Example `.env.local` Content

```env
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=gPsKQILyymAIYVB68
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_lk5py8k
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_cckk6wf
```

## For Deployment (Vercel)

### ✅ Vercel Automatic Setup
If deploying to **Vercel**:
1. No need to commit `.env.local`
2. Go to: Project Settings → Environment Variables
3. Add each variable with their actual values
4. Vercel will use them for the deployed site

### Environment For Different Stages
```
Production:  .env.production.local (never commit)
Staging:     .env.staging.local    (never commit)
Development: .env.local            (never commit)
```

## Security Best Practices

✅ **DO:**
- Add `.env.local` to `.gitignore` ✓ (already done)
- Use `NEXT_PUBLIC_` prefix ONLY for client-side variables
- Keep `.env.local` locally only
- Regenerate credentials if accidentally committed
- Use secret management in production (Vercel, AWS Secrets, etc.)

❌ **DON'T:**
- Commit `.env.local` to Git
- Use real secrets in code
- Commit real credentials anywhere
- Share `.env.local` via email/chat
- Use hardcoded values in components

## How Environment Variables Work in Next.js

### Client-Side Variables (Frontend)
```javascript
// ✅ CORRECT - Prefixed with NEXT_PUBLIC_
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
// This gets baked into the client-side bundle
```

### Server-Side Variables (Backend)
```javascript
// For API routes, use without NEXT_PUBLIC_ prefix
// const apiSecret = process.env.API_SECRET;
// Never exposed to browser
```

## Testing Your Setup

After setting up `.env.local`, test the contact form:

1. Start development server: `npm run dev`
2. Go to Contact section
3. Fill out and submit the form
4. Check if email is sent successfully
5. Check browser console for any errors

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "env variable is undefined" | Restart dev server after creating `.env.local` |
| EmailJS form not sending | Verify credentials match EmailJS dashboard |
| Build succeeds but no vars on Vercel | Add variables to Vercel project settings |
| Git shows `.env.local` as untracked | Good! It means `.gitignore` is working |

## Next Steps

1. ✅ Create `.env.local` from `.env.example`
2. ✅ Add your EmailJS credentials
3. ✅ Test the contact form locally
4. ✅ Deploy to Vercel (variables added via dashboard)
5. ✅ Test the deployed form

## References

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [EmailJS Dashboard](https://dashboard.emailjs.com/)
