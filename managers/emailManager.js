const nodemailer = require("nodemailer");

const emailManager = async (to, text, html, subject) => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "15652dff29dd44",
      pass: "631affc565168b",
    },
  });

  transport.sendMail({
    to: to,
    from: "info@expensetracker.com",
    text: text,
    html: html,
    subject: subject,
  });
};

module.exports = emailManager;
