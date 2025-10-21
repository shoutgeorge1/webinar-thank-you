// Simple DrBalcony Webinar Email Template
// Just copy/paste this into your existing email system

const sendWebinarEmail = async (firstName, email, topic, zoomLink) => {
  const emailText = `Hi ${firstName},

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
DrBalcony.com | 805-312-8508`;

  // Send email using your existing email service
  // Replace this with your actual email sending code
  return await yourEmailService.send({
    to: email,
    subject: "You're Registered — See You at the DrBalcony Webinar",
    text: emailText
  });
};

// Usage example:
// sendWebinarEmail('George', 'george@drbalcony.com', 'SB721 Compliance', 'https://zoom.us/j/123456789');
