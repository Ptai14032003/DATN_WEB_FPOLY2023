import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const guestApi = createApi({
    reducerPath: "users",
    baseQuery: fetchBaseQuery({
        baseUrl: " http://localhost:8000/api"
    }),
    tagTypes: ["users"],
    endpoints: builder => ({
        fetchGuests: builder.query<any[], void>({
            query: () => "/users/",
            providesTags: ["users"]
        }),
    })
})
export const { useFetchGuestsQuery } = guestApi
export default guestApi