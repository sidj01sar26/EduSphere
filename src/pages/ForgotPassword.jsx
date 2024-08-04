import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {BsArrowLeftShort} from "react-icons/bs"
import { getPasswordResetToken } from '../services/operation/authAPI';

const ForgotPassword = () => {

    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");

    const {loading} = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent))
    }

  return (

    <div className='text-white grid min-h-[calc(100vh-3.5rem)] place-items-center'>
      {
        loading 
        ? ( <div className='spinner'></div> ) 
        : (
            <div className=' max-w-[500px] p-4 lg:p-8'>
                <h3 className=' text-3xl font-semibold text-richblack-5'>
                    {
                        !emailSent 
                        ? "Reset your password"
                        : "Check email"
                    }
                </h3>
                <p className=' text-lg font-normal text-richblack-100 mt-3'>
                    {
                        !emailSent 
                        ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                        : `We have sent the reset email to ${email}`
                    }
                </p>
                <form onSubmit={handleOnSubmit}>
                    {
                        !emailSent && (
                            <label className=' w-full'>
                                <p
                                 className=' text-sm font-normal text-richblue-5 mb-1 mt-9'>Email Address <sup className=' text-pink-200'>*</sup></p>
                                <input 
                                type='email'
                                name='email'
                                value={email}
                                placeholder='Enter Your Email'
                                onChange={(e) => setEmail(e.target.value)}
                                className=' w-full form-style'
                                />
                            </label>
                        )
                    }

                    <button
                     type='submit'
                     className=' w-full bg-yellow-50 rounded-[8px] p-3 text-richblack-900 font-medium mt-9'
                     >
                        {
                            !emailSent
                            ? "Reset Password"
                            : "Resend email"
                        }
                    </button>
                </form>

                <div className=' flex items-center justify-between p-3'>
                    <Link to="/login">
                        <p className=' flex items-center gap-x-2 text-richblack-5'>
                            <BsArrowLeftShort size={30}/>
                            Back to Login
                        </p>
                    </Link>
                </div>
            </div>
        )}
    </div>
  )
}

export default ForgotPassword
