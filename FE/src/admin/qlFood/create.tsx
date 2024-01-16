import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Modal, Select, Upload, message } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { UploadOutlined } from '@ant-design/icons';
import { useAddFoodMutation, useFetchTypeFoodsQuery } from '../../rtk/qlSp/qlSp';
interface QlFoodCreate {
    food_name: string,
    price: number,
    image: File,
    food_type_id: string
}
const CreateQlSp: React.FC = () => {
    const { data: dataTypeFood } = useFetchTypeFoodsQuery()
    const [addFood] = useAddFoodMutation()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formRef = React.useRef<FormInstance>(null);
    const [checkApi, setCheckApi] = useState(true)
    const selectTypeFood = dataTypeFood?.map((food: any) => ({
        value: food?.id,
        label: food?.name,
    }));
    const onFinish = (values: any) => {
        if (checkApi) {
            addFood(values).then((data: any) => {
                if (data?.data?.food_name) {
                    message.error(data?.data?.food_name[0])
                } else {
                    setIsModalOpen(false), message.success("Thêm thành công");
                    formRef.current?.resetFields();
                }
            })
            setCheckApi(false)
            return;
        }
    };
    const showModal = () => {
        setIsModalOpen(true);
        setCheckApi(true)
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
                    autoComplete="off"
                    encType='multiple/form-data'
                >
                    <Form.Item<QlFoodCreate>
                        label="Sản phẩm"
                        name="food_name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm !' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<QlFoodCreate>
                        label="Giá"
                        name="price"
                        rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm !' }]}
                    >
                        <InputNumber min={0} style={{ width: 150 }} />
                    </Form.Item>
                    <Form.Item<QlFoodCreate>
                        label="Loại sản phẩm"
                        name="food_type_id"
                        rules={[{ required: true, message: 'Vui lòng nhập loại sản phẩm  !' }]}
                    >
                        <Select className='ml-[-72px]'
                            placeholder="Chọn loại sản phẩm"
                            style={{ width: 200 }}
                            options={selectTypeFood}
                        />
                    </Form.Item>
                    <Form.Item<QlFoodCreate>
                        label="Ảnh"
                        name="image"
                        rules={[{ required: true, message: 'Vui lòng nhập ảnh !' }]}
                    >
                        <Upload listType='picture' multiple={false} beforeUpload={(file) => {
                            return new Promise((resolve, reject) => {
                                if (file.type !== 'image/jpg' && file.type !== 'image/png' && file.type !== 'image/webp' && file.type !== 'image/jpeg') {
                                    message.error("Ảnh không đúng định dạng.");
                                } else if (file.size > 2000000) {
                                    message.error("Ảnh không được lớn hơn 2MB.");
                                } else {
                                    reject();
                                }
                            })
                        }} maxCount={1}>
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