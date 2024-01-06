
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Modal, message } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { PhongChieu1 } from './page';
import { useFetchPhongChieuIDQuery, usePatchPhongChieuMutation } from '../../rtk/qlPhongChieu/qlPhongChieu';
import { MdChair } from 'react-icons/md';
type Props = {
    projects: string
}
const dataSeatEdit = [
    {
        "seat_code": "A1",
        "hidden": 0,
        "type_name": 0,
        "status": 0,
        "room_name": "12"
    },
    {
        "seat_code": "A2",
        "hidden": 0,
        "type_name": 0,
        "status": 0,
        "room_name": "12"
    },
    {
        "seat_code": "A3",
        "hidden": 0,
        "type_name": 0,
        "status": 0,
        "room_name": "12"
    },
    {
        "seat_code": "A4",
        "hidden": 0,
        "type_name": 0,
        "status": 0,
        "room_name": "12"
    },
    {
        "seat_code": "A5",
        "hidden": 0,
        "type_name": 0,
        "status": 0,
        "room_name": "12"
    },
    {
        "seat_code": "B1",
        "hidden": 0,
        "type_name": 0,
        "status": 0,
        "room_name": "12"
    },
    {
        "seat_code": "B2",
        "hidden": 0,
        "type_name": 0,
        "status": 0,
        "room_name": "12"
    },
    {
        "seat_code": "B3",
        "hidden": 0,
        "type_name": 0,
        "status": 0,
        "room_name": "12"
    },
    {
        "seat_code": "B4",
        "hidden": 0,
        "type_name": 0,
        "status": 0,
        "room_name": "12"
    },
    {
        "seat_code": "B5",
        "hidden": 0,
        "type_name": 0,
        "status": 0,
        "room_name": "12"
    },
    {
        "seat_code": "C1",
        "hidden": 0,
        "type_name": 0,
        "status": 0,
        "room_name": "12"
    },
    {
        "seat_code": "C2",
        "hidden": 0,
        "type_name": 0,
        "status": 0,
        "room_name": "12"
    },
    {
        "seat_code": "C3",
        "hidden": 0,
        "type_name": 0,
        "status": 0,
        "room_name": "12"
    },
    {
        "seat_code": "C4",
        "hidden": 0,
        "type_name": 0,
        "status": 0,
        "room_name": "12"
    },
    {
        "seat_code": "C5",
        "hidden": 0,
        "type_name": 0,
        "status": 0,
        "room_name": "12"
    },
    {
        "seat_code": "D1",
        "hidden": 0,
        "type_name": 0,
        "status": 0,
        "room_name": "12"
    },
    {
        "seat_code": "D2",
        "hidden": 0,
        "type_name": 0,
        "status": 0,
        "room_name": "12"
    },
    {
        "seat_code": "D3",
        "hidden": 0,
        "type_name": 0,
        "status": 0,
        "room_name": "12"
    },
    {
        "seat_code": "D4",
        "hidden": 0,
        "type_name": 0,
        "status": 0,
        "room_name": "12"
    },
    {
        "seat_code": "D5",
        "hidden": 0,
        "type_name": 0,
        "status": 0,
        "room_name": "12"
    },
    {
        "seat_code": "E1",
        "hidden": 0,
        "type_name": 0,
        "status": 0,
        "room_name": "12"
    },
    {
        "seat_code": "E2",
        "hidden": 0,
        "type_name": 0,
        "status": 0,
        "room_name": "12"
    },
    {
        "seat_code": "E3",
        "hidden": 0,
        "type_name": 0,
        "status": 0,
        "room_name": "12"
    },
    {
        "seat_code": "E4",
        "hidden": 0,
        "type_name": 0,
        "status": 0,
        "room_name": "12"
    },
    {
        "seat_code": "E5",
        "hidden": 0,
        "type_name": 0,
        "status": 0,
        "room_name": "12"
    }
]
const EditQlPhongChieu: React.FC<Props> = ({ projects }: Props) => {
    const { data: dataRoom, isLoading, isFetching } = useFetchPhongChieuIDQuery(projects);
    const [data, setData] = useState<any>(dataRoom?.theaters)
    const [tongGhe, setTongGhe] = useState<any>(dataRoom?.theaters?.total_seat)
    const [updatePhongChieu] = usePatchPhongChieuMutation()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formRef = React.useRef<FormInstance>(null);
    const [dataSeat, setDataSeat] = useState<any>(dataSeatEdit);
    const [seat, setSeat] = useState<any>([])
    const [buttonClick, setButtonClick] = useState<any>(0)
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
            const newDataSeat = [];
            for (let i = 0; i < values.col; i++) {
                for (let j = 0; j < values.row; j++) {
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
            setTongGhe(values.col * values.row)
        }
        // updatePhongChieu({ body: values, id: projects }).then(() => { setIsModalOpen(false), message.success("Sửa thành công") })

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
            // setDataSeat([])
            // setSeat([])
        }
    };
    const changeSeat = (seat_code: any, type_name: any, hidden: any) => {
        dataSeat?.map((item: any) => {
            if (item && item?.seat_code === seat_code) {
                console.log(type_name);

                if ((buttonClick === 0 || buttonClick === 1) && type_name !== 2) {
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
                if ((buttonClick === 0 || buttonClick === 1) && type_name === 2) {
                    messageApi.error({
                        type: 'error',
                        content: 'Vui lòng huỷ trạng thái ghế đôi',
                        className: "h-[20%] mt-[20px]",
                        duration: 2
                    });
                    return;
                }
                if (buttonClick === 2) {
                    seat?.map((seatItem: any) => {
                        seatItem.map((item2: any) => {
                            if (item2 && item2?.seat_code === seat_code) {
                                const dataLength = seatItem.length
                                const dataOderSeat: number = seatItem.findIndex((seat: any) => seat?.seat_code === seat_code);
                                if (dataOderSeat % 2 === 0 && (seat_code !== seatItem[dataLength - 1]?.seat_code)) {
                                    if (buttonClick === seatItem[dataOderSeat]?.type_name || buttonClick === seatItem[dataOderSeat + 1]?.type_name) {
                                        seatItem[dataOderSeat + 1].type_name = 0
                                        seatItem[dataOderSeat].type_name = 0
                                        seatItem[dataOderSeat + 1].hidden = 0
                                        seatItem[dataOderSeat].hidden = 0
                                        setDataArraySeat()
                                        return;
                                    } else {
                                        seatItem[dataOderSeat + 1].type_name = buttonClick
                                        seatItem[dataOderSeat].type_name = buttonClick
                                        seatItem[dataOderSeat + 1].hidden = 0
                                        seatItem[dataOderSeat].hidden = 0
                                        setDataSeat(dataSeat);
                                        setDataArraySeat()
                                        return;
                                    }
                                }
                                if (dataOderSeat % 2 !== 0) {
                                    if (buttonClick === seatItem[dataOderSeat]?.type_name || buttonClick === seatItem[dataOderSeat - 1]?.type_name) {
                                        seatItem[dataOderSeat - 1].type_name = 0
                                        seatItem[dataOderSeat].type_name = 0
                                        seatItem[dataOderSeat - 1].hidden = 0
                                        seatItem[dataOderSeat].hidden = 0
                                        setDataArraySeat()
                                        return;
                                    } else {
                                        seatItem[dataOderSeat - 1].type_name = buttonClick
                                        seatItem[dataOderSeat].type_name = buttonClick
                                        seatItem[dataOderSeat - 1].hidden = 0
                                        seatItem[dataOderSeat].hidden = 0
                                        setDataSeat(dataSeat);
                                        setDataArraySeat()
                                        return;
                                    }

                                }
                            }
                        })
                    })
                }
                if (buttonClick === 3) {
                    if (hidden === 0 && type_name === 2) {
                        messageApi.error({
                            type: 'error',
                            content: 'Vui lòng huỷ trạng thái ghế đôi',
                            className: "h-[20%] mt-[20px]",
                            duration: 2
                        });
                        return;
                    }
                    if (hidden === 0 && type_name !== 2) {
                        item.hidden = 1
                        setDataSeat(dataSeat);
                        setDataArraySeat()
                        return;
                    }
                    if (hidden === 1) {
                        item.hidden = 0
                        setDataSeat(dataSeat);
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
    return (
        <>
            {contextHolder}
            <Button onClick={showModal}>Sửa</Button>
            <Modal title="Sửa phòng chiếu " open={isModalOpen} onCancel={handleCancel} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }} width={1200} className="text-center">

                {data ? (
                    <Form className='mr-[60px]'
                        name='formLogin'
                        ref={formRef}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        initialValues={data}
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
                            name="row"
                            rules={[{ required: true, message: 'Vui lòng nhập số ghế hàng ngang !' }]}
                        >
                            <InputNumber min="1" max="15" />
                        </Form.Item>
                        <Form.Item<PhongChieu1>
                            label="Số ghế hàng dọc"
                            name="col"
                            rules={[{ required: true, message: 'Vui lòng nhập số ghế hàng dọc !' }]}
                        >
                            <InputNumber min="1" max="15" />
                        </Form.Item>
                        <Form.Item<PhongChieu1>
                            label="Tổng số ghế"
                        >
                            <InputNumber value={tongGhe} disabled />
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
                                                    changeSeat(item2?.seat_code, item2?.type_name, item2?.hidden);
                                                }}>
                                                <MdChair className={`seat text-center cursor-pointer text-[#797373] ${((item2?.hidden === 0 && "text-[#797373]") && (((item2?.type_name === 1 && 'text-[#8f4747]') || (item2?.type_name === 0 && 'text-[#797373]') || (item2?.type_name === 2 && 'text-[#8f355a]')))) || (item2?.hidden === 1 && "text-black")}`}
                                                    size={35}
                                                />
                                                <div className={`cursor-pointer absolute top-1 right-[11.2px] font-semibold text-[8px] `}>{item2?.seat_code}</div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                            <div className="text-center w-[15%] ml-[140px] ">
                                <div className="text-xl ml-[-55px]">Tổng số ghế : {tongGhe}</div>
                                <div className='ml-[-55px]'>Lựa chọn loại ghế :</div>
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
                                <div className={`seat flex border-2 rounded-lg w-[120px] mt-4 ${buttonClick === 3 ? "bg-green-500" : ""}`} onClick={() => setButtonClick(3)}>
                                    <div><MdChair className="text-black" size={40} /></div>
                                    <p className='ml-2 py-2'>Huỷ ghế</p>
                                </div>
                            </div>
                        </div>
                        <Button className="w-[80px] mt-[20px]">
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