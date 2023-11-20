const dataSeat = [
    {
        id: "1",
        name: "A1",
        type: "doi1"
    },
    {
        id: "2",
        name: "A2",
        type: "doi1"
    },
    {
        id: "3",
        name: "A3",
        type: "doi2"
    },
    {
        id: "4",
        name: "A4",
        type: "doi2"
    },
    {
        id: "5",
        name: "A5",
        type: "doi3"
    },
    {
        id: "6",
        name: "A6",
        type: "doi3"
    },
]
type Props = {}
import { useState } from 'react';
import { useFetchSeatRoomIdQuery } from '../../../rtk/booking/booking';


const Seat = (props: Props) => {
    const { data: seatBooking } = useFetchSeatRoomIdQuery(1);
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const seats = seatBooking?.seats;
    const autoSubmit = async (seatId: any) => {
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
        } else {
            setSelectedSeats([...selectedSeats, seatId]);
        }

    };
    const autoSubmitDoi = async (seatId: any) => {
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter((type) => type !== seatId));
        } else {
            setSelectedSeats([...selectedSeats, seatId]);
        }

    };
    return (
        <div>
            <div className="all-seat max-w-4xl mx-auto flex gap-5 flex-wrap justify-center">

                {seats?.map((item: any) => (
                    Array.from({ length: 15 }).map((_, index) => (
                        <div
                            className={`seat text-center ${(item?.type_name === 'Vip' && !selectedSeats.includes(item?.seat_code)) && 'bg-[#8f4747]' ||
                                (selectedSeats.includes(item?.seat_code)) && 'bg-[#00FFD1]' || (item?.type_name === 'Thường' && !selectedSeats.includes(item?.seat_code)) && 'bg-[#797373]'
                                }`}
                            onClick={() => autoSubmit(item?.seat_code)}
                        >
                            {item?.seat_code}
                        </div>
                    )
                    )))}
                {dataSeat.map((item: any, index) => (
                    Array.from({ length: 1 }).map((_, index) => (
                        <div className="flex gap-5" onClick={() => autoSubmitDoi(item?.type)}>
                            <div
                                className={`seat text-center ${(!selectedSeats.includes(item?.type)) && 'bg-[#8f4747]' ||
                                    (selectedSeats.includes(item?.type)) && 'bg-[#00FFD1]'
                                    }`}
                            >
                                {item?.name}
                            </div>
                        </div>
                    ))))}
            </div>
        </div>
    )
}
export default Seat