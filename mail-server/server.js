const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || "smtp.gmail.com",
  port: process.env.MAIL_PORT || 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      partialsDir: path.join(__dirname, "templates", "partials"),
      layoutsDir: path.join(__dirname, "templates", "layouts"),
      extname: ".hbs",
    },
    extName: ".hbs",
    viewPath: path.join(__dirname, "templates"),
  })
);

app.post("/feedback", function (req, res) {
  const { from, subject, message } = req.body;

  if (!message) {
    return res.status(400).send({
      code: 400,
      message: "Сообщение не должно быть пустым!",
    });
  }

  transporter.sendMail(
    {
      from,
      to: [process.env.MAIL_RECIPIENT],
      subject: subject || "[No subject]",
      template: "feedback",
      context: {
        from,
        subject,
        message,
      },
    },
    function (err, info) {
      if (err) {
        console.error("Send email error: ", err);
        return res.status(500).send(err);
      }

      console.log("Email sent - messageId:", info.messageId);
      res.json({ success: true });
    }
  );
});

app.listen(3000, () => {
  console.log("Mail server is running\n______________________");
});
