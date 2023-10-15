import React, { useEffect, useState } from 'react';
import { Space, Table, Input, Button, message, Popconfirm } from 'antd';
import { useFetchMoviesQuery } from '../../rtk/movies/movies';
import TrailerPhim from '../../components/itemAdmin/Trailer/page';
import EditQlNhanSu from './edit';
import CreateQlNhanSu from './create';
const { Column } = Table;
const selectGender = ["Nam", "Nữ", "Không muốn trả lời"]
const GenderOptions = selectGender.map((gender) => ({
    value: gender,
    label: gender,
}));
interface DataType {
    id: string;
    user_code: string;
    name: string;
    email: string;
    phone_number: string;
    password: string;
    address: string;
    birthday: string;
    gender: string;
}
const AdminQlNhanSu: React.FC = () => {
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
                user_code: item.user_code,
                name: item.name,
                email: item.email,
                phone_number: item.phone_number,
                password: item.password,
                address: item.address,
                birthday: item.birthday,
                gender: item.gender,
            }))
            setDataTable(mapMovies)
        }
    }, [data])
    return (
        <div>
            <div className='mb-[25px] mt-[-30px] text-2xl' >Quản lý Nhân Sự</div>
            <div className='flex justify-between mb-[10px]'>
                <Input style={{ width: '20%' }} placeholder='Tìm kiếm dự án'
                    value={searchTerm}
                    onChange={(e) => searchProject(e.target.value)} />
                <CreateQlNhanSu />
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
                <Column title="Tên phim " dataIndex="user_code" key="user_code" />
                <Column title="Nước Sản Xuất " dataIndex="name" key="name" />
                <Column title="Nhà Sản Xuất" dataIndex="email" key="email" />
                <Column title="Dạng Phim" dataIndex="phone_number" key="phone_number" />
                <Column title="Thể Loại" dataIndex="password" key="password" />
                <Column title="Đạo Diễn" dataIndex="birthday" key="birthday" />
                <Column title="Poster" dataIndex="poster" key="poster" />
                <Column title="Trailer" dataIndex="gender" key="gender" />
                <Column
                    title="Action"
                    key="action"
                    render={(_: any, record: DataType) => (
                        <Space size="middle">
                            <a><EditQlNhanSu key={record.id} projects={record.id} /> </a>
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
export default AdminQlNhanSu;