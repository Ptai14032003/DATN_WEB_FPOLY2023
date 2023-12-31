import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const actorApi = createApi({
    reducerPath: "actor",
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
    tagTypes: ["actor"],
    endpoints: builder => ({
        fetchActors: builder.query<any[], void>({
            query: () => "/actors/",
            providesTags: ["actor"]
        }),
        addActor: builder.mutation<void, any>({
            query: (body) => ({
                url: "/actor/",
                method: "POST",
                body
            }),
            invalidatesTags: ["actor"]
        }),
        fetchActorID: builder.query<any[], string>({
            query: (id) => `/actors/${id}`,
            providesTags: ["actor"]
        }),
        updateActor: builder.mutation<void, { id: string, body: any }>({
            query: ({ id, body }) => ({
                url: `/actors/${id}`,
                method: "PATCH",
                body
            }),
            invalidatesTags: ["actor"]
        }),
        deleteActor: builder.mutation<void, string>({
            query: (id) => ({
                url: `/actors/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["actor"]
        }),
    })
})
export const { useAddActorMutation, useDeleteActorMutation, useFetchActorIDQuery, useFetchActorsQuery } = actorApi
export default actorApi