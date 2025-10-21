# DrBalcony Email Template - Developer Instructions

## 📧 **Email Copy (Plain Text)**

**Subject:** `You're Registered — See You at the DrBalcony Webinar`

**Body:**
```
Hi {{firstName}},

Thanks for signing up for our DrBalcony Webinar — your registration is confirmed.

We're excited to have you join us as we unpack the latest updates affecting California property owners, including new safety requirements, inspection laws, HOA responsibilities, and compliance deadlines.

What to Expect:
• Clear explanations of key state regulations
• Practical insights for property owners and HOAs
• Live Q&A with our engineering and compliance experts

Next Steps:
You'll receive your Zoom link and reminder emails before the session begins.
If you'd like to share property details or questions in advance, simply reply to this email.

If this is urgent (for example, visible damage, soft spots, or water intrusion), please reply with "Urgent" in the subject line and attach photos if possible.

See you soon,
The DrBalcony Team
DrBalcony.com | 805-312-8508
```

## 🔧 **Implementation**

Just replace `{{firstName}}` with the actual user's name and send via your existing email system.

**Variables needed:**
- `firstName` - User's first name
- `email` - User's email address
- `topic` - Webinar topic (optional, for logging)
- `zoomLink` - Zoom meeting link (optional, for logging)

## 📝 **Quick Integration**

1. Copy the email text above
2. Replace `{{firstName}}` with actual name
3. Send via your existing email service
4. Done!

No fancy HTML needed - just clean, professional plain text.
