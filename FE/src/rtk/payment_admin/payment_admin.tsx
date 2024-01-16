import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const PaymentAdminApi = createApi({
    reducerPath: "paymentAdmin",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/admin",
        prepareHeaders: (headers, { getState }) => {
            // Lấy token từ localstorage
            const token = localStorage.getItem("accessToken");
            // Nếu có token thì gán vào header Authorization
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            // Thêm header Content-Type
            headers.set("Content-Type", "application/json");
            return headers;
        }
    }),
    tagTypes: ["paymentAdmin"],
    endpoints: builder => ({
        paymentAdmin: builder.mutation<any, any>({
            query: (body) => ({
                url: "/payment_admin/",
                method: "POST",
                body
            }),
            invalidatesTags: ["paymentAdmin"]
        }),
    })
})
export const { usePaymentAdminMutation } = PaymentAdminApi
export default PaymentAdminApi