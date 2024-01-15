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
        ticketHistory: builder.mutation<{ message: string, user:{} }, any>({
            query: (body) => ({
              url: "/booking_history",
              method: "POST",
              body,
            }),
            invalidatesTags: ["booking"],
          }),
        listBill: builder.mutation<{ message: string, user:{} }, any>({
            query: (body) => ({
              url: "admin/get_list_bill_export",
              method: "POST",
              body,
            }),
            invalidatesTags: ["booking"],
          }),
        getBillId: builder.mutation<void, any>({
            query: (id) => ({
              url: "admin/get_bill_export",
              method: "POST",
              body: id
            }),
            invalidatesTags: ["booking"],
          }),
        exportBill: builder.mutation<void, any>({
            query: (id) => ({
              url: "admin/export",
              method: "POST",
              body: id
            }),
            invalidatesTags: ["booking"],
          }),
    })
})
export const { useFetchSeatRoomIdQuery, useTicketHistoryMutation, useListBillMutation, useGetBillIdMutation, useExportBillMutation } = bookingApi

export default bookingApi