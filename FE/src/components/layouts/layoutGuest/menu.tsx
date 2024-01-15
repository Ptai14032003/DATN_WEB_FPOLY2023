
import React, { useEffect, useState } from 'react'
import logoweb from "/Wonder-logo-1.png"
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { message } from 'antd';
const Menu = () => {

  const [dropDown, setDropDown] = useState(false);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const homeLink = 'http://localhost:5173/'
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
        <img src={logoweb} alt="" className='w-[100px] h-[80px]' />
      </div>
      <nav>
        <ul className='menu-content flex text-white'>
        <a href={homeLink}><li>Trang chủ</li></a>
        <a href={homeLink + 'ticket-price'}><li>Giá vé</li></a>
        <a href={homeLink}> <li>Giới thiệu</li></a>
          {!user && (
            <><li onClick={handleClick}><a>Tài khoản</a></li>
              {dropDown ?
                <ul className="dropdown-content absolute translate-y-[4.8rem] right-6 w-[160px] text-center drop-none-user">
                  <a href={homeLink + 'signin'} className='block'><li>Đăng nhập</li></a>
                  <a href={homeLink + 'signup'} className='block'><li>Đăng kí</li></a>
                </ul>
                : ""
              }
            </>
          )}
          {user && (
            <><li onClick={handleClick} className='have-user flex space-x-2'>
              <FaUserCircle size={30} />
              <a className='text-xl'>
                {user?.name}</a>
            </li>
              {dropDown ?
                <ul className="dropdown-content absolute translate-y-[5.1rem] -translate-x-[2rem] right-6 w-[250px] text-center drop-have-user">
                  {user.role === 'Admin' && (
                    <a href={homeLink + "admin"}>
                    <li>
                      Admin
                    </li>
                    </a>
                  )}
                  <a href={homeLink + 'profile'} className='block'><li>Thông tin cá nhân</li></a>
                  <a href={homeLink + 'ticket-history'}><li>Lịch sử đặt vé</li></a>
                  <li onClick={() => Logout()}><div className='block'>Đăng xuất</div></li>
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