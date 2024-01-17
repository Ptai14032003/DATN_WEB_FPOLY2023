import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface AuthSignup {
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
    phone_number: string
}
interface ForgotPassword {
    email: string
}
interface ResetPassword {
    email: string,
    token: string,
    password: string,
    password_confirmation: string
}
interface UpdatePassword {
    user_code: string,
    old_password: string,
    password: string,
    password_confirmation: string
}
interface AuthSignin {
    email: string;
    password: string;
}
const authApi = createApi({
    reducerPath: "auth",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000"
    }),
    endpoints: (builder) => (
        {
            signin: builder.mutation<{ message: string; accessToken: string; user: {} }, AuthSignin>({
                query: (user) => ({
                    url: '/api/login',
                    method: "POST",
                    body: user,
                }),
                transformResponse: (response: unknown) => {
                    const { message, accessToken, user } = response as {
                        message: string;
                        accessToken: string;
                        user: {};
                    };
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('user', JSON.stringify(user));
                    return { message, accessToken, user };
                },
            }),
            signup: builder.mutation<{ message: string, user: {} }, AuthSignup>({
                query: (user) => ({
                    url: '/api/register',
                    method: "POST",
                    body: user,
                })
            }),
            forgotPassword: builder.mutation<{
                success(message: { message: string; user: {}; }): unknown; message: string, user: {}
            }, ForgotPassword>({
                query: (user) => ({
                    url: '/api/forgot_password',
                    method: "POST",
                    body: user,
                })
            }),
            resetPassword: builder.mutation<{ message: string, user: {} }, ResetPassword>({
                query: (user) => ({
                    url: '/api/update_new_pass',
                    method: "POST",
                    body: user,
                })
            }),
            updatePassword: builder.mutation<{ message: string, user: {} }, UpdatePassword>({
                query: (user) => ({
                    url: '/api/update_password',
                    method: "POST",
                    body: user,
                })
            }),
            updateProfile: builder.mutation<{ message: string, user: {} }, UpdatePassword>({
                query: (user) => ({
                    url: '/api/update_profile',
                    method: "POST",
                    body: user,
                })
            }),
        }
    )
})
export const { useSignupMutation, useSigninMutation, useForgotPasswordMutation, useResetPasswordMutation, useUpdatePasswordMutation, useUpdateProfileMutation } = authApi;
export default authApi