import React, { useEffect, useState } from 'react';
import { Space, Table, Input, Button, message, Popconfirm } from 'antd';
import CreateQlDiscount from './create';
import EditQlDiscount from './edit';
import { useDeleteDiscountMutation, useFetchDiscountsQuery } from '../../rtk/discount/discount';

import { Waveform } from '@uiball/loaders';
import Fuse from 'fuse.js';
import { checkApiStatus } from "../checkApiStatus"; // Import hàm trợ giúp
import { useNavigate } from 'react-router-dom';
const { Column } = Table;
export interface Discount {
    id: string;
    discount_code: string;
    event: string;
    start: string;
    end: string;
    discount_percent: number;
}
const AdminQlDiscount: React.FC = () => {
    const { data: dataDiscounts, isLoading, error } = useFetchDiscountsQuery()

    const [deleteDiscount] = useDeleteDiscountMutation()
    const [dataTable, setDataTable] = useState<Discount[]>([])
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);

    const navigate = useNavigate();
    const status = error?.status;
>>>>>>> main
    const onSelectChange = (newSelectedRowKeys: any[]) => {
        console.log('', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const DeleteAll = () => {
        console.log(selectedRowKeys);

        message.success("Xóa thành công", 2);
>>>>>>> main
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
        keys: ["discount_code"]
    }
    const fuse = new Fuse(dataDiscounts, fuseOptions)

    const searchProject = (value: string) => {
        setSearchTerm(value);
    };
    const deleteOne = (key: string) => {
        deleteDiscount(key).then(() => message.success("Xóa thành công", 2))
    }
    useEffect(() => {
        if (dataDiscounts) {
            const mapMovies = dataDiscounts.map((item: Discount) => ({
                id: item.id,
                discount_code: item.discount_code,
>>>>>>> main
                event: item.event,
                start: item.start,
                end: item.end,
                discount_percent: item.discount_percent,
            }))
            setDataTable(mapMovies)
        }

        if (status) {
            checkApiStatus(status, navigate);
        }
    }, [dataDiscounts, status])
    useEffect(() => {
        if (searchTerm.length > 0) {
            const results = fuse?.search(searchTerm);
            const newData = results?.map((result) => result.item);
            if (Array.isArray(newData)) {
                const mapGuest = newData.map((item: any) => ({
                    id: item.id,
                    discount_code: item.discount_code,
                    event: item.event,
                    start: item.start,
                    end: item.end,
                    discount_percent: item.discount_percent,
                }))
                setDataTable(mapGuest)
            }
        }
        if (searchTerm.length === 0) {
            const dataMap = dataDiscounts
            if (Array.isArray(dataMap)) {
                const mapMovies = dataMap.map((item: any) => ({
                    id: item.id,
                    discount_code: item.discount_code,
                    event: item.event,
                    start: item.start,
                    end: item.end,
                    discount_percent: item.discount_percent,
                }))
                setDataTable(mapMovies)
            }
        }
    }, [searchTerm, dataDiscounts])
>>>>>>> main
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

            {isLoading ? (
                <Waveform
                    size={40}
                    lineWeight={3.5}
                    speed={1}
                    color="black"
                />
            ) : (
                <Table dataSource={dataTable} rowSelection={rowSelection} pagination={{ pageSize: 6, }}>
                    <Column title="Mã khuyến mãi" dataIndex="discount_code" key="discount_code" />
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
                                        title="Xoá khuyến mãi"
                                        description="Bạn có chắc muốn xoá không ?"
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
            )}
>>>>>>> main
        </div>
    );
}
export default AdminQlDiscount;