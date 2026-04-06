const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.submitContact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required.' });
  }

  try {
    // Save to DB
    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    // Send email notification (non-blocking — don't fail if email fails)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        await transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_USER,
          subject: `📬 New message from ${name}: ${subject || 'No subject'}`,
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0b;color:#f0f0f5;padding:40px;border-radius:12px;">
              <h2 style="color:#d4af5a;margin-bottom:24px;">New Portfolio Message</h2>
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:8px 0;color:#6a6a80;width:80px;">From</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
                <tr><td style="padding:8px 0;color:#6a6a80;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#d4af5a;">${email}</a></td></tr>
                <tr><td style="padding:8px 0;color:#6a6a80;">Subject</td><td style="padding:8px 0;">${subject || '—'}</td></tr>
              </table>
              <div style="margin-top:24px;padding:24px;background:#18181e;border-radius:8px;border-left:3px solid #d4af5a;">
                <p style="margin:0;line-height:1.7;">${message.replace(/\n/g, '<br>')}</p>
              </div>
              <p style="margin-top:24px;color:#6a6a80;font-size:0.8rem;">Sent via debjitdey.dev portfolio</p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.warn('Email send failed (message saved):', emailErr.message);
      }
    }

    res.status(201).json({ message: 'Message sent successfully! I\'ll get back to you soon.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
