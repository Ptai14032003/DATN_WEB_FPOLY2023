import React, { useState } from 'react'
import logoweb from "/logo-web.png"

const Menu = () => {

    const [dropDown, setDropDown] = useState(false);
    const handleClick = () => {
        setDropDown(!dropDown)
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
                <li onClick={handleClick}><a>User</a></li>
                {dropDown ?
                  <ul className="dropdown-content absolute translate-y-[4.8rem] right-6 w-[160px] text-center">
                    <li><a href="signin" className='block'>Signin</a></li>
                    <li><a href="signup" className='block'>Signup</a></li>
                  </ul>
                  : ""
                }
            </ul>
        </nav>
    </div>
    )
}

export default Menu