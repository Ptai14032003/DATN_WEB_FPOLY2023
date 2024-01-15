import React, { useEffect, useState } from 'react'
import Menu from '../components/layouts/layoutGuest/menu'
import Footer from '../components/layouts/layoutGuest/footer'
import { useFetchComingSoonMoviesQuery } from '../rtk/moviesPerson/moviesPerson';
import { Link } from 'react-router-dom';
import Loading from '../components/layouts/layoutGuest/loading';
import "./responsive.css"

type Props = {}

const ComingSoonFilm = (props: Props) => {
    const { data: comingSoon } = useFetchComingSoonMoviesQuery();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!comingSoon || comingSoon.length === 0) {
          setLoading(true);
        } else {
          setLoading(false);
        }
      }, [comingSoon]);
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
    <section className='h-full bg-black py-[12rem] comingSoon-film-section'>
        <div className="w-[85%] mx-auto grid grid-cols-5 gap-10 pb-8 comingSoon-film-page">
            {comingSoon?.map((item: any) => (
                <div key={item.id} className="comingSoon-film-page-item">
                    <Link to={'/movie_show_time/' + item?.id}>
                        <img src={item.image} alt="" className='h-[300px] w-full rounded-lg' />
                        <div className="text py-2 px-3 ml-0 comingSoon-film-page-text">
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

export default ComingSoonFilm