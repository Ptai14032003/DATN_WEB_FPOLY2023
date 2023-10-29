import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const moviesApi = createApi({
    reducerPath: "movies",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api"
    }),
    tagTypes: ["movies"],
    endpoints: builder => ({
        fetchMovies: builder.query<any[], void>({
            query: () => "/movies/",
            providesTags: ["movies"]
        }),
        addMovies: builder.mutation<void, any>({
            query: (body) => ({
                url: "/movies/",
                method: "POST",
                body
            }),
            invalidatesTags: ["movies"]
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
export const { useFetchMoviesQuery, useFetchMovieIdQuery, useAddMoviesMutation, useUpdateMoviesMutation, useDeleteMoviesMutation } = moviesApi
export default moviesApi