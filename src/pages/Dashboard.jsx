import React from 'react'
import SideBar from '../components/core/Dashboard/SideBar';
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';

const Dashboard = () => {

    const {loading: authLoading} = useSelector( (state) => state.auth);
    const {loading: profileLoading} = useSelector( (state) => state.profile);

    if(authLoading || profileLoading){
        return(
            <div className=' grid min-h-[calc(100vh-3.5rem)] place-items-center'>
                <div className='spinner'></div>
            </div>
        )
    }

  return (
    <div className=' relative flex min-h-[calc(100vh-3.5rem)]'>
      <SideBar />
      <div className='h-[calc(100vh-3.5rem)] flex-1 overflow-auto'>
        <div className=' mx-auto w-11/12 max-w-[1000px] py-10'>
            <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
