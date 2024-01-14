import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import "./layout.css"
import { Carousel} from 'antd'
// import { BiSearch } from 'react-icons/bi'
import Menu from './menu';
import Footer from './footer';
import { useFetchMoviesPersonQuery } from '../../../rtk/moviesPerson/moviesPerson';
import "../../../personPage/responsive.css"



const LayoutPerson = () => {
  const { data: movies } = useFetchMoviesPersonQuery();
  const firstFiveMovies = movies?.slice(0, 5);
  return (
    <div className='bg-black h-full text-white'>
      <header className='h-creen'>
        <Menu/>
         {/* carousel */}
      <Carousel>
        {firstFiveMovies?.map((item:any)=>(
        <div key={item?.id}>
            <iframe width="100%" height="700" src={item?.trailer} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>  
        </div>
        ))}
      </Carousel>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer/>
      </footer>

    </div>
  )
}

export default LayoutPerson