import React from 'react'
import { useSelector } from 'react-redux'
import {Outlet} from "react-router-dom"
import Sidebar from '../components/core/Dashboard/Sidebar'

const Dashboard = () => {

    const {loading: authLoading} = useSelector( (state) => state.auth );
    const {loading: profileLoading} = useSelector( (state) => state.profile );
    const {user} = useSelector((state) => state.profile);

    if(user===null){
        return (
            <div className=' flex items-center justify-center text-9xl text-center text-white h-[100vh]'>
                User is Null
            </div>
        )
    }


    if(profileLoading || authLoading) {
        return (
            <div className='mt-10'>
                Loading...
            </div>
        )
    }


  return (
    <div className='relative flex bg-richblack-400'>
        <Sidebar />
        <div className=' flex-1 overflow-auto bg-[#0f0f0f]'>
            <div className='py-10'>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Dashboard
