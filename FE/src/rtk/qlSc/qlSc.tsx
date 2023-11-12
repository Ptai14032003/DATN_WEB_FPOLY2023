import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { QlSuatChieu } from "../../admin/qlSc/page"
import { SuatChieu } from "../../type"
const suatChieuApi = createApi({
    reducerPath: "showtimes",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api"
    }),
    tagTypes: ["showtimes"],
    endpoints: builder => ({
        fetchSuatChieu: builder.query<any[], void>({
            query: () => "/showtimes/",
            providesTags: ["showtimes"]
        }),
        addSuatChieu: builder.mutation<void, QlSuatChieu>({
            query: (body) => ({
                url: "/showtimes/",
                method: "POST",
                body
            }),
            invalidatesTags: ["showtimes"]
        }),
        fetchSuatChieuID: builder.query<any[], string>({
            query: (id) => `/showtimes/${id}`,
            providesTags: ["showtimes"]
        }),
        patchSuatChieu: builder.mutation<void, { body: any, id: string }>({
            query: ({ body, id }) => ({
                url: `/showtimes/${id}`,
                method: "PATCH",
                body
            }),
            invalidatesTags: ["showtimes"]
        }),
        deleteSuatChieu: builder.mutation<void, string>({
            query: (id) => ({
                url: `/showtimes/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["showtimes"]
        }),
    })
})
export const { useFetchSuatChieuIDQuery, useFetchSuatChieuQuery, usePatchSuatChieuMutation, useDeleteSuatChieuMutation, useAddSuatChieuMutation } = suatChieuApi
export default suatChieuApi