const nodemailer = require("nodemailer");
const {EMAIL_CREDENTIALS, PASSWORD_CREDENTIALS} = process.env;

// Funcion para enviar notificaciones por email
const enviarCorreo = async (destinatario, asunto, mensaje) => {
  try {
    // Configuracion de transporte de correo (SMTP)
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: `${EMAIL_CREDENTIALS}`,
        pass: `${PASSWORD_CREDENTIALS}`
      },
    });

    // Declaramos las opciones de notificaciones
    const mailOptions = {
      from:`"Wizarding Wares 👽" <${EMAIL_CREDENTIALS}>`,
      to: destinatario,
      subject: asunto,
      text: mensaje,
      html: `<p>${mensaje}</p>`
    };

    // Envio de la notificaion
    const info = await transporter.sendMail(mailOptions);
    console.log(`Correo Electronico enviado: ${info.messageId}`);
  } catch (error) {
    console.error(`Error al enviar correo electronico: ${error.message}`);
  }
};

/**
 *  Wizarding Wares
    wizardingwaresstore@gmail.com
 */

module.exports = {
  enviarCorreo,
};