import React from 'react'
import { useFetchSeatRoomIdQuery } from '../rtk/booking/booking'
import { useParams } from 'react-router-dom';


const SeatBooking = () => {
    const {id} = useParams();
    const {data: seatBooking} = useFetchSeatRoomIdQuery(id);
    console.log(seatBooking?.seats);
    const seats = seatBooking?.seats;
    
    return (
        <div>
            <form action="">
                <input type="text" hidden id={id} name='showtime_id'/>
                <div className="choose-seat mt-[7rem]">
                    <div className="screen">
                        <img src="/screen.png" alt="" className='w-full' />
                    </div>
                    <div className="all-seat max-w-4xl mx-auto space-x-3 mt-[3rem]">
                     {seats?.map((item:any)=>(
                        <>
                        <input type="checkbox" hidden value={item?.id} id={item?.id}/>
                        <label htmlFor={item?.id} className='seat'>{item?.seat_code}</label>
                         </>
                     ))}
                    </div>
                    <div className="classify max-w-3xl mx-auto my-[5rem]">
                        <div className="seat">
                            <div className="normal-seat"></div>
                            <p>Thường</p>
                        </div>
                        <div className="seat">
                            <div className="vip-seat"></div>
                            <p>Vip</p>
                        </div>
                        <div className="seat">
                            <div className="sweet-box-seat"></div>
                            <p>Sweet-box</p>
                        </div>
                        <div className="seat">
                            <div className="select-seat"></div>
                            <p>Đang chọn</p>
                        </div>
                        <div className="seat">
                            <div className="sold-seat"></div>
                            <p>Đã bán</p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SeatBooking