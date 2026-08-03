// index.js
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.SMTP_USER,
      subject: 'New message from contact form',
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br>${message}</p>`,
    });

    res.status(200).json({ message: '✅ Email sent successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: '❌ Failed to send email' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('✅ Server running on port', PORT);
});
