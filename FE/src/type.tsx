export type SuatChieu = {
    id: string;
    movie_id: MovieId;
    room_id: RoomId;
    show_date: string;
    show_time: string;
    total_ticket_sold: number;
    total_money: number
}
type MovieId = {
    movie_name: string
}
type RoomId = {
    name: string
}