import React, { useEffect, useState } from 'react';
import { Space, Table, Input, Button, message, Popconfirm } from 'antd';
import CreateQlPhongChieu from './create';
import EditQlPhongChieu from './edit';
import { useDeletePhongChieuMutation, useFetchPhongChieuQuery } from '../../rtk/qlPhongChieu/qlPhongChieu';

const { Column } = Table;

export interface PhongChieu {
    id: string;
    name: string;
    total_seat: number;
}

const AdminQlPhongChieu: React.FC = () => {
    const { data } = useFetchPhongChieuQuery()
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
    const searchProject = (value: string) => {
        console.log(value);
        setSearchTerm(value);
    };
    const deleteOne = (key: string) => {
        deletePhongChieu(key).then(() => message.success("Xóa thành công"))
    }
    useEffect(() => {
        if (data) {
            const mapPhongChieu = data.map((item: any) => ({
                key: item.id,
                name: item.name,
                total_seat: item.total_seat
            }))
            setDataTable(mapPhongChieu)
        }
    }, [data])
    return (
        <div>
            <div className='mb-[25px] mt-[-30px] text-2xl' >Phòng chiếu</div>
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
            <Table dataSource={dataTable} rowSelection={rowSelection} pagination={{ pageSize: 6, }}>
                <Column title="Tên phòng" dataIndex="name" key="name" />
                <Column title="Tổng số ghế" dataIndex="total_seat" key="total_seat" />
                <Column
                    title="Action"
                    key="action"
                    render={(_: any, record: any) => (
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
        </div>
    );
}
export default AdminQlPhongChieu;