import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import CountryCode from "../../../data/countrycode.json"

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async(data) => {
        console.log("Logging Data", data);
        try{
            setLoading(true);
            // const response = await apiConnector("POST", contactusEndpoints.CONTACT_US_API, data);
            const response = {status:"OK"}
            console.log("logging response", response);
            setLoading(false)
        }catch(error){
            console.log("Errors:", error.message);
            setLoading(false);
        }

    }

    useEffect( () => {
        if(isSubmitSuccessful){
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
                phoneNo: "",
            })
        }
    }, [reset, isSubmitSuccessful])

  return (
    <form 
    onSubmit={handleSubmit(submitContactForm)}
    className=' flex flex-col gap-7'    
    >

        <div className=' flex flex-col lg:flex-row gap-5'>
            {/* First Name */}
            <div className=' flex flex-col gap-2 lg:w-[48%]'>
                <label 
                htmlFor="firstname"
                className=' lable-style'
                >First Name</label>
                <input 
                    type="text" 
                    name='firstname'
                    id='firstname'
                    placeholder='Enter First Name'
                    className='form-style'
                    {
                        ...register("firstname", {required:true})
                    } 
                />
                {
                    errors.firstname && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please Enter Your First Name
                        </span>
                    )
                }
            </div>

            {/* Last Name */}
            <div className=' flex flex-col gap-2 lg:w-[48%]'>
                <label 
                htmlFor="lastname"
                className=' lable-style'
                >Last Name</label>
                <input 
                    type="text" 
                    name='lastname'
                    id='lastname'
                    placeholder='Enter Last Name'
                    className='form-style'
                    {
                        ...register("lastname")
                    } 
                />
            </div>
        </div>

        {/* Email */}
        <div className=' flex flex-col gap-2'>
            <label 
            htmlFor="email"
            className=' lable-style'
            >Email Address</label>
            <input 
                type="email" 
                name='email'
                id='email'
                placeholder='Enter Email'
                className='form-style'
                {
                    ...register("email", {required:true})
                } 
            />
            {
                errors.email && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        Please Enter Your Email
                    </span>
                )
            }
        </div>

        {/* Phone No */}
        <div className=' flex flex-col gap-2'>
          <label 
          htmlFor="phoneNo"
          className=' lable-style'
          >Phone No</label>  

          <div className=' flex gap-5'>
            {/* Country Code DropDown */}
            <div className=' flex flex-col gap-2 w-[81px]'>
                <select 
                    name="dropdown" 
                    id="dropdown"
                    className="form-style"
                    {...register("countrycode", {required:true})}
                >
                    {
                        CountryCode.map((code, index) => {
                            return(
                            <option
                                key={index} 
                                value={code.code}
                            >
                               {code.code} -{code.country} 
                            </option>  
                            )
                        })
                    }
                </select>
            </div>

            {/* Number Field */}
            <div className=' flex flex-col w-[calc(100%-90px)]'>
                <input 
                    type='number' 
                    name='phoneNo'
                    id='phoneNo'
                    placeholder='12345 67890'
                    className="form-style"
                    {...register("phoneNo", {
                        required:true, 
                        maxLength:{
                            value:10, message:"Invalid Phone Number"
                        }, 
                        minLength:{
                            value: 8,
                            message: "Invalid Phone Number"
                        }})
                    }
                />
            </div>
          </div>
          {
            errors.phoneNo && (
                <span className="-mt-1 text-[12px] text-yellow-100"> {errors.phoneNo.message} </span>
            )
          }
        </div>
        
        {/* Message */}
        <div className=' flex flex-col gap-2'>
            <label 
            className="lable-style"
            htmlFor="message">Message</label>
            <textarea  
                name='message'
                id='message'
                cols="30"
                rows="7"
                placeholder='Enter Your Message'
                className="form-style"
                {
                    ...register("message", {required:true})
                } 
            />
            {
                errors.message && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        Please Enter Your message
                    </span>
                )
            }
        </div>

        {/* Buttons */}
        <button 
            disabled={loading}
            type='submit'
            className={` rounded-md bg-yellow-50 text-center p-3 text-base font-medium text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]
            ${
                !loading && " transition-all duration-200 hover:scale-95 hover:shadow-sm"
            } disabled:bg-richblack-500 sm:text-base
            `}
        >
            Send Message
        </button>

    </form>
  )
}

export default ContactUsForm
