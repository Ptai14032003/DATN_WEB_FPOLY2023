import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
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
        addMovies: builder.query<void, { body: any }>({
            query: (body) => ({
                url: "/movies/",
                method: "POST",
                body
            }),
            providesTags: ["movies"]
        }),
        fetchMovieId: builder.query<any, string>({
            query: (id) => `/movies/${id}`,
            providesTags: ["movies"]
        }),
        deleteMovies: builder.mutation<any, string>({
            query: (id) => ({
                url: `/movies/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["movies"]
        }),
        updateMovies: builder.mutation<any, { body: any, id: string }>({
            query: ({ body, id }) => ({
                url: `/movies/${id}`,
                method: "PATCH",
                body
            }),
            invalidatesTags: ["movies"]
        })
    })
})
export const { useFetchMoviesQuery, useFetchMovieIdQuery, useAddMoviesQuery, useUpdateMoviesMutation, useDeleteMoviesMutation } = moviesApi
export default moviesApi