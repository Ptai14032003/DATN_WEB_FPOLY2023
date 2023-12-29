import React, { useState } from 'react';
import { Space, Table, Input, Button, message, Popconfirm } from 'antd';
import CreateQlPhim from './create';
import EditQlPhim from './edit';

const { Column } = Table;

interface DataType {
    key: string;
    food_name: string,
    food_type: string
    price: number,
    image: string,
    created_at: string,
    updated_at: string,
    deleted_at: string,
}
const AdminQlSp: React.FC = () => {

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
        console.log(key);
        message.success("Xóa thành công");
    }
    return (
        <div>
            <div className='mb-[25px] mt-[-30px] text-2xl' >Quản lý Sản Phẩm</div>
            <div className='flex justify-between mb-[10px]'>
                <Input style={{ width: '20%' }} placeholder='Tìm kiếm dự án'
                    value={searchTerm}
                    onChange={(e) => searchProject(e.target.value)} />
                <CreateQlPhim />
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
            <Table dataSource={data} rowSelection={rowSelection} >
                <Column title="First Name" dataIndex="firstName" key="firstName" />
                <Column title="Last Name" dataIndex="lastName" key="lastName" />
                <Column title="Age" dataIndex="age" key="age" />
                <Column title="Address" dataIndex="address" key="address" />
                <Column
                    title="Action"
                    key="action"
                    render={(_: any, record: DataType) => (
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
export default AdminQlSp;