import React, { useEffect, useState } from 'react';
import { Space, Table, Input, Button, message, Popconfirm } from 'antd';
import CreateQlDiscount from './create';
import EditQlDiscount from './edit';
import { useDeleteDiscountMutation, useFetchDiscountsQuery } from '../../rtk/discount/discount';
const { Column } = Table;
export interface Discount {
    id: string;
    code: string;
    event: string;
    start: string;
    end: string;
    discount_percent: string;
}
const AdminQlDiscount: React.FC = () => {
    const { data } = useFetchDiscountsQuery()
    const [deleteDiscount] = useDeleteDiscountMutation()
    const [dataTable, setDataTable] = useState<Discount[]>([])
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
    const searchProject = (value: string) => {
        console.log(value);
        setSearchTerm(value);
    };
    const deleteOne = (key: string) => {
        deleteDiscount(key).then(() => message.success("Xóa thành công"))
    }
    useEffect(() => {
        if (data) {
            const mapMovies = data.map((item: Discount) => ({
                id: item.id,
                code: item.code,
                event: item.event,
                start: item.start,
                end: item.end,
                discount_percent: item.discount_percent,
            }))
            setDataTable(mapMovies)
        }
    }, [data])
    return (
        <div>
            <div className='mb-[25px] mt-[-30px] text-2xl' >Khuyến mãi</div>
            <div className='flex justify-between mb-[10px]'>
                <Input style={{ width: '20%' }} placeholder='Tìm kiếm dự án'
                    value={searchTerm}
                    onChange={(e) => searchProject(e.target.value)} />
                <CreateQlDiscount />
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
                <Column title="Mã khuyến mãi" dataIndex="code" key="code" />
                <Column title="Sự Kiện Áp Dụng" dataIndex="event" key="event" />
                <Column title="Ngày Áp Dụng" dataIndex="start" key="start" />
                <Column title="Ngày Kết Thúc" dataIndex="end" key="end" />
                <Column title="Mức Giảm (%)" dataIndex="discount_percent" key="discount_percent" />
                <Column
                    title="Action"
                    key="action"
                    render={(_: any, record: Discount) => (
                        <Space size="middle">
                            <a><EditQlDiscount key={record.id} projects={record.id} /> </a>
                            <a>
                                <Popconfirm
                                    title="Delete the task"
                                    description="Are you sure to delete this task?"
                                    onConfirm={() => {
                                        deleteOne(record.id);
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
export default AdminQlDiscount;