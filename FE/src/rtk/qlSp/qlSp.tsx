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
        fetchFoodID: builder.query<any, string>({
            query: (id) => `/food/${id}`,
            providesTags: ["food"]
        }),
        updateFood: builder.mutation<any, { body: any, id: string }>({
            query: ({ body, id }) => ({
                url: `/food/${id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["food"]
        }),
        deleteFoodID: builder.query<any, string>({
            query: (id) => `/food/${id}`,
            providesTags: ["food"]
        }),
    })
})
export const { useFetchFoodsQuery, useFetchFoodIDQuery, useUpdateFoodMutation } = foodsApi
export default foodsApi