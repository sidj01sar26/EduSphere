const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
require("dotenv").config();

//sendOTP

exports.sendotp = async (req, res) => {
    try{

        // Fetch Email from req body
        const {email} = req.body;

        // Check if User already Exist
        const checkUserPresent = await User.findOne({email});

        // If user already exist then return a function
        if(checkUserPresent){
            return res.status(401).json({
                success: false,
                message: 'User already Registered',
            })
        }

        // Genarate OTP
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log("OTP Generator:", otp);

        // check OTP Unique or not
        // from our OTP collection
        let result = await OTP.findOne({otp: otp});
        console.log("Result is Generate OTP Func");
		console.log("OTP", otp);
		console.log("Result", result);

        //if otp is not unique again we generate a new OTP and check
        while(result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
        }
        result = await OTP.findOne({otp: otp});

        // now we entry our OTP in Database
        // Create a Payload
        const otpPayload = {email, otp}

        // Create an entry for OTP
        const otpBody = await OTP.create(otpPayload);
        console.log("OTP Body", otpBody);

        // return response successFull
        return res.status(200).json({
            success: true,
            message: "OTP sent Successfully",
            otp,
        })

    } catch(error){
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

// signUp

exports.signUp = async (req, res) => {
    try{

        // fetch Data from req body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;

        // Validate Data
        // we did not check accountType because in our UI there is a Tab for Account type so we get the value from there
        // we did not check contactNumber because this is optional. If this is *star* (requird) then we have to check contact.
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            })
        }

        // verify/Match two Password
        if(password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and ConfirmPassword does not match, Please try again",
            })
        }

        // Check User already exist or not
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: "User is already Registerd. Please sign in to continue.",
            });
        }

        // find most recent OTP from OTP Store
        const recentOtp = await OTP.find({email}).sort({createdAt: -1}).limit(1);
        console.log(recentOtp);

        // Validate OTP
        if(recentOtp.length === 0){
            return res.status(400).json({
                success: false,
                message: "OTP not Found",
            })
        } else if(otp !== recentOtp[0].otp){
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            })
        }

        // Hash Password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create the User
        // DOUBT PENDING
        let approved = "";
        approved === "Instructor" ? (approved = false) : (approved = true);

        // Entry create in DB
        const profileDetails = await Profile.create({
            gender: null, 
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashPassword,
            accountType: accountType,
			approved: approved,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/6.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        // return response
        return res.status(200).json({
            success: true,
            message: "User is registered Successfully",
            user,
        })

    }catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// logIn

exports.login = async(req, res) => {
    try{

        // Get data from req body
        const {email, password} = req.body;

        // validation Data
        if(!email || !password){
            return res.status(403).json({
                success: false,
                message: "All fields are required, Please try again"
            });
        }

        // check user exist or not
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User is not register, Please Signup first!"
            })
        }

        // generate JWT after Password Matching
        if(await bcrypt.compare(password, user.password)) {
            // const payload = {
            //     email: user.email,
            //     id: user._id,
            //     accountType: user.accountType,
            // }
            const token = jwt.sign(
                {email: user.email,
                id: user._id,
                accountType: user.accountType,
                }, 
                process.env.JWT_SECRET, 
                {
                    expiresIn: "24h",
                }
            );

			// Save token to user document in database
            user.token = token;
            user.password = undefined;
            
            // create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged in Successfully",
            })
        }else{
            return res.status(401).json({
                success: false,
                message: "Password is incorrect",
            })
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "login failed please try again",
        });
    }
} 

// CHANGE PASSWORD
exports.changePassword = async (req,res) => {
    try{

        // Get user data from req.user
        const userDetails = await User.findById(req.user.id)

        // Get Old, New, Confirm Password from req.body
        const {oldPassword, newPassword, confirmPassword} = req.body;

        // Validate Old password
        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password,
        );
        if(!isPasswordMatch){
            return res.status(401).json({
                success: false,
                message: "The Password is Incorrect",
            });
        }

        // Match new password ans confirm Password
        // if(newPassword !== confirmPassword){
        //     return res.status(400).json({
        //         success: false,
        //         message: "The password and confirm password does not match",
        //     });
        // }

        // update Password
        const encryptedPassword = await bcrypt.hash(newPassword, 10);

        const updateUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            {password: encryptedPassword},
            {new: true},
        );

        // send notification mail
        try{
            const emailResponse = await mailSender(
                updateUserDetails.email,
                passwordUpdated(
                    updateUserDetails.email,
                    `Password updated successfully for ${updateUserDetails.firstName} ${updateUserDetails.lastName}`
                )
            );
            console.log("Email sent Successfully:", emailResponse.response);
        } catch(error){
            console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
        }

        // return response
        return res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });

    }catch(error){
        console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
    }
}
