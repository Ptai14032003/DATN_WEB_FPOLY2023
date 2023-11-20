import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const moviesApi = createApi({
    reducerPath: "movies",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/admin",
        prepareHeaders: (headers, { getState }) => {
            // Lấy token từ localstorage
            const token = localStorage.getItem("accessToken");
            // Nếu có token thì gán vào header Authorization
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            // Thêm header Content-Type
            headers.set("Content-Type", "application/json");
            return headers;
        }
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
        fetchMovieId: builder.query<any, any>({
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