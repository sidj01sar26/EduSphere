import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useLocation } from 'react-router-dom';
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai'
import { Link } from 'react-router-dom'; 
import {BsArrowLeftShort} from 'react-icons/bs'
import { resetPassword } from '../services/operation/authAPI';

const UpdatePassword = () => {

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();
    const {password, confirmPassword} = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name] : e.target.value,
            }
        ))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password, confirmPassword, token))
    } 

  return (
    <div className=' text-pure-greys-300 grid min-h-[calc(100vh-3.5rem)] place-items-center'>
      {
        loading ? ( <div className='spinner'></div> )
        : (
            <div className=' max-w-[500px] p-4 lg:p-8 '>
                <h3 className=' text-3xl font-semibold text-richblack-5'>Choose new password</h3>
                <p className=' text-lg font-normal text-richblack-100 mt-3'>Almost done. Enter your new password and youre all set.</p> 
                <form onSubmit={handleOnSubmit}>
                    <label className='relative'>
                        <p className=' mb-2 text-sm font-normal text-richblack-5 mt-6'>New Password <sup className=' text-pink-200'>*</sup></p>
                        <input
                            required 
                            type={showPassword ? "text" : "password"}
                            name='password'
                            value={password}
                            onChange={handleOnChange}
                            className=' w-full !pr-10 form-style'
                        />
                        <span 
                        onClick={() => setShowPassword((prev) => !prev)}
                        className=' absolute cursor-pointer top-[38px] right-3 z-[10]'
                        >
                            {
                                showPassword 
                                ? <AiOutlineEyeInvisible fontSize={24}/> 
                                : <AiOutlineEye fontSize={24}/>
                            }
                        </span> 
                    </label>

                    <label className=' mt-5 block relative'>
                        <p className=' mb-2 text-sm font-normal text-richblack-5'>Confirm New Password <sup className=' text-pink-200'>*</sup></p>
                        <input
                            required 
                            type={showConfirmPassword ? "text" : "password"}
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={handleOnChange}
                            className='w-full !pr-10 form-style mb-6'
                        />
                        <span 
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className=' absolute cursor-pointer top-[38px] right-3 z-[10]'
                        >
                            {
                                showConfirmPassword 
                                ? <AiOutlineEyeInvisible fontSize={24}/> 
                                : <AiOutlineEye fontSize={24}/>
                            }
                        </span> 
                    </label>

                    <button
                     type='submit'
                     className=' w-full bg-yellow-50 p-3 rounded-[8px] font-medium text-richblack-900 '
                     >
                        Reset Password
                    </button>
                </form>

                <div className=' mt-3 flex items-center justify-between'>
                    <Link to="/login">
                        <p className=' flex items-center gap-x-2 text-richblack-5 p-3'>
                            <BsArrowLeftShort/>
                            Back to Login
                        </p>
                    </Link>
                </div>
            </div>
        )
      }
    </div>
  )
}

export default UpdatePassword
