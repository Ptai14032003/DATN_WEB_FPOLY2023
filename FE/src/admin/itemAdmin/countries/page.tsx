import React, { useEffect, useState } from 'react';
import { Space, Table, Input, Button, message, Popconfirm } from 'antd';
import CreateDienVien from './create';
import { useDeleteCountryMutation, useFetchCountryQuery } from '../../../rtk/countries/countries';
const { Column } = Table;
export interface DsCountry {
    key: string;
    country_name: string;
}
const DsCountry: React.FC = () => {
    const { data: dataCountry } = useFetchCountryQuery()
    const [dataTable, setDataTable] = useState<DsCountry[]>([])
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
    const [deleteCountry] = useDeleteCountryMutation()
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
        deleteCountry(key).then(() => { message.success("Xóa thành công") })
    }
    useEffect(() => {
        const dataMap = dataCountry?.data
        if (Array.isArray(dataMap)) {
            const mapCountry = dataMap.map((item: any) => ({
                key: item.id,
                country_name: item.country_name,
            }))
            setDataTable(mapCountry)
        }
    }, [dataCountry])
    return (
        <div>
            <div className='mb-[25px] mt-[-30px] text-2xl' >Danh sách nước sản xuất</div>
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
                <Column title="Nước sản xuất" dataIndex="country_name" key="country_name" />
                <Column
                    title="Action"
                    key="action"
                    render={(_: any, record: DsCountry) => (
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
        </div>
    );
}
export default DsCountry;