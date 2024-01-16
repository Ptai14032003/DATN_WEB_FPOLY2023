import React, { useEffect, useState } from 'react'

import { Image, Space, Table, message } from 'antd';
import { useFetchMoviesQuery, useFetchShowingAdminQuery } from '../../rtk/movies/movies';
import { useFetchMovieTypeQuery } from '../../rtk/movie_type/page';
import Column from 'antd/es/table/Column';
import BookingAdminMovies from './booking';
import { Link } from 'react-router-dom';

interface DataType {
    key: string,
    movie_name: string;
    img: string;
    genres: string;
    movies_type: string;
}

const BookingAdmin = () => {
    const { data: movies } = useFetchShowingAdminQuery();
    const [data, setData] = useState<DataType[]>([]);
    useEffect(() => {
        if (Array.isArray(movies)) {
            const ArrayData = movies?.map((item: any) => ({
                key: item?.id,
                movie_name: item?.movie_name,
                img: item?.image,
                genres: item?.genre,
                movies_type: item?.type_name,
            }))
            setData(ArrayData);
        }
    }, [movies])
    return (
        <div>
            {/* <Table dataSource={data} /> */}
            <Table dataSource={data} pagination={{ pageSize: 6, }}>
                <Column title="Tên Phim " dataIndex="movie_name" key="movie_name" />
                <Column title="Ảnh" dataIndex="img" key="img" render={(_: any, record: any) => (
                    <Image
                        width={100}
                        src={record?.img}
                    />
                )} />
                <Column title="Dạng Phim" dataIndex="movies_type" key="movies_type" />
                <Column title="Thể Loại" dataIndex="genres" key="genres" />
                <Column
                    title="Action"
                    key="action"
                    render={(_: any, record: DataType) => (
                        <Space size="middle">
                            <Link to={'/admin/booking/movie_show_time/' + record.key}>Đặt vé</Link>
                        </Space>
                    )}
                />
            </Table>
        </div>
    )
}

export default BookingAdmin