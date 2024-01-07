import React, { useEffect, useState } from 'react';
import { Space, Table, Input, Button, message, Popconfirm } from 'antd';
import CreateQlPhim from './create';
import EditQlPhim from './edit';
import { useDeleteMoviesMutation, useFetchMoviesQuery } from '../../rtk/movies/movies';
import { Waveform } from '@uiball/loaders';
import { checkApiStatus } from "../checkApiStatus"; // Import hàm trợ giúp
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import PosterPhim from '../../components/itemAdmin/qlPhim/Poster/page';
import TrailerPhim from '../../components/itemAdmin/qlPhim/Trailer/page';
import DescriptionPhim from '../../components/itemAdmin/qlPhim/Description/page';
import ActorPhim from '../../components/itemAdmin/qlPhim/Actor/page';

const { Column } = Table;

export type QlPhim = {
    key: string;
    movie_name: string;
    country_name: string;
    actor_name: string;
    type_name: string;
    genre: string;
    director: string;
    image: string;
    trailer: string;
    describe: string
}
const AdminQlPhim: React.FC = () => {
    const { data: dataMovies, isLoading, error } = useFetchMoviesQuery()
    const navigate = useNavigate();
    const status = error?.status;
    //checkApiStatus(status);
    const [deleteMovie] = useDeleteMoviesMutation()
    const [dataTable, setDataTable] = useState<QlPhim[]>([])
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
    const onSelectChange = (newSelectedRowKeys: any[]) => {
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

    const fuseOptions = {
        includeScore: true,
        includeMatches: true,
        isCaseSensitive: true,
        findAllMatches: true,
        useExtendedSearch: true,
        keys: ["movie_name"]
    }

    const fuse = new Fuse(dataMovies, fuseOptions)

    const searchProject = (value: string) => {

        setSearchTerm(value);
    };
    const deleteOne = (key: string) => {
        deleteMovie(key).then(() => message.success("Xóa thành công"))
    }
    useEffect(() => {
        const dataMap = dataMovies


        // chưa có kiểu dữ liệu cho data
        if (Array.isArray(dataMap)) {
            const mapMovies = dataMap.map((item: any) => ({
                key: item.id,
                movie_name: item.movie_name,
                country_name: item?.country_name,
                actor_name: item?.actor_name,
                type_name: item?.type_name,
                genre: item?.genre,
                director: item?.director,
                image: item?.image,
                trailer: item?.trailer,
                describe: item?.describe
            }))
            setDataTable(mapMovies)
        }
        if (status) {
            checkApiStatus(status, navigate);
        }
    }, [dataMovies, status])
    useEffect(() => {
        if (searchTerm.length > 0) {
            const results = fuse?.search(searchTerm);
            const newData = results?.map((result) => result.item);
            if (Array.isArray(newData)) {
                const mapMovies = newData.map((item: any) => ({
                    key: item.id,
                    movie_name: item.movie_name,
                    country_name: item?.country_name,
                    actor_name: item?.actor_name,
                    type_name: item?.type_name,
                    genre: item?.genre,
                    director: item?.director,
                    image: item?.image,
                    trailer: item?.trailer,
                    describe: item?.describe
                }))
                setDataTable(mapMovies)
            }
        }
        if (searchTerm.length === 0) {
            const dataMap = dataMovies
            if (Array.isArray(dataMap)) {
                const mapMovies = dataMap.map((item: any) => ({
                    key: item.id,
                    movie_name: item.movie_name,
                    country_name: item?.country_name,
                    actor_name: item?.actor_name,
                    type_name: item?.type_name,
                    genre: item?.genre,
                    director: item?.director,
                    image: item?.image,
                    trailer: item?.trailer,
                    describe: item?.describe
                }))
                setDataTable(mapMovies)
            }
        }
    }, [searchTerm, dataMovies])

    return (
        <div>
            <div className='mb-[25px] mt-[-30px] text-2xl' >Danh sách phim</div>
            <div className='flex justify-between mb-[10px]'>
                <Input style={{ width: '20%' }} placeholder='Tìm kiếm phim'
                    value={searchTerm}
                    onChange={(e) => searchProject(e.target.value)} />
                <CreateQlPhim />
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
                    <Column title="Phim " dataIndex="movie_name" key="movie_name" />
                    <Column title="Nước Sản Xuất " dataIndex="country_name" key="country_name" />
                    <Column title="Dạng Phim" dataIndex="type_name" key="type_name" />
                    <Column title="Thể Loại" dataIndex="genre" key="genre" />
                    <Column title="Đạo Diễn" dataIndex="director" key="director" />
                    <Column title="Diễn Viên" dataIndex="actor_name" key="actor_name" render={(_: any, record: QlPhim) => (
                        <ActorPhim data={record.actor_name} key={record.actor_name} />

                    )} />
                    <Column title="Mô tả" dataIndex="describe" key="describe" render={(_: any, record: QlPhim) => (
                        <DescriptionPhim data={record.describe} key={record.describe} />

                    )} />
                    <Column title="Poster" dataIndex="image" key="image"
                        render={(_: any, record: QlPhim) => (
                            <PosterPhim data={record?.image} key={record.image} />
                        )} />
                    <Column title="Trailer" dataIndex="trailer" key="trailer" render={(_: any, record: QlPhim) => (
                        <TrailerPhim data={record.trailer} key={record.trailer} />

                    )} />
                    <Column
                        title="Action"
                        key="action"
                        render={(_: any, record: QlPhim) => (
                            <Space size="middle">
                                <a><EditQlPhim key={record.key} projects={record.key} /></a>
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
export default AdminQlPhim;