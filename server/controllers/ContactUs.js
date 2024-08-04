const mailSender = require("../utils/mailSender");
const {contactUsEmail} = require("../mail/templates/contactFormRes")

exports.contactUsController = async(req, res) => {

    const{ email, firstname, lastname, message, phoneNo, countrycode} = req.body;
    console.log(req.body);

    try{
        const emailRes = await mailSender(
            email,
            "Your Data Send Successfully",
            contactUsEmail(email, firstname, lastname, phoneNo, message, countrycode)
        )
        console.log("Email Response" ,emailRes)
        return res.json({
            success: true,
            message: "Email send successfully",
          })
    }catch(error){
        console.log("Error", error)
        console.log("Error message :", error.message)
        return res.json({
          success: false,
          message: "Something went wrong...",
        })
    }
}