require('dotenv').config()
const nodemailer = require('nodemailer')
const EMAIL = process.env.EMAIL
const PASSWORD = process.env.PASSWORD
const logger = require('../loggerConfig')
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: EMAIL,
        pass: PASSWORD
    }
});
const receptor = "kevon97@ethereal.email"

const enviarMail = async (user) => {
    try {
        const info = await transporter.sendMail({
            to: receptor,
            from: EMAIL,
            subject: "Nuevo Registro",
            text: ` Nuevo Usuario Registrado con el email: ${user}`
        });
        logger.log('info', "Correo enviado al administrador");

    } catch (error) {
        console.log(error)
    }
}
const enviarMailOrden = async (body) => {
    try {
        const info = await transporter.sendMail({
            to: receptor,
            from: EMAIL,
            subject: "Nueva Orden",
            text: ` Nueva Orden realizada con los datos: ${body}`
        });
        logger.log('info', "Correo de nueva orden enviado al administrador");

    } catch (error) {
        console.log(error)
    }
}
module.exports = { enviarMail, enviarMailOrden }