const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// resetPasswordToken (uses: MailSend)
exports.resetPasswordToken = async (req, res) => {
    try{
        // get email from req body
        const email = req.body.email;

        // check user for this email, email verification
        const user = await User.findOne({email: email});
        if(!user){
            return res.json({
                success: false,
                message: `Your Email: ${email} is not registered with us, Enter a Valid Email`,
            })
        }
        // Genarete Token
        // const token = crypto.randomUUID();
        const token = crypto.randomBytes(20).toString("hex");

        // Update User by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate(
                {email: email},
                {
                    token: token,
                    // resetPasswordExpires: Date.now() + 5*60*1000,
                    resetPasswordExpires: Date.now() + 3600000,
                },
                {new: true}
        );
		console.log("DETAILS", updatedDetails);


        // create url
        const url = `http://localhost:3000/update-password/${token}`;

        // send mail containing the url
        await mailSender(email,
                        "Password Reset Link",
                        `Password Reset Link ${url}`);

        // return response
        return res.json({
            success: true,
            message: "Email sent Successfully, Please check email and change Password",
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
			error: error.message,
            success: false,
            message: "Something went wrong while sending reset Password Mail",
        });
    }
}

// resetPassword  
exports.resetPassword = async (req, res) => {
    try{

        // Data Fetch
        const {password, confirmPassword, token} = req.body;

        // Validation
        if(password !== confirmPassword) {
            return res.json({
                success: false,
                message: "Password Not Matching",
            })
        }

        // Get user details from db using token
        const userDetails = await User.findOne({token: token});

        // If no Entry - Invalid Token
        if(!userDetails){
            return res.json({
                success: false,
                message: "Token is invalid",
            });
        }

        // check token time
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.json({
                success: false,
                message: "Token is expires, Please regenarete Token",
            })
        }

        // Hash Password
        const hashPassword = await bcrypt.hash(password, 10);

        // update Password
        await User.findOneAndUpdate(
            {token: token},
            {password: hashPassword},
            {new: true},
        );

        // return response
        return res.status(200).json({
            success: true,
            message: "Password Reset Successfully",
        })


    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while reset Password",
        });
    }
}