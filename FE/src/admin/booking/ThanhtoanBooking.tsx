import React, { useState } from 'react';
import "./ThanhToan.css"
import { Button, Input, Modal, Select, message } from 'antd'
import { usePaymentAdminMutation } from '../../rtk/payment_admin/payment_admin';
import ExportTicketAdmin from './exportTicket';
import { useSumbitQRPaymentMutation } from '../../rtk/booking/booking';
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
        room: string
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
const ThanhToanBooking: React.FC<Props> = ({ data: { selectedSeats, priceTong, combo, show_time, movieBooking, idGhe, room } }: Props) => {
    const [Payment] = usePaymentAdminMutation()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sumbitQR] = useSumbitQRPaymentMutation()
    const [user_code, setUser] = useState("")
    const [typeThanhToan, getTypeThanhToan] = useState<number>()
    const [linkQR, setQR] = useState("")
    const [newBillCode, setNewBillCode] = useState(null)
    const [newBillIdQR, setNewBillIdQR] = useState(null)
    const [priceAll, setPriceAll] = useState<String>("")
    const [isExportTicketVisible, setIsExportTicketVisible] = useState(false);
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };
    const dataBill = {
        showtime_id: show_time,
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
        payment_method: typeThanhToan,
        user_code: user_code || null,
        additionnal_fee: Number(selectedSeats?.length) * 10000,
        personnel_code:""
    }
    const onChange = (value: any) => {
        setUser(value)
    }
    const onChangeTypeThanhToan = (value: any) => {
        getTypeThanhToan(value)
    }
    const dataPhuPhi = (Number(Number(selectedSeats?.length) * 10000))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    const dataTong = (Number(priceTong))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    const PostPayment = (newData: any) => {
        Payment(newData).then((data: any) => {
            console.log(newData);
            
            if (data?.error?.data?.error) {
                message.error(data?.error?.data?.error)
            } else {
                setNewBillCode(data?.data?.bill_code);
                if (data?.data?.link) {
                    setQR(data?.data?.link);
                    showModal()
                    if (newData.additionnal_fee === 0) {
                        setPriceAll((Number((Number(selectedSeats?.length) * 10000) + Number(priceTong)))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))

                    } else {
                        setPriceAll((Number(Number(priceTong)))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                    }
                }
            }
        })
    }
    const handlePayment = () => {
        const checkLocal = localStorage.getItem("user");
        const checkUser = checkLocal ? JSON.parse(checkLocal) : null;
        const personnel_code  = checkUser?.personnel_code
        if (typeThanhToan === 0 || typeThanhToan === 1) {
            if (user_code.length > 0) {
                const newData = {
                    ...dataBill,
                 personnel_code:personnel_code
                }
                PostPayment(newData)

            } else {
                const newData = {
                    ...dataBill,
                    additionnal_fee: 0,
                    personnel_code:personnel_code
                }
                PostPayment(newData)
            }
        } else {
            message.error("Vui lòng nhập phương thức thanh toán !")
        }

    }
    const CheckQR = (id: any) => {
        const newData = {
            bill_code: id
        }
        sumbitQR(newData).then((data: any) => {
            if (data?.data?.bill_code) {
                message.success(data?.data?.message);
                setNewBillIdQR(data?.data?.bill_id)
                setIsExportTicketVisible(true);
                setTimeout(() => {
                    setIsModalOpen(false);
                }, 1000);
            }

        })
    }
    return (
        <>

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
                            <dd className="text-sm">{room}</dd>
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
                                    <span className="text-sm ">{item?.food_name}</span>
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
                            <div>Giá gốc :</div>
                            <div className='item-info-card'>{dataTong} đ</div>
                        </div>
                    </div>
                    <div className={`block my-3 ${user_code.length > 0 ? "hidden" : ""}`}>
                        <div className='info-card'>
                            <div>Phụ phí :</div>
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
                className="w-[80%] mx-[10%] rounded bg-teal-400text-base h-[42px] border-0 bg-[#1ACAAC]"
                onClick={handlePayment}
            >
                Thanh toán
            </Button>
            {typeThanhToan === 1 && newBillCode !== null && (
                <ExportTicketAdmin data={newBillCode} />
            )}
            {typeThanhToan === 0 && newBillCode !== null && (

                <Modal open={isModalOpen} onCancel={handleCancel} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }} className='ModalTicket'>
                    <div className='flex justify-center'>
                        <iframe src={`${linkQR}`} />
                        <div>
                            <div className='item-card border-b-2'>
                                <div className='flex flex-col-reverse'>
                                    <dd className="text-smtext-left">{movieBooking?.movie_name}</dd>
                                    <dt className="text-xs text-gray-500 text-left">Tên phim</dt>
                                </div>
                            </div>
                            <div className='item-card flex order-b-2 gap-[30px] border-b-2'>
                                <div className='flex flex-col-reverse w-[95px]'>
                                    <dd className="text-sm">{room}</dd>
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
                                            <span className="text-sm ">{item?.food_name}</span>
                                            <span className="text-smw-[50px] text-center">{item?.soLuong}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='block my-3'>
                                <div className='info-card'>
                                    <div>Tổng tiền :</div>
                                    <div className='item-info-card'>{priceAll} đ</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-end'>
                        <button type="submit" onClick={() => CheckQR(newBillCode)} className='border border-blue-500 rounded-md px-3 py-1 hover:bg-blue-200'>
                            Xác nhận
                        </button>
                    </div>
                </Modal>
            )}
            {newBillIdQR !== null && newBillCode !== null && typeThanhToan === 0 && isExportTicketVisible && (
                <ExportTicketAdmin data={newBillCode} />
            )}
        </>
    )
};

export default ThanhToanBooking;