import React, { useState } from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { useAddNhanSuMutation } from '../../rtk/qlNhanSu/qlNhanSu';
export interface QlNhanSuAdd {
    key: string;
    name: string;
    email: string;
    phone_number: string;
    password: string;
    address: string;
    birthday: string;
    gender: string;
    role: string
}
const CreateQlNhanSu: React.FC = () => {
    const [addNhanSu] = useAddNhanSuMutation()
    const selectGender = ["Nam", "Nữ", "Không muốn trả lời"]
    const GenderOptions = selectGender.map((gender) => ({
        value: gender,
        label: gender,
    }));
    const selectRole = ["Sếp", "Nhân viên"]
    const RoleOptions = selectRole.map((role) => ({
        value: role,
        label: role,
    }));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formRef = React.useRef<FormInstance>(null);
    const onFinish = (values: any) => {
        addNhanSu(values).then(() => setIsModalOpen(false))
    };
    const onFinishFailed = (errorInfo: any) => {
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
            <Button onClick={showModal}>Thêm nhân sự mới</Button>
            <Modal title="Thêm nhân sự mới" open={isModalOpen} onCancel={handleCancel} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }} className="text-center">
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
                    <Form.Item<QlNhanSuAdd>
                        label="Tên nhân viên"
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả !' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<QlNhanSuAdd>
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập email !' }, { type: 'email', message: "Vui lòng nhập đúng định dạng !" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<QlNhanSuAdd>
                        label="Số điện thoại"
                        name="phone_number"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại !' }, { type: 'number', message: "Vui long nhập đúng định dạng !" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<QlNhanSuAdd>
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu !' }]}
                    >
                        <Input type="password" />
                    </Form.Item>
                    <Form.Item<QlNhanSuAdd>
                        label="Địa chỉ"
                        name="address"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<QlNhanSuAdd>
                        label="Ngày sinh"
                        name="birthday"
                        rules={[{ required: true, message: 'Vui lòng nhập ngày sinh!' }]}
                    >
                        <Input type='date' style={{ width: 200 }} />
                    </Form.Item>
                    <Form.Item<QlNhanSuAdd>
                        label="Giới tính"
                        name="gender"
                        rules={[{ required: true, message: 'Vui lòng nhập giới tính !' }]}
                    >
                        <Select className='ml-[-72px]'
                            defaultValue="Chọn giới tính"
                            style={{ width: 200 }}
                            options={GenderOptions}
                        />
                    </Form.Item>
                    <Form.Item<QlNhanSuAdd>
                        label="Chức vụ"
                        name="role"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả !' }]}
                    >
                        <Select className='ml-[-72px]'
                            defaultValue="Chọn chức vụ"
                            style={{ width: 200 }}
                            options={RoleOptions}
                        />
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
export default CreateQlNhanSu;