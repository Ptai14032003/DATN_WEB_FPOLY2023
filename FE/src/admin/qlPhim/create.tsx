import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Modal, Select, Upload, message, Image } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { UploadOutlined } from '@ant-design/icons';
import { QlPhim } from './page';
import { useAddMoviesMutation } from '../../rtk/movies/movies';
const { TextArea } = Input;
export interface QlGenre {
    id: string;
    genre: string
}
const CreateQlPhim: React.FC = () => {
    const [addMovies] = useAddMoviesMutation()
    const [checkApi, setCheckApi] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formRef = React.useRef<FormInstance>(null);
    const typeMovies = ["2D", "3D"];
    const typeOptions = typeMovies.map((type) => ({
        value: type,
        label: type,
    }));
    const onFinish = (values: any) => {
        if (checkApi) {
            addMovies(values).then(() => { setIsModalOpen(false); formRef.current?.resetFields(); message.success("Thêm thành công") })
            setCheckApi(false)
            return;
        }
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log(errorInfo);
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
                        rules={[{ required: true, message: 'Vui lòng nhập tên !' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<QlPhim>
                        label="Thể loại"
                        name="genre"
                        rules={[{ required: true, message: 'Vui lòng nhập thể loại!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<QlPhim>
                        label="Dạng phim"
                        name="type_name"
                        rules={[{ required: true, message: 'Vui lòng nhập dạng phim !' }]}
                    >
                        <Select className='ml-[-72px]'
                            placeholder={"Chọn dạng phim"}
                            style={{ width: 200 }}
                            options={typeOptions}
                        />
                    </Form.Item>
                    <Form.Item<QlPhim>
                        label="Thời lượng"
                        name="movie_time"
                        rules={[{ required: true, message: 'Vui lòng nhập thời lượng !' }]}
                    >
                        <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item<QlPhim>
                        label="Nước sản xuất"
                        name="country_name"
                        rules={[{ required: true, message: 'Vui lòng nhập nước sản xuất !' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<QlPhim>
                        label="Đạo diễn"
                        name="director"
                        rules={[{ required: true, message: 'Vui lòng nhập tên đạo diễn !' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<QlPhim>
                        label="Diễn viên"
                        name="actor_name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên các diễn viên !' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<QlPhim>
                        label="Poster"
                        name="image"
                        rules={[{ required: true, message: 'Vui lòng nhập ảnh !' }]}
                    >
                        <Upload multiple={false} listType='picture' beforeUpload={(file) => {
                            return new Promise((resolve, reject) => {
                                if (file.type !== 'image/jpg' && file.type !== 'image/png' && file.type !== 'image/webp' && file.type !== 'image/jpeg') {
                                    message.error("Ảnh không đúng định dạng.");
                                } else if (file.size > 2000000) {
                                    message.error("Ảnh không được lớn hơn 2MB.");
                                } else {
                                    reject();
                                }
                            })
                        }} maxCount={1} >
                            <Button icon={<UploadOutlined />}>Click to Upload </Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item<QlPhim>
                        label="Trailer"
                        name="trailer"
                        rules={[{ required: true, message: 'Vui lòng nhập trailer !' }, { type: "url", message: 'Vui lòng nhập đúng định dạng !' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<QlPhim>
                        label="Ngày bắt đầu"
                        name="start_date"
                        rules={[{ required: true, message: 'Vui lòng nhập ngày bắt đầu !' }]}
                    >
                        <Input type='date' style={{ width: 200, marginLeft: -70 }} />
                    </Form.Item>
                    <Form.Item<QlPhim>
                        label="Ngày kết thúc"
                        name="end_date"
                        rules={[{ required: true, message: 'Vui lòng nhập ngày kết thúc !' }]}
                    >
                        <Input type='date' style={{ width: 200, marginLeft: -70 }} />
                    </Form.Item>
                    <Form.Item<QlPhim>
                        label="Mô tả"
                        name="describe"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả phim !' }]}
                    >
                        <TextArea rows={4} />
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