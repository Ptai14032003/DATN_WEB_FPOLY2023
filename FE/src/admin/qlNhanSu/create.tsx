import React, { useState } from 'react';
import { Button, Form, Input, Modal, Select, Upload } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { UploadOutlined } from '@ant-design/icons';
const CreateQlNhanSu: React.FC = () => {
    const countryName = ["Hoa Kỳ", "Canada", "Việt Nam", "United States"]
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formRef = React.useRef<FormInstance>(null);
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const countryOptions = countryName.map((country) => ({
        value: country,
        label: country,
    }));
    type PhimType = {
        name?: string;
        country_name?: string;
        image?: string
        linkGit?: string
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
            <Button onClick={showModal}>Thêm mới phim</Button>
            <Modal title="Tạo phim mới" open={isModalOpen} onCancel={handleCancel} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }} className="text-center">
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
                    <Form.Item<PhimType>
                        label="Tên phim"
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên !' }, { max: 6, message: "ngu" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<PhimType>
                        label="Nước sản xuất"
                        name="country_name"
                        rules={[{ required: true, message: 'Vui lòng nhập nước sản xuất !' }]}
                    >
                        <Select className='ml-[-72px]'
                            defaultValue="Chọn nước sản xuất"
                            style={{ width: 200 }}
                            options={countryOptions}
                        />
                    </Form.Item>
                    <Form.Item<PhimType>
                        label="Dạng phim"
                        name="country_name"
                        rules={[{ required: true, message: 'Vui lòng nhập nước sản xuất !' }]}
                    >
                        <Select className='ml-[-72px]'
                            defaultValue="Chọn dạng phim"
                            style={{ width: 200 }}
                            options={countryOptions}
                        />
                    </Form.Item>
                    <Form.Item<PhimType>
                        label="Đạo diễn"
                        name="country_name"
                        rules={[{ required: true, message: 'Vui lòng nhập nước sản xuất !' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<PhimType>
                        label="Poster"
                        name="image"
                        rules={[{ required: true, message: 'Vui lòng nhập ảnh !' }]}
                    >
                        <Upload>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item<PhimType>
                        label="Trailer"
                        name="country_name"
                        rules={[{ required: true, message: 'Vui lòng nhập nước sản xuất !' }]}
                    >
                        <Input />
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

export default CreateQlNhanSu;