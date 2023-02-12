import { createTransport } from "nodemailer";

const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

const sendMailTo = async (email, asunto, mensaje) => {
  const mailOptions = {
    from: process.env.NODEMAILER_FROM || "EcommerceX",
    to: email,
    subject: asunto,
    text: mensaje
  };
  return await transporter.sendMail(mailOptions);
};

export default sendMailTo;