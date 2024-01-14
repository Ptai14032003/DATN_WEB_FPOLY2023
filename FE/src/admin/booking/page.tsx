import React, { useEffect, useState } from 'react'

import { Space, Table, message } from 'antd';
import { useFetchMoviesQuery } from '../../rtk/movies/movies';
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
    const { data: movies } = useFetchMoviesQuery();
    const [data, setData] = useState<DataType[]>([]);
    const {data: movie_type} = useFetchMovieTypeQuery();
    // const movieType = movie_type.find((item:any)=> item?.id === movies?.movie_type_id);
    // const movieTypeName = movieType ? movieType?.type_name : '';
    
    useEffect(() => {
       if(Array.isArray(movies)){
        const ArrayData = movies?.map((item: any) => ({
            key: item?.id,
            movie_name: item?.movie_name,
            img: item?.image,
            genres: item?.genre,
            movies_type: item?.movie_type_id,
        }))
        setData(ArrayData);
       }else{
        message.error('hihi')
       }
    },[])
    return (
        <div>
            {/* <Table dataSource={data} /> */}
        <Table dataSource={data} pagination={{ pageSize: 6, }}>
                    <Column title="Tên Phim " dataIndex="movie_name" key="movie_name" />
                    <Column title="Ảnh" dataIndex="country_name" key="country_name" />
                    <Column title="Dạng Phim" dataIndex="movies_type" key="movies_type" />
                    <Column title="Thể Loại" dataIndex="genres" key="genres" />
                    <Column
                        title="Action"
                        key="action"
                        render={(_: any, record: DataType) => (
                            <Space size="middle">
                                <Link to={'/admin/booking/movie_show_time/'+ record.key}>Đặt vé</Link>
                            </Space>
                        )}
                    />
                </Table>
                </div>
    )
}

export default BookingAdmin