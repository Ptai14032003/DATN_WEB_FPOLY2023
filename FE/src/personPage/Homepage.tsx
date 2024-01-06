
import './personPage.css'

import { Link, redirect, useNavigate } from 'react-router-dom';
import { useFetchMoviesPersonQuery } from '../rtk/moviesPerson/moviesPerson';
import Fuse from 'fuse.js';
import { useCallback, useState } from 'react';
import { message } from 'antd';
import { useEffect } from 'react';

import { useCheckBillMutation } from '../rtk/bill/bill';
import "./responsive.css"
import Loading from '../components/layouts/layoutGuest/loading';
import PayFail from './payFail';


const HomePage = () => {
  const { data: movies } = useFetchMoviesPersonQuery();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(1);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [inputSearchValue, setInputSearchValue] = useState('');
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const Navigate = useNavigate()
  // console.log(user.role);
  // if (user.role === 'admin') {

  // }

  // const dataMap = movies?.data

  useEffect(() => {
    if (!movies || movies.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [movies]);

  const handleClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
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
          <button className={activeTab === 1 ? ' bg-[#1ACAAC] rounded-md w-[200px] py-2 text-lg' : 'bg-[#282727] rounded-md w-[200px] py-2 text-lg'}  onClick={() => handleClick(1)}>All Movies</button>
          <button className={activeTab === 2 ? ' bg-[#1ACAAC] rounded-md w-[200px] py-2 text-lg' : 'bg-[#282727] rounded-md w-[200px] py-2 text-lg'}  onClick={() => handleClick(2)}>Showing</button>
          <button className={activeTab === 3 ? ' bg-[#1ACAAC] rounded-md w-[200px] py-2 text-lg' : 'bg-[#282727] rounded-md w-[200px] py-2 text-lg'}  onClick={() => handleClick(3)}>Coming soon</button>
        </div>
      </div>
      {/*  */}
      {loading ? (
        <div className="loading-home">
          <Loading />
        </div>
      ) : (
        <div className={`Showing-movies ${activeTab === 1 ? "max-w-[1420px] mx-auto p-5 grid grid-cols-5 gap-10 mb-8" : "hidden"}`}>

          {allMovie?.map((item: any) => (
            <div key={item.id} className="movie-item">
              <Link to={'/movie_show_time/' + item?.id}>
                <img src={item.image} alt="" className='h-[370px] w-full rounded-lg' />
                <div className="text my-2 px-3">
                  <h1 className='text-xl font-semibold'>{item.movie_name}</h1>
                  <div className="grid grid-cols-5 font-semibold text-[#B6B4B4] my-1 text-sm">
                    <p className='col-span-2'>{item.movie_time} phút</p>
                    <p className='text-center'>|</p>
                    <p className='col-span-2'>{item.director}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}


        </div>
      )}
      <div className={`Coming-soon-movies ${activeTab === 2 ? "max-w-[1420px] mx-auto p-5 grid grid-cols-5 gap-10 mb-8" : "hidden"}`}>
        <h1>Showing</h1>
      </div>
      <div className={`Special ${activeTab === 3 ? "max-w-[1420px] mx-auto p-5 grid grid-cols-5 gap-10 mb-8" : "hidden"}`}>
        <h1>Coming-soon-movies</h1>
      </div>
    </div>

  );

}
export default HomePage