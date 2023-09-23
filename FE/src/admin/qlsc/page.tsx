import React, { useState } from 'react';
import { Space, Table, Tag, Input, Button } from 'antd';
import CreateQlPhim from './create';
import EditQlPhim from './edit';

const { Column, ColumnGroup } = Table;

interface DataType {
    key: React.Key;
    firstName: string;
    lastName: string;
    age: number;
    address: string;
    tags: string[];
}

const data: DataType[] = [
    {
        key: '1',
        firstName: 'John',
        lastName: 'Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        firstName: 'Jim',
        lastName: 'Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        firstName: 'Joe',
        lastName: 'Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

const AdminQlSc: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const searchProject = (value: string) => {
        console.log(value);
        setSearchTerm(value);
    };
    return (
        <div>
            <div className='mb-[25px] mt-[-30px] text-2xl' >Quản lý Suất chiếu</div>
            <div className='flex justify-between mb-[10px]'>
                <Input style={{ width: '20%' }} placeholder='Tìm kiếm dự án'
                    value={searchTerm}
                    onChange={(e) => searchProject(e.target.value)} />
                <CreateQlPhim />
            </div>
            <Table dataSource={data}>
                <Column title="First Name" dataIndex="firstName" key="firstName" />
                <Column title="Last Name" dataIndex="lastName" key="lastName" />
                <Column title="Age" dataIndex="age" key="age" />
                <Column title="Address" dataIndex="address" key="address" />
                <Column
                    title="Tags"
                    dataIndex="tags"
                    key="tags"
                    render={(tags: string[]) => (
                        <>
                            {tags.map((tag) => (
                                <Tag color="blue" key={tag}>
                                    {tag}
                                </Tag>
                            ))}
                        </>
                    )}
                />
                <Column
                    title="Action"
                    key="action"
                    render={(_: any, record: DataType) => (
                        <Space size="middle">
                            <a><EditQlPhim /> </a>
                            <a><Button>Delete</Button></a>
                        </Space>
                    )}
                />
            </Table>
        </div>
    );
}
export default AdminQlSc;