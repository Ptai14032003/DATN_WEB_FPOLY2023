import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Modal, Upload } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { PhongChieu } from './page';
import { useFetchPhongChieuIDQuery } from '../../rtk/qlPhongChieu/qlPhongChieu';
type Props = {
    projects: string
}
const EditQlPhongChieu: React.FC<Props> = ({ projects }: Props) => {
    const { data } = useFetchPhongChieuIDQuery(projects);
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

            <Button onClick={showModal}>Sửa</Button>
            <Modal title="Sua phim " open={isModalOpen} onCancel={handleCancel} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }} className="text-center">
                {data ? (
                    <Form className='mr-[60px]'
                        name='formLogin'
                        ref={formRef}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        initialValues={data}
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
                            <InputNumber />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button htmlType="submit">
                                Sửa
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

export default EditQlPhongChieu;