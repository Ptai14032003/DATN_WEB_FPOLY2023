import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const VoucherApi = createApi({
    reducerPath: "voucher",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api",
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