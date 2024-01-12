import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const discountApi = createApi({
    reducerPath: "discount",
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
    tagTypes: ["promotions"],
    endpoints: builder => ({
        fetchDiscounts: builder.query<any, void>({
            query: () => "/promotions/",
            providesTags: ["promotions"]
        }),
        addDiscount: builder.mutation<void, any>({
            query: (body) => ({
                url: "/promotions/",
                method: "POST",
                body
            }),
            invalidatesTags: ["promotions"]
        }),
        fetchDiscountID: builder.query<any[], string>({
            query: (id) => `/promotions/${id}`,
            providesTags: ["promotions"]
        }),
        updateDiscount: builder.mutation<void, { id: string, body: any }>({
            query: ({ id, body }) => ({
                url: `/promotions/${id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["promotions"]
        }),
        deleteMultiplePromotion: builder.mutation<void, any>({
            query: (body) => ({
                url: "/deleteMultiplePromotion",
                method: "POST",
                body
            }),
            invalidatesTags: ["promotions"]
        }),
        deleteDiscount: builder.mutation<void, string>({
            query: (id) => ({
                url: `/promotions/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["promotions"]
        }),
    })
})
export const { useFetchDiscountsQuery, useFetchDiscountIDQuery, useAddDiscountMutation, useDeleteDiscountMutation, useUpdateDiscountMutation, useDeleteMultiplePromotionMutation } = discountApi
export default discountApi