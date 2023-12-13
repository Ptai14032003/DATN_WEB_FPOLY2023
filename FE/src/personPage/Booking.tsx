import { useEffect, useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
import { useFetchSeatRoomIdQuery } from '../rtk/booking/booking';
import ThanhToan from '../components/itemGuest/ThanhToan/ThanhToan';
import { useFetchFoodsQuery } from '../rtk/qlSp/qlSp';
import { useFetchMovieIdPersonQuery } from '../rtk/moviesPerson/moviesPerson';
import { MdChair } from "react-icons/md";
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
const Booking = () => {
    const { search } = useLocation();
    const show_time = new URLSearchParams(search).get('show_seat');
    const { id } = useParams();
    const { data: Foods } = useFetchFoodsQuery()
    const { data: seatBooking } = useFetchSeatRoomIdQuery(show_time);
    const { data: movie } = useFetchMovieIdPersonQuery(id);
    const [activeTab, setActiveTab] = useState(1);
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [idGhe, setidGhe] = useState<any[]>([])
    const [combo, setCombo] = useState<[]>([]);
    const [priceFood, setPriceFood] = useState(0)
    const [money, setMoney] = useState(0);
    const [groupSeats, setGroupSeats] = useState<any>();
    const priceTong = money + priceFood;
    const seats = seatBooking?.seats;
    const movieBooking = movie?.movie
    useEffect(() => {
        if (seats) {
            const groupedSeats = seats.reduce((acc: any, seat: any) => {
                const firstChar = seat.seat_code.charAt(0);
                if (!acc[firstChar]) {
                    acc[firstChar] = [];
                }
                acc[firstChar].push(seat);
                return acc;
            }, {});
            const groupedSeatsArray = Object.values(groupedSeats);
            setGroupSeats(groupedSeatsArray)
        }
    }, [seats])
    const handleClick = (tabNumber: number) => {
        setActiveTab(tabNumber);
    };
    const getIdGhe = (id: string, price: string) => {
        const data = {
            id: id,
            price: price
        };
        const checkId = idGhe.some((item: any) => item.id === data.id);

        if (checkId) {
            setidGhe(() => idGhe.filter((item: any) => item.id !== data.id));
        } else {
            setidGhe([...idGhe, data]);
        }
    };
    const autoSubmit = async (seatId: any, typeName: any) => {
        if (typeName === 'Đôi') {
            if (seatId.charAt(1) % 2 === 0) {
                const seat = seatId.charAt(0) + `${Number(seatId.charAt(1)) - Number(1)}`;
                const isSelected = selectedSeats.includes(seatId) || selectedSeats.includes(seat);
                if (isSelected) {
                    setSelectedSeats(selectedSeats.filter((id) => id !== seatId && id !== seat));
                } else {
                    setSelectedSeats([...selectedSeats, seat, seatId]);
                }
            }
            else {
                const seat = seatId.charAt(0) + `${Number(seatId.charAt(1)) + Number(1)}`
                console.log(seat);

                const isSelected = selectedSeats.includes(seatId) || selectedSeats.includes(seat);
                if (isSelected) {
                    setSelectedSeats(selectedSeats.filter((id) => id !== seatId && id !== seat));
                } else {
                    setSelectedSeats([...selectedSeats, seat, seatId]);
                }
            }

        } else {
            if (selectedSeats.includes(seatId)) {
                setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
            } else {
                setSelectedSeats([...selectedSeats, seatId]);
            }
        }
    };
    const TongTien = async (seatId: any, price: any) => {
        if (selectedSeats.includes(seatId)) {
            setMoney(money - price);
        } else {
            setMoney(money + price);
        }
    }
    const getCombo = async (data: { target: { value: any } }, price: number, foodName: any) => {
        let soLuong = parseInt(data.target.value, 10);
        soLuong = isNaN(soLuong) || soLuong < 0 ? 0 : soLuong;

        const comboObject = {
            soLuong: soLuong,
            price: price,
            food_name: foodName,
        };

        setCombo((prevCombo: any) => {
            const comboExists = prevCombo.some((comboObjectInArray: any) => comboObjectInArray.food_name === comboObject.food_name);

            if (!comboExists && comboObject.soLuong !== 0) {
                return [...prevCombo, comboObject];
            }

            const updatedCombo = prevCombo.map((item: any) => {
                if (item.food_name === comboObject.food_name) {
                    item.soLuong = comboObject.soLuong;
                }
                return item;
            });

            return updatedCombo.filter((item: any) => item.soLuong !== 0);
        });
    };

    useEffect(() => {
        const tongComboPrice = combo.reduce((totalPrice: number, item: any) => {
            return totalPrice + item.price * item.soLuong;
        }, 0);

        setPriceFood(tongComboPrice);
    }, [combo]);

    useEffect(() => {
        let priceCombo = 0;
        let tongComboPrice = 0
        combo.map((item: any) => {
            priceCombo = item.price * (item.soLuong);
            tongComboPrice += priceCombo
        })
        setPriceFood(tongComboPrice)
    }, [combo])
    const Continue = () => {
        if (!selectedSeats || selectedSeats.length === 0) {
            alert('Vui lòng chọn ghế');
        }
        else {
            handleClick(2)
        }
    }

    return (
        <div className='bg-black text-white'>
            <div className="backdrop">
                <img src={seatBooking?.movie?.image} className='backdrop-img w-full h-[550px] relative'></img>
            </div>
            <div className="movies-title absolute flex justify-between items-center translate-x-[28rem] -translate-y-[4rem] text-white w-[63.875rem]">
                <h3 className='text-3xl'>{seatBooking?.movie?.movie_name}</h3>
                <div className="time flex text-lg items-center space-x-10">
                    <p>{seatBooking?.movie?.time}</p>
                </div>
            </div>
            <div className="booking h-full max-w-[1420px] mx-auto ">
                <div className="booking-seat">
                    {/* Dữ liệu form */}
                    <div className="no-content mt-5">
                        <div className="block">
                            <div className="w-[190px]"><img width="190" height="240" src={movieBooking?.image} alt="" /></div>
                            <h3 className="mt-4 text-lg font-bold text-white sm:text-xl">
                                {movieBooking?.movie_name}
                            </h3>

                            <div className="mt-2 max-w-sm text-white">
                                <h1 className='mt-3 text-sm'>Số ghế đã chọn : {selectedSeats.map(seatId => seatId + ' ').join('')}</h1>
                                <h1 className='mt-3 text-sm'>Combo :</h1>
                                {combo.map((item: any) => (
                                    <div key={item.food_name} className='flex gap-[100px]'>
                                        <div className='w-[80%]'>{item.food_name}</div>
                                        <div>x{item.soLuong}</div>
                                    </div>
                                ))}
                                <h1 className='mt-3 text-sm'>Tổng tiền : {priceFood + money}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="content-right">
                        <div className="taskbar">
                            <ul>
                                <li className={activeTab === 1 ? 'active' : ''}>
                                    <span>1</span> Chọn ghế
                                </li>
                                <li className={activeTab === 2 ? 'active' : ''}>
                                    <span>2</span> Combo
                                </li>
                                <li className={activeTab === 3 ? 'active' : ''}>
                                    <span>3</span> Thanh toán
                                </li>
                            </ul>
                        </div>
                        <form action="" method='POST'>
                            <div className={`Booking-content ${activeTab === 1 ? "" : "hidden"}`}>
                                <input type="text" hidden id={id} name='showtime_id' />
                                <div className="choose-seat mt-[7rem]">
                                    <div className="screen">
                                        <img src="/screen.png" alt="" className='w-full' />
                                    </div>
                                    <div className="all-seat max-w-4xl mx-auto flex gap-5 flex-wrap justify-center">
                                        {groupSeats?.map((group: any, index: number) => (
                                            <div key={index} className="seat-group flex gap-4 res">
                                                {group?.map((seat: any) => (
                                                    <div className='relative '
                                                        key={seat?.seat_code} >
                                                        <MdChair className={`seat text-center cursor-pointer ${(seat?.status === 0 && 'non-choose-1') || (seat?.status === 1 && 'non-choose-2') ||(seat?.type_name === 'VIP' && !selectedSeats.includes(seat?.seat_code)) && 'text-[#8f4747]' ||
                                                            (selectedSeats.includes(seat?.seat_code)) && 'text-[#00FFD1]' || (seat?.type_name === 'Thường' && !selectedSeats.includes(seat?.seat_code)) && 'text-[#797373]' || (seat?.type_name === 'Đôi' && !selectedSeats.includes(seat?.seat_code)) && 'text-[#8f355a]'
                                                            }`}
                                                            onClick={() => {
                                                                if (seat?.status !== 1 && seat?.status !== 0) {
                                                                    autoSubmit(seat?.seat_code, seat?.type_name); TongTien(seat?.seat_code, seat?.price); getIdGhe(seat?.id, seat?.price)
                                                                }
                                                            }}
                                                            size={80}
                                                        />
                                                        <div className={`cursor-pointer absolute top-4 right-8 font-semibold text-sm ${(selectedSeats.includes(seat?.seat_code)) && 'text-black'}`} onClick={() => { autoSubmit(seat?.seat_code, seat?.type_name); TongTien(seat?.seat_code, seat?.price); getIdGhe(seat?.id, seat?.price) }}>{seat?.seat_code}</div>
                                                    </div>
                                                ))}
                                               </div>
                                            ))}
                                        {/* {seats?.map((item: any) => (
                                            <div
                                                key={item?.seat_code} >
                                                 <MdChair
                                                    className={`seat text-center cursor-pointer ${(item?.status === 0 && 'non-choose-1') || (item?.status === 1 && 'non-choose-2') ||
                                                        (item?.type_name === 'VIP' && !selectedSeats.includes(item?.seat_code) && 'text-[#8f4747]') ||
                                                        (selectedSeats.includes(item?.seat_code) && 'text-[#00FFD1]') ||
                                                        (item?.type_name === 'Thường' && !selectedSeats.includes(item?.seat_code) && 'text-[#797373]')
                                                        }`}
                                                    onClick={() => {
                                                        if (item?.status !== 1 && item?.status !== 0) {
                                                            autoSubmit(item?.seat_code);
                                                            TongTien(item?.seat_code, item?.price);
                                                            getIdGhe(item?.id, item?.price);
                                                        }
                                                    }}
                                                    size={50}
                                                />

                                            </div>
                                        ))} */}
                                    </div>
                                    <div className="classify max-w-3xl mx-auto my-[5rem]">
                                        <div className="seat">
                                            <div><MdChair className="text-[#797373]" size={40}/></div>
                                            <p className='ml-2'>Thường</p>
                                        </div>
                                        <div className="seat">
                                            <div><MdChair className="text-[#8f4747]" size={40}/></div>
                                            <p className='ml-2'>Vip</p>
                                        </div>
                                        <div className="seat">
                                            <div><MdChair className="text-[#8f355a]" size={40}/></div>
                                            <p className='ml-2'>Sweet-box</p>
                                        </div>
                                        <div className="seat">
                                            <div><MdChair className="text-[#00FFD1]" size={40}/></div>
                                            <p className='ml-2'>Đang chọn</p>
                                        </div>
                                        <div className="seat">
                                            <div><MdChair className="text-[#ff0000]" size={40}/></div>
                                            <p className='ml-2'>Đã bán</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='max-w-4xl mx-auto my-6 flex justify-end'>
                                    <a className={`cursor-pointer ${!selectedSeats || selectedSeats.length === 0 ? "hidden" : "border-2 border-[#1ACAAC] rounded-full px-7 py-2 hover:bg-[#1ACAAC]"}`} onClick={() => Continue()}>Tiếp tục</a>
                                </div>
                            </div>
                        </form>
                        <div className={`Booking-combo grid ${activeTab === 2 ? "" : "hidden"}`}>
                            <div className='mt-[7rem] mx-[4rem]'>
                                <div className='grid grid-cols-2 gap-12'>
                                    {Foods?.map((item) => (
                                        <div className='Combo grid grid-cols-3 border-2 border-white rounded-md bg-[#2f9c8a] p-3 gap-5' key={item?.id}>
                                            <img src={`${item?.image}`} alt="" className='col-span-1 h-full w-full rounded-md' />
                                            <div className="col-span-2 flex flex-col justify-between">
                                                <h1 className='text-xl font-semibold'>{item?.food_name} - {item?.price.toLocaleString("vi-VN", { style: "currency", currency: "VND", })}</h1>
                                                <p className='description'>01 nước siêu lớn + 01 bắp lớn + 01 xúc xích lốc xoáy</p>
                                                <p className='description'>* Nhận ngay trong ngày xem phim</p>
                                                <p className='description'>** Miễn phí đổi vị bắp Caramel</p>
                                                <div className='flex justify-between mt-2'>
                                                    <div className='combo-quantity h-[30px] flex'>
                                                        <button className='bg-white rounded-tl-md rounded-bl-md h-full flex items-center justify-center'>
                                                            <MinusOutlined style={{ color: '#000', fontSize: '20px', padding: '3px' }} />
                                                        </button>
                                                        <input className='text-black w-[100px] h-full outline-none pl-3' type="number" defaultValue={0} min={0} onChange={(e) => getCombo(e, item?.price, item?.food_name)} />
                                                        <button className='bg-white rounded-tr-md rounded-br-md h-full flex items-center justify-center'>
                                                            <PlusOutlined style={{ color: '#000', fontSize: '20px', padding: '3px' }} />
                                                        </button>
                                                    </div>
                                                    {/* <input className='text-black' type="number" defaultValue={0} min={0} onChange={(e) => getCombo(e, item?.price, item?.food_name)} /> */}
                                                    <div>
                                                        <button className='cursor-pointer border rounded py-1 px-4 bg-black'>Chọn</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='my-10 flex justify-end space-x-5'>
                                    <a onClick={() => handleClick(1)} className='border-2 border-[#1ACAAC] rounded-full px-7 py-2 hover:bg-[#1ACAAC] cursor-pointer'>Quay lại</a>
                                    <a onClick={() => handleClick(3)} className='border-2 border-[#1ACAAC] rounded-full px-7 py-2 hover:bg-[#1ACAAC] cursor-pointer'>Tiếp tục</a>
                                </div>
                            </div>
                        </div>
                        <div className={`${activeTab === 3 ? "" : "hidden"}`}>
                            <ThanhToan data={{ selectedSeats, priceTong, movieBooking, combo, idGhe, show_time }} key={`1`} />
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}
export default Booking