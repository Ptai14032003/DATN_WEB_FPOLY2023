import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { message } from 'antd';
import { MdChair } from "react-icons/md";
import { useFetchMovieIdPersonQuery } from '../../rtk/moviesPerson/moviesPerson';
import { useFetchSeatRoomIdQuery } from '../../rtk/booking/booking';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import "./index.css"
import ThanhToanBooking from './ThanhtoanBooking';

const BookingSeatAdmin = () => {
    const { search } = useLocation();
    const show_time = new URLSearchParams(search).get('show_seat');
    const { id } = useParams();
    // const { data: Foods } = useFetchFoodsQuery()
    const { data: seatBooking } = useFetchSeatRoomIdQuery(show_time);
    const [isFixed, setIsFixed] = useState(false);
    const { data: movie } = useFetchMovieIdPersonQuery(id);
    const [activeTab, setActiveTab] = useState(1);
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [idGhe, setidGhe] = useState<any[]>([])
    const [room, setRoom] = useState<any>()
    const [combo, setCombo] = useState<[]>([]);
    const [priceFood, setPriceFood] = useState(0)
    const [money, setMoney] = useState<number>(0);
    const [groupSeats, setGroupSeats] = useState<any>();
    const priceTong = money + priceFood;
    const dataTong = (Number(priceTong))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    const seats = seatBooking?.seats;
    const Foods = seatBooking?.combo;
    const movieBooking = movie?.movie
    const [messageApi, contextHolder] = message.useMessage();
    const checkUser = localStorage.getItem("user")
    const [minute, setMinute] = useState<number>(10);
    const [second, setSecond] = useState<number>(0)
    const navigate = useNavigate();

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
        if (seatBooking) {
            setRoom(seatBooking?.seats[0]?.room_name)
        }
    }, [seats])
    const handleClick = (tabNumber: number) => {
        if (checkUser) {
            setActiveTab(tabNumber);
        } else {
            messageApi.error({
                type: 'error',
                content: 'Quý khách vui lòng đăng nhập để tiếp tục',
                className: "h-[20%] mt-[20px]"
            }).then(() => navigate("/signin"));
        }
    };
    const autoSubmit = async (id: string, seatId_code: any, typeName: any, price: number,) => {
        const data = {
            id: id,
            price: price
        };
        let mapExecuted = false;
        groupSeats?.map((item: any) => {
            item?.map((item2: any) => {
                const dataOderSeat: number = item.findIndex((seat: any) => seat.seat_code === seatId_code);
                if (dataOderSeat >= 0) {
                    const checkSeat = (selectedSeats.includes(item[dataOderSeat + 2]?.seat_code) || selectedSeats.includes(item[dataOderSeat - 2]?.seat_code)) && !(selectedSeats.includes(item[dataOderSeat + 1]?.seat_code) || selectedSeats.includes(item[dataOderSeat - 1]?.seat_code))
                    const checkLeft = (dataOderSeat === 1) && !selectedSeats.includes(item[0]?.seat_code) && !selectedSeats.includes(item[dataOderSeat + 1]?.seat_code)
                    const checkRight = (item[dataOderSeat + 1]?.seat_code === item[item.length - 1]?.seat_code && !(selectedSeats.includes(item[dataOderSeat - 1]?.seat_code) || selectedSeats.includes(item[dataOderSeat + 1]?.seat_code)));
                    if (checkRight && !mapExecuted && typeName !== 'Đôi') {
                        messageApi.error({
                            type: 'error',
                            content: 'Vẫn còn ghế trống bên phải không thể mua ghế vừa chọn',
                            className: "h-[20%] mt-[20px]",
                            duration: 2
                        });
                        mapExecuted = true;
                        return;
                    }
                    if (checkLeft && !mapExecuted && typeName !== 'Đôi') {
                        messageApi.error({
                            type: 'error',
                            content: 'Vẫn còn ghế trống bên trái không thể mua ghế vừa chọn',
                            className: "h-[20%] mt-[20px]",
                            duration: 2
                        });
                        mapExecuted = true;
                        return;
                    }
                    if (!item[dataOderSeat + 2] && !mapExecuted && typeName !== 'Đôi' && checkSeat) {
                        messageApi.error({
                            type: 'error',
                            content: 'Vẫn còn ghế trống bên phải không thể mua ghế vừa chọn',
                            className: "h-[20%] mt-[20px]",
                            duration: 2
                        });
                        mapExecuted = true;
                        return;
                    }
                    if (selectedSeats.length > 0 && checkSeat && !mapExecuted && typeName !== 'Đôi') {
                        messageApi.error({
                            type: 'error',
                            content: 'Quý khách nên chọn ghế bên cạnh',
                            className: "h-[20%] mt-[20px]",
                            duration: 2
                        });
                        mapExecuted = true;
                        return;
                    }
                    if (typeName === 'Đôi') {
                        if (item2.type_name === "Đôi") {
                            const dataSeat1 = {
                                id: item[dataOderSeat]?.id,
                                price: item[dataOderSeat]?.price
                            }
                            if (dataOderSeat % 2 === 0) {
                                const dataSeat2 = {
                                    id: item[dataOderSeat + 1]?.id,
                                    price: item[dataOderSeat + 1]?.price
                                }
                                const checkId = idGhe.some((item: any) => item.id === dataSeat1?.id || item.id === dataSeat2?.id);
                                const isSelected = selectedSeats.includes(seatId_code) || selectedSeats.includes(item[dataOderSeat + 1]?.seat_code);
                                if (isSelected) {
                                    setSelectedSeats(selectedSeats.filter((seat_code) => seat_code !== seatId_code && seat_code !== item[dataOderSeat + 1]?.seat_code));
                                    setMoney(money - price);
                                } else if (selectedSeats.length < 5) {
                                    setSelectedSeats([...selectedSeats, item[dataOderSeat + 1]?.seat_code, seatId_code]);
                                    setMoney(money + price);
                                }
                                if (checkId) {
                                    setidGhe(() => idGhe.filter((item: any) => item.id !== dataSeat1.id && item.id !== dataSeat2.id));
                                } else if (selectedSeats.length < 5) {
                                    setidGhe([...idGhe, dataSeat1, dataSeat2]);
                                }
                                else if (!mapExecuted) {
                                    messageApi.error({
                                        type: 'error',
                                        content: `Bạn chỉ có thể đặt tối đa 6 ghế 1 lần`,
                                        className: "h-[20%] mt-[20px]",
                                        duration: 2
                                    });
                                    mapExecuted = true;
                                    return;

                                }
                            } else {
                                const dataSeat2 = {
                                    id: item[dataOderSeat - 1]?.id,
                                    price: item[dataOderSeat - 1]?.price
                                }
                                const checkId = idGhe.some((item: any) => item.id === dataSeat1.id);
                                const isSelected = selectedSeats.includes(seatId_code) || selectedSeats.includes(item[dataOderSeat - 1]?.seat_code);
                                if (isSelected) {
                                    setSelectedSeats(selectedSeats.filter((seat_code) => seat_code !== seatId_code && seat_code !== item[dataOderSeat - 1]?.seat_code));
                                    setMoney(money - price);
                                } else if (selectedSeats.length < 5) {
                                    setSelectedSeats([...selectedSeats, item[dataOderSeat - 1]?.seat_code, seatId_code]);
                                    setMoney(money + price);

                                }
                                if (checkId) {
                                    setidGhe(() => idGhe.filter((item: any) => item.id !== dataSeat1.id && item.id !== dataSeat2.id));
                                } else if (selectedSeats.length < 5) {
                                    setidGhe([...idGhe, dataSeat1, dataSeat2]);
                                }
                                else if (!mapExecuted) {
                                    messageApi.error({
                                        type: 'error',
                                        content: `Bạn chỉ có thể đặt tối đa 6 ghế 1 lần`,
                                        className: "h-[20%] mt-[20px]",
                                        duration: 2
                                    });
                                    mapExecuted = true;
                                    return;

                                }
                            }
                        }
                    }
                    if (typeName !== 'Đôi' && !checkSeat && !checkRight && !checkLeft) {
                        const checkSeatDelete = (selectedSeats.includes(item[dataOderSeat + 1]?.seat_code) && selectedSeats.includes(item[dataOderSeat - 1]?.seat_code))
                        const checkedRight = (dataOderSeat === item.length - 1) && selectedSeats.includes(item[item.length - 1]?.seat_code) && selectedSeats.includes(item[item.length - 2]?.seat_code)
                        const checkedLeft = ((dataOderSeat) === 0) && selectedSeats.includes(item[0]?.seat_code) && selectedSeats.includes(item[1]?.seat_code)
                        const checkFull = selectedSeats.includes(item[0]?.seat_code) && selectedSeats.includes(item[item.length - 1]?.seat_code)
                        const checkId = idGhe.some((item: any) => item.id === data.id);
                        if (selectedSeats.includes(seatId_code)) {
                            if (checkSeatDelete && !mapExecuted && checkId) {
                                messageApi.error({
                                    type: 'error',
                                    content: 'Quý khách nên hủy ghế lần lượt theo thứ tự',
                                    className: "h-[20%] mt-[20px]",
                                    duration: 2
                                });
                                mapExecuted = true;
                                return;
                            }
                            if (checkFull && !mapExecuted && checkId && !checkSeatDelete) {
                                messageApi.error({
                                    type: 'error',
                                    content: 'Quý khách nên hủy ghế lần lượt theo thứ tự',
                                    className: "h-[20%] mt-[20px]",
                                    duration: 2
                                });
                                mapExecuted = true;
                                return;
                            }
                            if (checkedLeft && !mapExecuted && checkId && !checkedRight && !checkSeatDelete) {
                                messageApi.error({
                                    type: 'error',
                                    content: `Quý khách nên hủy ghế lần lượt theo thứ tự`,
                                    className: "h-[20%] mt-[20px]",
                                    duration: 2
                                });
                                mapExecuted = true;
                                return;
                            }
                            if (checkedRight && !mapExecuted && checkId && !checkedLeft && !checkSeatDelete) {
                                messageApi.error({
                                    type: 'error',
                                    content: `Quý khách nên hủy ghế lần lượt theo thứ tự`,
                                    className: "h-[20%] mt-[20px]",
                                    duration: 2
                                });
                                mapExecuted = true;
                                return;
                            }
                            if (!(checkSeatDelete || checkedLeft || checkedRight) && checkId) {
                                setSelectedSeats(selectedSeats.filter((id) => id !== seatId_code));
                                setidGhe(() => idGhe.filter((item: any) => item.id !== data.id));
                                setMoney(money - price);
                            }
                        } else
                            if (selectedSeats.length < 6) {
                                setSelectedSeats([...selectedSeats, seatId_code]);
                                setMoney(money + price);
                                setidGhe([...idGhe, data]);
                            } else if (!mapExecuted) {
                                messageApi.error({
                                    type: 'error',
                                    content: `Bạn chỉ có thể đặt tối đa 6 ghế 1 lần`,
                                    className: "h-[20%] mt-[20px]",
                                    duration: 2
                                });
                                mapExecuted = true;
                                return;

                            }
                    }
                }
            })
        })
    };
    const getCombo = (quantity: number, price: number, foodName: any) => {
        let soLuong = parseInt(quantity.toString(), 10);

        //const getCombo = async (data: { target: { value: any } }, price: number, foodName: any) => {
        //let soLuong = parseInt(data.target.value, 10);

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
    const Continue = () => {
        if (!selectedSeats || selectedSeats.length === 0) {
            alert('Vui lòng chọn ghế');
        }
        else {
            handleClick(2)
        }
    }
    if (priceTong < 0) {
        window.location.reload();
    }
    useEffect(() => {
        const countdownInterval = setInterval(() => {
            if (second === 0) {
                if (minute === 0) {
                    messageApi.error({
                        type: 'error',
                        content: 'Đã hết giờ chọn ghế ! Bạn vui lòng thực hiện lại',
                        className: "h-[20%] mt-[20px]",
                        duration: 2
                    }).then(() => navigate("/"));
                    clearInterval(countdownInterval);
                    return;
                } else {
                    setMinute(minute - 1)
                    setSecond(59);
                }
            } else {
                setSecond(second - 1);
            }
        }, 1000)
        return () => clearInterval(countdownInterval);
    }, [second, minute])
    const formattedSecond = String(second).padStart(2, '0');
    const formattedMinute = String(minute).padStart(2, '0');

    interface ComboItems {
        [key: string]: number;
    }

    const [comboItems, setComboItems] = useState<ComboItems>({});
    const handleIncrease = (foodName: string, price: number) => {
        setComboItems((prevItems) => {
            const prevQuantity = prevItems[foodName] || 0;
            const updatedItems: ComboItems = {
                ...prevItems,
                [foodName]: prevQuantity + 1,
            };
            getCombo(updatedItems[foodName], price, foodName); // Tính toán giá tiền
            return updatedItems;
        });
    };

    const handleDecrease = (foodName: string, price: number) => {
        setComboItems((prevItems) => {
            const prevQuantity = prevItems[foodName] || 0;
            const updatedItems: ComboItems = {
                ...prevItems,
                [foodName]: Math.max(prevQuantity - 1, 0),
            };
            getCombo(updatedItems[foodName], price, foodName); // Tính toán giá tiền
            return updatedItems;
        });

    };
    return (
        <div className='containner text-black'>
            <div className="booking">
                <div className="booking-seat">
                    {/* Dữ liệu form */}
                    <div className="no-content mt-5">
                        <div className="flex justify-between">
                            <div className='flex gap-5'>
                                <div className="w-[190px]"><img width="190" height="240" src={movieBooking?.image} alt="" /></div>

                                <div className="max-w-sm ">
                                    <h3 className=" text-lg font-bold sm:text-xl">
                                        {movieBooking?.movie_name}
                                    </h3>
                                    <h1 className='mt-3 text-sm'>Số ghế đã chọn : {selectedSeats.map(seatId => seatId + ' ').join('')}</h1>
                                    <h1 className='mt-3 text-sm'>Combo :</h1>
                                    {combo.map((item: any) => (
                                        <div key={item.food_name} className='flex gap-[100px]'>
                                            <div className='w-[80%]'>{item.food_name}</div>
                                            <div>x{item.soLuong}</div>
                                        </div>
                                    ))}
                                    <h1 className='mt-3 text-sm'>Tổng tiền : {dataTong} đ</h1>
                                </div>
                            </div>
                            <div className="w-[200px] h-[42px] border-[2px] rounded-md px-[8px] py-2 border-red-600">Thời gian chọn ghế : {formattedMinute}:{formattedSecond}</div>
                        </div>
                    </div>
                    <div className="content-right border-2 py-[40px]">
                        <form action="" method='POST'>

                            <div className={`Booking-content ${activeTab === 1 ? "" : "hidden"}`}>
                                <input type="text" hidden id={id} name='showtime_id' />
                                <div className="choose-seat mt-2">
                                    <div className="screen">
                                        <img src="/screen.png" alt="" className='w-full' />
                                    </div>
                                    <div className="all-seat max-w-4xl mx-auto flex gap-5 flex-wrap justify-center">
                                        {contextHolder}
                                        {groupSeats?.map((group: any, index: number) => (
                                            <div key={index} className="seat-group flex gap-4 res">
                                                {group?.map((seat: any) => (
                                                    <div className='relative '
                                                        key={seat?.seat_code} onClick={() => {
                                                            if (seat?.status !== 1 && seat?.status !== 0) {
                                                                autoSubmit(seat?.id, seat?.seat_code, seat?.type_name, seat?.price)
                                                            }
                                                        }}>

                                                        <MdChair className={`seat text-center cursor-pointer ${(seat?.status === 1 && 'non-choose-1') || (seat?.status === 0 && 'non-choose-2') || (seat?.type_name === 'VIP' && !selectedSeats.includes(seat?.seat_code)) && 'text-[#8f4747]' ||

                                                            (selectedSeats.includes(seat?.seat_code)) && 'text-[#00FFD1]' || (seat?.type_name === 'Thường' && !selectedSeats.includes(seat?.seat_code)) && 'text-[#797373]' || (seat?.type_name === 'Đôi' && !selectedSeats.includes(seat?.seat_code)) && 'text-[#8f355a]'
                                                            }`}
                                                            size={80}
                                                        />
                                                        <div className={`cursor-pointer absolute top-4 right-8 font-semibold text-sm ${(selectedSeats.includes(seat?.seat_code)) && 'text-black'}`}>{seat?.seat_code}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="classify max-w-3xl mx-auto my-[5rem]">
                                        <div className="seat">
                                            <div><MdChair className="text-[#797373]" size={40} /></div>
                                            <p className='ml-2'>Thường</p>
                                        </div>
                                        <div className="seat">
                                            <div><MdChair className="text-[#8f4747]" size={40} /></div>
                                            <p className='ml-2'>Vip</p>
                                        </div>
                                        <div className="seat">
                                            <div><MdChair className="text-[#8f355a]" size={40} /></div>
                                            <p className='ml-2'>Sweet-box</p>
                                        </div>
                                        <div className="seat">
                                            <div><MdChair className="text-[#00FFD1]" size={40} /></div>
                                            <p className='ml-2'>Đang chọn</p>
                                        </div>
                                        <div className="seat">
                                            <div><MdChair className="text-[#ff0000]" size={40} /></div>
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
                            <div className=''>
                                <div className='grid grid-cols-2 gap-12'>
                                    {Foods?.map((item: any) => (
                                        <div className='Combo grid grid-cols-3 border-2 border-white rounded-md bg-[#2f9c8a] p-3 gap-5' key={item?.id}>
                                            <img src={item?.image} alt="" className='col-span-1 h-full w-full rounded-md' />
                                            <div className="col-span-2 flex flex-col justify-between">
                                                <h1 className='text-xl font-semibold'>{item?.food_name} - {item?.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</h1>
                                                <p className='description'>01 nước siêu lớn + 01 bắp lớn + 01 xúc xích lốc xoáy</p>
                                                <p className='description'>* Nhận ngay trong ngày xem phim</p>
                                                <p className='description'>** Miễn phí đổi vị bắp Caramel</p>
                                                <div className='flex justify-between mt-2'>
                                                    <div className='combo-quantity h-[30px] flex'>
                                                        <button className='bg-white rounded-tl-md rounded-bl-md h-full flex items-center justify-center' onClick={() => handleDecrease(item?.food_name, item?.price)}>
                                                            <MinusOutlined style={{ color: '#000', fontSize: '20px', padding: '3px' }} />
                                                        </button>
                                                        <input className='text-black w-[100px] h-full outline-none pl-3' type="number" defaultValue={comboItems[item?.food_name] || 0} min={0} value={comboItems[item?.food_name] || 0} readOnly />
                                                        <button className='bg-white rounded-tr-md rounded-br-md h-full flex items-center justify-center' onClick={() => handleIncrease(item?.food_name, item?.price)}>
                                                            <PlusOutlined style={{ color: '#000', fontSize: '20px', padding: '3px' }} />
                                                        </button>
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
                        <div className={`${activeTab === 3 ? "ThanhToan" : "hidden"}`}>
                            <ThanhToanBooking data={{ selectedSeats, priceTong, movieBooking, combo, idGhe, show_time, room }} key={`1`} />
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default BookingSeatAdmin