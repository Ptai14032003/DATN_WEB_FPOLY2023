import React, { useState } from 'react'
import Menu from '../components/layouts/layoutGuest/menu'

const Profile = () => {

  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  return (
    <div className='bg-black h-screen'>
      <div className='h-[80px]'>
        <Menu />
      </div>
      <div className='text-white text-center'>
        <h1 className='text-3xl font-bold my-10'>Thông tin cá nhân</h1>
        <div className='font-bold space-x-[5rem] my-8'>
          <button className='in4Active border rounded-full py-2 w-[13rem] text-black'>Tài khoản của tôi</button>
        </div>
        <div className='py-10 max-w-5xl mx-auto'>
          <form action="">
            <div>
              <div className="grid grid-cols-2 gap-8 mb-10">
                <div className='space-y-8'>
                  <div className='in4-box'>
                    <label htmlFor="" className='block text-start font-normal text-lg'>Mã người dùng</label>
                    <input type="text" className='w-full h-[50px] bg-zinc-800 border rounded-md pl-3' value={user?.user_code} />
                  </div>
                  <div className='in4-box'>
                    <label htmlFor="" className='block text-start font-normal text-lg'>Số điện thoại</label>
                    <input type="text" className='w-full h-[50px] bg-zinc-800 border rounded-md pl-3' value={user?.phone_number} />
                  </div>
                </div>
                <div className='space-y-8'>
                  <div className='in4-box'>
                    <label htmlFor="" className='block text-start font-normal text-lg'>Tên</label>
                    <input type="text" className='w-full h-[50px] bg-zinc-800 border rounded-md pl-3' value={user?.name} />
                  </div>
                  <div className='in4-box'>
                    <label htmlFor="" className='block text-start font-normal text-lg'>Email</label>
                    <input type="email" disabled className='w-full h-[50px] bg-zinc-800 border rounded-md pl-3' value={user?.email} />
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-end space-x-5 my-5'>
              <button className='border rounded-md py-1 w-[150px] font-normal text-lg text-center'>Đổi mật khẩu</button>
              <button className='border rounded-md py-1 w-[150px] font-normal text-lg text-center bg-[#1ACAAC] pl-3'>Lưu thay đổi</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile