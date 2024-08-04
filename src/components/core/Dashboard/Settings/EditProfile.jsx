import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconButton from '../../../common/IconButton';
import { updateProfile } from '../../../../services/operation/SettingAPI';

const genders = ["Male", "Female", "Prefer not to say", "Other"]

const EditProfile = () => {

    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: {errors},
    } = useForm()

    const submitProfileForm = async(data) => {
        console.log("Form Data: ", data)
        try{
            dispatch(updateProfile(token, data))
        }catch(error){
            console.log("ERROR MESSAGE - ", error.message)
        }
    }

  return (
    <div>
      <form onSubmit={handleSubmit(submitProfileForm)} >
        <div className=' flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 my-10 p-6'>
            <h3 className=' text-lg font-semibold text-richblack-5'>Profile Information</h3>

            <div className=' flex lg:flex-row flex-col gap-6'>
                <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label htmlFor="firstName" className='lable-style'>
                        First Name
                    </label>
                    <input
                     type="text"
                     name='firstName'
                     id='firstName'
                     placeholder='Enter Your First Name'
                     {...register("firstName", {required: true}) }
                     className='form-style'
                     defaultValue={user?.firstName}
                      />
                    {errors.firstName && 
                        <span
                        className='-mt-1 text-xs text-yellow-100'
                        >Please Enter First Name</span>
                    }
                </div>
                <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label htmlFor="lastName" className='lable-style'>
                        Last Name
                    </label>
                    <input
                     type="text"
                     name='lastName'
                     id='lastName'
                     placeholder='Enter Your Last Name'
                     {...register("lastName", {required: true}) }
                     className='form-style'
                     defaultValue={user?.lastName}
                      />
                    {errors.lastName && 
                        <span
                        className='-mt-1 text-xs text-yellow-100'
                        >Please Enter Last Name</span>
                    }
                </div>
            </div>

            <div className=' flex lg:flex-row flex-col gap-6'>
                <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label htmlFor="dateOfBirth" className='lable-style'>
                        Date of Birth
                    </label>
                    <input
                     type="date"
                     name='dateOfBirth'
                     id='dateOfBirth'
                     {...register("dateOfBirth", {
                        required: {
                            value: true,
                            message: "Please enter Date of Birth",
                        },
                        max: {
                            value: new Date().toISOString().split("T")[0],
                            message: "Date of Birth cannot be in the future",
                        },
                    }) }
                     className='form-style'
                     defaultValue={user?.additionalDetails?.dateOfBirth}
                      />
                    {errors.dateOfBirth && 
                        <span
                        className='-mt-1 text-xs text-yellow-100'
                        >{errors.dateOfBirth.message}</span>
                    }
                </div>
                <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label htmlFor="gender" className='lable-style'>
                        Gender
                    </label>
                    <select
                     type="text"
                     name='gender'
                     id='gender'
                     {...register("gender", {required: true}) }
                     className='form-style'
                     defaultValue={user?.additionalDetails?.gender}
                    >
                        {
                            genders.map((gender, index) => (
                                <option key={index} value={gender}>
                                    {gender}
                                </option>
                            ))
                        }
                    </select>
                    {errors.gender && 
                        <span
                        className='-mt-1 text-xs text-yellow-100'
                        >Please Enter gender</span>
                    }
                </div>
            </div>

            <div className=' flex lg:flex-row flex-col gap-6'>
                <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label htmlFor="contactNumber" className='lable-style'>
                        Contact Number
                    </label>
                    <input
                     type="tel"
                     name='contactNumber'
                     id='contactNumber'
                     placeholder='Enter Your Contact Number Name'
                     {...register("contactNumber", {
                        required: {
                            value: true,
                            message: "Please Enter your Contact Number"
                        },
                        maxLength: {
                            value: 12,
                            message: "Invalid Contact Number",
                        },
                        minLength: {
                            value: 10,
                            message: "Invalid Contact Number",
                        }}) }
                     className='form-style'
                     defaultValue={user?.additionalDetails?.contactNumber}
                      />
                    {errors.contactNumber && 
                        <span
                        className='-mt-1 text-xs text-yellow-100'
                        >{errors.contactNumber.message}</span>
                    }
                </div>
                <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label htmlFor="about" className='lable-style'>
                        About
                    </label>
                    <input
                     type="text"
                     name='about'
                     id='about'
                     placeholder='Enter Your About'
                     {...register("about", {required: true}) }
                     className='form-style'
                     defaultValue={user?.additionalDetails?.about}
                      />
                    {errors.about && 
                        <span
                        className='-mt-1 text-xs text-yellow-100'
                        >Please Enter About</span>
                    }
                </div>
            </div>

        </div>

        <div className=' flex justify-end gap-2'>
            <button
            onClick={() => {
                navigate("/dashboard/my-profile")
            }}
            className=' cursor-pointer bg-richblack-700 rounded-md py-2 px-5 text-richblack-50 font-semibold '
            >
                Cancel
            </button>
            <IconButton type="submit" text="Update" />
        </div>
      </form>
    </div>
  )
}

export default EditProfile
