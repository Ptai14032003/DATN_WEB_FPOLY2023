import React, { useState } from 'react';
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { useFetchSuatChieuIDQuery } from '../../rtk/qlSc/qlSc';
import { SuatChieu } from './page';
type Props = {
    projects: string
}
const EditQlSc: React.FC<Props> = ({ projects }: Props) => {
    const { data } = useFetchSuatChieuIDQuery(projects)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formRef = React.useRef<FormInstance>(null);
    const countryName = ["Hoa Kỳ", "Canada", "Việt Nam", "United States"];
    const countryOptions = countryName.map((country) => ({
        value: country,
        label: country,
    }));
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

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

            <Button onClick={showModal}>Sửa</Button>
            <Modal title="Sua phim " open={isModalOpen} onCancel={handleCancel} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }} className="text-center">
                {data ? (
                    < Form className='mr-[60px]'
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
                        <Form.Item<SuatChieu>
                            label="Tên phim"
                            name="movie_id"
                            rules={[{ required: true, message: 'Vui lòng nhập tên phim !' }]}
                        >
                            <Select className='ml-[-72px]'
                                defaultValue="Chọn tên phim"
                                style={{ width: 200 }}
                                options={countryOptions}
                            />
                        </Form.Item>

                        <Form.Item<SuatChieu>
                            label="Tên phòng"
                            name="room_id"
                            rules={[{ required: true, message: 'Vui lòng nhập tên phòng !' }]}
                        >
                            <Select className='ml-[-72px]'
                                defaultValue="Chọn tên phòng"
                                style={{ width: 200 }}
                                options={countryOptions}
                            />
                        </Form.Item>
                        <Form.Item<SuatChieu>
                            label="Ngày chiếu"
                            name="show_date"
                            rules={[{ required: true, message: 'Vui lòng nhập mô tả !' }]}
                        >
                            <DatePicker />
                        </Form.Item>
                        <Form.Item<SuatChieu>
                            label="Thời gian chiếu"
                            name="show_time"
                            rules={[{ required: true, message: 'Vui lòng nhập mô tả !' }]}
                        >
                            <DatePicker />
                        </Form.Item>
                        <Form.Item<SuatChieu>
                            label="Tổng số vé bán"
                            name="total_ticket_sold"
                            rules={[{ required: true, message: 'Vui lòng nhập tổng số ghế !' }]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item<SuatChieu>
                            label="Tổng doanh thu"
                            name="total_money"
                            rules={[{ required: true, message: 'Vui lòng nhập tổng số ghế !' }]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button htmlType="submit">
                                Tạo mới
                            </Button>
                        </Form.Item>
                    </Form>
                ) : (
                    <div className="flex justify-center">Đang lấy dữ liệu</div>
                )}
            </Modal >
        </>
    )
};

export default EditQlSc;