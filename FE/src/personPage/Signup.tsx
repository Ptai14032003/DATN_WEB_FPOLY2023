import React from 'react'
import { useSigninMutation, useSignupMutation } from '../rtk/auth/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { message } from 'antd';
import Menu from '../components/layouts/layoutGuest/menu';

const formSchema = Yup.object({
  name: Yup.string().min(3, "Tên người dùng cần tối thiểu 3 kí tự",
  ).required(),
  email: Yup.string().email("Lỗi email"
  ).required('Vui lòng nhập trường email'),
  password: Yup.string().min(8, "Password cần tối thiểu 8 kí tự, có chữ in hoa, có chữ thường, có số và có kí tự đặc biệt",
  ).required(),
  password_confirmation: Yup.string().oneOf([Yup.ref('password')], "Mật khẩu không khớp")
    .required('Vui lòng xác nhận lại mật khẩu'),
  phone_number: Yup.number().min(10, "Kiểm tra định dạng số điện thoại")
    .test('is-empty', 'Vui lòng điền số điện thoại', function (value) {
      return value !== undefined && value !== null;
    })
    .required('Vui lòng nhập trường số điện thoại'),
});
type FormSignup = Yup.InferType<typeof formSchema>;

const Signup = () => {
  const [signup, { error }] = useSignupMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<FormSignup>({ resolver: yupResolver(formSchema), });
  const navigate = useNavigate();

  const onSubmit = async (values: any) => {
    const newData = {
      name: values.name,
      email: values.email,
      phone_number: "0" + String(values.phone_number),
      password: values.password,
      password_confirmation: values.password_confirmation
    }
    await signup(newData).unwrap()
      .then((req) => {
        if (req.email) {
          message.error(`${req.email}`)
        }
        if (req.phone_number) {
          message.error(`${req.phone_number}`)
        }
      })
      .catch(() => {
      message.success("Đăng kí thành công");
      navigate("/signin");
      }
      )
  };
  return (
    <div className='Signup'>
      <Menu />
      <div className='User-box'>
        <div className="Form">
          <h1>Đăng kí</h1>
          <form onSubmit={handleSubmit(onSubmit)} method='POST'>

            <div className='grid grid-cols-2 gap-10'>
              <div>
                <div className="input-box">
                  <input type="text" placeholder="Tên người dùng"  {...register('name')} name="name" />
                </div>
                <p className='text-red-500'>{errors.name && errors.name?.message}</p>

                <div className="input-box">
                  <input type="email" placeholder="Email"  {...register('email')} name="email" />
                </div>
                <p className='text-red-500'>{errors.email && <p>{errors.email?.message}</p>}</p>

                <div className="input-box">
                  <input type="text" placeholder="Số điện thoại" {...register('phone_number')} name="phone_number" />
                </div>
                <p className='text-red-500'>{errors.phone_number && <p>{errors.phone_number?.message}</p>}</p>
              </div>
              <div>
                <div className="input-box">
                  <input type="password" placeholder="Mật khẩu" {...register('password')} autoComplete="on" name="password" />
                </div>
                <p className='text-red-500'>{errors.password && <p>{errors.password?.message}</p>}</p>
                <div className="input-box">
                  <input type="password" placeholder="Xác nhận lại mật khẩu" {...register('password_confirmation')} autoComplete="on" name="password_confirmation" />
                </div>
                <p className='text-red-500'>{errors.password_confirmation && <p>{errors.password_confirmation?.message}</p>}</p>
              </div>

            </div>

            <button type="submit" className="btn">Đăng kí</button>

            <div className="register-link">
              <p>Bạn đã có tài khoản? <a href="signin" className='underline'>Đăng nhập tại đây!</a></p>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Signup