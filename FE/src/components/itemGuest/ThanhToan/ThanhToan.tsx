import React, { useState } from 'react';
import { Button } from 'antd';
import "./page.css"
type Props = {
    data: {
        selectedSeats: string[]
        money: number
    }
}
const ThanhToan: React.FC<Props> = ({ data: { selectedSeats, money } }: Props) => {
    return (
        <>
            <div className='my-[25px] flex gap-[30px] justify-center'>
                <div>
                    <img src="/phim.png" width="100%" alt="" />
                </div>
                <div>
                    <div className='item-card flex order-b-2 gap-[30px] border-b-2'>
                        <div className='flex flex-col-reverse w-[95px]'>
                            <dd className="text-sm text-white">1</dd>
                            <dt className="text-xs text-gray-500">Phòng chiếu</dt>
                        </div>
                        <div className='flex flex-col-reverse'>
                            <dd className="text-sm text-white w-[95px]">1</dd>
                            <dt className="text-xs text-gray-500">Số vé</dt>
                        </div>
                        <div className='flex flex-col-reverse w-[125px]'>
                            <dd className="text-sm text-white flex gap-1">{selectedSeats.map((item: any) => (
                                <div>{item}</div>
                            ))
                            }</dd>
                            <dt className="text-xs text-gray-500">Số ghế</dt>
                        </div>
                    </div>
                    <div className='item-card border-b-2'>
                        <div>
                            <div className='flex justify-between'>
                                <span className="text-xs text-gray-500 text-left">Combo</span>
                                <span className="text-xs text-gray-500">Số lượng</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className="text-sm text-white">SHOOKY SINGLE COMBO</span>
                                <span className="text-sm text-white w-[50px]">1</span>
                            </div>
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
                            <div className='item-info-card'>{money}</div>
                        </div>
                        <div className='info-card'>
                            <div>Mã giao dịch</div>
                            <div className='item-info-card'>03185785</div>
                        </div>
                        <div className='info-card'>
                            <div>Thời gian giao dịch</div>
                            <div className='item-info-card'>16:00 - 01/09/2023</div>
                        </div>
                    </div>
                </div >
            </div >
            <div className='flex justify-center'>
                <Button className="w-[80%] rounded bg-teal-400 text-white text-base h-[42px] border-0" >Thanh toán</Button>
            </div>
        </>
    )
};

export default ThanhToan;