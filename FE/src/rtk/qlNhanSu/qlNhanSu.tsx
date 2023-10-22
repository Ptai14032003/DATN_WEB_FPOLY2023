import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const nhanSuApi = createApi({
    reducerPath: "nhanSu",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001"
    }),
    tagTypes: ["nhanSu"],
    endpoints: builder => ({
        fetchNhanSu: builder.query<any[], void>({
            query: () => "/nhanSu/",
            providesTags: ["nhanSu"]
        }),
        fetchNhanSuId: builder.query<any, string>({
            query: (id) => `/nhanSu/${id}`,
            providesTags: ["nhanSu"]
        }),
        addNhanSu: builder.mutation<void, { body: any, id: string }>({
            query: (body) => ({
                url: "/nhanSu/",
                method: "POST",
                body
            }),
            invalidatesTags: ["nhanSu"]
        }),
        deleteNhanSu: builder.mutation<any, string>({
            query: (id: string) => ({
                url: "/nhanSu/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ['nhanSu']
        }),

    })
})
export const { useFetchNhanSuIdQuery, useFetchNhanSuQuery, useAddNhanSuMutation,useDeleteNhanSuMutation } = nhanSuApi
export default nhanSuApi