import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const phongChieuApi = createApi({
    reducerPath: "phongChieu",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001"
    }),
    tagTypes: ["phongChieu"],
    endpoints: builder => ({
        fetchPhongChieu: builder.query<any[], void>({
            query: () => "/phongChieu/",
            providesTags: ["phongChieu"]
        }),
        addPhongChieu: builder.mutation<void, { body: any }>({
            query: (body) => ({
                url: "/phongChieu/",
                method: "POST",
                body
            }),
            invalidatesTags: ["phongChieu"]
        }),
        fetchPhongChieuID: builder.query<any[], string>({
            query: (id) => `/phongChieu/${id}`,
            providesTags: ["phongChieu"]
        }),
        patchPhongChieu: builder.mutation<void, { body: any, id: string }>({
            query: ({ body, id }) => ({
                url: `/phongChieu/${id}`,
                method: "PATCH",
                body
            }),
            invalidatesTags: ["phongChieu"]
        }),
        deletePhongChieu: builder.mutation<void, string>({
            query: (id) => ({
                url: `/phongChieu/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["phongChieu"]
        }),
    })
})
export const { useFetchPhongChieuQuery, useFetchPhongChieuIDQuery, useAddPhongChieuMutation, usePatchPhongChieuMutation, useDeletePhongChieuMutation } = phongChieuApi
export default phongChieuApi