
import React, { useEffect, useState } from 'react';
import { Space, Table, Input, Button, message, Popconfirm, Image } from 'antd';
import CreateQlPhim from './create';
import EditQlPhim from './edit';
import { useDeleteFoodIDMutation, useDeleteMultipleFoodMutation, useFetchFoodsQuery } from '../../rtk/qlSp/qlSp';
import { checkApiStatus } from "../checkApiStatus"; // Import hàm trợ giúp
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { Waveform } from '@uiball/loaders';
const { Column } = Table;

export interface QlFood {
    key: string;
    food_name: string,
    name: string,
    price: number,
    image: string,
}

interface FetchFoods {
    id: string;
    food_name: string,
    name: string,
    price: number,
    image: string,
}
const AdminQlSp: React.FC = () => {
    const { data: dataFood, isLoading, error } = useFetchFoodsQuery()
    const [deleteMultiple] = useDeleteMultipleFoodMutation()
    const [deleteId] = useDeleteFoodIDMutation()
    const navigate = useNavigate();
    const status = error?.status;
    const [dataTable, setDataTable] = useState<QlFood[]>([])
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const DeleteAll = () => {
        console.log(selectedRowKeys);
        const data = {
            ids: selectedRowKeys
        }
        // deleteMultiple(data).then(() => {
        //     message.success("Xóa thành công");
        // })
    }
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const fuseOptions = {
        includeScore: true,
        includeMatches: true,
        isCaseSensitive: true,
        findAllMatches: true,
        useExtendedSearch: true,
        keys: ["food_name"]
    }

    const fuse = new Fuse(dataFood, fuseOptions)


    const searchProject = (value: string) => {
        console.log(value);
        setSearchTerm(value);
    };
    const deleteOne = (key: string) => {
        deleteId(key).then(() => {
            message.success("Xóa thành công");
        })
    }

    useEffect(() => {
        const dataMap = dataFood
        // chưa có kiểu dữ liệu cho data
        if (Array.isArray(dataMap)) {
            const mapFood = dataMap.map((item: FetchFoods) => ({
                key: item.id,
                food_name: item.food_name,
                price: item.price,
                image: item.image,
                name: item.name,
            }))
            setDataTable(mapFood)
        }
        if (status) {
            checkApiStatus(status, navigate);
        }
    }, [dataFood, status])
    useEffect(() => {
        if (searchTerm.length > 0) {
            const results = fuse?.search(searchTerm);
            const newData = results?.map((result) => result.item);
            if (Array.isArray(newData)) {
                const mapFoods = newData.map((item: any) => ({
                    key: item.id,
                    food_name: item.food_name,
                    price: item.price,
                    image: item.image,
                    name: item.name,
                }))
                setDataTable(mapFoods)
            }
        }
        if (searchTerm.length === 0) {
            const dataMap = dataFood
            if (Array.isArray(dataMap)) {
                const mapFoods = dataMap.map((item: FetchFoods) => ({
                    key: item.id,
                    food_name: item.food_name,
                    price: item.price,
                    image: item.image,
                    name: item.name,
                }))
                setDataTable(mapFoods)
            }
        }
    }, [searchTerm, dataFood])

    return (
        <div>
            <div className='mb-[25px] mt-[-30px] text-2xl' >Quản lý Sản Phẩm</div>
            <div className='flex justify-between mb-[10px]'>

                <Input style={{ width: '20%' }} placeholder='Tìm kiếm sản phẩm'

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

            {isLoading ? (
                <Waveform
                    size={40}
                    lineWeight={3.5}
                    speed={1}
                    color="black"
                />
            ) : (
                <Table dataSource={dataTable} rowSelection={rowSelection} >
                    <Column title="Sản phẩm" dataIndex="food_name" key="food_name" />
                    <Column title="Giá (VNĐ)" dataIndex="price" key="price" render={(price: any) => (Number(price))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} />
                    <Column title="Ảnh" dataIndex="image" key="image" render={(_: any, record: QlFood) => (
                        <Image
                            width={100}
                            src={record?.image}
                        />
                    )} />
                    <Column title="Loại sản phẩm" dataIndex="name" key="name" />
                    <Column
                        title="Action"
                        key="action"
                        render={(_: any, record: QlFood) => (
                            <Space size="middle">
                                <a><EditQlPhim key={record.key} projects={record.key} /> </a>
                                <a>
                                    <Popconfirm
                                        title="Xoá"
                                        description="Bạn có muốn xoá sản phẩm này không?"
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
export default AdminQlSp;