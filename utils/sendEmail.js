const nodemailer = require("nodemailer");

function sendEmail(email, subject, message) {
  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
      ciphers: "SSLv3",
    },
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  transporter
    .sendMail({
      from: "LEAFY registration <lishengwei@outlook.fr>",
      to: email,
      subject: subject,
      text: message,
      html: `<b>${message}</b>`,
      /* add a configurated html file in to have a better notification email */
    })
    .catch((error) => console.log(error));
}

module.exports = sendEmail;