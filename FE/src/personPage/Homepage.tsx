import React, { useEffect } from 'react'
import { Movie, Genre } from "../types/movie";
import './personPage.css'
import { Link } from 'react-router-dom';
import { useFetchMoviesQuery } from '../rtk/movies/movies';


const HomePage = () => {
  const { data: movies } = [];
  // const {data: movies=[]} = useFetchMoviesQuery()
  return (
    <div>
      <div className='max-w-[1420px] mx-auto p-5 grid grid-cols-4 gap-10'>
        {(movies)?.map((item: any) => (

          <div key={item.id} className="movie-item hover:border  bg-[#0E0E0E]">
            <img src={item.image} alt="" className='h-[420px] w-full' />
            <div className="text my-2 px-3">
              <h1 className='text-xl font-semibold'>{item.movie_name}</h1>
              <div className="flex space-x-5 font-semibold text-[#B6B4B4] my-1">
              <p>{item.start_date}</p>
              <p>|</p>
              <p>{item.director}</p>
              </div>
              <span className='font-semibold text-[#B6B4B4] block my-2'>{item.genre}</span>
              <div className="button grid grid-cols-2 gap-2">
                 <Link to={'/'}><button className=' border-[1px] border-white rounded-md py-3 w-full hover:bg-gray-500'>Xem chi tiết phim</button></Link>
                   <Link to={'/movies/' + item?.id}><button className='border-[1px] border-[#1ACAAC] rounded-md bg-[#1ACAAC] py-3 w-full hover:bg-gray-500'>Đặt vé ngay</button></Link>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default HomePage