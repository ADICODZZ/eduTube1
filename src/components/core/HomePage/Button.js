import React from "react"
import { Link } from "react-router-dom"
const CTAButton=({children,active,linkto})=>{
    return (
        <Link to={linkto}>

        <div className={`text-center text-[13px] px-6 py-3 rounded-md font-bold
        ${active?"bg-[#d62626] text-[#ffffff]":"bg-richblack-800"}`}>
            {children}
        </div>

        </Link>
    )
}

export default CTAButton