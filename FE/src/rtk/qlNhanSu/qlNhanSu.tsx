import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const nhanSuApi = createApi({
    reducerPath: "personnels",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api"
    }),
    tagTypes: ["personnels"],
    endpoints: builder => ({
        fetchNhanSu: builder.query<any[], void>({
            query: () => "/personnels/",
            providesTags: ["personnels"]
        }),
        fetchNhanSuId: builder.query<any, string>({
            query: (id) => `/personnels/${id}`,
            providesTags: ["personnels"]
        }),
        addNhanSu: builder.mutation<void, { body: any, id: string }>({
            query: (body) => ({
                url: "/personnels/",
                method: "POST",
                body
            }),
            invalidatesTags: ["personnels"]
        }),
        deleteNhanSu: builder.mutation<any, string>({
            query: (id: string) => ({
                url: "/personnels/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ['personnels']
        }),

    })
})
export const { useFetchNhanSuIdQuery, useFetchNhanSuQuery, useAddNhanSuMutation, useDeleteNhanSuMutation } = nhanSuApi
export default nhanSuApi