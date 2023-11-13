import React, { useState } from 'react';
import { Button, Form, Input, Modal, message } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { DsCountry } from './page';
import { useAddCountryMutation } from '../../../rtk/countries/countries';
const CreateDsCountry: React.FC = () => {
    const [addCountry] = useAddCountryMutation()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formRef = React.useRef<FormInstance>(null);
    const onFinish = (values: any) => {
        addCountry(values).then(() => { setIsModalOpen(false); formRef.current?.resetFields(); message.success("Tạo mới thành công") })
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log(errorInfo);
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
            <Button onClick={showModal}>Thêm mới Nước sản xuất</Button>
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
                    <Form.Item<DsCountry>
                        label="Nước sản xuất"
                        name="country_name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên nước sản xuất !' }]}
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

export default CreateDsCountry;