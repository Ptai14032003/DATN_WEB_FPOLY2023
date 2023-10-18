import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const suatChieuApi = createApi({
    reducerPath: "suatChieu",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001"
    }),
    tagTypes: ["suatChieu"],
    endpoints: builder => ({
        fetchSuatChieu: builder.query<any[], void>({
            query: () => "/suatChieu/",
            providesTags: ["suatChieu"]
        }),
        addSuatChieu: builder.mutation<void, { body: any }>({
            query: (body) => ({
                url: "/suatChieu/",
                method: "POST",
                body
            }),
            invalidatesTags: ["suatChieu"]
        }),
        fetchSuatChieuID: builder.query<any[], string>({
            query: (id) => `/suatChieu/${id}`,
            providesTags: ["suatChieu"]
        }),
        patchSuatChieu: builder.mutation<void, { body: any, id: string }>({
            query: ({ body, id }) => ({
                url: `/suatChieu/${id}`,
                method: "PATCH",
                body
            }),
            invalidatesTags: ["suatChieu"]
        }),
        deleteSuatChieu: builder.mutation<void, string>({
            query: (id) => ({
                url: `/suatChieu/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["suatChieu"]
        }),
    })
})
export const { useFetchSuatChieuIDQuery, useFetchSuatChieuQuery, usePatchSuatChieuMutation, useDeleteSuatChieuMutation, useAddSuatChieuMutation } = suatChieuApi
export default suatChieuApi