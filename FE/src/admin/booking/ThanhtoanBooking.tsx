import React, { useEffect, useState } from 'react';
import "./ThanhToan.css"
import { Button, Input, Select } from 'antd'
import { useSetBillMutation } from '../../rtk/bill/bill';
type Props = {
    data: {
        selectedSeats: string[]
        priceTong: number
        movieBooking: {
            image: string
            movie_name: string
        }
        combo: {
            food_name: string;
            soLuong: number;
        }[];
        idGhe: {
            id: string,
            price: number
        }[],
        show_time: any
    }
}
const typeThanhToan = [{
    value: 0,
    label: "Thanh toán mã QR"
},
{
    value: 1,
    label: "Thanh toán tiền mặt"
}];
const typeOptions = typeThanhToan.map((type: any) => ({
    value: type.value,
    label: type.label,
}));
const ThanhToanBooking: React.FC<Props> = ({ data: { selectedSeats, priceTong, combo, show_time, movieBooking, idGhe } }: Props) => {
    const [data] = useSetBillMutation();
    const [user_code, setUser] = useState("")
    const [type, getTypeThanhToan] = useState("")
    const checkLocal = localStorage.getItem("user");
    const checkUser = checkLocal ? JSON.parse(checkLocal) : null;
    const userCode = checkUser?.user_code;
    const dataBill = {
        show_time: show_time,
        seat:
            idGhe.map((item: any) => (
                {
                    id: item.id,
                    price: item.price,
                }
            ))
        ,
        combo:
            combo.map((item) => (
                {
                    name: item.food_name,
                    quantity: item.soLuong
                }
            ))
        ,
        total_money: priceTong,
        payment_method: type,
        user_code: userCode,
    }
    const onChange = (value: any) => {
        setUser(value)
    }
    const onChangeTypeThanhToan = (value: any) => {
        getTypeThanhToan(value)
    }
    const dataPhuPhi = (Number(Number(selectedSeats?.length) * 10000))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    const dataTong = (Number(priceTong))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    const handlePayment = () => {

     }
    return (
        <>
            <a href=""></a>
            <div className='my-[25px] flex gap-[30px] justify-center text-black'>
                <div className='w-[25%]'>
                    <img src={movieBooking?.image} width={200} alt="" />
                </div>
                <div>
                    <div className='item-card border-b-2'>
                        <div className='flex flex-col-reverse'>
                            <dd className="text-smtext-left">{movieBooking?.movie_name}</dd>
                            <dt className="text-xs text-gray-500 text-left">Tên phim</dt>
                        </div>
                    </div>
                    <div className='item-card flex order-b-2 gap-[30px] border-b-2'>
                        <div className='flex flex-col-reverse w-[95px]'>
                            <dd className="text-sm">1</dd>
                            <dt className="text-xs text-gray-500">Phòng chiếu</dt>
                        </div>
                        <div className='flex flex-col-reverse'>
                            <dd className="text-smw-[95px]">{selectedSeats?.length}</dd>

                            <dt className="text-xs text-gray-500">Số vé</dt>
                        </div>
                        <div className='flex flex-col-reverse w-[125px]'>
                            <dd className="text-sm flex gap-1 max-w-[80px]">{selectedSeats.map((item: any) => (
                                <div key={item}>{item}</div>
                            ))}</dd>
                            <dt className="text-xs text-gray-500">Số ghế</dt>
                        </div>
                    </div>
                    <div className='item-card border-b-2'>
                        <div>
                            <div className='flex justify-between'>
                                <span className="text-xs text-gray-500 text-left">Combo</span>
                                <span className="text-xs text-gray-500">Số lượng</span>
                            </div>
                            {combo.map((item: any) => (
                                <div key={item.food_name} className='flex justify-between'>
                                    <span className="text-sm text-white">{item?.food_name}</span>
                                    <span className="text-smw-[50px] text-center">{item?.soLuong}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='item-card border-b-2'>
                        <div className='flex flex-col-reverse'>
                            <dd className="text-smtext-left">Phố Trịnh Văn Bô, Phường Phương Canh, quận Từ Liêm</dd>
                            <dt className="text-xs text-gray-500 text-left">IMAGIX cinema</dt>
                        </div>
                    </div>
                    <div >
                        <div className='flex flex-col-reverse'>
                            <dd className="text-smtext-left mt-4"><Input placeholder='Mã người dùng' onChange={(e) => onChange(e.target.value)} /></dd>
                            <dt className="text-xs text-gray-500 text-left">Mã người dùng</dt>
                        </div>
                    </div>
                    <div className='block my-3'>
                        <div className='info-card'>
                            <div>Giá gốc</div>
                            <div className='item-info-card'>{dataTong} đ</div>
                        </div>
                    </div>
                    <div className='block my-3'>
                        <div className='info-card'>
                            <div>Phụ phí</div>
                            <div className='item-info-card'>{dataPhuPhi} đ</div>
                        </div>
                    </div>
                    <div className='block my-3'>
                        <div className=''>
                            <div>Phương thức thanh toán :</div>
                            <Select className='mt-[20px] mb-[-40px]'
                                placeholder={"Chọn phương thức thanh toán"}
                                style={{ width: 200 }}
                                options={typeOptions}
                                onChange={(value: any) => onChangeTypeThanhToan(value)}
                            />
                        </div>
                    </div>
                </div >
            </div >
            <Button
                className="w-[82%] rounded bg-teal-400text-base h-[42px] border-0 bg-[#1ACAAC]"
                onClick={handlePayment}
            >
                Thanh toán
            </Button>
        </>
    )
};

export default ThanhToanBooking;