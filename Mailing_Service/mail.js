require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  secure: false, 
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

class Mail {
  constructor() {
    this.mailOptions = {
      from: {
        name: 'SHERYAR',
        address: process.env.EMAIL_USER
      }
    };
  }

  //This sets the receiver's email address
  setTo(email) {
    this.mailOptions.to = email;
    return this;
  }

  // This sets the subject of the email
  setSubject(subject) {
    this.mailOptions.subject = subject;
    return this;
  }

  //This sets the plain text message of the email
  setText(text) {
    this.mailOptions.text = text;
    return this;
  }

  //This sets the HTML content of the email
  setHtml(html) {
    this.mailOptions.html = html;
    return this;
  }

  //This sets files (like PDFs or images)
  setAttachments(attachments) {
    this.mailOptions.attachments = attachments;
    return this;
  }

  async send() {
    try {
      const info = await transporter.sendMail(this.mailOptions);
      console.log('Email sent:', info.response);
      return info;
    } catch (error) {
      console.error('Email send failed:', error);
      throw error;
    }
  }
}

module.exports = Mail;
