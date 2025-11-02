import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email: string, code: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"Codekpi" <${process.env.APP_EMAIL}>`,
    to: email,
    subject: "Your Verification Code",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #2563eb;">🔐 Verification Code</h2>
        <p>Here is your verification code:</p>
        <div style="background: #f3f4f6; border-radius: 8px; padding: 10px 20px; display: inline-block; font-size: 1.5em; letter-spacing: 2px; margin-top: 10px;">
          <strong>${code}</strong>
        </div>
        <p style="margin-top: 20px; color: #6b7280;">This code will expire in 10 minutes.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log(`✅ Email sent to ${email}`);
};
export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
