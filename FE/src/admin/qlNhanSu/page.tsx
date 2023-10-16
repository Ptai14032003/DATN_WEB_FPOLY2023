import React, { useEffect, useState } from 'react';
import { Space, Table, Input, Button, message, Popconfirm } from 'antd';
import EditQlNhanSu from './edit';
import CreateQlNhanSu from './create';
import { useDeleteNhanSuMutation, useFetchNhanSuQuery } from '../../rtk/qlNhanSu/qlNhanSu';
const { Column } = Table;
export interface QlNhanSu {
    id: string;
    personnel_code: string;
    name: string;
    email: string;
    phone_number: string;
    password: string;
    address: string;
    birthday: string;
    gender: string;
    role: string
}
const AdminQlNhanSu: React.FC = () => {
    const { data } = useFetchNhanSuQuery()
    const [dataTable, setDataTable] = useState<QlNhanSu[]>([])
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
    const [deleteNhanSu] = useDeleteNhanSuMutation()
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
        deleteNhanSu(key)
        message.success("Xóa thành công");

    }
    useEffect(() => {
        if (data) {
            const mapMovies = data.map((item: QlNhanSu) => ({
                key: item.id,
                personnel_code: item.personnel_code,
                name: item.name,
                email: item.email,
                phone_number: item.phone_number,
                password: item.password,
                address: item.address,
                birthday: item.birthday,
                gender: item.gender,
                role: item.role,
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
                <Column title="Mã nhân viên" dataIndex="personnel_code" key="personnel_code" />
                <Column title="Tên nhân viên" dataIndex="name" key="name" />
                <Column title="Email" dataIndex="email" key="email" />
                <Column title="Số điện thoại" dataIndex="phone_number" key="phone_number" />
                <Column title="Mật khẩu" dataIndex="password" key="password" />
                <Column title="Địa chỉ" dataIndex="address" key="address" />
                <Column title="Ngày sinh" dataIndex="birthday" key="birthday" />
                <Column title="Giới tính" dataIndex="gender" key="gender" />
                <Column title="Chức vụ" dataIndex="role" key="role" />
                <Column
                    title="Action"
                    key="action"
                    render={(_: any, record: any) => (
                        <Space size="middle">
                            <a><EditQlNhanSu key={record.key} projects={record.key} /> </a>
                            <a>
                                <Popconfirm
                                    title="Delete the task"
                                    description="Are you sure to delete this task?"
                                    onConfirm={() => {
                                        deleteOne(record.key);
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