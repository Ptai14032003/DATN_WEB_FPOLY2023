
import React, { useEffect, useState } from 'react';
import { Button, Form, Image, Input, InputNumber, Modal, Select, Upload, message } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { UploadOutlined } from '@ant-design/icons';
import { useFetchMovieIdQuery, useUpdateMoviesMutation } from '../../rtk/movies/movies';
type Props = {
    projects: string
}

type QlPhimEdit = {
    key: string;
    movie_name: string;
    country_name: string;
    producer_name: string;
    actor_name: string;
    type_name: string;
    genre: string;
    director: string;
    image: string;
    trailer: string;
}
const EditQlPhim: React.FC<Props> = ({ projects }: Props) => {
    const { data: dataMovies } = useFetchMovieIdQuery(projects);
    useEffect(() => {
        if (dataMovies) {
            const newData: QlPhimEdit = {
                key: dataMovies?.id,
                movie_name: dataMovies?.movie_name,
                country_name: dataMovies?.country_name,
                producer_name: dataMovies?.producer_name,
                actor_name: dataMovies?.actor_name,
                type_name: dataMovies?.type_name,
                genre: dataMovies?.genre,
                director: dataMovies?.director,
                image: dataMovies?.image,
                trailer: dataMovies?.trailer
            }
            setNewData(newData)
        }
    }, [dataMovies])
    const [newData, setNewData] = useState({})
    const [putMovie] = useUpdateMoviesMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formRef = React.useRef<FormInstance>(null);
    const typeMovies = ["2D", "3D"];

    const typeOptions = typeMovies.map((type) => ({
        value: type,
        label: type,
    }));
    const onFinish = (values: any) => {
        console.log(values);
        // patchMovie({ body: values, id: projects }).then(() => { setIsModalOpen(false), message.success("Sửa thành công") })

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
                {newData ? (

                    <Form className='mr-[60px]'
                        name='formLogin'
                        ref={formRef}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 800 }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"

                        initialValues={newData}
                    >
                        <Form.Item<QlPhimEdit>
                            label="Tên phim"
                            name="movie_name"
                            rules={[{ required: true, message: 'Vui lòng nhập tên !' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<QlPhimEdit>
                            label="Thể loại"
                            name="genre"
                            rules={[{ required: true, message: 'Vui lòng nhập thể loại!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<QlPhimEdit>
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
                        <Form.Item<QlPhimEdit>
                            label="Thời lượng"
                            name="country_name"
                            rules={[{ required: true, message: 'Vui lòng nhập nước sản xuất !' }]}
                        >
                            <InputNumber min={0} />
                        </Form.Item>
                        <Form.Item<QlPhimEdit>
                            label="Nước sản xuất"
                            name="country_name"
                            rules={[{ required: true, message: 'Vui lòng nhập nước sản xuất !' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<QlPhimEdit>
                            label="Đạo diễn"
                            name="director"
                            rules={[{ required: true, message: 'Vui lòng nhập tên đạo diễn !' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<QlPhimEdit>
                            label="Diễn viên"
                            name="actor_name"
                            rules={[{ required: true, message: 'Vui lòng nhập tên các diễn viên !' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<QlPhimEdit>>
                            <div className='mx-[60%]'>
                                <Image className='' width={150}
                                    src={dataMovies?.image} />
                            </div>
                        </Form.Item>
                        <Form.Item<QlPhimEdit>
                            label="Poster"
                            name="image"
                            rules={[{ required: true, message: 'Vui lòng nhập ảnh !' }]}
                        >
                            <Upload listType='picture' beforeUpload={(file) => {
                                return new Promise((resolve, reject) => {
                                    if (file.type === 'image/jpg' || file.type === 'image/png') {
                                        reject();
                                    } else {
                                        message.error("Vui lòng thêm ảnh đúng định dạng")
                                    }
                                })
                            }} maxCount={1} multiple>
                                <Button icon={<UploadOutlined />}>Click to Upload </Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item<QlPhimEdit>
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