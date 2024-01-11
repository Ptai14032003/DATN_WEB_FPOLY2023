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
    })
})
export const { useRevenueMoviesAPIMutation, useRevenueAllAPIMutation } = statisticsApi
export default statisticsApi