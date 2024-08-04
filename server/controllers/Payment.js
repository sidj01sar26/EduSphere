const { default: mongoose } = require("mongoose");
const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require ("../mail/templates/courseEnrollmentEmail");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");


exports.capturePayment = async(req, res) => {

    // fetch courses and userId
    const {courses} = req.body;
    console.log("courses data: ", courses)
    const userId = req.user.id;

    // check validation
    if(courses.length === 0) {
        return res.json({
            success: false,
            message: "Please provide CourseId.",
        })
    }

    // Count Total Amount 
    let total_amount = 0;

    for(const course_id of courses) {
        let course;
        try{
          // find the course using spacified courseid
          course = await Course.findById(course_id)

          // check validation
          if(!course){
            return res.status(200).json({
                success: false,
                message: "Could not find the course"
            })
          }

          // check user already enrolled the course or not
          const uid = new mongoose.Types.ObjectId(userId);
          if(course.studentEnrolled.includes(uid)) {
            return res.status(200).json({
                success: false,
                message: "Student is already Enrolled",
            })
          }

          // add the course price in total amount
          total_amount += course.price;
        } catch(error){
            console.log(error)
            return res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }

    // create Options for order
    const options = {
        "amount": total_amount * 100,
        "currency": "INR",
        "receipt": Math.random(Date.now()).toString(),
    }

    // create order
    try{
        const paymentResponse = await instance.orders.create(options);
        console.log("paymentResponse :", paymentResponse)
        res.json({
            success: true,
            data: paymentResponse,
        })
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Could not initiate order"
        })
    }

}

// Verify The Payment
exports.verifyPayment = async(req, res) => {

    // fetch
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    // check Validation
    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
        return res.status(200).json({
            success: false,
            message: "Payment Failed"
        });
    }

    // use SHA256 Algo
    // let body = razorpay_order_id + "|" + razorpay_payment_id;
    // console.log("BODY: ", body)
    const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    // .update(body.toString())
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

    // compare expected signature and razorpay signature
    if(expectedSignature === razorpay_signature) {
        // enroll the student
        await enrollStudents(courses, userId, res);
        // return response
        return res.status(200).json({
            success:true, 
            message:"Payment Verified"});
    }
    return res.status(200).json({
        success:false, 
        message:"Payment Failed"});

}

// Enrolled Student
const enrollStudents = async(courses, userId, res) => {
    // check userId and courses present or not
    if(!courses || !userId) {
        return res.status(400).json({success:false,message:"Please Provide data for Courses or UserId"});
    }

    for(const courseId of courses) {
        try{
            // find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                {_id: courseId},
                {$push: {studentEnrolled: userId}},
                {new: true},
            )

            // check validation
            if(!enrolledCourse) {
                return res.status(500).json({success:false,message:"Course not Found"});
            }

            //
            const courseProgress = await CourseProgress.create({
                courseID: courseId,
                userId: userId,
                completedVideos: [],
            })

            //find the student and add the course to their list of enrolledCOurses
            const enrolledStudent = await User.findByIdAndUpdate(
                userId,
                {$push: {
                    courses: courseId,
                    courseProgress: courseProgress._id,
                }},
                {new: true}
            )

            // send email response
            const emailResponse = await mailSender(
                enrollStudents.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`)
            )    

        } catch(error){
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }
}

exports.sendPaymentSuccessEmail = async(req, res) => {
    const {orderId, paymentId, amount} = req.body;

    const userId = req.user.id;

    // validation
    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please provide all the fields"
        })
    }

    try{
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
            paymentSuccessEmail(`${enrolledStudent.firstName}`, amount/100, orderId, paymentId)
        )
    } catch(error) {
        console.log("error in sending mail", error)
        return res.status(500).json({
            success:false, 
            message:"Could not send email"
        })
    }
}



// // Capture the payment and initiate the razorpay order
// exports.capturePayment = async (req, res) => {

//         // get courseId and userId
//         const {course_id} = req.body;
//         const userId = req.user.id;

//         // validation
//         // valid CourseId
//         if(!course_id){
//             return res.json({
//                 success: false,
//                 message: "Please Provide valid courseId"
//             })
//         }

//         // Valid courseDetails
//         let course;
//         try{
//             course = await Course.findById(course_id);
//             if(!course){
//                 return res.json({
//                     success: false,
//                     message: "Could not find the course",
//                 })
//             }

//             // user already pay for the same course
//             const uid = new mongoose.Types.ObjectId(userId);
//             if(course.studentEnrolled.includes(uid)){
//                 return res.status(200).json({
//                     success: false,
//                     message: "Student is already enrolled",
//                 })
//             }
//         }catch(error){
//             console.error(error);
//             return res.status(500).json({
//                 success: false,
//                 message: error.message,
//             })
//         }
        
//         // order create
//         const amount = course.price;
//         const currency = "INR";

//         const options = {
//             amount: amount * 100,
//             currency,
//             recipt: Math.random(Date.now()).toString(),
//             notes: {
//                 courseId: course_id,
//                 userId,
//             }
//         };

//         try{
//             // initiate the payment using razorpay
//             const paymentResponse = await instance.orders.create(options);
//             console.log(paymentResponse);

//             // return response
//             return res.status(200).json({
//                 success: true,
//                 courseName: course.courseName,
//                 courseDescription: course.courseDescription,
//                 thumbnail: course.thumbnail,
//                 orderId: paymentResponse.id,
//                 currency: paymentResponse.currency,
//                 amount: paymentResponse.amount,
//             })

//         }catch(error){
//             console.log(error);
//             res.json({
//                 success: false,
//                 message: "Could not initiate order",
//             })
//         }
// };

// // VERIFY SIGNATURE OF RAZORPAY AND SERVER

// exports.verifySignature = async (req, res) => {

//     const webhookSecret = "12345678";

//     const signature = req.headers("x-razorpay-signature");

//     const shasum = crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if(signature === digest){
//         console.log("Payment is Authorised"); 

//         const {courseId, userId} = req.body.payload.payment.entity.notes;

//         try{

//             // Fullfill the action
//             // Find the course and enroll the student in it
//             const enrolledCourse = await Course.findOneAndUpdate(
//                 {_id: courseId},
//                 {$push: {studentEnrolled: userId}},
//                 {new: true},
//             );

//             if(!enrolledCourse) {
//                 return res.status(500).json({
//                     success: false,
//                     message: "Course not found",
//                 });
//             }
//             console.log(enrolledCourse);

//             // Find the student and add the course to their list enrolled course
//             const enrollStudent = await User.findOneAndUpdate(
//                 {_id: userId},
//                 {$push: {courses: courseId}},
//                 {new: true},
//             );
//             console.log(enrollStudent);

//             // Send Confirmation mail
//             const emailResponse = await mailSender(
//                 enrollStudent.email,
//                 "Congrats from StudyNotion",
//                 "Congrats for your onboard"
//             );
//             console.log(emailResponse);

//             return res.status(200).json({
//                 success: true,
//                 message: "Signature verified and Course Added",
//             });

//         }catch(error){
//             console.log(error);
//             return res.status(500).json({
//                 success: false,
//                 message: error.message,
//             });
//         }
//     }
//     else{
//         return res.status(400).json({
//             success: false,
//             message: "Invalid Request",
//         });
//     }
// }