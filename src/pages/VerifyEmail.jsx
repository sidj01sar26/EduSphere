import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'; 
import {BsArrowLeftShort} from 'react-icons/bs'
import {BiRotateLeft} from 'react-icons/bi'
import { sendotp, signUp } from '../services/operation/authAPI';
import OTPInput from 'react-otp-input';

const VerifyEmail = () => {

    const [otp, setOtp] = useState("");

    const {signupData, loading} = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(!signupData){
            navigate("/signup")
        }
        // eslint-disable-next-line
    }, [])

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData;
    
        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
    }

  return (
    <div className=' min-h-[calc(100vh-3.5rem)] grid place-items-center'>
      {
        loading 
        ? ( <div className='spinner'></div> )
        : (
           <div className=' max-w-[500px] p-4 lg:p-8 gap-6'>

            <h3 className=' text-richblack-5 font-semibold text-3xl'>Verify email</h3>

            <p className=' text-lg font-normal text-richblack-100 mt-3'>A verification code has been sent to you. Enter the code below</p>

            <form onSubmit={handleOnSubmit}>
                <OTPInput 
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => (
                        <input 
                            {...props} 
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                        className='w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-md aspect-square text-richblack-5 text-center focus:border-0 focus:outline-2 focus:outline-yellow-50 '
                    />)}
                    containerStyle={{
                    justifyContent: "space-between",
                    marginTop: "24px", marginBottom: "24px"
                    }}
                />

                <button
                 type='submit'
                 className=' w-full bg-yellow-50 p-3 rounded-lg font-semibold text-richblack-900 text-base'
                 >
                    Verify Email
                </button>
            </form>

            <div className=' flex items-center justify-between mt-3'>
                <div className=' '>
                    <Link 
                    to="/login"
                    className='flex text-richblack-5 items-center gap-x-2 text-base font-medium'>
                        <BsArrowLeftShort size={30}/>
                        <p>Back to Login</p>
                    </Link>
                </div>

                <button
                    onClick={() => dispatch(sendotp(signupData.email, navigate))}
                    className='flex text-blue-100 items-center gap-x-2 text-base font-medium'    
                >
                    <BiRotateLeft size={30}/>
                    <p>Resend</p>
                </button>

            </div>

           </div> 
        )
      }
    </div>
  )
}

export default VerifyEmail
