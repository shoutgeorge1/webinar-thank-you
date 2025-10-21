import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { firstName, email, topic, zoomLink } = req.body;

    // Validate required fields
    if (!firstName || !email || !topic || !zoomLink) {
      return res.status(400).json({ 
        error: 'Missing required fields: firstName, email, topic, zoomLink' 
      });
    }

    // Create email transporter
    const transporter = nodemailer.createTransporter({
      service: 'gmail', // or use 'sendgrid' if using SendGrid
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use app password for Gmail
      },
    });

    // Plain text version
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

    // HTML version with DrBalcony branding
    const emailHtml = `
      <table style="font-family:Poppins,Arial,sans-serif;max-width:600px;margin:auto;background:#ffffff;border-radius:12px;padding:24px;color:#051c3e;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
        <tr>
          <td>
            <div style="text-align:center;margin-bottom:24px;">
              <h1 style="color:#051c3e;margin:0;font-size:24px;">DrBalcony</h1>
            </div>
            
            <h2 style="color:#051c3e;margin-bottom:20px;">You're Registered — See You at the DrBalcony Webinar</h2>
            
            <p style="font-size:16px;line-height:1.6;margin-bottom:16px;">Hi ${firstName},</p>
            
            <p style="font-size:16px;line-height:1.6;margin-bottom:16px;">
              Thanks for signing up for our <strong>DrBalcony Webinar</strong> — your registration is confirmed.
            </p>
            
            <p style="font-size:16px;line-height:1.6;margin-bottom:16px;">
              We're excited to have you join us as we unpack the latest updates affecting <strong>California property owners</strong>, 
              including new safety requirements, inspection laws, HOA responsibilities, and compliance deadlines.
            </p>
            
            <div style="background:#f8f9fa;padding:20px;border-radius:8px;margin:20px 0;border-left:4px solid #ff7b3d;">
              <h3 style="color:#051c3e;margin:0 0 12px 0;font-size:18px;">What to Expect:</h3>
              <ul style="font-size:16px;line-height:1.6;margin:0;padding-left:20px;">
                <li style="margin-bottom:8px;">Clear explanations of key state regulations</li>
                <li style="margin-bottom:8px;">Practical insights for property owners and HOAs</li>
                <li style="margin-bottom:8px;">Live Q&A with our engineering and compliance experts</li>
              </ul>
            </div>
            
            <div style="background:#f0f8ff;padding:20px;border-radius:8px;margin:20px 0;border-left:4px solid #051c3e;">
              <h3 style="color:#051c3e;margin:0 0 12px 0;font-size:18px;">Next Steps:</h3>
              <p style="font-size:16px;line-height:1.6;margin:0 0 8px 0;">
                You'll receive your <strong>Zoom link and reminder emails</strong> before the session begins.
              </p>
              <p style="font-size:16px;line-height:1.6;margin:0;">
                If you'd like to share property details or questions in advance, simply reply to this email.
              </p>
            </div>
            
            <div style="background:#fff3cd;padding:16px;border-radius:8px;margin:20px 0;border-left:4px solid #ffc107;">
              <p style="font-size:16px;line-height:1.6;margin:0;">
                If this is urgent (for example, visible damage, soft spots, or water intrusion), please reply with <strong>"Urgent"</strong> 
                in the subject line and attach photos if possible.
              </p>
            </div>
            
            <div style="border-top:1px solid #e9ecef;padding-top:20px;margin-top:24px;">
              <p style="margin:0 0 8px 0;font-size:16px;">See you soon,</p>
              <p style="margin:0 0 8px 0;font-weight:bold;color:#051c3e;">The DrBalcony Team</p>
              <p style="margin:0;font-size:14px;">
                <a href="https://drbalcony.com" style="color:#051c3e;text-decoration:none;">DrBalcony.com</a> | 805-312-8508
              </p>
            </div>
          </td>
        </tr>
      </table>
    `;

    // Email configuration
    const mailOptions = {
      from: `"DrBalcony" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "You're Registered — See You at the DrBalcony Webinar",
      text: emailText,
      html: emailHtml,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', info.messageId);
    
    return res.status(200).json({ 
      success: true, 
      messageId: info.messageId,
      message: 'Webinar confirmation email sent successfully' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message 
    });
  }
}
