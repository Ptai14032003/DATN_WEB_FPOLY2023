
// import { useState } from 'react';
// import axios from 'axios';
import { useSigninMutation } from '../rtk/auth/auth';
import { redirect, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Menu from '../components/layouts/layoutGuest/menu';


interface Form {
  email: string;
  password: string;
}

const Signin = () => {
  // const handleSubmit = (e) => {

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<Form>();
  const [signin, { error }] = useSigninMutation();
  const onFinish = async (values: any) => {
    console.log(values);

    try {
      await signin(values).unwrap()
        .then(() => {
          const userString = localStorage.getItem('user');
          const user = userString ? JSON.parse(userString) : null;
          if (user.role == 'Admin') {
            navigate("/")

          }
          else {
            navigate("/")
          }
        })
        .then(() => message.success('Đăng nhập thành công'))
    } catch (e: any) {
      message.error("Thông tin tài khoản hoặc mật khẩu không chính xác");
    }
  };
  // if (error) {
  // }
  return (
    <div className='Signin'>
      <Menu/>
    <div className='User-box'>
      <div className="FormSignin">
        <form action="" onSubmit={handleSubmit(onFinish)}>
          <h1>Đăng nhập</h1>
          <div className="input-box">
            <input type="email" placeholder="email" {...register("email", { required: true })} required />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Mật khẩu" {...register("password", { required: true })} required />
          </div>
          <div className='float-right text-sm my-3 underline'>
            <a href="forgot-password"><p>Quên mật khẩu?</p></a>
          </div>
          <button type="submit" className="btn">Đăng nhập</button>

          <div className="register-link">
            <p>Bạn chưa có tài khoản? <a href="signup" className='underline'>Đăng kí tại đây!</a></p>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Signin