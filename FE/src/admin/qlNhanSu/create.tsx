import React, { useState } from 'react';
import { Button, Form, Input, Modal, Select, message } from 'antd';
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
    role: string,
    date_start: string
}
const CreateQlNhanSu: React.FC = () => {
    const [addNhanSu] = useAddNhanSuMutation()
    const selectGender = ["Nam", "Nữ"]
    const [dataError, setDataError] = useState<any>()
    const GenderOptions = selectGender.map((gender) => ({
        value: gender,
        label: gender,
    }));
    const selectRole = ["Admin", "Nhân viên"]
    const RoleOptions = selectRole.map((role) => ({
        value: role,
        label: role,
    }));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formRef = React.useRef<FormInstance>(null);
    const onFinish = (values: any) => {
        addNhanSu(values).then((data: any) => {
            if (!data?.data.message) {
                setDataError(data?.data)
            } else { setIsModalOpen(false); formRef.current?.resetFields(); message.success("Tạo nhân sự thành công") }
        })
    };
    const onFinishFailed = (errorInfo: any) => {
    };
    const showModal = () => {
        setDataError(null)
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setDataError(null)
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
                    <div className='text-red-500 pb-[10px]'>{dataError?.email}</div>
                    <Form.Item<QlNhanSuAdd>
                        label="Số điện thoại"
                        name="phone_number"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại !' }]}
                    >
                        <Input />
                    </Form.Item>
                    <div className='text-red-500 pb-[10px] pl-[80px]'>{dataError?.phone_number}</div>
                    <Form.Item<QlNhanSuAdd>
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu !' }]}
                    >
                        <Input type="password" />
                    </Form.Item>
                    <div className='text-red-500 pb-[10px] pl-[80px]'>{dataError?.password}</div>
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
                        <Input type='date' style={{ width: 200, marginLeft: -70 }} />
                    </Form.Item>
                    <Form.Item<QlNhanSuAdd>
                        label="Giới tính"
                        name="gender"
                        rules={[{ required: true, message: 'Vui lòng nhập giới tính !' }]}
                    >
                        <Select className='ml-[-72px]'
                            placeholder="Chọn giới tính"
                            style={{ width: 200 }}
                            options={GenderOptions}
                        />
                    </Form.Item>
                    <Form.Item<QlNhanSuAdd>
                        label="Ngày bắt đầu"
                        name="date_start"
                        rules={[{ required: true, message: 'Vui lòng nhập ngày bắt đầu!' }]}
                    >
                        <Input type='date' style={{ width: 200, marginLeft: -70 }} />
                    </Form.Item>
                    <div className='text-red-500 pb-[10px] pl-[80px]'>{dataError?.date_start}</div>
                    <Form.Item<QlNhanSuAdd>
                        label="Chức vụ"
                        name="role"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả !' }]}
                    >
                        <Select className='ml-[-72px]'
                            placeholder="Chọn chức vụ"
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
            </Modal >
        </>
    )
};
export default CreateQlNhanSu;