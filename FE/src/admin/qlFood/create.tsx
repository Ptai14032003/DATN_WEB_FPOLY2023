import React, { useState, useRef } from 'react';
import { Button, Form, Image, Input, InputNumber, Modal, Select, Upload, message } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { UploadOutlined } from '@ant-design/icons';
import { QlFood } from './page';


import { useAddFoodMutation, useFetchTypeFoodsQuery } from '../../rtk/qlSp/qlSp';
interface QlFoodCreate {
    food_name: string,
    price: number,
    image: File,
    food_type_id: string
}
const CreateQlSp: React.FC = () => {
    const { data: dataTypeFood } = useFetchTypeFoodsQuery()
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [addFood] = useAddFoodMutation()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formRef = React.useRef<FormInstance>(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const selectTypeFood = dataTypeFood?.map((food: any) => ({
        value: food?.id,
        label: food?.name,
    }));
    const onFinish = (values: any) => {
        const newData = {
            ...values,
            image: values.image.file
        }
        console.log(newData);

        // addFood(newData).then((data) => {

        // })

    };
    const onChange = (e) => {
        const selectedFile = e.target.files[0];
        console.log(selectedFile);


    }
    const handleFileChange = () => {
        const file = fileInputRef.current?.files?.[0];
        if (file) {
            setSelectedFile(URL.createObjectURL(file));
        }
        console.log(URL.createObjectURL(file));

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
                        <InputNumber min={0} />
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
                        {/* <Upload listType='picture' beforeUpload={(file) => {
                            return new Promise((resolve, reject) => {
                                if (file.type === 'image/jpg' || file.type === 'image/png') {
                                    reject();
                                } else {
                                    message.error("Vui lòng thêm ảnh đúng định dạng")
                                }
                            })
                        }} maxCount={1} multiple>
                            <Button icon={<UploadOutlined />}>Click to Upload </Button>
                        </Upload> */}
                        <input type="file" multiple name="" id="" onChange={handleFileChange} ref={fileInputRef} />
                        {selectedFile && <img src={selectedFile} alt="Selected" />}
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