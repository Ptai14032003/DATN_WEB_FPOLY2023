import React, { useEffect, useState } from 'react'
import Menu from '../components/layouts/layoutGuest/menu'
import Footer from '../components/layouts/layoutGuest/footer'
import { useFetchShowingMoviesQuery } from '../rtk/moviesPerson/moviesPerson';
import { Link } from 'react-router-dom';
import Loading from '../components/layouts/layoutGuest/loading';
import "./responsive.css"


const ShowingFilm = () => {
    const { data: showing } = useFetchShowingMoviesQuery();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!showing || showing.length === 0) {
          setLoading(true);
        } else {
          setLoading(false);
        }
      }, [showing]);
    
    return (
        <div>
            <header>
                <Menu />
            </header>
            {loading ? (
        <div className="loading-home h-screen bg-black w-full">
          <Loading/>
        </div>
      ) : (
            <section className='h-full bg-black py-[12rem] Showing-film-section'>
                <div className="w-[85%] mx-auto grid grid-cols-5 gap-10 pb-8 Showing-film-page">
                    {showing?.map((item: any) => (
                        <div key={item.id} className="Showing-film-page-item">
                            <Link to={'/movie_show_time/' + item?.id}>
                                <img src={item.image} alt="" className='h-[300px] w-full rounded-lg' />
                                <div className="text py-2 px-3 ml-0 Showing-film-page-text">
                                    <h1 className='text-lg font-semibold'>{item.movie_name}</h1>
                                    <div className="grid grid-cols-5 font-semibold text-[#B6B4B4] my-1 text-sm">
                                        <p className='col-span-2'>{item.movie_time} phút</p>
                                        <p className='text-center'>|</p>
                                        <p className='col-span-2 truncate'>{item.director}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
      )}
            <footer className='text-white'>
                <Footer />
            </footer>
        </div>
    )
}

export default ShowingFilm