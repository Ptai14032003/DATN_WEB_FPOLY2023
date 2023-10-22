import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const guestApi = createApi({
    reducerPath: "guest",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001"
    }),
    tagTypes: ["guest"],
    endpoints: builder => ({
        fetchGuests: builder.query<any[], void>({
            query: () => "/guest/",
            providesTags: ["guest"]
        }),
    })
})
export const { useFetchGuestsQuery } = guestApi
export default guestApi