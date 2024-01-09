import React, { useState } from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { QlNhanSu } from './page';
import { useFetchNhanSuIdQuery, useUpdateNhanSuMutation } from '../../rtk/qlNhanSu/qlNhanSu';
type Props = {
    projects: string
}

export interface QlNhanSuEdit {
    key: string;
    personnel_code: string;
    name: string;
    email: string;
    phone_number: string;
    password: string;
    address: string;
    birthday: string;
    gender: string;
    role: string
    date_start: string
}
const EditQlNhanSu: React.FC<Props> = ({ projects }: Props) => {
    const { data } = useFetchNhanSuIdQuery(projects);
    console.log(data);

    const [updateNhanSu] = useUpdateNhanSuMutation()
    const dataNhanSu = data?.data
    const selectGender = ["Nam", "Nữ", "Không muốn trả lời"]
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
        console.log(values);
        
        // updateNhanSu({ body: values, id: projects })
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
            <Modal title="Sửa thông tin nhân sự" open={isModalOpen} onCancel={handleCancel} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }} className="text-center">
                {dataNhanSu ? (
                    <Form className='mr-[60px]'
                        name='formLogin'
                        ref={formRef}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        initialValues={dataNhanSu}
                    >
                        <Form.Item<QlNhanSuEdit>
                            label="Mã nhân viên"
                            name="personnel_code"
                        >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item<QlNhanSuEdit>
                            label="Tên nhân viên"
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập mô tả !' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<QlNhanSuEdit>
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Vui lòng nhập email !' }, { type: 'email', message: "Vui lòng nhập đúng định dạng !" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<QlNhanSuEdit>
                            label="Số điện thoại"
                            name="phone_number"
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại !' }, {
                                pattern: /^(?:\d[ -]?){9,14}\d$/,
                                message: 'Vui lòng nhập số điện thoại hợp lệ!',
                            }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<QlNhanSuEdit>
                            label="Mật khẩu"
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu !' }]}
                        >
                            <Input type="password" />
                        </Form.Item>
                        <Form.Item<QlNhanSuEdit>
                            label="Địa chỉ"
                            name="address"
                            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<QlNhanSuEdit>
                            label="Ngày sinh"
                            name="birthday"
                            rules={[{ required: true, message: 'Vui lòng nhập ngày sinh!' }]}
                        >
                            <Input type='date' style={{ width: 200 }} />
                        </Form.Item>
                        <Form.Item<QlNhanSuEdit>
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
                        <Form.Item<QlNhanSuEdit>
                            label="Ngày bắt đầu"
                            name="date_start"
                            rules={[{ required: true, message: 'Vui lòng nhập ngày bắt đầu!' }]}
                        >
                            <Input type='date' style={{ width: 200 }} />
                        </Form.Item>
                        <Form.Item<QlNhanSuEdit>
                            label="Chức vụ"
                            name="role"
                            rules={[{ required: true, message: 'Vui lòng chọn chức vụ !' }]}
                        >
                            <Select className='ml-[-72px]'
                                defaultValue="Chọn chức vụ"
                                style={{ width: 200 }}
                                options={RoleOptions}
                            />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button htmlType="submit">
                                Update
                            </Button>
                        </Form.Item>
                    </Form>
                ) : (
                    <div className="flex justify-center">Đang lấy dữ liệu</div>
                )}
            </Modal>
        </>
    )
};

export default EditQlNhanSu;