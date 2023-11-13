import React, { useState } from 'react';
import { Button, Form, Input, Modal, Select, Upload, message } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { UploadOutlined } from '@ant-design/icons';
import { QlPhim } from './page';
import { useFetchMovieIdQuery, useUpdateMoviesMutation } from '../../rtk/movies/movies';
type Props = {
    projects: string
}
const EditQlPhim: React.FC<Props> = ({ projects }: Props) => {
    const { data } = useFetchMovieIdQuery(projects);
    const [patchMovie] = useUpdateMoviesMutation();
    const countryName = ["Hoa Kỳ", "Canada", "Việt Nam", "United States"]
    const countryOptions = countryName.map((country) => ({
        value: country,
        label: country,
    }));
    const typeMovies = ["2D", "3D", "United States"];
    const typeOptions = typeMovies.map((type) => ({
        value: type,
        label: type,
    }));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formRef = React.useRef<FormInstance>(null);
    const onFinish = (values: any) => {
        patchMovie({ body: values, id: projects }).then(() => { setIsModalOpen(false), message.success("Sửa thành công") })
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
            <Modal title="Sửa phim " open={isModalOpen} onCancel={handleCancel} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }} className="text-center">
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
                        <Form.Item<QlPhim>
                            label="Tên phim"
                            name="movie_name"
                            rules={[{ required: true, message: 'Vui lòng nhập tên !' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<QlPhim>
                            label="Nước sản xuất"
                            name="country_name"
                            rules={[{ required: true, message: 'Vui lòng nhập nước sản xuất !' }]}
                        >
                            <Select className='ml-[-72px]'
                                defaultValue="Chọn nước sản xuất"
                                style={{ width: 200 }}
                                options={countryOptions}
                            />
                        </Form.Item>
                        <Form.Item<QlPhim>
                            label="Nhà sản xuất"
                            name="producer_name"
                            rules={[{ required: true, message: 'Vui lòng nhập nhà sản xuất !' }]}
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
                            label="Dạng phim"
                            name="type_name"
                            rules={[{ required: true, message: 'Vui lòng nhập dang phim !' }]}
                        >
                            <Select className='ml-[-72px]'
                                mode='multiple'
                                defaultValue="Chọn dạng phim"
                                style={{ width: 200 }}
                                options={typeOptions}
                            />
                        </Form.Item>
                        <Form.Item<QlPhim>
                            label="Thể loại"
                            name="genre"
                            rules={[{ required: true, message: 'Vui lòng nhập thể loại!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<QlPhim>
                            label="Đạo diễn"
                            name="director"
                            rules={[{ required: true, message: 'Vui lòng nhập nước sản xuất !' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<QlPhim>
                            label="Poster"
                            name="director"
                            rules={[{ required: true, message: 'Vui lòng nhập ảnh !' }]}
                        >
                            <Upload>
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item<QlPhim>
                            label="Trailer"
                            name="trailer"
                            rules={[{ required: true, message: 'Vui lòng nhập trailer !' }, { type: "url", message: 'Vui lòng nhập đúng định dạng !' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button htmlType="submit" className='mr-[80px]'>
                                Update
                            </Button>
                        </Form.Item>
                    </Form>
                ) : (
                    <div className="flex justify-center">Đang lấy dữ liệu</div>
                )}
            </Modal >
        </>
    )
};

export default EditQlPhim;