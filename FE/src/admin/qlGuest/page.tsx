import React, { useEffect, useState } from 'react';
import { Table, Input, Button, message, Popconfirm } from 'antd';
import { useFetchGuestsQuery } from '../../rtk/qlGuest/qlGuest';
import { Waveform } from '@uiball/loaders';

import Fuse from 'fuse.js';
import { checkApiStatus } from "../checkApiStatus"; // Import hàm trợ giúp
import { useNavigate } from 'react-router-dom';

>>>>>>> main
const { Column } = Table;
interface Guest {
    key: string;
    user_code: string;
    name: string;
    email: string;
    phone_number: string;
    password: string;
    address: string;
    birthday: string;
    gender: string;
}
const AdminQlGuest: React.FC = () => {

    const { data: dataGuest, isLoading, error } = useFetchGuestsQuery()
    const navigate = useNavigate();
    const status = error?.status;
>>>>>>> main

    const [dataTable, setDataTable] = useState<Guest[]>([])
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

    const fuseOptions = {
        includeScore: true,
        isCaseSensitive: true,
        findAllMatches: true,
        useExtendedSearch: true,
        includeMatches: true,
        keys: ["user_code", "name", "email"]
    }
    const fuse = new Fuse(dataGuest?.data, fuseOptions)

    const searchProject = (value: string) => {
>>>>>>> main
        setSearchTerm(value);
    };
    useEffect(() => {
        const dataMap = dataGuest?.data
        if (Array.isArray(dataMap)) {
            const mapMovies = dataMap.map((item: any) => ({
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

        if (status) {
            checkApiStatus(status, navigate);
        }
    }, [dataGuest, status])
    useEffect(() => {
        if (searchTerm.length > 0) {
            const results = fuse?.search(searchTerm);
            const newData = results?.map((result) => result.item);
            if (Array.isArray(newData)) {
                const mapGuest = newData.map((item: any) => ({
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
                setDataTable(mapGuest)
            }
        }
        if (searchTerm.length === 0) {
            const dataMap = dataGuest?.data
            if (Array.isArray(dataMap)) {
                const mapMovies = dataMap.map((item: any) => ({
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
        }
    }, [searchTerm, dataGuest])
>>>>>>> main
    return (
        <div>
            <div className='mb-[25px] mt-[-30px] text-2xl' >Quản lý khách hàng</div>
            <div className='flex justify-between mb-[10px]'>
                <Input style={{ width: '20%' }} placeholder='Tìm kiếm dự án'
                    value={searchTerm}
                    onChange={(e) => searchProject(e.target.value)} />
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
                    <Column title="Mã khách hàng" dataIndex="user_code" key="user_code" />
                    <Column title="Tên khách hàng" dataIndex="name" key="name" />
                    <Column title="Email" dataIndex="email" key="email" />
                    <Column title="Số điện thoại" dataIndex="phone_number" key="phone_number" />
                    <Column title="Mật khẩu" dataIndex="password" key="password" render={(_: any) => (`***********`)} />
                    <Column title="Địa chỉ" dataIndex="address" key="address" />
                    <Column title="Ngày sinh" dataIndex="birthday" key="birthday" />
                    <Column title="Giới tính" dataIndex="gender" key="gender" />
                </Table>
            )}
        </div>
    );
}
export default AdminQlGuest;