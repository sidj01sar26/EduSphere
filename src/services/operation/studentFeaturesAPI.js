import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { studentEndpoints } from "../apis";
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const {
    COURSE_PAYMENT_API,
    COURSE_VERIFY_API,
    SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

export async function buyCourse(token, courses, user_details, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    try{
        // Load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        // check validation
        if(!res) {
            toast.error("RazorPay SDK failed to load");
            return;
        }

        // initiate the order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API,
        {courses},
        {
            Authorization: `Bearer ${token}`,
        })
        console.log("ORDER RES: ", orderResponse);

        // check validation
        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
        }

        // options
        const options = {
            // key: process.env.RAZORPAY_KEY,
            key: "rzp_test_ZisJZeNEydMnjX",
            currency: orderResponse.data.data.currency,
            amount: `${orderResponse.data.data.amount}`,
            order_id: orderResponse.data.data.id,
            name: "StudyNotion",
            description: "Thank You for Purchasing the Course",
            image: rzpLogo,
            prefill: {
                name: `${user_details.firstName}`,
                email: user_details.email
            },
            handler: function (response) {
                // send successful mail
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token);
                // verifyPayment
                verifyPayment({...response, courses}, token, navigate, dispatch);
            }
        }

        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
        paymentObject.on("payment failed", function(response) {
           toast.error("OOPS Payment Failed")
           console.log(response.error) 
        })

    } catch(error) {
        console.log("PAYMENT API ERROR.....", error);
        toast.error("Could not make Payment");
    }

    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail (response, amount, token) {
    try{
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        },{
            Authorization: `Bearer ${token}`
        })
    } catch(error){
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}

async function verifyPayment (bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment...");
    dispatch(setPaymentLoading(true));
    try{
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization: `Bearer ${token}`,
        })

        if(!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("payment Successful, you are addded to the course")
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    } catch(error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment"); 
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}