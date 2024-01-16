
import React, { useEffect, useState } from 'react'
import logoweb from "/Wonder-logo-1.png"
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { message } from 'antd';
import "../../../personPage/responsive.css"
const Menu = () => {

  const [dropDown, setDropDown] = useState(false);
  const [dropDown2, setDropDown2] = useState(false);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const homeLink = 'http://localhost:5173/'
  const handleClick = () => {
    setDropDown(!dropDown)
  }
  const handleClick2 = () => {
    setDropDown2(!dropDown2)
  }
  const handleClickClose = () => {
    setDropDown2(false)
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
    <div className="">
      {contextHolder}
      <div className='menu-mobile fixed z-10 w-full items-center justify-between h-[50px] hidden' style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
        <div className="logo-web ml-3">
          <img src={logoweb} alt="" className='w-[50px] h-[50px]' />
        </div>
        <div className='mr-3' onClick={handleClick2}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-list" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
          </svg>
        </div>
        {dropDown2 ?

          <div className='absolute h-[200vh] w-full pb-10 Menu-drop-mobile' style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}>
            <div className='translate-y-[40.2rem] ml-3' onClick={handleClickClose}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
              </svg>
            </div>
            <div>
              <ul className=" text-white text-end translate-y-[40.5rem]">
                <a href={homeLink}><li className='pr-5 mb-3'>Trang chủ</li></a>
                <a href={homeLink + 'ticket-price'}><li className='pr-5  mb-3'>Giá vé</li></a>
                <a href={homeLink + 'privacy-policy'}> <li className='pr-5  mb-3'>Chính sách</li></a>
                {!user && (
                  <><li onClick={handleClick} className='pr-5  mb-3'><a>Tài khoản</a></li>
                    {dropDown ?
                      <ul className="absolute translate-y-[rem] translate-x-[2.5rem] right-6 w-[160px] text-end">
                        <a href={homeLink + 'signin'}><li className='mb-3 text-[#1ACAAC]'>Đăng nhập</li></a>
                        <a href={homeLink + 'signup'}><li className='text-[#1ACAAC]'>Đăng kí</li></a>
                      </ul>
                      : ""
                    }
                  </>
                )}
                {user && (
                  <><li onClick={handleClick} className=' flex space-x-2 items-center justify-end mr-5'>
                    <a className='text-md'>
                      {user?.name}</a>
                    <FaUserCircle size={20} />
                  </li>
                    {dropDown ?
                      <ul className=" absolute translate-y-[0.7rem] -translate-x-[-0.3rem] right-6 w-[250px] text-end">
                        {(user.role === 'Admin' || user.role === 'Nhân Viên') && (
                     <div>
                       <a href={homeLink + "admin"} className='text-[#1ACAAC]'>
                        <li>
                          Admin
                        </li>
                      </a>
                      <li onClick={() => Logout()}><div className='block text-[#1ACAAC]'>Đăng xuất</div></li>
                     </div>
                    )}
                    {(user.role !== 'Admin' && user.role !== 'Nhân Viên') && (
                     <div>
                      <a href={homeLink + 'profile'} className='block text-[#1ACAAC]'><li>Thông tin cá nhân</li></a>
                  <a href={homeLink + 'ticket-history'}><li className='text-[#1ACAAC]'>Lịch sử đặt vé</li></a>
                    <li onClick={() => Logout()}><div className='block text-[#1ACAAC]'>Đăng xuất</div></li>
                     </div>
                    )}
                      </ul>
                      : ""
                    }
                  </>
                )}
              </ul>
            </div>
          </div>
          : ""}
      </div>
    </div>
  )

}

export default Menu