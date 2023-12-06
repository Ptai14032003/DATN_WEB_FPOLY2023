import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const billApi = createApi({
    reducerPath: "bill",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api",
    }),
    tagTypes: ["bill"],
    endpoints: builder => ({
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

    })
})
export const { useSetBillMutation, useCheckBillMutation } = billApi
export default billApi