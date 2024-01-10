import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const foodsApi = createApi({
    reducerPath: "food",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/admin",
    }),
    tagTypes: ["food"],
    endpoints: builder => ({
        fetchFoods: builder.query<any, void>({
            query: () => "/food/",
            providesTags: ["food"]
        }),
        fetchTypeFoods: builder.query<any, void>({
            query: () => "/food_type/",
            providesTags: ["food"]
        }),
        fetchFoodID: builder.query<any, string>({
            query: (id) => `/food/${id}`,
            providesTags: ["food"]
        }),
        addFood: builder.mutation<any, any>({
            query: ({ body }) => ({
                url: `/food`,
                method: "POST",
                body
            }),
            invalidatesTags: ["food"]
        }),
        deleteMultipleFood: builder.mutation<void, any>({
            query: ({ body }) => ({
                url: `/deleteMultipleFood`,
                method: "POST",
                body
            }),
            invalidatesTags: ["food"]
        }),
        updateFood: builder.mutation<any, { body: any, id: string }>({
            query: ({ body, id }) => ({
                url: `/food/${id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["food"]
        }),
        deleteFoodID: builder.mutation<any, string>({
            query: (id) => ({
                url: `/food/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["food"]
        }),
    })
})
export const { useFetchFoodsQuery, useFetchFoodIDQuery, useUpdateFoodMutation, useDeleteMultipleFoodMutation, useDeleteFoodIDMutation, useFetchTypeFoodsQuery } = foodsApi
export default foodsApi