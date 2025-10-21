import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { firstName, email } = req.body;

    // Validate required fields
    if (!firstName || !email) {
      return res.status(400).json({ 
        error: 'Missing required fields: firstName, email' 
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

Thanks for reaching out to DrBalcony. We've received your information and one of our team members will contact you within 24 hours to discuss next steps for your property or inspection needs.

If you have details to share (property type, number of units, preferred dates), just reply to this email.
If this is urgent, please reply with "Urgent" and attach any photos of visible damage or concerns.

– The DrBalcony Team
DrBalcony.com | 805-312-8508`;

    // HTML version with DrBalcony branding
    const emailHtml = `
      <table style="font-family:Poppins,Arial,sans-serif;max-width:600px;margin:auto;background:#ffffff;border-radius:12px;padding:24px;color:#051c3e;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
        <tr>
          <td>
            <div style="text-align:center;margin-bottom:24px;">
              <h1 style="color:#051c3e;margin:0;font-size:24px;">DrBalcony</h1>
            </div>
            
            <h2 style="color:#051c3e;margin-bottom:20px;">We got your request — our team will contact you within 24 hours</h2>
            
            <p style="font-size:16px;line-height:1.6;margin-bottom:16px;">Hi ${firstName},</p>
            
            <p style="font-size:16px;line-height:1.6;margin-bottom:16px;">
              Thanks for reaching out to <strong>DrBalcony</strong>. We've received your information and one of our team members will contact you within 24 hours to discuss next steps for your property or inspection needs.
            </p>
            
            <div style="background:#f8f9fa;padding:20px;border-radius:8px;margin:20px 0;border-left:4px solid #ff7b3d;">
              <p style="font-size:16px;line-height:1.6;margin:0 0 8px 0;">
                If you have details to share (property type, number of units, preferred dates), just reply to this email.
              </p>
              <p style="font-size:16px;line-height:1.6;margin:0;">
                If this is urgent, please reply with <strong>"Urgent"</strong> and attach any photos of visible damage or concerns.
              </p>
            </div>
            
            <div style="border-top:1px solid #e9ecef;padding-top:20px;margin-top:24px;">
              <p style="margin:0 0 8px 0;font-size:16px;">– The DrBalcony Team</p>
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
      subject: "We got your request — our team will contact you within 24 hours",
      text: emailText,
      html: emailHtml,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Auto-response email sent successfully:', info.messageId);
    
    return res.status(200).json({ 
      success: true, 
      messageId: info.messageId,
      message: 'Auto-response email sent successfully' 
    });

  } catch (error) {
    console.error('Error sending auto-response email:', error);
    return res.status(500).json({ 
      error: 'Failed to send auto-response email',
      details: error.message 
    });
  }
}
