import React, { useState } from 'react'
import Menu from '../components/layouts/layoutGuest/menu'
import { useResetPasswordMutation, useUpdatePasswordMutation } from '../rtk/auth/auth';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const formSchema = Yup.object({
  password: Yup.string().min(8, "Password cần tối thiểu 8 kí tự, có chữ in hoa, có chữ thường, có số và có kí tự đặc biệt",
  ).required(),
  password_confirmation: Yup.string().oneOf([Yup.ref('password')], "Mật khẩu không khớp")
    .required('Vui lòng xác nhận lại mật khẩu')
});
type Reset = Yup.InferType<typeof formSchema>;

const Profile = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [messageApi, contextHolder] = message.useMessage();

  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  

  const handleClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  const [updatePassword, { error }] = useUpdatePasswordMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<Reset>({ resolver: yupResolver(formSchema), });
  const navigate = useNavigate();

  const onSubmit = async (values: any) => {

    await updatePassword(values)
      .then((req:any) => {    
        if(req?.data?.error){
          messageApi.open({
            type: 'error',
            content: `${req?.data?.error}`,
          });
        }
        if(req?.data?.message){
          messageApi.open({
            type: 'success',
            content: `${req?.data?.message}`,
          });        
        }

      })
      .catch(() => console.log('lỗi')
      )
  };

  return (
    <div className='bg-black h-screen'>
        {contextHolder}
      <div className='h-[80px]'>
        <Menu />
      </div>
      <div className={`${activeTab === 1 ? "text-white text-center" : "hidden"}`}>
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
              <button className='border rounded-md py-1 w-[150px] font-normal text-lg text-center' onClick={() => handleClick(2)} type='button'>Đổi mật khẩu</button>
              <button className='border rounded-md py-1 w-[150px] font-normal text-lg text-center bg-[#1ACAAC] pl-3'>Lưu thay đổi</button>
            </div>
          </form>
        </div>
      </div>
      <div className={`${activeTab === 2 ? "text-white text-center" : "hidden"}`}>
        <h1 className='text-3xl font-bold my-10'>Đổi mật khẩu</h1>
        <div className='font-bold space-x-[5rem] my-8'>
          <button className='in4Active border rounded-full py-2 w-[13rem] text-black'>Tài khoản của tôi</button>
        </div>
        <div className='pt-5 max-w-2xl mx-auto'>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-box">
              <input type="text" value={user?.user_code} {...register('user_code')} name="user_code" />
            </div>
            <div className='in4-box'>
              <label htmlFor="" className='block text-start font-normal text-lg'>Mật khẩu cũ</label>
              <input type="password" className='w-full h-[50px] bg-zinc-800 border rounded-md pl-3' placeholder='Nhập mật khẩu cũ' {...register('old_password')} name='old_password' />
            </div>
            <div className='in4-box mt-5'>
              <label htmlFor="" className='block text-start font-normal text-lg'>Mật khẩu mới</label>
              <input type="password" className='w-full h-[50px] bg-zinc-800 border rounded-md pl-3' placeholder='Nhập mật khẩu mới' {...register('password')} name='password' />
              <p className='text-red-500'>{errors.password && <p>{errors.password?.message}</p>}</p>
            </div>
            <div className='in4-box mt-5'>
              <label htmlFor="" className='block text-start font-normal text-lg'>Xác nhận mật khẩu mới</label>
              <input type="password" className='w-full h-[50px] bg-zinc-800 border rounded-md pl-3' placeholder='Xác nhận lại mật khẩu mới' {...register('password_confirmation')} name='password_confirmation' />
              <p className='text-red-500'>{errors.password_confirmation && <p>{errors.password_confirmation?.message}</p>}</p>
            </div>
            <div className='flex justify-end mt-8'>
              <button className='border rounded-md py-1 w-[200px] font-normal text-lg  bg-[#1ACAAC] '>Đổi mật khẩu</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile