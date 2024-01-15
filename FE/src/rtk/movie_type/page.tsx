import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const MovieTypeApi = createApi({
    reducerPath: "movie_type",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/admin/",
    }),
    tagTypes: ["movie_type"],
    endpoints: builder => ({
        fetchMovieType: builder.query<any, void>({
            query: () => `movie_type`,
            providesTags: ["movie_type"]
        })
    })
})
export const { useFetchMovieTypeQuery } = MovieTypeApi

export default MovieTypeApi