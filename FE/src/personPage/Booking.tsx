import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Menu from '../components/layouts/layoutGuest/menu';
import { useFetchSeatRoomIdQuery } from '../rtk/booking/booking';
import ThanhToan from '../components/itemGuest/ThanhToan/ThanhToan';
import { useFetchMovieIdQuery } from '../rtk/movies/movies';
import { useFetchFoodsQuery } from '../rtk/qlSp/qlSp';
const Booking = () => {
    const { id } = useParams();
    const { data: Foods } = useFetchFoodsQuery()
    const { data: seatBooking } = useFetchSeatRoomIdQuery(id);
    const { data: movieBooking } = useFetchMovieIdQuery(4);
    const [activeTab, setActiveTab] = useState(1);
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [combo, setCombo] = useState<[]>([]);
    const [priceFood, setPriceFood] = useState(0)
    const [money, setMoney] = useState(0);
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState(null);
    const priceTong = money + priceFood;
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
    return (
        <div className='bg-black text-white'>
            <Menu />
            <div className="backdrop">
                <img src={seatBooking?.movie?.image} className='backdrop-img w-full h-[550px] relative'></img>
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
                                        {/* <div>{item.soLuong * item.price}</div> */}
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

                                        {seats?.map((item: any) => (
                                            <div
                                                key={item?.seat_code}
                                                className={`seat text-center ${(item?.type_name === 'VIP' && !selectedSeats.includes(item?.seat_code)) && 'bg-[#8f4747]' ||
                                                    (selectedSeats.includes(item?.seat_code)) && 'bg-[#00FFD1]' || (item?.type_name === 'Thường' && !selectedSeats.includes(item?.seat_code)) && 'bg-[#797373]'
                                                    }`}
                                                onClick={() => { autoSubmit(item?.seat_code); TongTien(item?.seat_code, item?.price) }}
                                            >
                                                {item?.seat_code}
                                            </div>
                                        ))}
                                    </div>
                                    {isSaving && <p>Đang lưu...</p>}
                                    {saveError && <p>Lỗi khi lưu: {saveError.message}</p>}
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
                                <a onClick={() => handleClick(2)}>Tiếp tục</a>
                            </div>
                        </form>
                        <div className={`Booking-combo grid ${activeTab === 2 ? "" : "hidden"}`}>
                            <div className='grid grid-cols-2 gap-12 my-[7rem] mx-[4rem]'>
                                {Foods?.map((item) => (
                                    <div className='grid grid-cols-3 border-2 border-white rounded-md bg-[#1B3F47] p-3' key={item?.id}>
                                        <img src={`${item?.image}`} alt="" className='col-span-1 h-[140px] w-full' />
                                        <div className="col-span-2 space-y-2 text-center">
                                            <h1 className=''>{item?.food_name}</h1>
                                            <div>{item?.price}</div>
                                            <input className='text-black' type="number" defaultValue={0} min={0} onChange={(e) => getCombo(e, item?.price, item?.food_name)} />
                                            <div className='cursor-pointer'>Thêm combo</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <a onClick={() => handleClick(1)}>Quay lại</a>
                            <a onClick={() => handleClick(3)}>Tiếp tục</a>
                        </div>
                        <div className={`${activeTab === 3 ? "" : "hidden"}`}>
                            <ThanhToan data={{ selectedSeats, priceTong }} key={`1`} />
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}
export default Booking