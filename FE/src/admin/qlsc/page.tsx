import React, { useEffect, useState } from 'react';
import { Space, Table, Input, Button, message, Popconfirm } from 'antd';
import EditQlPhim from './edit';
import CreateQlSc from './create';
import { useDeleteSuatChieuMutation, useFetchSuatChieuQuery } from '../../rtk/qlSc/qlSc';
const { Column } = Table;

export type SuatChieu = {
    id: string;
    movie_id: MovieId;
    room_id: RoomId;
    show_date: string;
    show_time: string;
    total_ticket_sold: number;
    total_money: number
}
type MovieId = {
    movie_id: string,
    movie_name: string
}
type RoomId = {
    room_id: string,
    room_name: string
}

const AdminQlSc: React.FC = () => {
    const { data } = useFetchSuatChieuQuery()
    const [deleteSuatChieu] = useDeleteSuatChieuMutation()
    const [dataTable, setDataTable] = useState<SuatChieu[]>([])
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
        if (data) {
            const mapSuatChieu = data.map((item: SuatChieu) => ({
                id: item.id,
                movie_id: { movie_id: item.movie_id.movie_id, movie_name: item.movie_id.movie_name },
                room_id: { room_id: item.room_id.room_id, room_name: item.room_id.room_name },
                show_date: item.show_date,
                show_time: item.show_time,
                total_ticket_sold: item.total_ticket_sold,
                total_money: item.total_money,
            }));
            setDataTable(mapSuatChieu);
        }
    }, [data]);
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
            <Table dataSource={dataTable} rowSelection={rowSelection} pagination={{ pageSize: 6, }}>
                <Column title="Tên phim" dataIndex="movie_id" key="movie_name" />
                <Column title="Tên phòng" dataIndex="room_id" key="room_id" />
                <Column title="Ngày chiếu" dataIndex="show_date" key="show_date" />
                <Column title="Thời gian chiếu" dataIndex="show_time" key="show_time" />
                <Column title="Tổng số vé bán" dataIndex="total_ticket_sold" key="total_ticket_sold" />
                <Column title="Tổng doanh thu" dataIndex="total_money" key="total_money" />
                <Column
                    title="Action"
                    key="action"
                    render={(_: any, record: any) => (
                        <Space size="middle">
                            <a><EditQlPhim key={record.key} projects={record.key} /> </a>
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
export default AdminQlSc;