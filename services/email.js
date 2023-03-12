// import { createTransport } from "nodemailer";
import nodemailer from "nodemailer";
import emailConfig from "../config/emailConfig.js";
import logger from "./winston.js";

const TEST_EMAIL = 'arvilla.baumbach81@ethereal.email'    

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'arvilla.baumbach81@ethereal.email',
        pass: 'YT2xZNnUmHdv7vmFtJ',
    },
});

export async function signUpEmail(newUser){
    const mailOptions = {
        from: 'Administracion <arvilla.baumbach81@ethereal.email>',
        to: TEST_EMAIL,
        subject: "Nuevo registro",
        html: `
        <h1>Nuevo usuario registrado</h1>
        <p>Se registro el usuario ${newUser.name}</p>
        <p>Su correo es ${newUser.mail} y su contraseña es ${newUser.password}(encriptada)</p>
        <p> Vive en ${newUser.address}</p>
        <p>Su telefono es +${newUser.phone}</p>
        <p>Su avatar o foto subida: </p><img src=".\\${newUser.photo}"/>
        `,
    }
    try{
        await transporter.sendMail(mailOptions);
    }catch(error){
        logger.error(`Error al enviar el email: ${error}`);
    }
}

    export  async function checkOutEMail(newOrder){
        const mailOptions = {
            from:'Administradora Tienda  <arvilla.baumbach81@ethereal.email>',
            to: TEST_EMAIL,
            subject: `nuevo pedido de ${newOrder.userName}, ${newOrder.userEmail}`,
            html: `<h1>Pedido</h1>
            ${newOrder.products.map(x=>`<li>${x.product}, cantidad: ${x.quantity}</li>`)}
            `,
        }
        try {
          await transporter.sendMail(mailOptions);
        } catch (error) {
          logger.error(`Error al enviar mail de pedido. ${error}`)
        }
    }