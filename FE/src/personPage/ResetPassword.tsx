import React, { useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useResetPasswordMutation } from '../rtk/auth/auth';
import { message } from 'antd';
import { useParams } from 'react-router-dom';

const formSchema = Yup.object({
    password: Yup.string().min(8, "Password cần tối thiểu 8 kí tự, có chữ in hoa, có chữ thường, có số và có kí tự đặc biệt",
    ).required(),
    password_confirmation: Yup.string().oneOf([Yup.ref('password')], "Mật khẩu không khớp")
        .required('Vui lòng xác nhận lại mật khẩu')
});
type Reset = Yup.InferType<typeof formSchema>;

const ResetPassword = () => {

    const urlSearchParams = new URLSearchParams(new URL(window.location.href).search);
    const email = String(urlSearchParams.get('email'));
    const token = String(urlSearchParams.get('token'));
    

    const [resetPassword, { error }] = useResetPasswordMutation();

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<Reset>({ resolver: yupResolver(formSchema), });

    useEffect(() => {
        setValue('password', email); // Đặt giá trị của email vào trường input ẩn
        setValue('password_confirmation', token); // Đặt giá trị của token vào trường input ẩn
      }, [email, token, setValue]);

    const onSubmit = async (values: any) => {
        console.log(values);
        
        await resetPassword(values).unwrap()
        .then(()=> message.success("Đổi mật khẩu thành công"))
        .catch(() => message.error('lỗi'))
      };

    return (
        <div className='User-box'>
            <div className="FormSignin">
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <h1>Đổi mật khẩu</h1>
                    <div className="input-box hidden">
                        <input type="hidden" value={email} {...register('email')} name="email"/>
                    </div>
                    <div className="input-box hidden">
                        <input type="hidden" value={token} {...register('token')} name="token"/>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Mật khẩu" {...register('password')} name="password"/>
                    </div>
                    <p className='text-red-500 text-sm mt-2'>{errors.password && errors.password?.message}</p>
                    <div className="input-box">
                        <input type="password" placeholder="Xác nhận lại mật khẩu" {...register('password_confirmation')} name="password_confirmation"/>
                    </div>
                    <p className='text-red-500 text-sm mt-2 mb-5'>{errors.password_confirmation && errors.password_confirmation?.message}</p>
                    <button type="submit" className="btn">Lấy lại mật khẩu</button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword