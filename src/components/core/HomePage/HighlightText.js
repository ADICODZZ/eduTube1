import React from "react"

const HighlightText=({text})=>{
    return(
        <span className=" bg-gradient-to-b from-[#f10606] via-[#e24343] to-[#f1b3b3] text-transparent bg-clip-text font-bold font-bold text-[#d62626]">
           {" "} 
            {text}
        </span>
    )
}
export default HighlightText;