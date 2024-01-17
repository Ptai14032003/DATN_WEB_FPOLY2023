import React, { useEffect, useState } from 'react';
import "./page.css"
import { useSetBillMutation } from '../../../rtk/bill/bill';
import { Button, Modal } from 'antd'
import { useFetchVoucherQuery } from '../../../rtk/voucher/voucher';
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
        show_time: any,
        room: any
    }
}
const ThanhToan: React.FC<Props> = ({ data: { selectedSeats, priceTong, combo, show_time, movieBooking, idGhe, room } }: Props) => {
    const [data] = useSetBillMutation();
    const { data: voucher } = useFetchVoucherQuery();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [VoucherCode, setVoucherCode] = useState("");
    const [DiscountPercent, setDiscountPercent] = useState(0);
    const [active, setActive] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const checkLocal = localStorage.getItem("user");
    const checkUser = checkLocal ? JSON.parse(checkLocal) : null;
    const userCode = checkUser?.user_code;
    const discountAmount = (priceTong * DiscountPercent) / 100;
    const totalAmount = priceTong - discountAmount;
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
        total_money: totalAmount,
        user_code: userCode,
        discount_code: VoucherCode
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
        setIsModalOpen(false);
    };

    const handleSelectVoucher = (voucherCode: any, percent: any, id: any) => {
        setSelectedVoucher(id);
        setVoucherCode(voucherCode);
        setDiscountPercent(percent)
        setActive(true)
    };

    const dataTong = (Number(priceTong))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    const formattedDiscountAmount = discountAmount.toLocaleString();
    const formattedtotalAmount = totalAmount.toLocaleString();
    return (
        <>
            <a href=""></a>
            <div className='my-[25px] flex gap-[30px] justify-center Payment-content'>
                <div className='w-[25%] Payment-film-image'>
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
                            <dd className="text-sm text-white">{room}</dd>
                            <dt className="text-xs text-gray-500">Phòng chiếu</dt>
                        </div>
                        <div className='flex flex-col-reverse'>
                            <dd className="text-sm text-white w-[95px]">{selectedSeats?.length}</dd>

                            <dt className="text-xs text-gray-500">Số vé</dt>
                        </div>
                        <div className='flex flex-col-reverse w-[125px]'>
                            <dd className="text-sm text-white flex gap-1 max-w-[80px]">{selectedSeats.map((item: any) => (
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
                                <input type="text" className='voucher-code cursor-not-allowed h-[30px] outline-none col-span-2 text-black pl-2 font-medium' value={VoucherCode} />
                                <Button type="primary" onClick={showModal} className='bg-teal-400 mb-3 voucher-button'>
                                    Mã giảm giá
                                </Button>
                            </div>
                            <div className='flex justify-between mb-3'>
                                <p>Giảm giá</p>
                                <p>{DiscountPercent}%</p>
                            </div>
                            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} className='ModalVoucher'>
                                <div className='space-y-3'>
                                    {voucher?.map((item: any) => (
                                        <button className={
                                            selectedVoucher === item.id
                                                ? 'block bg-teal-400 text-black w-full rounded-md py-3'
                                                : 'block bg-[#a9aead] text-black w-full rounded-md py-3'
                                        }
                                            id={item.id}
                                            onClick={() => handleSelectVoucher(item?.discount_code, item?.discount_percent, item?.id)}
                                        >
                                            <h3 className='text-3xl font-medium'>{item.discount_code}</h3>
                                            <p>Nhân dịp {item?.event}</p>
                                            <p>Giảm {item?.discount_percent}% tổng giá trị đơn hàng</p>
                                            <p>Thời gian áp dụng: {item?.start}</p>
                                            <p>Thời gian hết hạn: {item?.end}</p>
                                        </button>
                                    ))}
                                </div>
                            </Modal>
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
                            <div>Số tiền được giảm</div>
                            <div className='item-info-card'>-{formattedDiscountAmount} đ</div>
                        </div>
                    </div>
                    <div className='block'>
                        <div className='info-card'>
                            <div>Tổng thanh toán</div>
                            <div className='item-info-card'>{formattedtotalAmount}</div>
                        </div>
                    </div>
                </div >
            </div >
            <div className='flex justify-center'>
                <Button className="ThanhToanBtn w-[72%] rounded bg-teal-400 text-white text-base h-[42px] border-0" onClick={() => setThanhToan()} >Thanh toán</Button>
            </div>
        </>
    )
};

export default ThanhToan;