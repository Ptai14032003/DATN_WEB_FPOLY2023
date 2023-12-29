import React, { useEffect, useState } from 'react';
import { Space, Table, Input, Button, message, Popconfirm } from 'antd';
import CreateQlSc from './create';
import { useDeleteSuatChieuMutation, useFetchSuatChieuQuery } from '../../rtk/qlSc/qlSc';
import { Waveform } from '@uiball/loaders';
const { Column } = Table;

export type QlSuatChieu = {
    key: string;
    movie_id: string;
    room_id: string;
    show_date: string;
    show_time: string;
    total_ticket_sold?: number;
    total_money?: string
}
const AdminQlSc: React.FC = () => {
    const { data: dataSuatChieu, isLoading } = useFetchSuatChieuQuery()
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
                movie_id: item.movie_id?.movie_name,
                room_id: item.room_id?.name,
                show_date: item.show_date,
                show_time: item.show_time,
                total_ticket_sold: item.total_ticket_sold,
                total_money: (Number(item.total_money))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            }));
            setDataTable(mapSuatChieu);
        }
    }, [dataSuatChieu]);
    console.log(dataSuatChieu);
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
                    <Column title="Tên phim" dataIndex="movie_id" key="movie_name" />
                    <Column title="Tên phòng" dataIndex="room_id" key="room_id" />
                    <Column title="Ngày chiếu" dataIndex="show_date" key="show_date" />
                    <Column title="Thời gian chiếu" dataIndex="show_time" key="show_time" />
                    <Column title="Tổng doanh thu" dataIndex="total_money" key="total_money" />
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