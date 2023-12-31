import React, { useEffect, useState } from 'react'
import logoweb from "/logo-web.png"
import { Navigate, useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { message } from 'antd';
const Menu = () => {

  const [dropDown, setDropDown] = useState(false);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const handleClick = () => {
    setDropDown(!dropDown)
  }

  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;


  const Logout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate('/');
    messageApi.open({
      type: 'success',
      content: 'Đăng xuất thành công',
    });
  }
  return (
    <div className="menu flex items-center justify-between px-16 fixed z-10 w-full">
      {contextHolder}
      <div className="logo-web">
        <img src={logoweb} alt="" className='w-[70%]' />
      </div>
      <nav>
        <ul className='menu-content flex text-white'>
          <li><a href="/">Home</a></li>
          <li><a href="">Movie</a></li>
          <li><a href="">News & Preferential</a></li>
          <li><a href="ticket-price">Ticket Price</a></li>
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
            <><li onClick={handleClick} className='flex space-x-2'>
              <FaUserCircle size={30} />
              <a className='text-xl'>
                {user?.name}</a>
            </li>
              {dropDown ?
                <ul className="dropdown-content absolute translate-y-[5.1rem] -translate-x-[2rem] right-6 w-[160px] text-center">
                  {user.role === 'Admin' && (
                    <li>
                      <a href="admin">Admin</a>
                    </li>
                  )}
                  <li><a href="profile" className='block'>Profile</a></li>
                  <li onClick={() => Logout()}><div className='block'>Logout</div></li>
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