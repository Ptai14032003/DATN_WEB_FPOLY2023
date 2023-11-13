import React, { useState } from 'react'
import logoweb from "/logo-web.png"
import { Navigate, useNavigate } from 'react-router-dom';

const Menu = () => {

    const [dropDown, setDropDown] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        setDropDown(!dropDown)
      }

      const userString = localStorage.getItem('user');
       const user = userString ? JSON.parse(userString) : null;
    

       const Logout = async () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        navigate('/')
      }

    return (<div className="menu flex items-center justify-between px-16 fixed z-10 w-full">
        <div className="logo-web">
            <img src={logoweb} alt="" className='w-[70%]' />
        </div>
        <nav>
            <ul className='menu-content flex'>
                <li><a href="/">Home</a></li>
                <li><a href="">Movie</a></li>
                <li><a href="">News & Preferential</a></li>
                <li><a href="">About us</a></li>
                <li><a href="">Ticket</a></li>
                {!user && (
                  <><li onClick={handleClick}><a>User</a></li>
                  {dropDown ?
                    <ul className="dropdown-content absolute translate-y-[4.8rem] right-6 w-[160px] text-center">
                      <li><a href="signin" className='block'>Signin</a></li>
                      <li><a href="signup" className='block'>Signup</a></li>
                    </ul>
                    : ""
                  }
                  </>
                )}
                {user && (
                  <><li onClick={handleClick}><a>User</a></li>
                  {dropDown ?
                <ul className="dropdown-content absolute translate-y-[4.8rem] right-6 w-[160px] text-center">
                    {user.role === 'Admin' && (
                      <li><a href="admin">Admin</a></li>
                    )}
                      <li><a href="signin" className='block'>Profile</a></li>
                      <li><a href="signup" className='block' onClick={()=>Logout()}>Logout</a></li>
                    </ul>
                    : ""
                  }
                  </>
                )}
                
            </ul>
        </nav>
    </div>
    )
}

export default Menu