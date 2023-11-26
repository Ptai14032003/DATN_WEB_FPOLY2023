import React, { useState } from 'react';
import { Button } from 'antd';
import "./page.css"
type Props = {
    data: {
        selectedSeats: string[]
        priceTong: number
        movieBooking: {
            image: string
            name: string
        }
        combo: {
            food_name: string;
            soLuong: number;
        }[];
    }
}
const ThanhToan: React.FC<Props> = ({ data: { selectedSeats, priceTong, movieBooking, combo } }: Props) => {
    return (
        <>
            <div className='my-[25px] flex gap-[30px] justify-center'>
                <div className='w-[25%]'>
                    <img src={movieBooking?.image} width={200} alt="" />
                </div>
                <div>
                    <div className='item-card flex order-b-2 gap-[30px] border-b-2'>
                        <div className='flex flex-col-reverse w-[95px]'>
                            <dd className="text-sm text-white">1</dd>
                            <dt className="text-xs text-gray-500">Phòng chiếu</dt>
                        </div>
                        <div className='flex flex-col-reverse'>
                            <dd className="text-sm text-white w-[95px]">{ selectedSeats.length }</dd>
                            <dt className="text-xs text-gray-500">Số vé</dt>
                        </div>
                        <div className='flex flex-col-reverse w-[125px]'>
                            <dd className="text-sm text-white flex gap-1">{selectedSeats.map((item: any) => (
                                <div key={item}>{item}</div>
                            ))
                            }</dd>
                            <dt className="text-xs text-gray-500">Số ghế</dt>
                        </div>
                    </div>
                    <div className='item-card border-b-2'>
                        <div className='flex flex-col-reverse'>
                            <dd className="text-sm text-white text-left">{movieBooking?.movie_name}</dd>
                            <dt className="text-xs text-gray-500 text-left">Tên phim</dt>
                        </div>
                    </div>
                    <div className='item-card border-b-2'>
                        <div>
                            <div className='flex justify-between'>
                                <span className="text-xs text-gray-500 text-left">Combo</span>
                                <span className="text-xs text-gray-500">Số lượng</span>
                            </div>
                            {combo.map((item: any) => (
                                <div className='flex justify-between'>
                                    <span className="text-sm text-white">{item?.food_name}</span>
                                    <span className="text-sm text-white w-[50px] text-center">{item?.soLuong}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='item-card border-b-2'>
                        <div className='flex flex-col-reverse'>
                            <dd className="text-sm text-white text-left">Phố Trịnh Văn Bô, Phường Phương Canh, quận Từ Liêm</dd>
                            <dt className="text-xs text-gray-500 text-left">IMAGIX cinema</dt>
                        </div>
                    </div>
                    <div className='block'>
                        <div className='info-card'>
                            <div>Tổng tiền</div>
                            <div className='item-info-card'>{priceTong}</div>
                        </div>
                    </div>
                </div >
            </div >
            <div>Phương thức thanh toán</div>
            <div className='flex justify-center'>
                <Button className="w-[70%] rounded bg-teal-400 text-white text-base h-[42px] border-0" >Thanh toán</Button>
            </div>
        </>
    )
};

export default ThanhToan;