import React from 'react'
import { VscError } from "react-icons/vsc";
import { MdError } from "react-icons/md";
const Error = () => {
  return (
    <div className='w-[100vw] h-[100vh] bg-richblack-100 flex flex-col gap-5 justify-center items-center '>
        <div className='text-[#b51c1c] '>< MdError className='text-6xl'/> </div>
        <p className=' text-[#b51c1c] font-semibold text-4xl'>Error-404</p>
        <p className=' text-[#b51c1c] font-semibold text-4xl'>Page Not Found</p>
    </div>
  )
}

export default Error