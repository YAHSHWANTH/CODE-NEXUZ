import QRCode from "qrcode";

export const generateQRAndID = async () => {
  // Unique CNX ID
  const uniqueId = "CNX" + Math.random().toString(36).substring(2, 8).toUpperCase();

  // Same QR link for all users
  const verifyLink = `${window.location.origin}/verify`;

  // Generate base64 QR (same for all users)
  const qrDataUrl = await QRCode.toDataURL(verifyLink);

  return { uniqueId, qrDataUrl, verifyLink };
};
