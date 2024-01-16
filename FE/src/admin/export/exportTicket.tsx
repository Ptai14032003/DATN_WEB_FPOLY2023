import React, { MouseEventHandler, useState } from 'react'
import { useExportBillMutation, useGetBillIdMutation, useListBillMutation, useTicketHistoryMutation } from '../../rtk/booking/booking';
import { useForm } from 'react-hook-form';
import { Space, Table, message } from 'antd';
import Column from 'antd/es/table/Column';
import { Modal } from 'antd';
import logoweb from "/Wonder-logo-1.png"
import "./export.css"
import { useNavigate } from 'react-router-dom';

interface Form {
    user_code: string,
    bill_id: number
}
interface DataType {
    id: number,
    movie_name: string,
    total_combo: number,
    total_ticket: number,
    total_money: string
}
interface BillData {
    bill_id: number
}

const ExportTicket = () => {
    const [listBill] = useListBillMutation();
    const [getBillId] = useGetBillIdMutation();
    const [exportBill] = useExportBillMutation();
    const { register, handleSubmit, formState: { errors } } = useForm<Form>();
    const [Data, setData] = useState<DataType[]>([]);
    const [billData, setBillData] = useState<BillData[]>([]);
    const [billFoodData, setBillFoodData] = useState<BillData[]>([]);
    const navigate = useNavigate();

    const onSubmit = async (values: any) => {
        const newData = {
            user_code: values.user_code
        }
        await listBill(newData).unwrap()
            .then((data: any) =>
                setData(data)
            )
    };
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const GetBillId = (values: any) => {
        const newData = {
            bill_id: values
        }
        showModal();
        getBillId(newData).then((data: any) => {
            console.log(data);
            setBillFoodData(data?.data?.ticket_foods)
            setBillData(data?.data?.tickets)
        })
    }
    const ExportBill = async (values: any) => {
        const newData = {
            bill_id: values.bill_id
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
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className=''>
            <form action="" className='flex gap-3' onSubmit={handleSubmit(onSubmit)}>
                <div className=''>
                    <input type="text" placeholder='Nhập mã người dùng' className='border border-gray-500 rounded-md p-2'  {...register('user_code')} name='user_code' />
                </div>
                <button className='border rounded-md py-1 w-[100px] font-normal text-lg  bg-[#1ACAAC] '>Submit</button>
            </form>
            <Table dataSource={Data} pagination={{ pageSize: 6, }}>
                <Column title="ID " dataIndex="id" key="id" />
                <Column title="Tên Phim " dataIndex="movie_name" key="movie_name" />
                <Column title="Số lượng vé" dataIndex="total_ticket" key="total_ticket" />
                <Column title="Số lượng combo" dataIndex="total_combo" key="total_combo" />
                <Column title="Tổng tiền" dataIndex="total_money" key="total_money" />
                <Column
                    title="Action"
                    key="action"
                    render={(_: any, record: DataType) => (
                        <Space size="middle">
                            <button onClick={() => GetBillId(record?.id)}>
                                Xuất vé
                            </button>
                            <Modal open={isModalOpen} onCancel={handleCancel} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }} className='ModalTicket'>
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
                                                            <p>{item?.date}</p>
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
                                                        <p>{item?.price}</p>
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
                                                        <p>{item?.date}</p>
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
                                                    <p>{item?.total_money}</p>
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
                                <form action="" onSubmit={handleSubmit(ExportBill)}>
                                    <div className='hidden'>
                                        <input type="number" value={record.id} {...register('bill_id')} name='bill_id' />
                                    </div>
                                    <div className='flex justify-end'>
                                        <button type="submit" onClick={showModal} className='border border-blue-500 rounded-md px-3 py-1 hover:bg-blue-200'>
                                            Xuất vé
                                        </button>
                                    </div>
                                </form>
                            </Modal>
                        </Space>
                    )}
                />
            </Table>
        </div>
    )
}

export default ExportTicket