# 🚀 DrBalcony Webinar Email - Deployment Guide

## Quick Deploy to Vercel

### Option 1: Deploy from GitHub (Recommended)

1. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/drbalcony-webinar-email.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import from GitHub
   - Select your repository
   - Deploy!

### Option 2: Deploy from Local Files

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

## 🔧 Environment Variables

Add these to your Vercel project settings:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## 📧 Email Preview

Once deployed, your email preview will be available at:
`https://your-project.vercel.app/email-preview`

## 🎯 API Endpoints

- `POST /api/sendWebinarEmail` - Send webinar confirmation
- `POST /api/sendAutoResponse` - Send auto-response
- `GET /thank-you` - Thank you page

## 📱 Usage

### Test the Email Preview:
```
https://your-project.vercel.app/email-preview
```

### Test the API:
```javascript
fetch('https://your-project.vercel.app/api/sendWebinarEmail', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstName: 'George',
    email: 'george@drbalcony.com',
    topic: 'SB721 Compliance',
    zoomLink: 'https://zoom.us/j/123456789'
  })
});
```

## 🎨 Features

✅ **Professional DrBalcony branding**  
✅ **Working links to real DrBalcony pages**  
✅ **Responsive design**  
✅ **Email API endpoints**  
✅ **Thank you page**  
✅ **Cost calculator integration**  
✅ **Inspection checklist links**  

Ready to deploy! 🚀
