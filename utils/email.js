// import { createTransport } from "nodemailer";
import nodemailer from "nodemailer";
import config from '../config/emailConfig.js'
import logger from "./winston.js";

const TEST_EMAIL = 'ccanova@live.com.ar'    
let testAccount = await nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: testAccount.user,
        pass: testAccount.pass,
    },
});

export async function signUpEmail(newUser){
    const mailOptions = {
          from:'Christian <ccanova@live.com.ar>',
          to: `${newUser.mail}`,
          subject: "DOLCE: Confirmacion de cuenta",
          html: `
            <h1>Hola ${newUser.name}</h1> 
            <p>Gracias por registrarte en DOLCE</p>
            <p>EMAIL: ${newUser.mail}</p>
            <p>Si no creaste esta cuenta puedes ignorar el mensaje</p>
            `
    };
        try{
            await transporter.sendMail(mailOptions);
        }catch(error){
            logger.error(`Error al enviar el email: ${error}`);
        }
    };

    export async function checkOutEMail(newOrder){
        const mailOptions = {
            from:'Christian <ccanova@live.com.ar>',
            to: TEST_EMAIL,
            subject: `nuevo pedido de ${newOrder.userName}, ${newOrder.userEmail}`,
            html: `<h1>Tu nuevo pedido a sido generado con exito</h1>
            ${newOrder.products.map(x=>`<li>${x.products}, cantidad: ${x.quantity}</li>`)}
            `,
        }
        try {
          await transporter.sendMail(mailOptions);
        } catch (error) {
          logger.error(`Error al enviar mail de pedido. ${error}`)
        }
    }