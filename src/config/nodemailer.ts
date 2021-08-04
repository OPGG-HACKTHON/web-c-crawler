import nodemailer from 'nodemailer';
require('dotenv').config();

let transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GOOGLE_ID,
    pass: process.env.GOOGLE_PW,
  },
});

export default transporter;
