const nodemailer = require("nodemailer");



function sendEmail(name, email, subject, message, emailTemplate) {

  const registrationHtml = `<!DOCTYPE HTML
PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<!--[if !mso]><!-->
<meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->

<!-- Your title goes here -->
<title>WELCOM TO <b>LEAFY</b></title>
<!-- End title -->

<!-- Start stylesheet -->
<style type="text/css">
  a,
  a[href],
  a:hover,
  a:link,
  a:visited {
    /* This is the link colour */
    text-decoration: none !important;
    color: #0000EE;
  }

  .link {
    text-decoration: underline !important;
  }

  p,
  p:visited {
    /* Fallback paragraph style */
    font-size: 15px;
    line-height: 24px;
    font-family: 'Helvetica', Arial, sans-serif;
    font-weight: 300;
    text-decoration: none;
    color: #000000;
  }

  h1 {
    /* Fallback heading style */
    font-size: 22px;
    line-height: 24px;
    font-family: 'Helvetica', Arial, sans-serif;
    font-weight: normal;
    text-decoration: none;
    color: #000000;
  }

  .ExternalClass p,
  .ExternalClass span,
  .ExternalClass font,
  .ExternalClass td {
    line-height: 100%;
  }

  .ExternalClass {
    width: 100%;
  }
</style>
<!-- End stylesheet -->

</head>

<!-- You can change background colour here -->

<body
style="text-align: center; margin: 0; padding-top: 10px; padding-bottom: 10px; padding-left: 0; padding-right: 0; -webkit-text-size-adjust: 100%;background-color: #f2f4f6; color: #000000"
align="center">

<!-- Fallback force center content -->
<div style="text-align: center;">


  <!-- Start container for logo -->
  <table align="center"
    style="text-align: center; vertical-align: top; width: 600px; max-width: 600px; background-color: #ffffff;"
    width="600">
    <tbody>
      <tr>
        <td
          style="width: 596px; vertical-align: top; padding-left: 0; padding-right: 0; padding-top: 15px; padding-bottom: 15px;"
          width="596">

          <!-- Your logo is here -->
          <img
            style="width: 180px; max-width: 180px; height: 85px; max-height: 85px; text-align: center; color: #ffffff;"
            alt="Logo" src="https://res.cloudinary.com/dingakmfw/image/upload/v1681143178/leafy/h3ng2yw0rm7g6umkwzjm.png"
            align="center" width="180" height="85">

        </td>
      </tr>
    </tbody>
  </table>
  <!-- End container for logo -->

  <!-- Hero image -->
  <img style="width: 600px; max-width: 600px; height: 350px; max-height: 350px; text-align: center;" alt="Hero image"
    src="https://www.arabianbusiness.com/cloud/2023/01/10/holiday-relax.jpg" align="center" width="600" height="350">
  <!-- Hero image -->

  <!-- Start single column section -->
  <table align="center"
    style="text-align: center; vertical-align: top; width: 600px; max-width: 600px; background-color: #ffffff;"
    width="600">
    <tbody>
      <tr>
        <td
          style="width: 596px; vertical-align: top; padding-left: 30px; padding-right: 30px; padding-top: 30px; padding-bottom: 40px;"
          width="596">

          <h1
            style="font-size: 20px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 600; text-decoration: none; color: #000000;">
            WELCOM TO LEAFY</h1>

          <p
            style="text-align:left; font-size: 15px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; text-decoration: none; color: #919293;">
            Dear ${name},
            <br>
            <br>
            We are delighted to welcome you to <b>LEAFY</b>, the ultimate HR site for managing vacations. As a new user, we
            want to extend a warm welcome and thank you for choosing <b>LEAFY</b> as your go-to site for managing vacation
            time.
            <br><br>
            As an HR tool, <b>LEAFY</b> offers a comprehensive platform to streamline vacation requests, approvals, and
            scheduling. With our user-friendly interface, you can easily manage your time off and keep track of your
            vacation days, all in one place.
            <br><br>
            To access your <b>LEAFY</b> account, simply click on the login button bellow. The default password is <b>Azerty1</b>. Once
            logged in, you can explore the full range of features and benefits that <b>LEAFY</b> has to offer.
            <br><br>
            At <b>LEAFY</b>, we are committed to providing the best user experience possible. If you have any questions or
            feedback, please do not hesitate to reach out to our customer support team, who are available 24/7 to
            assist you.
            <br><br>
            Thank you again for choosing <b>LEAFY</b> as your HR vacation management tool. We are excited to have you on
            board and look forward to helping you manage your time off more efficiently.
            <br>
            <br>
            Best regards,<br>
            The <b>LEAFY</b> Team
          </p>
          <!-- Start button (You can change the background colour by the hex code below) -->
          <a href="#" target="_blank"
            style="background-color: #000000; font-size: 15px; line-height: 22px; font-family: 'Helvetica', Arial, sans-serif; font-weight: normal; text-decoration: none; padding: 12px 15px; color: #ffffff; border-radius: 5px; display: inline-block; mso-padding-alt: 0;">
            <!--[if mso]>
                <i style="letter-spacing: 25px; mso-font-width: -100%; mso-text-raise: 30pt;">&nbsp;</i>
              <![endif]-->

            <span style="mso-text-raise: 15pt; color: #ffffff;">LOG IN NOW</span>
            <!--[if mso]>
                <i style="letter-spacing: 25px; mso-font-width: -100%;">&nbsp;</i>
              <![endif]-->
          </a>
          <!-- End button here -->

        </td>
      </tr>
    </tbody>
  </table>
  <!-- End single column section -->

  <!-- Start image -->
  <img style="width: 600px; max-width: 600px; height: 240px; max-height: 240px; text-align: center;" alt="Image"
    src="https://fullsphere.co.uk/misc/free-template/images/image-2.jpg" align="center" width="600" height="240">
  <!-- End image -->


  <!-- Start footer -->
  <table align="center"
    style="text-align: center; vertical-align: top; width: 600px; max-width: 600px; background-color: #000000;"
    width="600">
    <tbody>
      <tr>
        <td
          style="width: 596px; vertical-align: top; padding-left: 30px; padding-right: 30px; padding-top: 30px; padding-bottom: 30px;"
          width="596">

          <!-- Your inverted logo is here -->
          <img
            style="width: 180px; max-width: 180px; height: 85px; max-height: 85px; text-align: center; color: #ffffff;"
            alt="Logo" src="https://fullsphere.co.uk/misc/free-template/images/logo-black-background.jpg"
            align="center" width="180" height="85">

          <p
            style="font-size: 13px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; text-decoration: none; color: #ffffff;">
            Address line 1, London, L2 4LN
          </p>

          <p
            style="margin-bottom: 0; font-size: 13px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; text-decoration: none; color: #ffffff;">
            <a target="_blank" style="text-decoration: underline; color: #ffffff;" href="https://fullsphere.co.uk">
              www.fullsphere.co.uk
            </a>
          </p>

        </td>
      </tr>
    </tbody>
  </table>
  <!-- End footer -->

  <!-- Start unsubscribe section -->
  <table align="center" style="text-align: center; vertical-align: top; width: 600px; max-width: 600px;" width="600">
    <tbody>
      <tr>
        <td
          style="width: 596px; vertical-align: top; padding-left: 30px; padding-right: 30px; padding-top: 30px; padding-bottom: 30px;"
          width="596">

          <p
            style="font-size: 12px; line-height: 12px; font-family: 'Helvetica', Arial, sans-serif; font-weight: normal; text-decoration: none; color: #919293; margin-top: 30px;">
            Email template built by <a style="text-decoration: none; color: #919293;"
              href="https://fullsphere.co.uk"><u>FullSphere</u></a>
          </p>

        </td>
      </tr>
    </tbody>
  </table>
  <!-- End unsubscribe section -->

</div>

</body>

</html>`

const passwordResetHtml = ` <p>Hi ${name}, your password has been reset</p>`

const approvalHtml = ` <p>Hi ${name}, your vacation is approved</p>`

const rejectionHtml = ` <p>Hi ${name}, your vacation is rejected</p>`


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

  let emailHtml = '';
  switch(emailTemplate){
    case 'registration':
      emailHtml = registrationHtml;
      break;
    case 'approval':
      emailHtml = approvalHtml;
      break;
    case 'rejection':
      emailHtml = rejectionHtml;
      break;
    default:
      emailHtml = ` <p>Hi ${name}, ${message}</p>`;
  }


  transporter
    .sendMail({
      from: "LEAFY registration <lishengwei@outlook.fr>",
      to: email,
      subject: subject,
      text: message,
      html: emailHtml
      /* add a configurated html file in to have a better notification email */
    })
    .catch((error) => console.log(error));
}

module.exports = sendEmail;