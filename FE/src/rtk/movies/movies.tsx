import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import instant from "../../api"
const moviesApi = createApi({
    reducerPath: "movies",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001"
    }),
    tagTypes: ["movies"],
    endpoints: builder => ({
        fetchMovies: builder.query<any[], void>({
            query: () => "/movies/",
            providesTags: ["movies"]
        }),
    })
})
export const { useFetchMoviesQuery } = moviesApi
export default moviesApi