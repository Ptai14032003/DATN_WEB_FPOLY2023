import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const discountApi = createApi({
    reducerPath: "discount",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001"
    }),
    tagTypes: ["discount"],
    endpoints: builder => ({
        fetchDiscounts: builder.query<any[], void>({
            query: () => "/discount/",
            providesTags: ["discount"]
        }),
        addDiscount: builder.mutation<void, { body: any, id: string }>({
            query: (body) => ({
                url: "/discount/",
                method: "POST",
                body
            }),
            invalidatesTags: ["discount"]
        }),
        fetchDiscountID: builder.query<any[], string>({
            query: (id) => `/discount/${id}`,
            providesTags: ["discount"]
        }),
        deleteDiscount: builder.mutation<void, string>({
            query: (id) => ({
                url: `/discount/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["discount"]
        }),
    })
})
export const { useFetchDiscountsQuery, useFetchDiscountIDQuery, useAddDiscountMutation, useDeleteDiscountMutation } = discountApi
export default discountApi