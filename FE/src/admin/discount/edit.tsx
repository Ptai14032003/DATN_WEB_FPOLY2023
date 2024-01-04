import React, { useState } from 'react';
import { Button, ConfigProvider, DatePicker, Form, Input, InputNumber, Modal, message } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { Discount } from './page';
import { useFetchDiscountIDQuery, useUpdateDiscountMutation } from '../../rtk/discount/discount';
import viVN from 'antd/lib/locale/vi_VN';
type Props = {
    projects: string
}
const EditQlDiscount: React.FC<Props> = ({ projects }: Props) => {
    const { data } = useFetchDiscountIDQuery(projects);
    const [update] = useUpdateDiscountMutation()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formRef = React.useRef<FormInstance>(null);
    const onFinish = (values: any) => {

        update({ body: values, id: projects }).then(() => { setIsModalOpen(false); message.success("Sửa thành công") })

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
            <Modal title="Sửa khuyến mãi" open={isModalOpen} onCancel={handleCancel} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }} className="text-center">
                {data ? (
                    <Form className='mr-[60px]'
                        name='formLogin'
                        ref={formRef}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 800 }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        initialValues={data}
                    >
                        <Form.Item<Discount>
                            label="Mã khuyến mãi"

                            name="discount_code"

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

                            <Input type='date' style={{ width: 200 }} />

                        </Form.Item>
                        <Form.Item<Discount>
                            label="Ngày Kết Thúc"
                            name="end"
                            rules={[{ required: true, message: 'Vui lòng nhập ngày kết thúc !' }]}
                        >

                            <Input type='date' style={{ width: 200 }} />

                        </Form.Item>
                        <Form.Item<Discount>
                            label="Mức Giảm (%)"
                            name="discount_percent"
                            rules={[
                                { required: true, message: 'Vui lòng nhập mức giảm giá !' },
                            ]}
                        >
                            <InputNumber min={1} max={100} />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button htmlType="submit" className='mr-[80px]'>
                                Tạo mới
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

export default EditQlDiscount;