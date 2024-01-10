import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const billApi = createApi({
    reducerPath: "bill",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api",
    }),
    tagTypes: ["bill"],
    endpoints: builder => ({
        fetchBillAdmin: builder.query<any, void>({
            query: () => `admin/history_bills/`,
            providesTags: ["bill"]
        }),
        setBill: builder.mutation<any, any>({
            query: (body) => ({
                url: `/Payment`,
                method: "POST",
                body
            }),
            invalidatesTags: ["bill"]
        }),
        checkBill: builder.mutation<any, any>({
            query: (body) => ({
                url: `/check_payment`,
                method: "POST",
                body
            }),
            invalidatesTags: ["bill"]
        }),
        sendMail: builder.mutation<any, any>({
            query: (body) => ({
                url: `/send_mail`,
                method: "POST",
                body
            }),
            invalidatesTags: ["bill"]
        }),

    })
})
export const { useSetBillMutation, useCheckBillMutation, useSendMailMutation,useFetchBillAdminQuery } = billApi
export default billApi