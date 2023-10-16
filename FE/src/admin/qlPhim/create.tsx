import React, { useState } from 'react';
import { Button, Form, Input, Modal, Select, Upload } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { UploadOutlined } from '@ant-design/icons';
import { QlPhim } from './page';
const CreateQlPhim: React.FC = () => {
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
                    <Form.Item<QlPhim>
                        label="Tên phim"
                        name="movie_name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên !' }, { max: 6, message: "ngu" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<QlPhim>
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
                    <Form.Item<QlPhim>
                        label="Dạng phim"
                        name="country_name"
                        rules={[{ required: true, message: 'Vui lòng nhập dạng phim !' }]}
                    >
                        <Select className='ml-[-72px]'
                            defaultValue="Chọn dạng phim"
                            style={{ width: 200 }}
                            options={countryOptions}
                        />
                    </Form.Item>
                    <Form.Item<QlPhim>
                        label="Đạo diễn"
                        name="country_name"
                        rules={[{ required: true, message: 'Vui lòng nhập nước sản xuất !' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<QlPhim>
                        label="Poster"
                        name="director"
                        rules={[{ required: true, message: 'Vui lòng nhập ảnh !' }]}
                    >
                        <Upload>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item<QlPhim>
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

export default CreateQlPhim;