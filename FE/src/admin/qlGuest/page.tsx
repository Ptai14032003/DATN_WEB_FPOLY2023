import React, { useEffect, useState } from 'react';
import { Table, Input, Button, message, Popconfirm, Space } from 'antd';
import { useFetchGuestsQuery } from '../../rtk/qlGuest/qlGuest';
import { Waveform } from '@uiball/loaders';

import Fuse from 'fuse.js';
import { checkApiStatus } from "../checkApiStatus"; // Import hàm trợ giúp
import { useNavigate } from 'react-router-dom';


const { Column } = Table;
interface Guest {
    key: string;
    user_code: string;
    name: string;
    email: string;
    phone_number: string;
    password: string;
}
const AdminQlGuest: React.FC = () => {

    const { data: dataGuest, isLoading, error } = useFetchGuestsQuery()
    const navigate = useNavigate();
    const status = error?.status;
    const [dataTable, setDataTable] = useState<Guest[]>([])
    const [searchTerm, setSearchTerm] = useState('');
    const deleteOne = (key: string) => {
        message.success("Xóa thành công")
    }
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
        setSearchTerm(value);
    };
    const checkLocal = localStorage.getItem("user");
    const checkUser = checkLocal ? JSON.parse(checkLocal) : null;
    const checkRoleAdmin = checkUser?.role === "Admin"
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
                }))
                setDataTable(mapMovies)
            }
        }
    }, [searchTerm, dataGuest])

    return (
        <div>
            <div className='mb-[25px] mt-[-30px] text-2xl' >Quản lý khách hàng</div>
            <div className='flex justify-between mb-[10px]'>
                <Input style={{ width: '20%' }} placeholder='Tìm kiếm khách hàng'
                    value={searchTerm}
                    onChange={(e) => searchProject(e.target.value)} />
            </div>
            {isLoading ? (
                <Waveform
                    size={40}
                    lineWeight={3.5}
                    speed={1}
                    color="black"
                />
            ) : (
                <Table dataSource={dataTable} pagination={{ pageSize: 10 }}>
                    <Column title="Mã khách hàng" dataIndex="user_code" key="user_code" />
                    <Column title="Tên khách hàng" dataIndex="name" key="name" />
                    <Column title="Email" dataIndex="email" key="email" />
                    <Column title="Số điện thoại" dataIndex="phone_number" key="phone_number" />
                </Table>
            )}
        </div>
    );
}
export default AdminQlGuest;