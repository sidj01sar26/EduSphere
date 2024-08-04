import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children, linkto, active}) => {
  return (
    <Link to={linkto}>
        <div className={`text-center text-base font-bold rounded-md py-3 px-6
        ${active ? " bg-yellow-50 text-richblack-900 shadow-[0px_-1px_0px_0px_rgba(255,255,255,0.18)_inset]" : " bg-richblack-800 shadow-[0px_-1px_0px_0px_rgba(255,255,255,0.18)_inset]" } 
        hover:scale-95 transition-all duration-200
        `}>
            {children}
        </div>
    </Link>
  )
}

export default Button
