import { Modal, message } from 'antd';
import { useEffect, useState } from 'react';
import { useExportBillMutation, useGetBillIdMutation } from '../../rtk/booking/booking';
import logoweb from "/Wonder-logo-1.png";
import "./export.css";
import moment from 'moment';

type Props = {
    data: any;
};

const ExportTicketAdmin = ({ data }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [billData, setBillData] = useState<any[]>([]);
    const [billFoodData, setBillFoodData] = useState<any[]>([]);
    const [getBillId] = useGetBillIdMutation();
    const [exportBill] = useExportBillMutation();
    const showModal = () => {
        setIsModalOpen(true);
    };
    useEffect(() => {
        const newData = {
            bill_code: data
        };

        getBillId(newData).then((data: any) => {
            console.log(data);
            showModal();
            setBillFoodData(data?.data?.ticket_foods);
            setBillData(data?.data?.tickets);
        });
    }, [data])
    const ExportBill = async () => {
        const newData = {
            bill_code: data
        }
        await exportBill(newData).unwrap()
            .then((req: any) => {
                if (req?.message) {
                    message.success(req?.message);
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);

                }
                if (req?.error) {
                    message.success(req?.error)
                }
            }
            )
    };
    return (
        <div className=''>
            <Modal open={isModalOpen} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }} className='ModalTicket'>
                <div className='grid grid-cols-2 gap-5'>
                    {billData?.map((item: any) => (
                        <div key={item.id} className='w-full h-[215px] flex mb-5'>
                            <div className='w-[65%] bg-red-700 p-3 rounded-l-md left-bill'>
                                <div>
                                    <h1 className='text-2xl text-amber-100 font-bold text-center mt-1'>VÉ XEM PHIM</h1>
                                </div>
                                <div className='mt-5'>
                                    <p className='text-amber-100 text-center text-md'>{item?.movie_name}</p>
                                </div>
                                <div className='mt-5'>
                                    <div className='grid grid-cols-2 gap-3 text-amber-100'>
                                        <div className='flex'>
                                            <p className='font-medium pr-2'>Suất chiếu:</p>
                                            <p>{moment(item?.date).format("DD-MM-YYYY")}</p>
                                        </div>
                                        <div className='flex'>
                                            <p className='font-medium pr-2'>Phòng:</p>
                                            <p>{item?.room_name}</p>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-3 text-amber-100'>
                                        <div className='flex'>
                                            <p className='font-medium pr-2'>Giờ chiếu:</p>
                                            <p>{item?.time}</p>
                                        </div>
                                        <div className='flex'>
                                            <p className='font-medium pr-2'>Ghế: </p>
                                            <p>{item?.seat_code}</p>
                                        </div>
                                    </div>
                                    <div className='flex text-amber-100'>
                                        <p className='font-medium pr-2'>Giá vé:</p>
                                        <p>{(Number(item?.total_money))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</p>
                                    </div>
                                </div>
                            </div>
                            <div className='w-[35%] bg-amber-100 rounded-r-md p-3'>
                                <div className='flex justify-center'>
                                    <img src={logoweb} alt="" className='w-[50%]' />
                                </div>
                                <div>
                                    <div className='flex ml-2'>
                                        <p className='pr-2'>Suất chiếu:</p>
                                        <p>{moment(item?.date).format("DD-MM-YYYY")}</p>
                                    </div>
                                    <div className='flex ml-2'>
                                        <p className='pr-2'>Giờ chiếu:</p>
                                        <p>{item?.time}</p>
                                    </div>
                                    <div className='flex ml-2'>
                                        <p className='pr-2'>Phòng:</p>
                                        <p>{item?.room_name}</p>
                                    </div>
                                    <div className='flex ml-2'>
                                        <p className='pr-2'>Ghế: </p>
                                        <p>{item?.seat_code}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
                <div className='grid grid-cols-2 gap-5'>
                    {billFoodData?.map((item: any) => (
                        <div key={item.id} className='w-full h-[130px] flex mb-5'>
                            <div className='w-[65%] bg-red-700 p-3 rounded-l-md left-combo'>
                                <div>
                                    <h1 className='text-2xl text-amber-100 font-bold text-center mt-1'>VÉ BỎNG-NƯỚC</h1>
                                </div>
                                <div className='mt-5'>
                                    <p className='text-amber-100 text-center text-md'>{item?.movie_name}</p>
                                </div>
                                <div className='mt-5'>
                                    <div className='grid grid-cols-2 gap-3 text-amber-100'>
                                        <div className='flex'>
                                            <p className='font-medium pr-2'>Tên:</p>
                                            <p>{item?.food_name}</p>
                                        </div>
                                        <div className='flex'>
                                            <p className='font-medium pr-2'>Số lượng:</p>
                                            <p>{item?.quantity}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex text-amber-100'>
                                    <p className='font-medium pr-2'>Giá:</p>
                                    <p>{(Number(item?.price))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</p>
                                </div>
                            </div>
                            <div className='w-[35%] bg-amber-100 rounded-r-md p-3'>
                                <div className='flex justify-center'>
                                    <img src={logoweb} alt="" className='w-[40%]' />
                                </div>
                                <div className='pl-2'>
                                    <div className='flex'>
                                        <p className='pr-2'>Tên:</p>
                                        <p>{item?.food_name}</p>
                                    </div>
                                    <div className='flex'>
                                        <p className='pr-2'>Số lượng:</p>
                                        <p>{item?.quantity}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex justify-end'>
                    <button type="submit" onClick={ExportBill} className='border border-blue-500 rounded-md px-3 py-1 hover:bg-blue-200'>
                        Xuất vé
                    </button>
                </div>

            </Modal>
        </div>
    )
};

export default ExportTicketAdmin;