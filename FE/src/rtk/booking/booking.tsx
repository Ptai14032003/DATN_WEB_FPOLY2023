import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface Form {
    userCode: string
}

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
        ticketHistory: builder.mutation<void, Form>({
            query: (body) => ({
                url: "/booking_history",
                method: "POST",
                body
            }),
            invalidatesTags: ["booking"]
        }),
    })
})
export const { useFetchSeatRoomIdQuery, useTicketHistoryMutation } = bookingApi

export default bookingApi