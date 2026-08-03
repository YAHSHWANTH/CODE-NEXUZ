import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const cleanPass = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/\s+/g, "") : "";
console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("SMTP_PASS length without spaces:", cleanPass.length);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: cleanPass,
  },
});

try {
  console.log("Attempting to send test mail...");
  const info = await transporter.sendMail({
    from: `"Code Nexus" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER, // send to self
    subject: "Test Mail",
    text: "This is a test mail from Node.js script",
  });
  console.log("SUCCESS! Email sent successfully. MessageId:", info.messageId);
} catch (error) {
  console.error("FAILURE! Full Error Details:");
  console.error(error);
}
