import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const statisticsApi = createApi({
    reducerPath: "statistics",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/admin",
    }),
    tagTypes: ["statistics"],
    endpoints: builder => ({
        revenueMoviesAPI: builder.mutation<any, any>({
            query: (body) => ({
                url: `/revenue_movie`,
                method: "POST",
                body
            }),
            invalidatesTags: ["statistics"]
        }),
        revenueAllAPI: builder.mutation<any, any>({
            query: (body) => ({
                url: `/total_revenue/`,
                method: "POST",
                body
            }),
            invalidatesTags: ["statistics"]
        }),
        Top5Movies: builder.mutation<any, any>({
            query: (body) => ({
                url: `/get_top5_movie/`,
                method: "POST",
                body
            }),
            invalidatesTags: ["statistics"]
        }),
        Top5Foods: builder.mutation<any, any>({
            query: (body) => ({
                url: `/get_top5_food/`,
                method: "POST",
                body
            }),
            invalidatesTags: ["statistics"]
        }),
        Top5Users: builder.mutation<any, any>({
            query: (body) => ({
                url: `/get_top5_user /`,
                method: "POST",
                body
            }),
            invalidatesTags: ["statistics"]
        }),
    })
})
export const { useRevenueMoviesAPIMutation, useRevenueAllAPIMutation, useTop5FoodsMutation, useTop5MoviesMutation, useTop5UsersMutation } = statisticsApi
export default statisticsApi