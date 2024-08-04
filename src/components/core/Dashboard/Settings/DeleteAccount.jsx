import React from 'react'
import {FiTrash2} from "react-icons/fi"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { deleteaccount } from '../../../../services/operation/SettingAPI';

const DeleteAccount = () => {

    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    async function deleteAccountHandler() {
        try{
            dispatch(deleteaccount(token, navigate))
        }catch(error){
            console.log("ERROR MESSAGE: ", error.message)
        }
    }

  return (
    <div>
      <div className=' my-10 p-8 px-12 gap-x-5 flex flex-row border-[1px] border-pink-700 bg-pink-900 rounded-md'>
        <div className=' h-14 w-14 aspect-square flex items-center justify-center bg-pink-700 rounded-full '>
            <FiTrash2 className=' text-3xl text-pink-200' />
        </div>

        <div className=' flex flex-col space-y-2'>
            <h3 className=' text-lg font-bold text-pink-5'>Delete Account</h3>
            <div className=' w-3/5 text-pink-25'>
                <p>Would you like to delete account?</p>
                <p>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
            </div>

            <button
                type='button'
                onClick={deleteAccountHandler}
                className=' bg-pink-700 p-4 rounded-lg italic w-fit text-pink-100'
            >
                I want to delete my account.
            </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteAccount
