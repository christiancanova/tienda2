import twilio from "twilio";
import logger from "./winston.js";

const accountSid = 'AC643ff7ddd43d27909d1123f1ecd8f778'; 
const authToken = 'adee377ba36bcaadb16ad898485c231b'; 
const client = twilio(accountSid, authToken);
   
 

export async function checkOutSms(userPhone){
    try{
        
        const message = await client.messages 
        .create({ 
           body: 'Hola nos comunicamos con vos para informarte:Tu pedido ha sido recibido y se encuentra en proceso!', 
           from: '+13155993033',       
           to: '+54' + userPhone, 
        });
        logger.info(`SMS enviado a ${userPhone}`);
    }catch(error){
        logger.error(`Error al enviar sms, ${error}`);
    }
}

export async function checkOutWhatsapp(order){
    try{
        const message = await client.messages.create({
            body: 'Nuevo pedido de '+order.userName+' con correo: ' +order.userEmail, 
           from: 'whatsapp:+14155238886',       
           to: 'whatsapp:+5491150268364' 
         });
         logger.info(`Whatsapp enviado a ${order.userEmail}`);
    }catch(error){
        logger.error(`Error al enviar whatsapp, ${error}`);
    }
}