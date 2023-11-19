import React, { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from "react-router-dom";
import Menu from '../components/layouts/layoutGuest/menu';
import { useFetchSeatRoomIdQuery } from '../rtk/booking/booking';

const Booking = () => {
    const { id } = useParams();
    const { data: seatBooking } = useFetchSeatRoomIdQuery(id);
    const [activeTab, setActiveTab] = useState(1);
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState(null);
    const seats = seatBooking?.seats;

    const handleClick = (tabNumber: number) => {
        setActiveTab(tabNumber);
    };

    const autoSubmit = async (seatId: any) => {
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
        } else {
            setSelectedSeats([...selectedSeats, seatId]);
        }

        // setIsSaving(true); // Bắt đầu quá trình lưu

        // try {
        //     const response = await bookingMovie(selectedSeats).unwrap();
        //     setSelectedSeats(response); // Cập nhật selectedSeats với dữ liệu trả về từ server
        //     setIsSaving(false); // Kết thúc quá trình lưu
        // } catch (error) {
        //     setSaveError(error); // Xử lý lỗi nếu có
        //     setIsSaving(false); // Kết thúc quá trình lưu
        // }
    };


    return (
        <div className='bg-black text-white'>
            <Menu />
            <div className="backdrop">
                <img src={seatBooking?.movie?.image} className='backdrop-img w-full h-[550px] relative'></img>
            </div>
            <div className="movies-detail absolute">
                {/* <img src={movieBooking?.trailer} className='w-[350px] border'></img> */}
            </div>
            <div className="movies-title absolute flex justify-between items-center translate-x-[28rem] -translate-y-[4rem] text-white w-[63.875rem]">
                <h3 className='text-3xl'>{seatBooking?.movie?.movie_name}</h3>
                <div className="time flex text-lg items-center space-x-10">
                    <p>{seatBooking?.movie?.time}</p>
                    <p className='border-2 border-[#1ACAAC] rounded-full px-7 py-2'>{seatBooking?.movie?.age}</p>
                </div>
            </div>
            <div className="booking h-full max-w-[1420px] mx-auto ">
                <div className="booking-seat">
                    <div className="no-content"></div>
                    <div className="content-right">
                        <div className="taskbar">
                            <ul>
                                <li className={activeTab === 1 ? 'active' : ''} onClick={() => handleClick(1)}>
                                    <span>1</span> Chọn ghế
                                </li>
                                <li className={activeTab === 2 ? 'active' : ''} onClick={() => handleClick(2)}>
                                    <span>2</span> Combo
                                </li>
                                <li className={activeTab === 3 ? 'active' : ''} onClick={() => handleClick(3)}>
                                    <span>3</span> Thanh toán
                                </li>
                            </ul>
                        </div>
                        <form action="" method='POST'>
                            <div className={`Booking-content ${activeTab === 2 ? "hidden" : ""}`}>
                                <input type="text" hidden id={id} name='showtime_id' />
                                <div className="choose-seat mt-[7rem]">
                                    <div className="screen">
                                        <img src="/screen.png" alt="" className='w-full' />
                                    </div>
                                    <div className="all-seat max-w-4xl mx-auto space-x-3 mt-[3rem]">
                                        {seats?.map((item: any) => (
                                                <p className={`seat ${selectedSeats.includes(item?.seat_code) === true ? "" : ""}`} onClick={() => autoSubmit(item?.seat_code)}>{item?.seat_code}</p>
                                            // <React.Fragment key={item?.id}>
                                            //     <input
                                            //         type="checkbox"
                                            //         value={item?.seat_code}
                                            //         id={item?.id}
                                            //         onChange={autoSubmit}
                                            //         checked={selectedSeats.includes(item?.seat_code)}
                                            //         className='form-control'
                                            //         name={item?.seat_code}
                                            //     />
                                            //     <label htmlFor={item?.id} className='seat'>{item?.seat_code}</label>
                                            // </React.Fragment>
                                        ))}
                                        <h1 className='mt-3 text-xl'>Số ghế đã chọn: {selectedSeats.map(seatId => seatId + ' ').join('')}</h1>
                                        {isSaving && <p>Đang lưu...</p>}
                                        {saveError && <p>Lỗi khi lưu: {saveError.message}</p>}
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

                            </div>
                            <div className={`Booking-combo ${activeTab === 2 ? "" : "hidden"}`}>
                                <div className='grid grid-cols-2 gap-12 my-[7rem] mx-[4rem]'>
                                    <div className='grid grid-cols-3 border-2 border-white rounded-md bg-[#1B3F47] p-3' >
                                        <img src="" alt="" className='col-span-1 h-[140px] w-full' />
                                        <div className="col-span-2 space-y-2">
                                            <h1 className=''></h1>
                                            <p></p>
                                            <p></p>
                                            <span className=''></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Booking