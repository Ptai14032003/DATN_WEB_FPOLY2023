import React, { useEffect, useState } from 'react';
import "./page.css"
import { useSetBillMutation } from '../../../rtk/bill/bill';
import { Button, Modal } from 'antd'
import { useNavigate } from 'react-router-dom';
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
const ThanhToan: React.FC<Props> = ({ data: { selectedSeats, priceTong, combo, show_time, movieBooking, idGhe } }: Props) => {
    console.log(idGhe);

    const [data] = useSetBillMutation()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(1);
    const handleClick = (tabNumber: number) => {
        setActiveTab(tabNumber);
    };
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
        total_money: priceTong
    }
    const setThanhToan = () => {
        data(dataBill)
            .then((response) => {
                if (('data' in response)) {
                    const thanhToanURL = response.data;
                    window.location.href = thanhToanURL;
                }
            })
            .catch((error) => {
                console.error('Lỗi truy vấn:', error);
                alert('Đã xảy ra lỗi khi thực hiện thanh toán.');
            });
    };
    useEffect(() => {
    })

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(true);
    };
    return (
        <>
            <a href=""></a>
            <div className='my-[25px] flex gap-[30px] justify-center'>
                <div className='w-[25%]'>
                    <img src={movieBooking?.image} width={200} alt="" />
                </div>
                <div>
                    <div className='item-card border-b-2'>
                        <div className='flex flex-col-reverse'>
                            <dd className="text-sm text-white text-left">{movieBooking?.movie_name}</dd>
                            <dt className="text-xs text-gray-500 text-left">Tên phim</dt>
                        </div>
                    </div>
                    <div className='item-card flex order-b-2 gap-[30px] border-b-2'>
                        <div className='flex flex-col-reverse w-[95px]'>
                            <dd className="text-sm text-white">1</dd>
                            <dt className="text-xs text-gray-500">Phòng chiếu</dt>
                        </div>
                        <div className='flex flex-col-reverse'>
                            <dd className="text-sm text-white w-[95px]">{selectedSeats?.length}</dd>

                            <dt className="text-xs text-gray-500">Số vé</dt>
                        </div>
                        <div className='flex flex-col-reverse w-[125px]'>
                            <dd className="text-sm text-white flex gap-1">{selectedSeats.map((item: any) => (
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
                    <div className='block border-b-2'>
                        <div className='sale-code'>
                            <div className='grid grid-cols-3 space-x-2'>
                                <input type="text" className='voucher-code cursor-not-allowed h-[30px] outline-none col-span-2' />
                                <Button type="primary" onClick={showModal} className='bg-teal-400 mb-3'>
                                    Discount code
                                </Button>
                            </div>
                            <div className='flex justify-between mb-3'>
                                <p>Discount</p>
                                <p>0</p>
                            </div>
                            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                <div className='space-y-3'>
                                    <button
                                        onClick={() => handleClick(2)}
                                        className={activeTab === 2 ? 'block bg-[#1ACAAC] text-black w-full rounded-md py-3' : 'block bg-[#797373] text-white w-full rounded-md hover:bg-[#464444] py-3'}
                                    >
                                        <h3 className='text-3xl font-medium'>GXHKTD4LJ</h3>
                                        <p>Giảm 20% tổng giá trị đơn hàng</p>
                                        <p>Thời gian áp dụng: 09/12/2023</p>
                                        <p>Thời gian hết hạn: vô hạn</p>
                                    </button>
                                    <button
                                        onClick={() => handleClick(3)}
                                        className={activeTab === 3 ? 'block bg-[#1ACAAC] text-black w-full rounded-md py-3' : 'block bg-[#797373] text-white w-full rounded-md hover:bg-[#464444] py-3'}
                                    >
                                        <h3 className='text-3xl font-medium'>AS5FGS8HC</h3>
                                        <p>Giảm 10% tổng giá trị đơn hàng</p>
                                        <p>Thời gian áp dụng: 09/12/2023</p>
                                        <p>Thời gian hết hạn: vô hạn</p>
                                    </button>
                                </div>
                            </Modal>
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
            <div className='flex justify-center'>
                <Button className="w-[70%] rounded bg-teal-400 text-white text-base h-[42px] border-0" onClick={() => setThanhToan()} >Thanh toán</Button>
            </div>
        </>
    )
};

export default ThanhToan;