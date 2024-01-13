import React, { useEffect, useState } from 'react';
import { Space, Table, Input, Button, message, Popconfirm } from 'antd';
import EditQlNhanSu from './edit';
import CreateQlNhanSu from './create';
import { useDeleteNhanSuMutation, useFetchNhanSuQuery } from '../../rtk/qlNhanSu/qlNhanSu';
import { Waveform } from '@uiball/loaders';
import moment from 'moment';
import Fuse from 'fuse.js';
import { checkApiStatus } from "../checkApiStatus"; // Import hàm trợ giúp
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
    date_start: string
}
const AdminQlNhanSu: React.FC = () => {

    const { data: dataNhanSu, isLoading, error } = useFetchNhanSuQuery()

    const navigate = useNavigate();
    const status = error?.status;


    const [dataTable, setDataTable] = useState<QlNhanSu[]>([])
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteNhanSu] = useDeleteNhanSuMutation()
    const fuseOptions = {
        includeScore: true,
        includeMatches: true,
        isCaseSensitive: true,
        findAllMatches: true,
        useExtendedSearch: true,
        keys: ["user_code", "name", "email"]
    }
    const fuse = new Fuse(dataNhanSu?.data, fuseOptions)


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
                date_start: item.date_start
            }))
            setDataTable(mapNhanSu)
        }

        if (status) {
            checkApiStatus(status, navigate);
        }
    }, [dataNhanSu, status])
    useEffect(() => {
        if (searchTerm.length > 0) {
            const results = fuse?.search(searchTerm);
            const newData = results?.map((result) => result.item);
            if (Array.isArray(newData)) {
                const mapGuest = newData.map((item: any) => ({
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
                    date_start: item.date_start
                }))
                setDataTable(mapGuest)
            }
        }
        if (searchTerm.length === 0) {
            const dataMap = dataNhanSu?.data
            if (Array.isArray(dataMap)) {
                const mapMovies = dataMap.map((item: any) => ({
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
                    date_start: item.date_start
                }))
                setDataTable(mapMovies)
            }
        }
    }, [searchTerm, dataNhanSu])

    return (
        <div>
            <div className='mb-[25px] mt-[-30px] text-2xl' >Danh sách nhân sự</div>
            <div className='flex justify-between mb-[10px]'>
                <Input style={{ width: '20%' }} placeholder='Tìm kiếm nhân sự'
                    value={searchTerm}
                    onChange={(e) => searchProject(e.target.value)} />
                <CreateQlNhanSu />
            </div>
            {isLoading ? (
                <Waveform
                    size={40}
                    lineWeight={3.5}
                    speed={1}
                    color="black"
                />
            ) : (
                <Table dataSource={dataTable} pagination={{ pageSize: 6, }}>
                    <Column title="Mã nhân viên" dataIndex="personnel_code" key="personnel_code" />
                    <Column title="Tên nhân viên" dataIndex="name" key="name" />
                    <Column title="Email" dataIndex="email" key="email" />
                    <Column title="Số điện thoại" dataIndex="phone_number" key="phone_number" />
                    <Column title="Địa chỉ" dataIndex="address" key="address" />
                    <Column title="Ngày sinh" dataIndex="birthday" key="birthday" render={(text) => moment(text).format("DD-MM-YYYY")} />
                    <Column title="Giới tính" dataIndex="gender" key="gender" />
                    <Column title="Chức vụ" dataIndex="role" key="role" />
                    <Column title="Ngày bắt đầu" dataIndex="date_start" key="date_start" render={(text) => moment(text).format("DD-MM-YYYY")} />
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