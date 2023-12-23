import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Modal } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { PhongChieu, PhongChieu1 } from './page';
import { useAddPhongChieuMutation } from '../../rtk/qlPhongChieu/qlPhongChieu';
import { MdChair } from 'react-icons/md';
const CreateQlPhongChieu: React.FC = () => {
    const [addPhongChieu] = useAddPhongChieuMutation()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formRef = React.useRef<FormInstance>(null);
    const [dataSeat, setDataSeat] = useState<any>([]);
    const [seat, setSeat] = useState<any>([])
    const onFinish = (values: any) => {
        // addPhongChieu(values).then(() => { setIsModalOpen(false); message.success("Tạo mới thành công"); formRef.current?.resetFields() })
        const newDataSeat = [];
        for (let i = 0; i < values.total_seat_doc; i++) {
            for (let j = 0; j < values.total_seat_ngang; j++) {
                newDataSeat.push({
                    seat_code: String.fromCharCode(65 + i) + (j + 1),
                    status: 1,
                    type_name: "Thường"
                });
            }
        }
        setDataSeat(newDataSeat);
    };
    useEffect(() => {
        if (dataSeat) {
            const groupedSeats = dataSeat.reduce((acc: any, seat: any) => {
                const firstChar = seat.seat_code.charAt(0);
                if (!acc[firstChar]) {
                    acc[firstChar] = [];
                }
                acc[firstChar].push(seat);
                return acc;
            }, {});
            const groupedSeatsArray = Object.values(groupedSeats);
            setSeat(groupedSeatsArray);
        }
    }, [dataSeat],)
    console.log(seat);
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        formRef.current?.resetFields();
    };
    return (
        <>
            <Button onClick={showModal}>Thêm phòng chiếu mới</Button>
            <Modal title="Thêm phòng chiếu mới" open={isModalOpen} onCancel={handleCancel} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }} width={1200} className="text-center w-[800px]">
                <Form className='mx-auto'
                    name='formLogin'
                    ref={formRef}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<PhongChieu1>
                        label="Tên phòng"
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên phòng !' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<PhongChieu1>
                        label="Số ghế hàng ngang"
                        name="total_seat_ngang"
                        rules={[{ required: true, message: 'Vui lòng nhập số ghế hàng ngang !' }]}
                    >
                        <InputNumber min="1" />
                    </Form.Item>
                    <Form.Item<PhongChieu1>
                        label="Số ghế hàng dọc"
                        name="total_seat_doc"
                        rules={[{ required: true, message: 'Vui lòng nhập số ghế hàng dọc !' }]}
                    >
                        <InputNumber min="1" />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button htmlType="submit" className='mr-[80px]'>
                            Check
                        </Button>
                    </Form.Item>
                </Form>
                {seat ? (
                    <div className='flex'>
                        <div className=" text-center w-max-[1000px] w-[70%]">
                            {seat?.map((item: any) => (
                                <div className="seat-group flex gap-4">
                                    {item?.map((item2: any) => (
                                        <div className='relative'
                                            key={item2?.seat_code} onClick={() => {
                                                // if (item2?.status !== 1 && seat?.status !== 0) {
                                                //     // autoSubmit(seat?.id, seat?.seat_code, seat?.type_name, seat?.price)
                                                // }
                                            }}>
                                            <MdChair className={`seat text-center cursor-pointer text-sky-500`}
                                                size={35}
                                            />
                                            <div className={`cursor-pointer absolute top-1 right-[11.2px] font-semibold text-[8px] `}>{item2?.seat_code}</div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="text-center">
                            Lựa chọn loại ghế
                        </div>
                    </div>
                ) : (
                    // Render content when 'seat' does not exist
                    <div>
                    </div>
                )}
                <Button className="w-[80px] mt-[20px]">
                    Lưu
                </Button>
            </Modal >
        </>
    )
};

export default CreateQlPhongChieu;