
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Modal, message } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { PhongChieu1 } from './page';
import { useFetchPhongChieuIDQuery, usePatchPhongChieuMutation } from '../../rtk/qlPhongChieu/qlPhongChieu';
import { MdChair } from 'react-icons/md';
type Props = {
    projects: string
}
const EditQlPhongChieu: React.FC<Props> = ({ projects }: Props) => {
    const { data: dataRoom, isLoading, isFetching } = useFetchPhongChieuIDQuery(projects);
    const [newDataRoom, setDataRoom] = useState<any>({})
    const theaters = dataRoom?.theaters
    const dataseats = dataRoom?.seats
    const [updatePhongChieu] = usePatchPhongChieuMutation()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formRef = React.useRef<FormInstance>(null);
    const [dataSeat, setDataSeat] = useState<any>([]);
    const [seat, setSeat] = useState<any>([])
    const [buttonClick, setButtonClick] = useState<any>(1)
    const [messageApi, contextHolder] = message.useMessage();
    const setDataArraySeat = () => {
        const groupedSeats = dataSeat.reduce((acc: any, seat: any) => {
            const firstChar = seat?.seat_code.charAt(0);
            if (!acc[firstChar]) {
                acc[firstChar] = [];
            }
            acc[firstChar].push(seat);
            return acc;
        }, {});
        const groupedSeatsArray = Object.values(groupedSeats);
        setSeat(groupedSeatsArray);
    }
    const onFinish = (values: any) => {
        const checkConfirm = confirm("Bạn có chắc muốn cập nhật lại ghế không ?")
        if (checkConfirm) {
            setDataSeat(dataseats)
            setDataRoom(values)
        }

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
    const changeSeat = (seat_code: any, type_seat_id: any, hidden: any) => {
        dataSeat?.map((item: any) => {
            if (item && item?.seat_code === seat_code) {
                if ((buttonClick === 1 || buttonClick === 2) && type_seat_id !== 3) {
                    if (buttonClick === item?.type_seat_id) {
                        const newItem = { ...item, type_seat_id: 1 };
                        const newSeat = dataSeat.map((obj: any) => (obj.seat_code === newItem.seat_code ? newItem : obj))
                        setDataSeat(newSeat);
                        setDataArraySeat()
                        return newItem;
                    } else {
                        const newItem = { ...item, type_seat_id: buttonClick };
                        const newSeat = dataSeat.map((obj: any) => (obj.seat_code === newItem.seat_code ? newItem : obj))
                        setDataSeat(newSeat);
                        setDataArraySeat()
                        return;
                    }
                }
                if ((buttonClick === 1 || buttonClick === 2) && type_seat_id === 3) {
                    messageApi.error({
                        type: 'error',
                        content: 'Vui lòng huỷ trạng thái ghế đôi',
                        className: "h-[20%] mt-[20px]",
                        duration: 2
                    });
                    return;
                }
                if (buttonClick === 3) {
                    seat?.map((seatItem: any) => {
                        seatItem.map((item2: any) => {
                            if (item2 && item2?.seat_code === seat_code) {
                                const dataLength = seatItem.length
                                const dataOderSeat: number = seatItem.findIndex((seat: any) => seat?.seat_code === seat_code);
                                if (dataOderSeat % 2 === 0 && (seat_code !== seatItem[dataLength - 1]?.seat_code)) {
                                    if (buttonClick === seatItem[dataOderSeat]?.type_seat_id || buttonClick === seatItem[dataOderSeat + 1]?.type_seat_id) {
                                        const newItem1 = {
                                            id: seatItem[dataOderSeat + 1]?.id,
                                            seat_code: seatItem[dataOderSeat + 1]?.seat_code,
                                            type_seat_id: 1,
                                            room_id: seatItem[dataOderSeat + 1]?.room_id,
                                            hidden: 0,
                                        }
                                        const newItem2 = {
                                            id: seatItem[dataOderSeat]?.id,
                                            seat_code: seatItem[dataOderSeat]?.seat_code,
                                            type_seat_id: 1,
                                            room_id: seatItem[dataOderSeat + 1]?.room_id,
                                            hidden: 0,
                                        }
                                        const newSeat = dataSeat.map((obj: any) => {
                                            if (obj.seat_code === newItem1.seat_code) {
                                                return newItem1;
                                            } else if (obj.seat_code === newItem2.seat_code) {
                                                return newItem2;
                                            } else {
                                                return obj;
                                            }
                                        });
                                        setDataSeat(newSeat);
                                        setDataArraySeat()
                                        return;
                                    } else {
                                        const newItem1 = {
                                            id: seatItem[dataOderSeat + 1]?.id,
                                            seat_code: seatItem[dataOderSeat + 1]?.seat_code,
                                            type_seat_id: buttonClick,
                                            room_id: seatItem[dataOderSeat + 1]?.room_id,
                                            hidden: 0,
                                        }
                                        const newItem2 = {
                                            id: seatItem[dataOderSeat]?.id,
                                            seat_code: seatItem[dataOderSeat]?.seat_code,
                                            type_seat_id: buttonClick,
                                            room_id: seatItem[dataOderSeat + 1]?.room_id,
                                            hidden: 0,
                                        }
                                        const newSeat = dataSeat.map((obj: any) => {
                                            if (obj.seat_code === newItem1.seat_code) {
                                                return newItem1;
                                            } else if (obj.seat_code === newItem2.seat_code) {
                                                return newItem2;
                                            } else {
                                                return obj;
                                            }
                                        });
                                        setDataSeat(newSeat);
                                        setDataArraySeat()
                                        return;
                                    }
                                }
                                if (dataOderSeat % 2 !== 0) {
                                    if (buttonClick === seatItem[dataOderSeat]?.type_seat_id || buttonClick === seatItem[dataOderSeat - 1]?.type_seat_id) {
                                        const newItem1 = {
                                            id: seatItem[dataOderSeat - 1]?.id,
                                            seat_code: seatItem[dataOderSeat - 1]?.seat_code,
                                            type_seat_id: 1,
                                            room_id: seatItem[dataOderSeat - 1]?.room_id,
                                            hidden: 0,
                                        }
                                        const newItem2 = {
                                            id: seatItem[dataOderSeat]?.id,
                                            seat_code: seatItem[dataOderSeat]?.seat_code,
                                            type_seat_id: 1,
                                            room_id: seatItem[dataOderSeat - 1]?.room_id,
                                            hidden: 0,
                                        }
                                        const newSeat = dataSeat.map((obj: any) => {
                                            if (obj.seat_code === newItem1.seat_code) {
                                                return newItem1;
                                            } else if (obj.seat_code === newItem2.seat_code) {
                                                return newItem2;
                                            } else {
                                                return obj;
                                            }
                                        });
                                        setDataSeat(newSeat);
                                        setDataArraySeat()
                                        return;
                                    } else {
                                        const newItem1 = {
                                            id: seatItem[dataOderSeat - 1]?.id,
                                            seat_code: seatItem[dataOderSeat - 1]?.seat_code,
                                            type_seat_id: buttonClick,
                                            room_id: seatItem[dataOderSeat - 1]?.room_id,
                                            hidden: 0,
                                        }
                                        const newItem2 = {
                                            id: seatItem[dataOderSeat]?.id,
                                            seat_code: seatItem[dataOderSeat]?.seat_code,
                                            type_seat_id: buttonClick,
                                            room_id: seatItem[dataOderSeat - 1]?.room_id,
                                            hidden: 0,
                                        }
                                        const newSeat = dataSeat.map((obj: any) => {
                                            if (obj.seat_code === newItem1.seat_code) {
                                                return newItem1;
                                            } else if (obj.seat_code === newItem2.seat_code) {
                                                return newItem2;
                                            } else {
                                                return obj;
                                            }
                                        });
                                        setDataSeat(newSeat);
                                        setDataArraySeat()
                                        return;
                                    }

                                }
                            }
                        })
                    })
                }
                if (buttonClick === 4) {
                    if (hidden === 0 && type_seat_id === 3) {
                        messageApi.error({
                            type: 'error',
                            content: 'Vui lòng huỷ trạng thái ghế đôi',
                            className: "h-[20%] mt-[20px]",
                            duration: 2
                        });
                        return;
                    }
                    if (hidden === 0 && type_seat_id !== 2) {
                        const newItem = { ...item, hidden: 1 };
                        const newSeat = dataSeat.map((obj: any) => (obj.seat_code === newItem.seat_code ? newItem : obj))
                        setDataSeat(newSeat);
                        setDataArraySeat()
                        return;
                    }
                    if (hidden === 1) {
                        const newItem = { ...item, hidden: 0 };
                        const newSeat = dataSeat.map((obj: any) => (obj.seat_code === newItem.seat_code ? newItem : obj))
                        setDataSeat(newSeat);
                        setDataArraySeat()
                        return;
                    }
                }
            }
        })
    }
    useEffect(() => {
        if (dataSeat) {
            setDataArraySeat()
        }
    }, [dataSeat],)
    const updatePhong = () => {
        const newData = {
            theaters: {
                "id": projects,
                "name": newDataRoom?.name,
                "row": newDataRoom?.row,
                "col": newDataRoom?.col,
            },
            seats: dataSeat
        }
        updatePhongChieu({ body: newData, id: projects }).then(() => {
            setIsModalOpen(false); message.success("Sửa thành công"); formRef.current?.resetFields(); setDataSeat([])
            setSeat([])
        })
    }
    return (
        <>
            {contextHolder}
            <Button onClick={showModal}>Sửa</Button>
            <Modal title="Sửa phòng chiếu " open={isModalOpen} onCancel={handleCancel} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }} width={1200} className="text-center">

                {theaters ? (
                    <Form className='mr-[60px]'
                        name='formLogin'
                        ref={formRef}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        initialValues={theaters}
                    >

                        <Form.Item<PhongChieu1>

                            label="Tên phòng"
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập tên phòng !' }]}
                        >
                            <Input disabled />
                        </Form.Item>

                        <Form.Item<PhongChieu1>
                            label="Số ghế hàng ngang"
                            name="row"
                            rules={[{ required: true, message: 'Vui lòng nhập số ghế hàng ngang !' }]}
                        >
                            <InputNumber min="1" max="15" disabled />
                        </Form.Item>
                        <Form.Item<PhongChieu1>
                            label="Số ghế hàng dọc"
                            name="col"
                            rules={[{ required: true, message: 'Vui lòng nhập số ghế hàng dọc !' }]}
                        >
                            <InputNumber min="1" max="15" disabled />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button htmlType="submit" className='mr-[80px]'>
                                Sửa ghế
                            </Button>
                        </Form.Item>
                    </Form>


                ) : (
                    <div className="flex justify-center">Đang lấy dữ liệu</div>
                )}
                {seat.length > 0 ? (
                    <div className=''>
                        <div className="flex">
                            <div className=" w-max-[1000px] w-[50%] mx-[10%]">
                                {seat?.map((item: any, index: number) => (
                                    <div className="seat-group flex gap-4" key={index}>
                                        {item?.map((item2: any) => (
                                            <div className={`relative `}
                                                key={item2?.seat_code} onClick={() => {
                                                    changeSeat(item2?.seat_code, item2?.type_seat_id, item2?.hidden);
                                                }}>
                                                <MdChair className={`seat text-center cursor-pointer text-[#797373] ${((item2?.hidden === 0 && "text-[#797373]") && (((item2?.type_seat_id === 2 && 'text-[#8f4747]') || (item2?.type_seat_id === 1 && 'text-[#797373]') || (item2?.type_seat_id === 3 && 'text-[#8f355a]')))) || (item2?.hidden === 1 && "text-black")}`}
                                                    size={35}
                                                />
                                                <div className={`cursor-pointer absolute top-1 right-[11.2px] font-semibold text-[8px] `}>{item2?.seat_code}</div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                            <div className="text-center w-[15%] ml-[140px] ">
                                <div className='ml-[-55px]'>Lựa chọn loại ghế :</div>
                                <div className={`seat flex border-2 rounded-lg w-[120px] mt-4 ${buttonClick === 1 ? "bg-green-500" : ""}`} onClick={() => setButtonClick(1)}>
                                    <div><MdChair className="text-[#797373]" size={40} /></div>
                                    <p className='ml-2 py-2'>Thường</p>
                                </div>
                                <div className={`seat flex border-2 rounded-lg w-[120px] mt-4 ${buttonClick === 2 ? "bg-green-500" : ""}`} onClick={() => setButtonClick(2)}>
                                    <div><MdChair className="text-[#8f4747]" size={40} /></div>
                                    <p className='ml-2 py-2'>Vip</p>
                                </div>
                                <div className={`seat flex border-2 rounded-lg w-[120px] mt-4 ${buttonClick === 3 ? "bg-green-500" : ""}`} onClick={() => setButtonClick(3)}>
                                    <div><MdChair className="text-[#8f355a]" size={40} /></div>
                                    <p className='ml-2 py-2'>Sweet-box</p>
                                </div>
                                <div className={`seat flex border-2 rounded-lg w-[120px] mt-4 ${buttonClick === 4 ? "bg-green-500" : ""}`} onClick={() => setButtonClick(4)}>
                                    <div><MdChair className="text-black" size={40} /></div>
                                    <p className='ml-2 py-2'>Huỷ ghế</p>
                                </div>
                            </div>
                        </div>
                        <Button className="w-[80px] mt-[20px]" onClick={() => updatePhong()}>
                            Lưu
                        </Button>
                    </div>

                ) : (
                    <div>
                    </div>
                )}

            </Modal>
        </>
    )
};

export default EditQlPhongChieu;