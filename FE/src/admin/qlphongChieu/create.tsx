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
    const [buttonClick, setButtonClick] = useState<any>(0)
    const onFinish = (values: any) => {
        // addPhongChieu(values).then(() => { setIsModalOpen(false); message.success("Tạo mới thành công"); formRef.current?.resetFields() })
        const newDataSeat = [];
        for (let i = 0; i < values.total_seat_doc; i++) {
            for (let j = 0; j < values.total_seat_ngang; j++) {
                newDataSeat.push({
                    seat_code: String.fromCharCode(65 + i) + (j + 1),
                    hidden: 0,
                    type_name: 0,
                    status: 0,
                    room_name: values.name
                });
            }
        }
        setDataSeat(newDataSeat);
    };
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
    const changeSeat = (seat_code: any, type_name: any, hidden: any) => {
        dataSeat?.map((item: any) => {
            if (item && item?.seat_code === seat_code) {
                if (buttonClick === 0 || buttonClick === 1) {
                    if (buttonClick === item?.type_name) {
                        item.type_name = 0
                        setDataArraySeat()
                        return;
                    } else {
                        item.type_name = buttonClick
                        setDataSeat(dataSeat);
                        setDataArraySeat()
                        return;
                    }
                }
                if (buttonClick === 2) {
                    const dataOderSeat: number = dataSeat.findIndex((seat: any) => seat.seat_code === seat_code);
                    if (dataOderSeat % 2 === 0) {
                        console.log(dataSeat[dataOderSeat + 1]?.seat_code);

                        if (item?.seat_code === dataSeat[dataOderSeat + 1]?.seat_code) {
                            if (buttonClick === item?.type_name) {
                                item.type_name = 0
                                setDataArraySeat()
                                return;
                            } else {
                                item.type_name = buttonClick
                                dataSeat[dataOderSeat + 1]?.type_name === buttonClick
                                setDataSeat(dataSeat);
                                setDataArraySeat()
                                return;
                            }
                        }
                    } else {
                        if (item?.seat_code === dataSeat[dataOderSeat - 1]?.seat_code) {
                            if (buttonClick === item?.type_name) {
                                item.type_name = 0
                                setDataArraySeat()
                                return;
                            } else {
                                item.type_name = buttonClick
                                dataSeat[dataOderSeat - 1]?.type_name === buttonClick
                                setDataSeat(dataSeat);
                                setDataArraySeat()
                                return;
                            }
                        }
                    }

                }
                if (buttonClick === 3) {
                    if (hidden === 0) {
                        item.hidden = 1
                        setDataArraySeat()
                        return;
                    } else {
                        item.hidden = 0
                        setDataSeat(dataSeat);
                        setDataArraySeat()
                        return;
                    }
                }
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
                                            <div className={`relative `}
                                                key={item2?.seat_code} onClick={() => {
                                                    changeSeat(item2?.seat_code, item2?.type_name, item2?.hidden);
                                                }}>
                                                <MdChair className={`seat text-center cursor-pointer text-[#797373] ${((item2?.hidden === 0 && "text-[#797373]") && (((item2?.type_name === 1 && 'text-[#8f4747]') || (item2?.type_name === 0 && 'text-[#797373]') || (item2?.type_name === 2 && 'text-[#8f355a]')))) || (item2?.hidden === 1 && "text-orange-400")}`}
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
                                <div className={`seat flex border-2 rounded-lg w-[120px] mt-4 ${buttonClick === 0 ? "bg-green-500" : ""}`} onClick={() => setButtonClick(0)}>
                                    <div><MdChair className="text-[#797373]" size={40} /></div>
                                    <p className='ml-2 py-2'>Thường</p>
                                </div>
                                <div className={`seat flex border-2 rounded-lg w-[120px] mt-4 ${buttonClick === 1 ? "bg-green-500" : ""}`} onClick={() => setButtonClick(1)}>
                                    <div><MdChair className="text-[#8f4747]" size={40} /></div>
                                    <p className='ml-2 py-2'>Vip</p>
                                </div>
                                <div className={`seat flex border-2 rounded-lg w-[120px] mt-4 ${buttonClick === 2 ? "bg-green-500" : ""}`} onClick={() => setButtonClick(2)}>
                                    <div><MdChair className="text-[#8f355a]" size={40} /></div>
                                    <p className='ml-2 py-2'>Sweet-box</p>
                                </div>
                                <div className="seat flex border-2 rounded-lg w-[120px] mt-4" onClick={() => setButtonClick(3)}>
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