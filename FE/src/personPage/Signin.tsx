import React, { useState } from 'react';
// import { useState } from 'react';
// import axios from 'axios';
import { useSigninMutation } from '../rtk/auth/auth';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useForm } from 'react-hook-form';

interface Form{
  email: string;
  password: string;
}

const Signin = () => {
  // const handleSubmit = (e) => {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm<Form>();
    const [signin, { error }] = useSigninMutation();
  const onFinish = async (values: any) => {
      try {
        await signin(values).unwrap()
          .then(() => {
            const userString = localStorage.getItem('user');
            const user = userString ? JSON.parse(userString) : null;
            if (user.role == 'Admin') {
              navigate("/admin?isAuth=true")
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
    <div className='User-box'>
        <div className="Form">
          <form action="" onSubmit={handleSubmit(onFinish)}>
          <h1>Signin</h1>
            <div className="input-box">
            <input type="email" placeholder="email" {...register("email",{required: true})} required/>
            </div>  
            <div className="input-box">
            <input type="password" placeholder="password" {...register("password", { required: true })} required/>
            </div>

            <div className="remember-forgot">
              <label><input type="checkbox" /> Remember me</label>
              <a href="#">Forgot password?</a>
            </div>

            <button type="submit" className="btn">Login</button>

            <div className="register-link">
              <p>You don't have an account? <a href="signup">Register here!</a></p>
            </div>
          </form>
        </div>
    </div>
  )
}

export default Signin