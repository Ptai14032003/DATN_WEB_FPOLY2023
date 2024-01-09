import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface AuthSignup {
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
    phone_number: string
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
            })
        }
    )
})
export const { useSignupMutation, useSigninMutation } = authApi;
export default authApi