import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Modal, message } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { PhongChieu } from './page';
import { useAddPhongChieuMutation } from '../../rtk/qlPhongChieu/qlPhongChieu';
const CreateQlPhongChieu: React.FC = () => {
    const [addPhongChieu] = useAddPhongChieuMutation()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formRef = React.useRef<FormInstance>(null);
    const onFinish = (values: any) => {
        addPhongChieu(values).then(() => { setIsModalOpen(false); message.success("Tạo mới thành công"); formRef.current?.resetFields() })
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
            <Button onClick={showModal}>Thêm phòng chiếu mới</Button>
            <Modal title="Thêm phòng chiếu mới" open={isModalOpen} onCancel={handleCancel} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }} className="text-center">
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
                    <Form.Item<PhongChieu>
                        label="Tên phòng"
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên phòng !' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<PhongChieu>
                        label="Tổng số ghế"
                        name="total_seat"
                        rules={[{ required: true, message: 'Vui lòng nhập tổng số ghế !' }]}
                    >
                        <InputNumber min="1" />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button htmlType="submit" className='mr-[80px]'>
                            Tạo mới
                        </Button>
                    </Form.Item>
                </Form>
            </Modal >
        </>
    )
};

export default CreateQlPhongChieu;