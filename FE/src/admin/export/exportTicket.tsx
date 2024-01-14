import React, { useState } from 'react'
import { useTicketHistoryMutation } from '../../rtk/booking/booking';
import { useForm } from 'react-hook-form';
import { Space, Table } from 'antd';
import Column from 'antd/es/table/Column';
import { Button, Modal } from 'antd';
import logoweb from "/Wonder-logo-1.png"
import "./export.css"

interface Form {
    user_code: string
}
interface DataType {
    key: string,
    movie_name: string,
    total_combo: number,
    total_ticket: number,
    total_money: string
}

const ExportTicket = () => {
    const [ticketHistory] = useTicketHistoryMutation();
    const { register, handleSubmit, formState: { errors } } = useForm<Form>();
    const [Data, setData] = useState<DataType[]>([]);

    const onSubmit = async (values: any) => {
        const newData = {
            user_code: values.user_code
        }
        await ticketHistory(newData).unwrap()
            .then((data: any) =>
                setData(data)
            )
    };
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
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
                <Column title="Tên Phim " dataIndex="movie_name" key="movie_name" />
                <Column title="Số lượng vé" dataIndex="total_ticket" key="total_ticket" />
                <Column title="số lượng combo" dataIndex="total_combo" key="total_combo" />
                <Column title="Tổng tiền" dataIndex="total_money" key="total_money" />
                <Column
                    title="Action"
                    key="action"
                    render={(_: any, record: DataType) => (
                        <Space size="middle">
                            <Button type="primary" onClick={showModal}>
                                Xuất vé
                            </Button>
                            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} className='ModalTicket'>
                                <div className='w-full h-[200px] flex'>
                                    <div className='w-[60%] bg-red-700 p-5'>
                                        <div>
                                            <h1>CINEMA TICKET</h1>
                                        </div>
                                        <div className='grid grid-cols-2 gap-5'>
                                            <div className='flex'>
                                                <p>Suất chiếu: </p>
                                                <p>20-1-2024</p>
                                            </div>
                                            <div className='flex'>
                                                <p>Phòng: </p>
                                                <p> 1</p>
                                            </div>
                                        </div>
                                        <div  className='grid grid-cols-2 gap-5'>
                                            <div className='flex'>
                                                <p>Giờ chiếu:</p>
                                                <p>12:00 AM</p>
                                            </div>
                                            <div className='flex'>
                                                <p>Ghế: </p>
                                                <p>G1, G2</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-[40%] bg-white'>
                                        <div>
                                            <img src={logoweb} alt="" className='w-[50%]' />
                                        </div>
                                        <div className='flex'>
                                            <p>Suất chiếu: </p>
                                            <p>20-1-2024</p>
                                        </div>
                                        <div className='flex'>
                                            <p>Giờ chiếu:</p>
                                            <p>12:00 AM</p>
                                        </div>
                                        <div className='flex'>
                                            <p>Phòng: </p>
                                            <p> 1</p>
                                        </div>
                                        <div className='flex'>
                                            <p>Ghế: </p>
                                            <p>G1, G2</p>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        </Space>
                    )}
                />
            </Table>
        </div>
    )
}

export default ExportTicket