import React, { useState } from 'react';
import { Button, Form, Image, Input, InputNumber, Modal, Upload, message } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { UploadOutlined } from '@ant-design/icons';
import { QlFood } from './page';
const CreateQlSp: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formRef = React.useRef<FormInstance>(null);
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
            <Button onClick={showModal}>Thêm sản phẩm mới</Button>
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
                    <Form.Item<QlFood>
                        label="Sản phẩm"
                        name="food_name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm !' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<QlFood>
                        label="Giá"
                        name="price"
                        rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm !' }]}
                    >
                        <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item<QlFood>
                        label="Loại sản phẩm"
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng nhập loại sản phẩm !' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<QlFood>
                        label="Ảnh"
                        name="image"
                        rules={[{ required: true, message: 'Vui lòng nhập ảnh !' }]}
                    >
                        <Upload listType='picture' beforeUpload={(file) => {
                            return new Promise((resolve, reject) => {
                                if (file.type === 'image/jpg' || file.type === 'image/png') {
                                    reject();
                                } else {
                                    message.error("Vui lòng thêm ảnh đúng định dạng")
                                }
                            })
                        }} maxCount={1} multiple>
                            <Button icon={<UploadOutlined />}>Click to Upload </Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button htmlType="submit">
                            Tạo mới
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
};

export default CreateQlSp;