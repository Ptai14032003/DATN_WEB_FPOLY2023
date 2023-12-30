import React, { useCallback, useEffect, useState } from 'react';
import { Space, Table, Input, Button, message, Popconfirm } from 'antd';
import CreateQlPhongChieu from './create';
import EditQlPhongChieu from './edit';
import { useDeletePhongChieuMutation, useFetchPhongChieuQuery } from '../../rtk/qlPhongChieu/qlPhongChieu';
import { Waveform } from '@uiball/loaders'
import Fuse from 'fuse.js';
import { checkApiStatus }  from "../checkApiStatus"; // Import hàm trợ giúp
import { useNavigate } from 'react-router-dom';
const { Column } = Table;

export type PhongChieu = {
    key: string;
    name: string;
    total_seat: number;
}

export type PhongChieu1 = {
    key: string;
    name: string;
    total_seat_ngang: number;
    total_seat_doc: number;
}
const AdminQlPhongChieu: React.FC = () => {
    const { data: dataPhongChieu, isLoading, error } = useFetchPhongChieuQuery()

    const navigate = useNavigate();
    const status = error?.status;

    const [deletePhongChieu] = useDeletePhongChieuMutation()
    const [dataTable, setDataTable] = useState<PhongChieu[]>([])
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
        keys: ["name"]
    }
    const fuse = new Fuse(dataPhongChieu?.data, fuseOptions)

    const searchProject = (value: string) => {
        setSearchTerm(value)
    };
    console.log(dataTable);

    const deleteOne = (key: string) => {
        deletePhongChieu(key).then(() => message.success("Xóa thành công"))
    }
    useEffect(() => {
        const dataMap = dataPhongChieu?.data
        if (Array.isArray(dataMap)) {
            const mapPhongChieu = dataMap.map((item: any) => ({
                key: item.id,
                name: item.name,
                total_seat: item.total_seat
            }))
            setDataTable(mapPhongChieu)
        }
        if (status) {
            checkApiStatus(status, navigate);
        }
    }, [dataPhongChieu, status])
    useEffect(() => {
        if (searchTerm.length > 0) {
            const results = fuse?.search(searchTerm);
            const newData = results?.map((result) => result.item);
            if (Array.isArray(newData)) {
                const mapPhongChieu = newData.map((item: any) => ({
                    key: item.id,
                    name: item.name,
                    total_seat: item.total_seat
                }))
                setDataTable(mapPhongChieu)
            }
        }
    }, [searchTerm])
    return (
        <div>
            <div className='mb-[25px] mt-[-30px] text-2xl' >Danh sách phòng chiếu</div>
            <div className='flex justify-between mb-[10px]'>
                <Input style={{ width: '20%' }} placeholder='Tìm kiếm phòng chiếu'
                    value={searchTerm}
                    onChange={(e) => searchProject(e.target.value)} />
                <CreateQlPhongChieu />
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
                    <Column title="Phòng" dataIndex="name" key="name" />
                    <Column title="Tổng số ghế" dataIndex="total_seat" key="total_seat" />
                    <Column
                        title="Action"
                        key="action"
                        render={(_: any, record: PhongChieu) => (
                            <Space size="middle">
                                <a><EditQlPhongChieu key={record.key} projects={record.key} /> </a>
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
export default AdminQlPhongChieu;