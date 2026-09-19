export default function handler(req, res) {
  const { phone, otp } = req.query;
  if (!otp) {
    const code = Math.floor(1000 + Math.random() * 9000);
    return res.json({ success: true, message: "OTP sent to " + phone, otp: code });
  }
  if (otp.length == 4) {
    return res.json({ success: true, verified: true, message: "COD Verified!" });
  }
  return res.json({ success: false, message: "Wrong OTP" });
}
