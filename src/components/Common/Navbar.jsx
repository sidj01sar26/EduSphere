import React, { useEffect, useState } from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath } from 'react-router-dom'
import { NavbarLinks } from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import {AiOutlineShoppingCart} from "react-icons/ai"
import {BsFillCaretDownFill} from "react-icons/bs"
import {AiOutlineMenu} from "react-icons/ai"
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { ACCOUNT_TYPE } from '../../utils/constants'

// const subLinks = [
//   {
//     title: "python",
//     link: "/catalog/python"
//   },
//   {
//     title: "Web dev",
//     link: "/catalog/web-development"
//   },
  
// ]


const Navbar = () => { 

    const {token} = useSelector( (state) => state.auth );
    const {user} = useSelector( (state) => state.profile );
    const {totalItems} = useSelector( (state) => state.cart );

    const location = useLocation();
    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      ;(async () => {
        setLoading(true)
        try{
          const res = await apiConnector("GET", categories.CATEGORIES_API)
          setSubLinks(res.data.data)
        }catch(error){
          console.log("Could not fetch categories.", error)
        }
        setLoading(false)
      }) ()
    }, [])

    // sublinks = python, web dev etc..
    // const [subLinks, setSubLinks] = useState([]);

    // const fetchSublinks = async() => {
    //   try{
    //     const result = await apiConnector("GET", categories.CATEGORIES_API);
    //     console.log("Printing Sublink Result:", result);
    //     setSubLinks(result.data.data);
    //   } catch(error){
    //     console.log("Could not fetch the Category List");
    //   }
    // }

    // // Call Api
    // useEffect( () => {
    //   fetchSublinks();
    // }, [])

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname)
    }

  return (
    <div className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${location.pathname !== "/" ? " bg-richblack-800" : ""} transition-all duration-200 `}>
      <div className=' flex flex-row w-11/12 max-w-maxContent items-center justify-between gap-8'>

      {/* LOGO */}
      <Link to="/">
        <img src={logo} 
            alt="StudyNotion Logo" 
            width={160}
            height={32}
            loading="lazy"
        />
      </Link>

      {/* Nav links */}
      <nav className=' hidden md:block'>
        <ul className=' flex gap-x-6 text-richblue-25'>
          {NavbarLinks.map((link, index) => ( 
               <li key={index}>
                {/* Make a condition for CATALOG link and rest of link  */}
                {link.title === "Catalog" ? (
                  <>
                  <div className={`relative flex items-center gap-1 cursor-pointer group ${
                    matchRoute("/catalog/:catalogName")
                     ? " text-yellow-25"
                     : "text-richblack-25"
                  }`}>
                  <p> {link?.title} </p>
                    <BsFillCaretDownFill/>
                    <div className=' invisible absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[20%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 z-50 transition-all duration-200 group-hover:visible group-hover:opacity-100 w-[300px]   '>
                      <div className=' absolute left-[50%] top-0 translate-x-[80%] translate-y-[-20%] h-6 w-6 rotate-45 rounded bg-richblack-5  '></div>
                        {loading ? (
                          <p className=' text-center'>Loading...</p>
                        ) : subLinks.length ? (
                          <>
                            {subLinks?.filter((subLink) => subLink?.courses?.length > 0) 
                            ?.map((subLink, i) => (
                              <Link
                              to={`/catalog/${subLink.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                                key={i}
                                className='rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50'>
                                  <p>{subLink.name}</p>
                              </Link>
                            ))}
                          </>
                        ) : ( <p className='text-center'>No Courses Found</p> )}
                    </div>
                  </div>
                  </>) 
                : (<Link to={link?.path}>
                   <p className={`${matchRoute(link?.path) ? " text-yellow-25" : " text-richblack-25" }`}>
                    {link.title}
                   </p>
                  </Link>
                  )}
               </li>
              ))}
        </ul>
      </nav>

      {/* BUTTONS: LOGIN / SIGNUP / DASHBOARD */}
      <div className='md:flex hidden gap-x-4 items-center'>

        {
          user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className='relative'>
              <AiOutlineShoppingCart className="text-2xl text-richblack-100"/>
              {
                totalItems > 0 && (
                  <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                    {totalItems}
                  </span> 
                ) 
              }
            </Link>
          )
        }

        {
          token === null && (
            <Link to="/login">
              <button className="text-base text-richblack-50 bg-richblack-700 px-2 py-1 rounded-md">
                Log In
              </button>
            </Link>
          )
        }

        {
          token === null && (
            <Link to="/signup">
              <button className="text-base text-richblack-50 border border-richblack-700 px-2 py-1 rounded-md">
                Sign Up
              </button>
            </Link>
          )
        }

        {
          token !== null && <ProfileDropDown/>
        }

      </div>
        <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  )
}

export default Navbar
