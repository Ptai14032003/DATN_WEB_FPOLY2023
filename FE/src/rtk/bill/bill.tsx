import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const billApi = createApi({
    reducerPath: "bill",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api",
    }),
    tagTypes: ["bill"],
    endpoints: builder => ({
        setBill: builder.mutation<void, any>({
            query: (body) => ({
                url: `/Payment`,
                method: "POST",
                body
            }),
            invalidatesTags: ["bill"]
        }),

    })
})
export const { useSetBillMutation } = billApi
export default billApi