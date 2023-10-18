import React, { useState } from 'react';
import { Button, DatePicker, Form, InputNumber, Modal, Select, Input } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { SuatChieu } from './page';
import { useAddSuatChieuMutation } from '../../rtk/qlSc/qlSc';
const CreateQlSc: React.FC = () => {
    const [addSc] = useAddSuatChieuMutation()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formRef = React.useRef<FormInstance>(null);
    const countryName = ["Hoa Kỳ", "Canada", "Việt Nam", "United States"];
    const countryOptions = countryName.map((country) => ({
        value: country,
        label: country,
    }));
    const onFinish = (values: any) => {
        addSc(values).then(() => setIsModalOpen(false))
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
            <Button onClick={showModal}>Thêm suất chiếu mới</Button>
            <Modal title="Tạo phim mới" open={isModalOpen} onCancel={handleCancel} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }} className="text-center">
                <Form className='mr-[60px]'
                    name='formLogin'
                    ref={formRef}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<SuatChieu>
                        label="Tên phim"
                        name="movie_id"
                        rules={[{ required: true, message: 'Vui lòng nhập tên phim !' }]}
                    >
                        <Select
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
                        <Select
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
                        <Input type='date' style={{ width: 200 }} />
                    </Form.Item>
                    <Form.Item<SuatChieu>
                        label="Thời gian chiếu"
                        name="show_time"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả !' }]}
                    >
                        <Input type='date' style={{ width: 200 }} />
                    </Form.Item>
                    <Form.Item<SuatChieu>
                        label="Tổng số vé bán"
                        name="total_ticket_sold"
                        rules={[{ required: true, message: 'Vui lòng nhập tổng số ghế !' }]}
                    >
                        <InputNumber style={{ width: 200 }} />
                    </Form.Item>
                    <Form.Item<SuatChieu>
                        label="Tổng doanh thu"
                        name="total_money"
                        rules={[{ required: true, message: 'Vui lòng nhập tổng số ghế !' }]}
                    >
                        <InputNumber style={{ width: 200 }} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button htmlType="submit" className='mr-[80px]'>
                            Tạo mới
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
};

export default CreateQlSc;