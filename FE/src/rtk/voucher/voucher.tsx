import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const VoucherApi = createApi({
    reducerPath: "voucher",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api",
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
    tagTypes: ["voucher"],
    endpoints: builder => ({
        fetchVoucher: builder.query<any[], void>({
            query: () => `/voucher`,
            providesTags: ["voucher"]
        }),

    })
})
export const { useFetchVoucherQuery } = VoucherApi
export default VoucherApi