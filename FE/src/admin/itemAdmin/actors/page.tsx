import React, { useEffect, useState } from 'react';
import { Space, Table, Input, Button, message, Popconfirm } from 'antd';
import EditDienVien from './edit';
import CreateDienVien from './create';
import { useDeleteActorMutation, useFetchActorsQuery } from '../../../rtk/actors/actors';
const { Column } = Table;
export interface DsDienVien {
    key: string;
    actor_name: string;
    movie_id: string;
    gender: string;
    role: string;
    movie_role: string;
}
const AdminQlActors: React.FC = () => {
    const { data: dataActors } = useFetchActorsQuery()
    const [dataTable, setDataTable] = useState<DsDienVien[]>([])
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
    const [deleteNhanSu] = useDeleteActorMutation()
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
        const dataMap = dataActors?.data
        if (Array.isArray(dataMap)) {
            const mapNhanSu = dataMap.map((item: any) => ({
                key: item.id,
                actor_name: item.actor_name,
                movie_id: item.movie_id.movie_name,
                gender: item.gender === 0 ? "Nam" : "Nữ",
                role: item.role === 0 ? "Diễn viên chính" : "Diễn viên phụ",
                movie_role: item.movie_role
            }))
            setDataTable(mapNhanSu)
        }
    }, [dataActors])
    return (
        <div>
            <div className='mb-[25px] mt-[-30px] text-2xl' >Danh sách diễn viên</div>
            <div className='flex justify-between mb-[10px]'>
                <Input style={{ width: '20%' }} placeholder='Tìm kiếm nhân sự'
                    value={searchTerm}
                    onChange={(e) => searchProject(e.target.value)} />
                <CreateDienVien />
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
                <Column title="Diễn viên" dataIndex="actor_name" key="actor_name" />
                <Column title="Phim" dataIndex="movie_id" key="movie_id" />
                <Column title="Giới tính" dataIndex="gender" key="gender" />
                <Column title="Chức vụ" dataIndex="role" key="role" />
                <Column title="Vai diễn" dataIndex="movie_role" key="movie_role" />
                <Column
                    title="Action"
                    key="action"
                    render={(_: any, record: DsDienVien) => (
                        <Space size="middle">
                            <a><EditDienVien key={record.key} projects={record.key} /> </a>
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
export default AdminQlActors;