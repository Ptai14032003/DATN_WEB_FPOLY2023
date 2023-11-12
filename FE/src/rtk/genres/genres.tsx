import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const genresApi = createApi({
    reducerPath: "list_genres",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api"
    }),
    tagTypes: ["list_genres"],
    endpoints: builder => ({
        fetchGenres: builder.query<any[], void>({
            query: () => "/list_genres/",
            providesTags: ["list_genres"]
        }),
        addGenres: builder.mutation<void,any>({
            query: (body) => ({
                url: "/list_genres/",
                method: "POST",
                body
            }),
            invalidatesTags: ["list_genres"]
        }),
        deleteGenres: builder.mutation<void, string>({
            query: (id) => ({
                url: `/list_genres/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["list_genres"]
        }),
    })
})
export const { useAddGenresMutation, useDeleteGenresMutation, useFetchGenresQuery } = genresApi
export default genresApi