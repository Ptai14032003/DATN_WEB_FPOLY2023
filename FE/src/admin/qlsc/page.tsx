import React, { useEffect, useState } from 'react';
import { Space, Table, Input, Button, message, Popconfirm } from 'antd';
import CreateQlSc from './create';
import { useDeleteSuatChieuMutation, useFetchSuatChieuQuery } from '../../rtk/qlSc/qlSc';
import "./page.css"
import { Waveform } from '@uiball/loaders';
import Fuse from 'fuse.js';
import { checkApiStatus } from "../checkApiStatus"; // Import hàm trợ giúp
import { useNavigate } from 'react-router-dom';
import moment from 'moment';


const { Column } = Table;

export type QlSuatChieu = {
    key: string;
    movie_name: string;
    room_name: string;
    show_date: string;
    show_time: string;
}
const AdminQlSc: React.FC = () => {
    const { data: dataSuatChieu, isLoading, error } = useFetchSuatChieuQuery()
    const navigate = useNavigate();
    const status = error?.status;
    const [deleteSuatChieu] = useDeleteSuatChieuMutation()
    const [dataTable, setDataTable] = useState<QlSuatChieu[]>([])
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
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
        useExtendedSearch: true,
        isCaseSensitive: true,
        findAllMatches: true,
        keys: ["movie_name", "room_name"]
    }
    const fuse = new Fuse(dataSuatChieu?.data, fuseOptions)
    const searchProject = (value: string) => {
        console.log(value);
        setSearchTerm(value);
    };
    const deleteOne = (key: string) => {
        deleteSuatChieu(key).then(() => message.success("Xóa thành công"))
    }
    useEffect(() => {
        const dataMap = dataSuatChieu?.data
        if (Array.isArray(dataMap)) {
            const mapSuatChieu = dataMap?.map((item: any) => ({
                key: item.id,
                movie_name: item.movie_name,
                room_name: item.room_name,
                show_date: item.show_date,
                show_time: item.show_time,
            }));
            setDataTable(mapSuatChieu);
        }
        if (status) {
            checkApiStatus(status, navigate);
        }

    }, [dataSuatChieu, status]);
    useEffect(() => {
        if (searchTerm.length > 0) {
            const results = fuse?.search(searchTerm);
            const newData = results?.map((result) => result.item);
            if (Array.isArray(newData)) {
                const mapPhongChieu = newData.map((item: any) => ({
                    key: item.id,
                    movie_name: item.movie_name,
                    room_name: item.room_name,
                    show_date: item.show_date,
                    show_time: item.show_time,
                }))
                setDataTable(mapPhongChieu)
            }
        }
        if (searchTerm.length === 0) {
            const dataMap = dataSuatChieu?.data
            if (Array.isArray(dataMap)) {
                const mapPhongChieu = dataMap.map((item: any) => ({
                    key: item.id,
                    movie_name: item.movie_name,
                    room_name: item.room_name,
                    show_date: item.show_date,
                    show_time: item.show_time,
                }))
                setDataTable(mapPhongChieu)
            }
        }
    }, [dataSuatChieu, searchTerm])

    return (
        <div>
            <div className='mb-[25px] mt-[-30px] text-2xl' >Quản lý Suất Chiếu</div>
            <div className='flex justify-between mb-[10px]'>
                <Input style={{ width: '20%' }} placeholder='Tìm kiếm suất chiếu'
                    value={searchTerm}
                    onChange={(e) => searchProject(e.target.value)} />
                <CreateQlSc />
            </div>
            <span style={{ marginLeft: 8 }}>
                {hasSelected ? (
                    <Popconfirm
                        title="Delete the task"
                        description={`Bạn có chắc muốn xóa ${selectedRowKeys.length} mục ?`}
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
                    <Column title="Tên phim" dataIndex="movie_name" key="movie_name" />
                    <Column title="Tên phòng" dataIndex="room_name" key="room_name" />
                    <Column title="Ngày chiếu" dataIndex="show_date" key="show_date" render={(text) => moment(text).format("DD-MM-YYYY")} />
                    <Column title="Thời gian chiếu" dataIndex="show_time" key="show_time" />
                    <Column
                        title="Action"
                        key="action"
                        render={(_: any, record: QlSuatChieu) => (
                            <Space size="middle">
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
export default AdminQlSc;