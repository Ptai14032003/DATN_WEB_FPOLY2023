import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const bookingApi = createApi({
    reducerPath: "booking",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api",
    }),
    tagTypes: ["booking"],
    endpoints: builder => ({
        fetchSeatRoomId: builder.query<any, any>({
            query: (id) => `/show_seat_room/${id}`,
            providesTags: ["booking"]
        }),
        
    })
})
export const { useFetchSeatRoomIdQuery} = bookingApi
export default bookingApi