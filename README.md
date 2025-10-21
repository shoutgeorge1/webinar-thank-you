# DrBalcony Webinar Email System

A Next.js API route for sending automated webinar confirmation emails with DrBalcony branding.

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env.local` file in your project root:

```env
# For Gmail SMTP
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Alternative: For SendGrid
# SENDGRID_API_KEY=your-sendgrid-api-key
# EMAIL_FROM=your-email@drbalcony.com
```

### 3. Gmail Setup (Recommended)
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password: Google Account → Security → App passwords
3. Use the app password in `EMAIL_PASS`

### 4. Deploy to Vercel
```bash
npm run build
vercel deploy
```

## 📧 Usage

### API Endpoint
`POST /api/sendWebinarEmail`

### Request Body
```json
{
  "firstName": "George",
  "email": "george@drbalcony.com",
  "topic": "SB721 Compliance",
  "zoomLink": "https://zoom.us/j/123456789"
}
```

### Response
```json
{
  "success": true,
  "messageId": "message-id",
  "message": "Webinar confirmation email sent successfully"
}
```

## 🔧 Frontend Integration

### WordPress/WPForms
```javascript
// Add this to your form's success handler
fetch('https://your-domain.vercel.app/api/sendWebinarEmail', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstName: formData.firstName,
    email: formData.email,
    topic: formData.topic,
    zoomLink: 'https://zoom.us/j/123456789'
  })
})
.then(response => response.json())
.then(data => console.log('Email sent:', data));
```

### Next.js Form
```javascript
const handleSubmit = async (formData) => {
  try {
    const response = await fetch('/api/sendWebinarEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: formData.firstName,
        email: formData.email,
        topic: formData.topic,
        zoomLink: formData.zoomLink
      })
    });
    
    const result = await response.json();
    console.log('Email sent:', result);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## 🎨 Email Template Features

- **DrBalcony Branding**: Navy (#051c3e) and orange (#ff7b3d) colors
- **Responsive Design**: Works on all devices
- **Professional Layout**: Clean, modern design
- **Dynamic Content**: Personalized with user data
- **Call-to-Action**: Prominent Zoom link button

## 🔧 Customization

### Email Template
Edit the `emailHtml` variable in `/pages/api/sendWebinarEmail.js` to customize:
- Colors and styling
- Content and messaging
- Logo and branding
- Layout structure

### Subject Line
Change the subject line in the `mailOptions` object:
```javascript
subject: "Your Custom Subject Line Here",
```

## 🚨 Error Handling

The API includes comprehensive error handling:
- Input validation
- Email service errors
- Network timeouts
- Detailed error logging

## 📊 Monitoring

Check your Vercel function logs for:
- Email delivery status
- Error messages
- Performance metrics

## 🔒 Security

- Environment variables for sensitive data
- Input validation and sanitization
- Rate limiting (consider adding)
- CORS configuration (if needed)

## 📞 Support

For issues or customization requests, contact the DrBalcony team at (805) 312-8508.
