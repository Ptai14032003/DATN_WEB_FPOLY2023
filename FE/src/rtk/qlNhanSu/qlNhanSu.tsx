import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const nhanSuApi = createApi({
    reducerPath: "personnels",
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
        addNhanSu: builder.mutation<void, any>({
            query: (body) => ({
                url: "/personnels/",
                method: "POST",
                body
            }),
            invalidatesTags: ["personnels"]
        }),
        updateNhanSu: builder.mutation<void, { id: string, body: any }>({
            query: ({ id, body }) => ({
                url: `/personnels/${id}`,
                method: "PATCH",
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
export const { useFetchNhanSuIdQuery, useFetchNhanSuQuery, useAddNhanSuMutation, useDeleteNhanSuMutation, useUpdateNhanSuMutation } = nhanSuApi
export default nhanSuApi