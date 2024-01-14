import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


const bookingApi = createApi({
    reducerPath: "booking",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api",
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
    tagTypes: ["booking"],
    endpoints: builder => ({
        fetchSeatRoomId: builder.query<any, any>({
            query: (id) => `/show_seat_room/${id}`,
            providesTags: ["booking"]
        }),
        ticketHistory: builder.mutation<{ message: string, user: {} }, string>({
            query: (userCode) => ({
              url: "/booking_history",
              method: "POST",
              body: { userCode },
            }),
            invalidatesTags: ["booking"],
          }),
    })
})
export const { useFetchSeatRoomIdQuery, useTicketHistoryMutation } = bookingApi

export default bookingApi