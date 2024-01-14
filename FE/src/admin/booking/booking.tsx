import React, { useEffect, useState } from 'react'
import { Button, Modal, message } from 'antd';
import { useFetchMovieIdPersonQuery } from '../../rtk/moviesPerson/moviesPerson';
import { useNavigate, useParams } from 'react-router-dom';

const BookingAdminMovies = () => {
    const { id } = useParams();
    const { data: moviesTime, error } = useFetchMovieIdPersonQuery(id);
    const [checkError, setCheckError] = useState(true);
    const movie = moviesTime?.movie
    const st_movie = moviesTime?.st_movie;
    const [dataTime, setDataTime] = useState<any>();
    const [dataDate, setDataDate] = useState<any>("");
    const navigate = useNavigate();
    console.log(st_movie);
    const redirectToLink = (link: any) => {
        navigate(link);
    };
    useEffect(() => {
        if (error && checkError) {
            message.success("Phim chưa được cập nhật các suất chiếu !", 1).then(() => {
                navigate("/")
            })
            setCheckError(false)
            return;
        }
    }, [error, checkError])
    const onClick = (date: any) => {
        st_movie.map((item: any) => {
            if (date === item.date) {
                setDataTime(item.showtimes);
                setDataDate(item.date)
            }
        })
    }

    return (
        <div className='h-screen'>
            <div className='bg-black text-white py-5'>
            <div className='w-[60%] mx-auto'>
                <div className='flex gap-20'>
                    {st_movie?.map((item: any) => (
                        <button key={item.date} className={`btn-date ${dataDate === item?.date ? "btn-date-action text-red-400" : ""}`} onClick={() => onClick(item?.date)}>
                            <div className="w-[90px] h-full flex flex-col items-center justify-center text-xs transition-colors">
                                <span>{item.weekday}</span>
                                <span className="text-xl font-bold">{item?.show_date}</span>
                                <span className="text-xl font-bold">{item?.date}</span>
                            </div>
                        </button>
                    ))}
                </div>
                <div className='flex'>
                    {dataTime?.map((data: any) => (
                        <div key={data?.show_time} className="w-[23%] mt-[20px] text-black">
                            <button className="detail-time w-[90px] h-[40px] bg-white rounded-sm" onClick={() => redirectToLink('/admin/booking/movie_show_time/' + movie?.id +'/seat/' + movie?.id + `?show_seat=${data?.showtime_id}`)}>
                                <p className="font-bold text-sm">{data?.show_time}</p>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            </div>
        </div>
    )
}

export default BookingAdminMovies