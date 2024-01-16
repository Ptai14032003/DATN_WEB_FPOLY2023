import React, { useState } from 'react';
import { Button, Form, Image, Input, InputNumber, Modal, Select, Upload, message } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { UploadOutlined } from '@ant-design/icons';
import { QlFood } from './page';
import { useFetchFoodIDQuery, useFetchTypeFoodsQuery, useUpdateFoodMutation } from '../../rtk/qlSp/qlSp';
type Props = {
    projects: string
}
export interface QlFoodCreate {
    key: string;
    food_name: string,
    food_type_id: string,
    price: number,
    image: string,
}
const EditQlSp: React.FC<Props> = ({ projects }: Props) => {
    const { data: dataTypeFood } = useFetchTypeFoodsQuery()
    const { data } = useFetchFoodIDQuery(projects)
    const [putFood] = useUpdateFoodMutation()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formRef = React.useRef<FormInstance>(null);
    const selectTypeFood = dataTypeFood?.map((food: any) => ({
        value: food?.id,
        label: food?.name,
    }));
    const onFinish = (values: any) => {
        console.log(values);

        putFood({ body: values, id: projects }).then((data: any) => {
            if (data?.data?.food_name) {
                message.error(data?.data?.food_name[0])
            } else {
                setIsModalOpen(false), message.success("Sửa thành công");
                formRef.current?.resetFields();
            }
        })
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
            <Modal title="Sửa thông tin sản phẩm " open={isModalOpen} onCancel={handleCancel} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }} className="text-center">
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
                            rules={[{ required: true, message: 'Vui lòng nhập loại sản phẩm !' }]}
                        >
                            <Select className='ml-[-72px]'
                                placeholder="Chọn loại sản phẩm"
                                style={{ width: 200 }}
                                options={selectTypeFood}
                            />
                        </Form.Item>
                        <Form.Item<QlFoodCreate>>
                            <div className='mx-[60%]'>
                                <Image className='' width={150}
                                    src={data?.image} />
                            </div>
                        </Form.Item>
                        <Form.Item<QlFoodCreate>
                            label="Ảnh"
                            name="image"
                            rules={[{ required: true, message: 'Vui lòng nhập ảnh !' }]}
                        >
                            <Upload listType='picture' defaultFileList={data?.image ? [{ uid: '-1', name: 'Image', status: 'done', url: data.image }] : []} multiple={false} beforeUpload={(file) => {
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
                ) : (
                    <div></div>
                )}
            </Modal>
        </>
    )
};

export default EditQlSp;