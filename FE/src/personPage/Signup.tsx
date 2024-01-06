import React from 'react'
import { useSigninMutation, useSignupMutation } from '../rtk/auth/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

type TypeInputs = {
  name: string,
  email: string,
  password: string,
  password_confirmation: string,
  phone_number: number
}
const formSchema = Yup.object({
  name: Yup.string().min(2, "Username must be at least 2 characters.",
  ).required(),
  email: Yup.string().email("Lỗi email"
  ).required(),
  password: Yup.string().min(8, "lỗi password",
  ).required(),
  gender: Yup.number().min(1, "lỗi password",
  ).required(),
  password_confirmation: Yup.string().oneOf([Yup.ref('password')], "Mật khẩu không khớp").required(),
  phone_number: Yup.number().min(8, "lỗi phone",
  ).required(),
});
type FormSignup = Yup.InferType<typeof formSchema>;

const Signup = () => {
  const [signup, { error }] = useSignupMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<FormSignup>({ resolver: yupResolver(formSchema), });
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    signup(data)
    console.log(data);
  }
  return (
    <div className='User-box'>
      <div className="Form">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className='grid grid-cols-2 gap-10'>
            <div>
              <div className="input-box">
                <input type="text" placeholder="Username"  {...register('name')} />
              </div>
              <div>{errors.name && errors.name?.message}</div>

              <div className="input-box">
                <input type="email" placeholder="Email"  {...register('email')} />
              </div>
              {errors.email && <p>{errors.email?.message}</p>}

              <div className="input-box">
                <input type="text" placeholder="Phone_number" {...register('phone_number')} />
              </div>
              {errors.phone_number && <p>{errors.phone_number?.message}</p>}
            </div>
            <div>
              <div className="input-box">
                <input type="password" placeholder="Password" {...register('password')} />
              </div>
              {errors.password && <p>{errors.password?.message}</p>}
              <div className="input-box">
                <input type="password" placeholder="Confirm password" {...register('password_confirmation')} />
              </div>
              {errors.password_confirmation && <p>{errors.password_confirmation?.message}</p>}
            </div>
          </div>

          <button type="submit" className="btn">Signup</button>

          <div className="register-link">
            <p>Are you have an account? <a href="signin">Signin here!</a></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup