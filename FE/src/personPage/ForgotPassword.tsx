import React from 'react'
import { useForgotPasswordMutation } from '../rtk/auth/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { message } from 'antd';

const formSchema = Yup.object({
    email: Yup.string().email("Lỗi email"
    ).required('Vui lòng nhập trường email')
  });
  type Form = Yup.InferType<typeof formSchema>;
  
const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Form>({ resolver: yupResolver(formSchema), });
    const [forgotPassword, { error }] = useForgotPasswordMutation();

  const onSubmit = async (values: any) => {
    await forgotPassword(values);
  };
  return (
    <div className='User-box'>
      <div className="FormSignin" onSubmit={handleSubmit(onSubmit)}>
        <form action="">
          <h1>Quên mật khẩu</h1>
          <div className="input-box mb-[10px]">
            <input type="email" placeholder="email" {...register('email')} name='email'/>
          </div>
          <p className='text-red-500 mb-5'>{errors.email && errors.email?.message}</p>
          <button type="submit" className="btn">Lấy lại mật khẩu</button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword