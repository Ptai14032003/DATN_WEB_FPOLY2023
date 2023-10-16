import React, { useState } from 'react';
import { Button, ConfigProvider, DatePicker, Form, Input, InputNumber, Modal } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { Discount } from './page';
import { useAddDiscountMutation } from '../../rtk/discount/discount';
import viVN from 'antd/lib/locale/vi_VN';
const CreateQlDiscount: React.FC = () => {
    const [addDiscount] = useAddDiscountMutation()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formRef = React.useRef<FormInstance>(null);
    const onFinish = (values: any) => {
        addDiscount(values).then(() => setIsModalOpen(false))
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
        <ConfigProvider locale={viVN}>
            <Button onClick={showModal}>Thêm mã khuyến mãi</Button>
            <Modal title="Thêm mã khuyến mãi" open={isModalOpen} onCancel={handleCancel} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }} className="text-center">
                <Form className='mr-[60px]'
                    name='formLogin'
                    ref={formRef}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 800 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<Discount>
                        label="Mã khuyến mãi"
                        name="code"
                        rules={[{ required: true, message: 'Vui lòng nhập tên !' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<Discount>
                        label="Sự Kiện Áp Dụng"
                        name="event"
                        rules={[{ required: true, message: 'Vui lòng nhập tên sự kiện !' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<Discount>
                        label="Ngày Áp Dụng"
                        name="start"
                        rules={[{ required: true, message: 'Vui lòng nhập ngày áp dụng !' }]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item<Discount>
                        label="Ngày Kết Thúc"
                        name="end"
                        rules={[{ required: true, message: 'Vui lòng nhập ngày kết thúc !' }]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item<Discount>
                        label="Mức Giảm (%)"
                        name="discount_percent"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mức giảm giá !' },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button htmlType="submit" className='mr-[80px]'>
                            Tạo mới
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </ConfigProvider >
    )
};

export default CreateQlDiscount;