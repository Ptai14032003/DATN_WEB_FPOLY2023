
import './personPage.css'
import { Link } from 'react-router-dom';
import { useFetchMoviesPersonQuery } from '../rtk/moviesPerson/moviesPerson';


const HomePage = () => {
  const {data: movies} = useFetchMoviesPersonQuery()

  
  // const dataMap = movies?.data
  return (
    <div>
      <div className='max-w-[1420px] mx-auto p-5 grid grid-cols-4 gap-10'>
        {movies?.map((item: any) => (
          
          <div key={item.id} className="movie-item hover:border  bg-[#0E0E0E]">
            <Link to={'/movie_show_time/' + item?.id}>
            <img src={item.image} alt="" className='h-[420px] w-full' />
            <div className="text my-2 px-3">
              <h1 className='text-xl font-semibold'>{item.movie_name}</h1>
              <div className="flex space-x-5 font-semibold text-[#B6B4B4] my-1">
              <p>{item.start_date}</p>
              <p>|</p>
              <p>{item.director}</p>
              </div>
              <span className='font-semibold text-[#B6B4B4] block my-2'>{item.genre}</span>
              <div className="button">
                   <Link to={'/movies/' + item?.id}><button className='border-[1px] border-[#1ACAAC] rounded-md bg-[#1ACAAC] py-3 w-full hover:bg-gray-500'>Đặt vé ngay</button></Link>
               </div>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
export default HomePage