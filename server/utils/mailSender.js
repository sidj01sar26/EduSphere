const nodeMailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try{
        // Create Transport using NodeMailer
        let transporter = nodeMailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })
        // SEND MAIL
        let info = await transporter.sendMail({
            from: "StudyNotion - Palash",
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`, 
        })
        console.log(info);
        return info;

    }catch(error){
        console.log(error.message);
    }
}

module.exports = mailSender;