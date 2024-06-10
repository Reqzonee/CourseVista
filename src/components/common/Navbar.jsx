import React, { useEffect, useState } from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath, useMatch } from 'react-router-dom'
import {NavbarLinks} from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { MdOutlineShoppingCart } from "react-icons/md";
import ProfileDropDown from '../cors/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { IoIosArrowDropdownCircle } from "react-icons/io";
import ProfileDropdown from '../cors/Auth/ProfileDropDown'

const subLinks =[
    {
        title: "python",
        link:"/catalog/python"
    },
    {
        title:"web dev",
        link:"/catalog/web-development"
    }
]

const Navbar = () => {

    const {token} = useSelector( (state) => state.auth );
    const {user} = useSelector( (state) => state.profile);
    const {totalItems} = useSelector( (state) => state.cart);
    const location = useLocation();

    // const [subLinks, setSubLinks] = useState([]);

    // const fetchSublinks = async()=>{
    //     try{
    //         const result = await apiConnector("GET", categories.CATEGORIES_API);
    //         console.log("Printing Sublinks results:", result);
    //         setSubLinks(result.data.data);
    //     }
    //     catch(error){
    //         console.log("Could not fetch the category list")
    //     }
    // }


    // useEffect(() =>{
    //     // fetchSublinks();
    // },[])

    const matchRoute = (route) => {
        if (!route) {
            console.error('Route is undefined or null');
            return false;
        }
        console.log('Route:', route);
        return matchPath({ path: route }, location.pathname);
    };

    
    
  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>

      {/* Image  */}
      <Link to="/">
        <img src={logo} width={160} height={42} loading='lazy'/>
      </Link>

      {/* NavLinks  */}
      <nav>
        <ul className='flex gap-x-6 text-richblack-25'> 
            {
                NavbarLinks.map((link, index)=>(
                        <li key={index}>
                        {
                            link.title==="Catalog"?(
                            <div className='relative flex items-center gap-2 group'>
                                <p>{link.title}</p>
                                <IoIosArrowDropdownCircle />

                                <div className='invisible absolute translate-x-[-50%] translate-y-[80%] left-[50%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]'>

                                <div className='absolute left-[50%] top-0 h-6 w-6 rounded translate-x-[80%] translate-y-[-45%]
                                bg-richblack-5 rotate-45'>
                                </div>

                                {
                                    subLinks.length ? (
                                        subLinks.map((sublink, index)=>(
                                            <Link to={`${sublink.link}`} key={index}>
                                                <p>{sublink.title}</p>
                                            </Link>
                                        ))
                                    ):(<div></div>)
                                }

                                </div>
                            </div>
                        ):(
                                <Link to={link.path}>
                                    <p className={`${matchRoute(link.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                        {link.title}
                                        
                                    </p>
                                </Link>
                            )
                        }
                    </li>
                ))
            }
        </ul>
      </nav>

      {/* Login/Signup/Dashboard  */}
      <div className='flex gap-x-4 items-center'> 
        {
            user && user?.accountType != "Instructor" && (
                <Link to = "/dashboard/cart" className='relative'>
                    <MdOutlineShoppingCart />
                    {
                        totalItems > 0 && (
                            <span>
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
                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                    Log in 
                </button>
                </Link>
            )
        }
        {
            token === null && (
                <Link to="/signup"> 
                <buton className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                    Sign up
                </buton>
                </Link>
            )
        }
        {
            token !== null && <ProfileDropdown/>
        }
      </div>


      </div>
    </div>
  )
}

export default Navbar
