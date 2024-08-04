import React, { useState } from 'react'
import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai"
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import Tab from '../../common/Tab';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { setSignupData } from '../../../slices/authSlice';
import { sendotp } from '../../../services/operation/authAPI';


const SignupForm = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

    const {firstName, lastName, email, password, confirmPassword} = formData


    const changeHandler = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name] : e.target.value,
        }))
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if(formData.password !== formData.confirmPassword){
            toast.error("Password Not Matched");
            return;
        }
        const signupData = {
            ...formData,
            accountType,
        }
        dispatch(setSignupData(signupData))
        // Send OTP to user for verification
        dispatch(sendotp(formData.email, navigate))

        // Reset
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        })
        setAccountType(ACCOUNT_TYPE.STUDENT)
    }


    const tabData = [
        {
            id: 1,
            tabName: "Student",
            type: ACCOUNT_TYPE.STUDENT,
        },
        {
            id: 2,
            tabName: "Instructor",
            type: ACCOUNT_TYPE.INSTRUCTOR,
        }
    ]


  return (
    <div>
    {/* USER TAB */}
    <Tab tabData={tabData} field={accountType} setField={setAccountType} />
    {/* FORM */}
    <form onSubmit={submitHandler}>
        <div className=' w-full flex justify-between gap-x-4'>
            <label className='mt-[10px]'>
                <p className="mb-2 text-[0.875rem] leading-[1.375rem] text-richblack-5"> First Name <sup className=' text-pink-200'>*</sup> </p>
                <input 
                    type="text" 
                    value={firstName}
                    name='firstName'
                    placeholder='First Name'
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    onChange={changeHandler}
                />
            </label>
            <label className='mt-[10px]'>
                <p className="mb-2 text-[0.875rem] leading-[1.375rem] text-richblack-5"> Last Name <sup className=' text-pink-200'>*</sup> </p>
                <input 
                    type="text" 
                    value={lastName}
                    name='lastName'
                    placeholder='Last Name'
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    onChange={changeHandler}
                />
            </label>
        </div>

        <div className=' mt-[10px]'>
            <label className=' w-full'>
            <p className="mb-2 text-[0.875rem] leading-[1.375rem] text-richblack-5"> Email <sup className=' text-pink-200'>*</sup> </p>
                <input 
                    type="text" 
                    value={email}
                    name='email'
                    placeholder='Your Email Address'
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    onChange={changeHandler}
                />
            </label>
        </div>

        <div className=' w-full flex justify-between gap-x-4'>
        <label className=' relative mt-[10px]'>
                <p className="mb-2 text-[0.875rem] leading-[1.375rem] text-richblack-5"> Password <sup className=' text-pink-200'>*</sup> </p>
                <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    name='password'
                    placeholder='Your Password'
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    onChange={changeHandler}
                />
                <span 
                onClick={() => setShowPassword((prev) => !prev)}
                className=' absolute right-3 top-[40px] z-10 cursor-pointer'>
                {showPassword ? <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/> : <AiOutlineEye fontSize={24} fill='#AFB2BF'/>}
                </span>
            </label>
            <label className='mt-[10px] relative'>
                <p className="mb-2 text-[0.875rem] leading-[1.375rem] text-richblack-5"> Confirm Password <sup className=' text-pink-200'>*</sup> </p>
                <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    value={confirmPassword}
                    name='confirmPassword'
                    placeholder='Confirm Password'
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    onChange={changeHandler}
                />
                <span 
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className=' absolute right-3 top-[40px] z-10 cursor-pointer'>
                {showConfirmPassword ? <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/> : <AiOutlineEye fontSize={24} fill='#AFB2BF'/>}
                </span>
            </label>
        </div>

        <button 
        type='submit'
        className=' w-full mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 text-base '>Create Account</button>


      </form>  

    </div>
  )
}

export default SignupForm
