import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const guestApi = createApi({
    reducerPath: "users",
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