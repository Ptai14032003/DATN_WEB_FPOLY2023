import React, { useEffect, useState } from 'react';
import { Space, Table, Input, Button, message, Popconfirm } from 'antd';
import EditQlNhanSu from './edit';
import CreateQlNhanSu from './create';
import { useDeleteNhanSuMutation, useFetchNhanSuQuery } from '../../rtk/qlNhanSu/qlNhanSu';
import { Waveform } from '@uiball/loaders';

import { checkApiStatus }  from "../checkApiStatus"; // Import hàm trợ giúp
import { useNavigate } from 'react-router-dom';

const { Column } = Table;
export interface QlNhanSu {
    key: string;
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
    const { data: dataNhanSu, isLoading, error } = useFetchNhanSuQuery()
    
    const navigate = useNavigate();
    const status = error?.status;

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
        deleteNhanSu(key).then(() => { message.success("Xóa thành công") })
    }
    useEffect(() => {
        const dataMap = dataNhanSu?.data
        if (Array.isArray(dataMap)) {
            const mapNhanSu = dataMap.map((item: any) => ({
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
            setDataTable(mapNhanSu)
        }
        if (status) {
            checkApiStatus(status,navigate);
          }
    }, [dataNhanSu,status])
    return (
        <div>
            <div className='mb-[25px] mt-[-30px] text-2xl' >Danh sách nhân sự</div>
            <div className='flex justify-between mb-[10px]'>
                <Input style={{ width: '20%' }} placeholder='Tìm kiếm nhân sự'
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
            {isLoading ? (
                <Waveform
                    size={40}
                    lineWeight={3.5}
                    speed={1}
                    color="black"
                />
            ) : (
                <Table dataSource={dataTable} rowSelection={rowSelection} pagination={{ pageSize: 6, }}>
                    <Column title="Mã nhân viên" dataIndex="personnel_code" key="personnel_code" />
                    <Column title="Tên nhân viên" dataIndex="name" key="name" />
                    <Column title="Email" dataIndex="email" key="email" />
                    <Column title="Số điện thoại" dataIndex="phone_number" key="phone_number" />
                    <Column title="Mật khẩu" dataIndex="password" key="password" render={(_: any) => (`***********`)} />
                    <Column title="Địa chỉ" dataIndex="address" key="address" />
                    <Column title="Ngày sinh" dataIndex="birthday" key="birthday" />
                    <Column title="Giới tính" dataIndex="gender" key="gender" />
                    <Column title="Chức vụ" dataIndex="role" key="role" />
                    <Column
                        title="Action"
                        key="action"
                        render={(_: any, record: QlNhanSu) => (
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
            )}
        </div>
    );
}
export default AdminQlNhanSu;