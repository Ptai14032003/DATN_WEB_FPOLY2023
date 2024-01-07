import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const moviesApiPerson = createApi({
    reducerPath: "moviesPerson",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api",
        
    }),
    tagTypes: ["moviesPerson"],
    endpoints: builder => ({
        fetchMoviesPerson: builder.query<any, void>({
            query: () => "/movie_home",
            providesTags: ["moviesPerson"]
        }),
        fetchComingSoonMovies: builder.query<any, void>({
            query: () => "/comingSoon",
            providesTags: ["moviesPerson"]
        }),
        fetchShowingMovies: builder.query<any, void>({
            query: () => "/showing",
            providesTags: ["moviesPerson"]
        }),
        fetchMovieIdPerson: builder.query<any, any>({
            query: (id) => `/movie_show_time/${id}`,
            providesTags: ["moviesPerson"]
        })
    })
})
export const { useFetchMovieIdPersonQuery, useFetchMoviesPersonQuery, useFetchComingSoonMoviesQuery, useFetchShowingMoviesQuery} = moviesApiPerson
export default moviesApiPerson