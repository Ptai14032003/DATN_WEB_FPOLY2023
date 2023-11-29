import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import "./layout.css"
import { Carousel} from 'antd'
// import { BiSearch } from 'react-icons/bi'
import Menu from './menu'; 


const LayoutPerson = () => {
const Navigate = useNavigate()
  
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '750px',
  };
  

  return (
    <div className='bg-black h-full text-white'>
      <header>
        <Menu/>
         {/* carousel */}
      <Carousel afterChange={onChange} >
        <div>
          <img src="https://i.ytimg.com/vi/fw-wLR6xxwE/maxresdefault.jpg" alt="" style={contentStyle} className='w-full' />
        </div>
        <div>
          <img src="https://i.ytimg.com/vi/37dy0pIhQkI/maxresdefault.jpg" alt="" style={contentStyle} className='w-full' />
        </div>
        <div>
          <img src="https://i.ytimg.com/vi/maq_YK88Xnw/maxresdefault.jpg" alt="" style={contentStyle} className='w-full' />
        </div>
        <div>
          <img src="https://pic-bstarstatic.akamaized.net/ugc/507eb0ab45de539003c20b4c6c00f0f5.jpg" alt="" style={contentStyle} className='w-full' />
        </div>
      </Carousel>
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  )
}

export default LayoutPerson