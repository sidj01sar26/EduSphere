import React, { useState } from 'react'
import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai"
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../services/operation/authAPI';

const LoginForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [showPassword, setShowPassword] = useState(false);

    const {email, password} = formData

    const changeHandler = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name] : e.target.value    
        }))
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password, navigate))
    }

  return (
    <div>
      <form 
      onSubmit={submitHandler}
      className=' w-full flex flex-col gap-y-4 mt-6'>
        <label className=' w-full'>
            <p className=' mb-2 text-sm font-normal text-richblack-5'> Email Address <sup className=' text-pink-200'>*</sup> </p>
            <input 
                type="email" 
                name="email" 
                value={email} 
                placeholder='Enter Email Address'
                style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className=' w-full text-richblack-5 bg-richblack-800 p-3 rounded-[0.5rem]'
                onChange={changeHandler}
                />
        </label>

        <label className=' w-full relative'>
            <p className=' mb-2 text-sm font-normal text-richblack-5'> Password <sup className=' text-pink-200'>*</sup> </p>
            <input 
                type={showPassword ? ("text") : ("password")} 
                name="password" 
                value={password} 
                placeholder='Enter PassWord'
                style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className=' w-full text-richblack-5 bg-richblack-800 p-3 rounded-[0.5rem]'
                onChange={changeHandler}
                />

            <span 
            onClick={() => setShowPassword((prev) => !prev)}
            className=' absolute right-3 top-[40px] z-10 cursor-pointer'>
                {showPassword ? <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/> : <AiOutlineEye fontSize={24} fill='#AFB2BF'/>}
            </span>
            <Link to="/forgot-password">
                <p className="mt-3 ml-auto max-w-max text-xs text-blue-100">
                    Forgot Password
                </p>
            </Link>
        </label>

        <button 
        type='submit'
        className='mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 text-base '>Sign In</button>
      </form>
    </div>
  )
}

export default LoginForm
