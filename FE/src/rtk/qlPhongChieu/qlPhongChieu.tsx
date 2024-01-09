import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const phongChieuApi = createApi({
    reducerPath: "phongChieu",
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
    tagTypes: ["rooms"],
    endpoints: builder => ({
        fetchPhongChieu: builder.query<any, void>({
            query: () => "/rooms/",
            providesTags: ["rooms"]
        }),
        addPhongChieu: builder.mutation<void, any>({
            query: (body) => ({
                url: "/rooms/",
                method: "POST",
                body
            }),
            invalidatesTags: ["rooms"]
        }),
        fetchPhongChieuID: builder.query<any, string>({
            query: (id) => `/rooms/${id}`,
            providesTags: ["rooms"]
        }),
        patchPhongChieu: builder.mutation<void, { body: any, id: string }>({
            query: ({ body, id }) => ({
                url: `/rooms/${id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["rooms"]
        }),
        deletePhongChieu: builder.mutation<void, string>({
            query: (id) => ({
                url: `/rooms/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["rooms"]
        }),
    })
})
export const { useFetchPhongChieuQuery, useFetchPhongChieuIDQuery, useAddPhongChieuMutation, usePatchPhongChieuMutation, useDeletePhongChieuMutation } = phongChieuApi
export default phongChieuApi