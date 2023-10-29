import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const countryApi = createApi({
    reducerPath: "countries",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api"
    }),
    tagTypes: ["countries"],
    endpoints: builder => ({
        fetchCountry: builder.query<any[], void>({
            query: () => "/countries/",
            providesTags: ["countries"]
        }),
        addCountry: builder.mutation<void, any>({
            query: (body) => ({
                url: "/countries/",
                method: "POST",
                body
            }),
            invalidatesTags: ["countries"]
        }),
        fetchCountryID: builder.query<any[], string>({
            query: (id) => `/countries/${id}`,
            providesTags: ["countries"]
        }),
        updateCountry: builder.mutation<void, { id: string, body: any }>({
            query: ({ id, body }) => ({
                url: `/countries/${id}`,
                method: "PATCH",
                body
            }),
            invalidatesTags: ["countries"]
        }),
        deleteCountry: builder.mutation<void, string>({
            query: (id) => ({
                url: `/actors/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["countries"]
        }),
    })
})
export const { useAddCountryMutation, useFetchCountryIDQuery, useFetchCountryQuery, useUpdateCountryMutation, useDeleteCountryMutation } = countryApi
export default countryApi