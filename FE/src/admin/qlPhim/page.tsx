import React, { useEffect, useState } from 'react';
import { Space, Table, Input, Button, message, Popconfirm } from 'antd';
import CreateQlPhim from './create';
import EditQlPhim from './edit';
import { useFetchMoviesQuery } from '../../rtk/movies/movies';
const { Column } = Table;

interface DataType {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    address: string;
}
const AdminQlPhim: React.FC = () => {
    const { data } = useFetchMoviesQuery()
    const [dataTable, setDataTable] = useState<[]>([])
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
    const onSelectChange = (newSelectedRowKeys: any[]) => {
        console.log('', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const DeleteAll = () => {
        console.log(selectedRowKeys);
        message.success("Xóa thành công");
    }
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const searchProject = (value: string) => {
        console.log(value);
        setSearchTerm(value);
    };
    const deleteOne = (key: string) => {
        console.log(key);
        message.success("Xóa thành công");

    }
    useEffect(() => {
        if (data) {
            const mapMovies = data.map((item: any) => ({
                key: item.id,
                movie_name: item.movie_name,
                country_name: item.country_name,
                producer_name: item.producer_name,
                type_name: item.type_name,
                genre: item.genre,
                director: item.director,
                trailer: item.trailer
            }))
            setDataTable(mapMovies)
        }
    }, [data])
    return (
        <div>
            <div className='mb-[25px] mt-[-30px] text-2xl' >Quản lý Phim</div>
            <div className='flex justify-between mb-[10px]'>
                <Input style={{ width: '20%' }} placeholder='Tìm kiếm dự án'
                    value={searchTerm}
                    onChange={(e) => searchProject(e.target.value)} />
                <CreateQlPhim />
            </div>
            <span style={{ marginLeft: 8 }}>
                {hasSelected ? (
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => {
                            DeleteAll();
                        }}
                        okButtonProps={{
                            style: { backgroundColor: "#007bff" },
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>
                            {`Delete ${selectedRowKeys.length} items`}
                        </Button>
                    </Popconfirm>) : (
                    <div></div>
                )}
            </span>
            <Table dataSource={dataTable} rowSelection={rowSelection} pagination={{ pageSize: 6, }}>
                <Column title="Tên phim " dataIndex="movie_name" key="movie_name" />
                <Column title="Nước Sản Xuất " dataIndex="country_name" key="ountry_name" />
                <Column title="Nhà Sản Xuất" dataIndex="producer_name" key="producer_name" />
                <Column title="Dạng Phim" dataIndex="type_name" key="type_name" />
                <Column title="Thể Loại" dataIndex="genre" key="genre" />
                <Column title="Đạo Diễn" dataIndex="director" key="director" />
                <Column title="Poster" dataIndex="poster" key="poster" />
                <Column title="Trailer" dataIndex="trailer" key="trailer" />
                <Column
                    title="Action"
                    key="action"
                    render={(_: any, record: DataType) => (
                        <Space size="middle">
                            <a><EditQlPhim key={record.id} projects={record.id} /> </a>
                            <a>
                                <Popconfirm
                                    title="Delete the task"
                                    description="Are you sure to delete this task?"
                                    onConfirm={() => {
                                        deleteOne(record.id);
                                    }}
                                    okButtonProps={{
                                        style: { backgroundColor: "#007bff" },
                                    }}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button danger>Delete</Button>
                                </Popconfirm></a>
                        </Space>
                    )}
                />
            </Table>
        </div>
    );
}
export default AdminQlPhim;