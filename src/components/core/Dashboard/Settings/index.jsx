import React from 'react'
import UpdateDisplayPicture from './UpdateDisplayPicture'
import EditProfile from './EditProfile'
import ChangePassword from './ChangePassword'
import DeleteAccount from './DeleteAccount'

export default function Settings (){
 return(
   <div>
    <h1 className=' mb-14 text-3xl font-medium text-richblack-5'>Edit Profile</h1>

    {/* UPDATE_PROFILE_PICTURE */}
    <UpdateDisplayPicture />

    {/* EDIT_PROFILE */}
    <EditProfile />

    {/* UPDATE_PASSWORD */}
    <ChangePassword />

    {/* DELETE_ACCOUNT */}
    <DeleteAccount />
  </div>
 )
}
