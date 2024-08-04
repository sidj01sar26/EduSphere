const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");


const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
    }
});

// Send the OTP in Mail
//Create a Function

async function sendVerificationEmail(email, otp) {
    try{
        const mailResponse = await mailSender(email, "Verification Email from Study notion", emailTemplate(otp));
        console.log("Email Sent Successfully: ", mailResponse.response);

    }catch(error){
        console.log("Error occured while sending mail:", error);
        throw error;
    }
}

// before save the document we send a verification email with current object data (this.email, this.otp)
// create a pre middleware
OTPSchema.pre("save", async function(next) {
	console.log("New document saved to database");

    if(this.isNew){
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
});


module.exports = mongoose.model("OTP", OTPSchema);