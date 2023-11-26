
import './personPage.css'
import { Link, redirect, useNavigate } from 'react-router-dom';
import { useFetchMoviesPersonQuery } from '../rtk/moviesPerson/moviesPerson';
import Fuse from 'fuse.js';
import { useCallback, useState } from 'react';
import { message } from 'antd';


const HomePage = () => {
  const { data: movies } = useFetchMoviesPersonQuery()
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [inputSearchValue, setInputSearchValue] = useState('');

  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const Navigate = useNavigate()
  // console.log(user.role);
  // if (user.role === 'admin') {

  // }
  // const dataMap = movies?.data

  const handleLinkClick = (value:any,e:any) => {
    e.preventDefault();
    console.log(value);
    
    Navigate(`/${value}`)
  };

  const fuseOptions = {
    keys: [
      'movie_name'
    ],
  };

  const fuse = new Fuse(movies, fuseOptions);

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearchValue(e.target.value);
  };

  const handleSearch = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const results = fuse.search(inputSearchValue);
    const matchedProducts = results?.map((result) => result.item);
    if (matchedProducts.length === 0 && inputSearchValue !== '') {
      message.error('Không có sản phẩm phù hợp');
      Navigate('/');
    } else {
      setSearchResults(matchedProducts);
      setInputSearchValue('');
    }
    setSearchResults(matchedProducts);
    setInputSearchValue('');
  }, [fuse, inputSearchValue]);

  const allMovie = searchResults.length > 0 ? searchResults : movies;
  return (
    <div>
      <div className="max-w-[1420px] mx-auto p-5 mt-28">
        <div className="title flex justify-between border-b pb-4 mb-5">
          <h2 className='Movie text-4xl font-bold'>Movie</h2>
          <div className="SearchInput border rounded-md p-2 border-[#1ACAAC] w-[350px]">
            <form onSubmit={handleSearch} className='flex'>
              <input
                type="text"
                placeholder='Search your film'
                value={inputSearchValue}
                onChange={onHandleChange}
                className='bg-black px-2 outline-none w-full'
              />
            </form>
          </div>
        </div>
        <div className="btn-movie space-x-5 mb-16">
          <button className='active bg-[#1ACAAC] rounded-md w-[200px] py-2 text-lg'  onClick={(e) => { handleLinkClick("", e); window.location.reload(); }}>Đang chiếu</button>
          <button className='bg-[#282727] rounded-md w-[200px] py-2 text-lg' onClick={(e) => handleLinkClick("new", e)}>Sắp chiếu</button>
          <button className='bg-[#282727] rounded-md w-[200px] py-2 text-lg' onClick={(e) => handleLinkClick("dacbiet", e)}>Đặc biệt</button>
        </div>
      </div>
      {/*  */}
      <div className='max-w-[1420px] mx-auto p-5 grid grid-cols-4 gap-10'>
        {allMovie?.map((item: any) => (

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
                  <Link to={'/movie_show_time/' + item?.id}><button className='border-[1px] border-[#1ACAAC] rounded-md bg-[#1ACAAC] py-3 w-full hover:bg-gray-500'>Đặt vé ngay</button></Link>
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