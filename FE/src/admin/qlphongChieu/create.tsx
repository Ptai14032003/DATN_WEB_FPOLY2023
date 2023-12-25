import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Modal } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { PhongChieu1 } from './page';
import { useAddPhongChieuMutation } from '../../rtk/qlPhongChieu/qlPhongChieu';
import { MdChair } from 'react-icons/md';
const CreateQlPhongChieu: React.FC = () => {
    const [addPhongChieu] = useAddPhongChieuMutation()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formRef = React.useRef<FormInstance>(null);
    const [dataSeat, setDataSeat] = useState<any>([]);
    const [seat, setSeat] = useState<any>([])
    const [typeName, setTypeName] = useState<any>("Thường")
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
    console.log(dataSeat);

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        const isconfirm = confirm(`Dữ liệu sẽ bị xoá nếu bạn thoát`)
        if (isconfirm) {
            setIsModalOpen(false);
            formRef.current?.resetFields();
            setDataSeat([])
            setSeat([])
        }
    };
    const changeSeat = (seat_code: any, type_name: any) => {
        const newSeat = {
            seat_code: "",
            status: 0,
            type_name: "",
        }
        dataSeat?.map((item: any) => {
            if (item && item.seat_code === seat_code) {
                if (typeName === item.type_name) {
                    item.type_name = 'Thường'
                    setDataArraySeat()
                    return;
                } else {
                    item.type_name = typeName
                    setDataSeat(dataSeat);
                    setDataArraySeat()
                    return;
                }
                return;
                // setDataSeat(dataSeat?.filter((data: any) => data.seat_code !== seat_code));
            }
        })
    }
    const setDataArraySeat = () => {
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
    useEffect(() => {
        if (dataSeat) {
            setDataArraySeat()
        }
    }, [dataSeat],)
    return (
        <>
            <Button onClick={showModal}>Thêm phòng chiếu mới</Button>
            <Modal title="Thêm phòng chiếu mới" open={isModalOpen} onCancel={handleCancel} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: false }} width={1200} className="text-center w-[800px]">
                <Form className='mx-auto'
                    name='formPhongChieu'
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
                        <InputNumber min="1" max="15" />
                    </Form.Item>
                    <Form.Item<PhongChieu1>
                        label="Số ghế hàng dọc"
                        name="total_seat_doc"
                        rules={[{ required: true, message: 'Vui lòng nhập số ghế hàng dọc !' }]}
                    >
                        <InputNumber min="1" max="15" />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button htmlType="submit" className='mr-[80px]'>
                            Check
                        </Button>
                    </Form.Item>
                </Form>
                {seat.length > 0 ? (
                    <div className=''>
                        <div className="flex">
                            <div className=" w-max-[1000px] w-[50%] mx-[10%]">
                                {seat?.map((item: any) => (
                                    <div className="seat-group flex gap-4">
                                        {item?.map((item2: any) => (
                                            <div className='relative'
                                                key={item2?.seat_code} onClick={() => {
                                                    changeSeat(item2?.seat_code, item2?.type_name,);
                                                }}>
                                                <MdChair className={`seat text-center cursor-pointer ${(item2?.type_name === 'VIP' && 'text-[#8f4747]') || (item2?.type_name === 'Thường' && 'text-[#797373]') || (item2?.type_name === 'Đôi' && 'text-[#8f355a]')}`}
                                                    size={35}
                                                />
                                                <div className={`cursor-pointer absolute top-1 right-[11.2px] font-semibold text-[8px] `}>{item2?.seat_code}</div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                            <div className="text-center w-[10%] ml-[150px] ">
                                <div>Lựa chọn loại ghế :</div>
                                <div className={`seat flex border-2 rounded-lg w-[120px] mt-4 ${typeName === "Thường" ? "bg-green-500" : ""}`} onClick={() => setTypeName("Thường")}>
                                    <div><MdChair className="text-[#797373]" size={40} /></div>
                                    <p className='ml-2 py-2'>Thường</p>
                                </div>
                                <div className={`seat flex border-2 rounded-lg w-[120px] mt-4 ${typeName === "VIP" ? "bg-green-500" : ""}`} onClick={() => setTypeName("VIP")}>
                                    <div><MdChair className="text-[#8f4747]" size={40} /></div>
                                    <p className='ml-2 py-2'>Vip</p>
                                </div>
                                <div className={`seat flex border-2 rounded-lg w-[120px] mt-4 ${typeName === "Đôi" ? "bg-green-500" : ""}`} onClick={() => setTypeName("Đôi")}>
                                    <div><MdChair className="text-[#8f355a]" size={40} /></div>
                                    <p className='ml-2 py-2'>Sweet-box</p>
                                </div>
                                <div className="seat flex border-2 rounded-lg w-[120px] mt-4">
                                    <div><MdChair className="text-[#00FFD1]" size={40} /></div>
                                    <p className='ml-2 py-2'>Huỷ ghế</p>
                                </div>
                            </div>
                        </div>
                        <Button className="w-[80px] mt-[20px]">
                            Lưu
                        </Button>
                    </div>

                ) : (
                    // Render content when 'seat' does not exist
                    <div>
                    </div>
                )}
            </Modal >
        </>
    )
};

export default CreateQlPhongChieu;