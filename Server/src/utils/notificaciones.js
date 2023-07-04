const nodemailer = require("nodemailer");
const {EMAIL_CREDENTIALS, PASSWORD_CREDENTIALS} = process.env;

// // Funcion para enviar notificaciones por email
// const enviarCorreo = async (destinatario, asunto, mensaje) => {
//   try {
//     // Configuracion de transporte de correo (SMTP)
//     const transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       port: 587,
//       secure: false,
//       auth: {
//         user: `${EMAIL_CREDENTIALS}`,
//         pass: `${PASSWORD_CREDENTIALS}`
//       },
//     });

//     // Declaramos las opciones de notificaciones
//     const mailOptions = {
//       from:`"Wizarding Wares 👽" <${EMAIL_CREDENTIALS}>`,
//       to: destinatario,
//       subject: asunto,
//       text: mensaje,
//       html: `<p>${mensaje}</p>`
//     };

//     // Envio de la notificaion
//     const info = await transporter.sendMail(mailOptions);
//     console.log(`Correo Electronico enviado: ${info.messageId}`);
//   } catch (error) {
//     console.error(`Error al enviar correo electronico: ${error.message}`);
//   }
// };

// /**
//  *  Wizarding Wares
//     wizardingwaresstore@gmail.com
//  */

// module.exports = {
//   enviarCorreo,
// };


// **************************************************
// **************************************************
// **************************************************

//Configuracion de transporte de correo (SMTP)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: `${EMAIL_CREDENTIALS}`,
    pass: `${PASSWORD_CREDENTIALS}`
  },
});


// Funciona Para Enviar Notificaciones V2
// --------------------------------------
const enviarNotificacion = (cualNotificacion, name, email, mensaje) => {

  const indicesAdmin = [0, 2, 4, 5, 6, 8, 10, 12, 14];


  let receptor;
  const result = indicesAdmin.filter((elem) => elem == cualNotificacion);
  if(result.length){
    receptor = EMAIL_CREDENTIALS;
  }

  // Notificaciones
  // 0. Notificacion de formulario de contacto - administrador
  // 1. Notificacion de formulario de contacto - cliente.

  let notificaciones = [
    {
      indice: 0,
      role: "admin",
      subject: "Nuevo formulario de contacto enviado",
      titulo: "Nuevo formulario enviado",
      notificacion:"Hola administrador, Un nuevo formulario de contacto se ha enviado. Aqui estan los datos. Nombre: "+name+" email: "+email+" mensaje: "+mensaje+" ." 
    },
    {
      indice: 1,
      role: "user",
      subject: "Hemos recibido tu mensaje",
      titulo: "pronto estaremos contigo",
      notificacion:"Hola"+name+". Hemos recibido tu mensaje y en breve nuestro equipo de soporte se pondra en contacto contigo.",
    },
    {
      indice: 2,
      role: "admin",
      subject:"Verificacion de Cuenta",
      titulo: "Nuevo Usuario A Verificar",
      notificacion: "Hola administrador, Tenemos un nuevo usuario a verificar su cuenta. Aqui estan los datos. Nombre: "+name+" email: "+email,
    },
    {
      indice: 3,
      role: "user",
      subject:"Verificacion de Cuenta",
      titulo: "Verificacion de Cuenta",
      notificacion: `Bienvenid@ ${name} a nuestra plataforma. Por favor haz clic en el siguiente enlace para verificar tu cuenta: ${mensaje}`,
    },
    {
      indice: 4,
      role: "admin",
      subject:"Informativo Wizarding Wares",
      titulo:"Informativos Enviados",
      notificacion: `Hola administrador, Se enviaron email informativos a las siguientes direcciones de correo electronico: ${email}; Referentes a la campaña: ${mensaje}` 
    },
    {
      indice: 5,
      role: "admin",
      subject: "Correo Enviado",
      titulo: `Se envio un Email al usuario ${name}`,
      notificacion: `Hola administrador. Se envio un Email al correo electronico: ${email}, Con el dato: ${mensaje}`
    },
    {
      indice: 6,
      role: "admin",
      subject: "Change Role",
      titulo: `Se notifico al usuari@ ${name}; Sobre Su cambio de role`,
      notificacion: `<span>Hola administrador, Se envio una notificacion al correo: ${email}; Concerniente al cambio de role que desde ahora tendra.<br>
                     Desde hoy al usuari@ ${name}, con userId: ${mensaje.userId} usara el Role: ${mensaje.role}</span>`,
    },
    {
      indice: 7,
      role: "user",
      subject: "Change Role",
      titulo: "Notificacion De Cambio De Role",
      notificacion: `<span>Hola ${name} <br />
                     Esperando que te encuentres bien. 
                     Nos estamos comunicando contigo por la decision tomada por nuestro equipo.<br />
                     Sobre el cambio de role que ha sido realizado a tu cuenta en la plataforma.<br/>
                     El Role: ${mensaje.role}, manejaras desde hoy.<br/>
                     Si tienes alguna duda o consulta, sobre el cambio efectuado a tu role, te pedimos que te contactes con nosotros a travez del<br /> 
                     Email: ${mensaje.mailWW}.   
                     </span>`,
    },
    {
      indice: 8,
      role: "admin",
      subject: "User account suspended",
      titulo: `Se notifico al usuari@ ${name}; Sobre la Suspensión de su cuenta`,
      notificacion: `<span>Hola Administrador, Se envio una notificacion al correo: ${email}; Concerniente a la Suspension temporal de la cuenta.<br>
                     Desde hoy al usuari@ ${name}, con userId: ${mensaje.userId}. Tendra el Estado: ${mensaje.state}</span>`,
    },
    {
      indice: 9,
      role: "user",
      subject: "User account suspended",
      titulo: "Notificacion De Suspension Temporal De Cuenta",
      notificacion: `<span>Hola ${name} <br />
                     Esperando que te encuentres bien. 
                     Nos estamos comunicando contigo por la decision tomada por nuestro equipo.<br />
                     Sobre la suspension temporal que ha sido realizado a tu cuenta en la plataforma.<br/>
                     A la fecha de: ${mensaje.date}, tu cuenta esta supendida.<br/>
                     Si tienes alguna duda o consulta, sobre el cambio efectuado a tu cuenta, te pedimos que te contactes con nosotros a travez del<br /> 
                     Email: ${mensaje.mailWW}.   
                     </span>`,
    },
    {
      indice: 10,
      role: "admin",
      subject: "User account reactivated",
      titulo: `Se notifico al usuari@ ${name}; Sobre la Reactivación de su cuenta`,
      notificacion: `<span>Hola Administrador, Se envio una notificacion al correo: ${email}; Concerniente a la Reactivación de la cuenta.<br>
                     Desde hoy al usuari@ ${name}, con userId: ${mensaje.userId}. Tendra el Estado: ${mensaje.state}</span>`,
    },
    {
      indice: 11,
      role: "user",
      subject: "User account reactivated",
      titulo: "Notificacion De Reactivación De Tu Cuenta",
      notificacion: `<span>Hola ${name} <br />
                     Esperando que te encuentres bien. 
                     Nos estamos comunicando contigo por la decision tomada por nuestro equipo.<br />
                     Sobre la Reactivación que ha sido realizada a tu cuenta en la plataforma.<br/>
                     A la fecha de: ${mensaje.date}, tu cuenta esta Reactiva.<br/>
                     Si tienes alguna duda o consulta, te pedimos que te contactes con nosotros a travez del<br /> 
                     Email: ${mensaje.mailWW}.   
                     </span>`,
    },
    {
      indice: 12,
      role: "admin",
      subject: "Cancel Account",
      titulo: "Peticion Cancelacion de Cuenta",
      notificacion: `<span>Hola Administrador. te informamos que el usario ${name}<br />
                    con userId: ${mensaje.userId}, a la fecha de hoy: ${mensaje.date}, a pulsado el boton de cancelar cuenta<br/>
                    Se le envio una notificacion que su cuenta ${email} sera pasada a suspension temporal por 30 días.<br/>
                    Esto en caso de que Reconsiderara su desicion. Y que pasado ese tiempo<br/>
                    su cuenta seria eliminada completamente del sistema</span>`,
    },
    {
      indice: 13,
      role: "user",
      subject: "Cancel Account",
      titulo: "Cancelacion de Cuenta",
      notificacion: `<span>Hola ${name} <br />
                     Esperando que te encuentres bien. 
                     Nos estamos comunicando contigo por la decision tomada por tu parte.<br />
                     De Cancelar u Eliminar tu cuenta de nuestra plataforma. Creemos que tuvistes tus razones<br/>
                     para tomar esta dura y extrema desicion. Te informamos que por lo pronto<br/>
                     la cuenta: ${email}; A la fecha de: ${mensaje.date}, sera pasada a suspension temporal por 30 días...<br/>
                     Esto en caso de que Reconsideres tu desicion. Pasado ese tiempo<br/>
                     tu cuenta sera eliminada completamente del sistema<br/>
                     Si tienes alguna duda o consulta, te pedimos que te contactes con nosotros a travez del<br /> 
                     Email: ${mensaje.mailWW}.   
                     </span>`,
    },
    {
      indice: 14,
      role: "admin",
      subject: "Account Deletion",
      titulo: "Notificacion de Eliminacion de Cuenta",
      notificacion: `<span>Hola Administrador. te informamos que el usario ${name}<br />
                    con userId: ${mensaje.userId}, a la fecha de hoy: ${mensaje.date}, ya no es parte de nuestro sistema<br/>
                    Se le envio una notificacion que su cuenta ${email} a sido borrada definitivamente de nuestra base de datos.<br/></span>`,
    },
    {
      indice: 15,
      role: "user",
      subject: "Account Deletion",
      titulo: "Notificacion de Cuenta Eliminada",
      notificacion: `<span>Hola ${name} <br />
                     Esperando que te encuentres bien. 
                     Nos estamos comunicando contigo para contarte que tu cuenta.<br />
                     a sido Eliminada de nuestra plataforma. Y ademas por lo pronto<br/>
                     la cuenta: ${email}; A la fecha de: ${mensaje.date}, a iniciado el proceso de borrado de toda informacion en nuestras base de datos<br/>
                     Si tienes alguna duda o consulta, te pedimos que te contactes con nosotros a travez del<br /> 
                     Email: ${mensaje.mailWW}.   
                     </span>`,
    },
  ];

  // Plantilla de correo
  let mensajeHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    p, a, h1, h2, h3, h4, h5, h6 {
      font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    }
    h1 {font-size: 40px !important;}
    h2 {font-size: 25px !important;}
    h3 {font-size: 18px !important;}
    h4 {font-size: 16px !important;}
    p, a {font-size: 15px !important;}

    .imag {width: 40px;}
    .contA {margin: 0px 5px 0px 5px;}
    .aFooter {
      color: #ffffff !important;
      text-decoration: none;
      font-size: 13px !important;
    }
  </style>
</head>
<body>
  <div style="width: 100%; background-color: rgb(234,224,213);">
    <div style="padding: 20px 10px;">
      <!-- Imagen Inicial -->
      <header style="background-color: rgb(105,35,35); padding: 10px 0px; width: 100%; text-align: center;">
        <img src="https://res.cloudinary.com/dl6khxkkb/image/upload/v1688067068/MisPruebas/LogoWizardingWares.png" alt="Logo Wizarding Wares" style="width: 100px;">
      </header>
      <!-- Imagen Inicial -->

      <!-- Contenido Principal -->
      <main style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center !important;">
        <h1>${notificaciones[cualNotificacion].titulo}</h1>
        <p>${notificaciones[cualNotificacion].notificacion}</p>

        <!-- Gracias -->
        <p>Gracias por su tiempo</p>
        <p style="margin-bottom: 50px;">
          <i>Atentamente</i><br/>Wizarding Wares
        </p>  
        <!-- Gracias -->
      </main>
      <!-- Contenido Principal -->

      <!-- Footer -->
      <footer style="background-color: rgb(37,53,61); color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
        
        <!-- Redes Sociales -->
        <a href="#" class="contA"><img src="https://res.cloudinary.com/dl6khxkkb/image/upload/v1688071984/MisPruebas/IconoFacebook.png" alt="facebook" class="imag"></a>
        <a href="#" class="contA"><img src="https://res.cloudinary.com/dl6khxkkb/image/upload/v1688071878/MisPruebas/IconoInstagram.png" alt="instagran" class="imag"></a>
        <a href="#" class="contA"><img src="https://res.cloudinary.com/dl6khxkkb/image/upload/v1688072159/MisPruebas/IconoWhatsapp.png" alt="whatsapp" class="imag"></a>
        <a href="mailto:wizardingwaresstore@gmail.com" class="contA"><img src="https://res.cloudinary.com/dl6khxkkb/image/upload/v1688072263/MisPruebas/IconoEmail.png" alt="mail" class="imag"></a>
        <!-- Redes Sociales -->

        <h4>Soporte</h4>
        <p style="font-size: 13px; padding: 0px 20px;">Comunicate con nosotros por los siguientes medios:<br/>
        Correo: <a class="aFooter" href="mailto:wizardingwaresstore@gmail.com">Wizarding Wares</a><br/>
        Whatsapp: <a class="aFooter" href="#">+55 555 555 5555</a></p>
        <p style="background-color: black; padding: 10px 0px; font-size: 14px !important;"><small>&copy; 2023 - Wizarding Wares | All rights reserved</small></p>
      </footer>
      <!-- Footer -->
    </div>
  </div>
</body>
</html>`;
  // Plantilla de correo

  // Notificar o enviar correo
  transporter.verify().then(console.log).catch(console.error);
  transporter.sendMail({
    from: `"Wizarding Wares 👽" <${EMAIL_CREDENTIALS}>`,
    to: receptor ? receptor : email,
    subject: notificaciones[cualNotificacion].subject,
    text: notificaciones[cualNotificacion].notificacion,
    html: mensajeHTML, // html body
  }).then(info => {
    console.log({info});
  }).catch((error) => console.error(error.message));
  // Notificar o enviar correo
};


// console.log({info})
// console.error


// *********************************************************************************

// Funcion Para Enviar Correos Email Globales Informativos ( A todos los usuarios ) o 
// Solo un mensaje personalizado  a un usuario en particular
// -----------------------------------------------------------------------------------
const enviarEmail = (email, asunto, titulo, mensaje) => {

  // Plantilla de correo
  let mensajeHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    p, a, h1, h2, h3, h4, h5, h6 {
      font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    }
    h1 {font-size: 40px !important;}
    h2 {font-size: 25px !important;}
    h3 {font-size: 18px !important;}
    h4 {font-size: 16px !important;}
    p, a {font-size: 15px !important;}

    .imag {width: 40px;}
    .contA {margin: 0px 5px 0px 5px;}
    .aFooter {
      color: #ffffff !important;
      text-decoration: none;
      font-size: 13px !important;
    }
  </style>
</head>
<body>
  <div style="width: 100%; background-color: rgb(234,224,213);">
    <div style="padding: 20px 10px;">
      <!-- Imagen Inicial -->
      <header style="background-color: rgb(105,35,35); padding: 10px 0px; width: 100%; text-align: center;">
        <img src="https://res.cloudinary.com/dl6khxkkb/image/upload/v1688067068/MisPruebas/LogoWizardingWares.png" alt="Logo Wizarding Wares" style="width: 100px;">
      </header>
      <!-- Imagen Inicial -->

      <!-- Contenido Principal -->
      <main style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center !important;">
        <h1>${titulo}</h1>
        <p>${mensaje}</p>

        <!-- Gracias -->
        <p>Gracias por su tiempo</p>
        <p style="margin-bottom: 50px;">
          <i>Atentamente</i><br/>Wizarding Wares
        </p>  
        <!-- Gracias -->
      </main>
      <!-- Contenido Principal -->

      <!-- Footer -->
      <footer style="background-color: rgb(37,53,61); color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
        
        <!-- Redes Sociales -->
        <a href="#" class="contA"><img src="https://res.cloudinary.com/dl6khxkkb/image/upload/v1688071984/MisPruebas/IconoFacebook.png" alt="facebook" class="imag"></a>
        <a href="#" class="contA"><img src="https://res.cloudinary.com/dl6khxkkb/image/upload/v1688071878/MisPruebas/IconoInstagram.png" alt="instagran" class="imag"></a>
        <a href="#" class="contA"><img src="https://res.cloudinary.com/dl6khxkkb/image/upload/v1688072159/MisPruebas/IconoWhatsapp.png" alt="whatsapp" class="imag"></a>
        <a href="mailto:wizardingwaresstore@gmail.com" class="contA"><img src="https://res.cloudinary.com/dl6khxkkb/image/upload/v1688072263/MisPruebas/IconoEmail.png" alt="mail" class="imag"></a>
        <!-- Redes Sociales -->

        <h4>Soporte</h4>
        <p style="font-size: 13px; padding: 0px 20px;">Comunicate con nosotros por los siguientes medios:<br/>
        Correo: <a class="aFooter" href="mailto:wizardingwaresstore@gmail.com">Wizarding Wares</a><br/>
        Whatsapp: <a class="aFooter" href="#">+55 555 555 5555</a></p>
        <p style="background-color: black; padding: 10px 0px; font-size: 14px !important;"><small>&copy; 2023 - Wizarding Wares | All rights reserved</small></p>
      </footer>
      <!-- Footer -->
    </div>
  </div>
</body>
</html>`;
  // Plantilla de correo

  // enviar correo
  transporter.verify().then(console.log).catch(console.error);
  transporter.sendMail({
    from: `"Wizarding Wares 👽" <${EMAIL_CREDENTIALS}>`,
    to: email,
    subject: asunto,
    text: mensaje,
    html: mensajeHTML, // html body
  }).then(info => {
    console.log({info});
  }).catch((error) => console.error(error.message));
  // enviar correo
};

// console.log({info});
// console.error

// Exportamos la funcion de envio de correos
module.exports = {
  enviarNotificacion,
  enviarEmail,
};


