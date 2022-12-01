require('dotenv').config()
const sid = process.env.SID_TWILIO
const psw = process.env.TOKEN_TWILIO
const MYPHONE = process.env.TELEFONO
const twilio = require('twilio')
const logger = require('../loggerConfig')
const cliente = twilio(sid, psw);

const enviarSMS = async (num) => {
    try {
        const mensaje = await cliente.messages.create({
            from: "+19453455834",
            to: `+${num}`,
            body:`Su orden fue recibida con exito`
        })
        console.log(mensaje)

        logger.log('info', "Whatsapp enviado al Administrador")
    } catch (error) {
        logger.log('error', error)
    }
}

const enviarWA = async (user) => {
    try {
        const mensaje = await cliente.messages.create({
            from: "whatsapp:+14155238886",
            to: `whatsapp:${MYPHONE}`,
            body:` Nuevo registro de usuario ${user}`
        })
        console.log(mensaje)

        logger.log('info', "Whatsapp enviado al Administrador")
    } catch (error) {
        logger.log('error', error)
    }
}
module.exports= {enviarWA, enviarSMS}