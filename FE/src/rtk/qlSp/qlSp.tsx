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
    })
})
export const { useFetchFoodsQuery, useFetchFoodIDQuery } = foodsApi
export default foodsApi