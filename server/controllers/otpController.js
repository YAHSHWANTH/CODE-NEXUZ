import nodemailer from "nodemailer";

let otpStore = {}; // Temporary storage (for testing)

export const sendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Save OTP temporarily
  otpStore[email] = otp;

  // Log OTP immediately to console so that local developers can proceed even if SMTP fails
  console.log(`🔑 [DEV MODE] Generated OTP for ${email}: ${otp}`);

  try {
    const cleanPass = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/\s+/g, "") : "";
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: cleanPass,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP sent successfully to ${email}`);
    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("❌ Email sending error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to send OTP. Please check the backend/server terminal console for the OTP code." 
    });
  }
};

export const verifyOtp = (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] && otpStore[email] == otp) {
    delete otpStore[email]; // clear after verification
    return res.status(200).json({ success: true, message: "OTP verified!" });
  } else {
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }
};
