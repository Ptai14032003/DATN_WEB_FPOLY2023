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
  const handleLinkClick = (value:any,e:any) => {
    e.preventDefault();
    console.log(value);
    
    Navigate(`/${value}`)
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
      <div className="max-w-[1420px] mx-auto p-5 mt-28">
      <div className="title flex justify-between border-b pb-4 mb-5">
          <h2 className='Movie text-4xl font-bold'>Movie</h2>
          <div className="input flex items-center border rounded-md p-2 border-[#1ACAAC] w-[350px]">
            {/* <BiSearch size={25} /> */}
            <input type="text" placeholder='Search your film' className='bg-black px-2 outline-none w-full' />
          </div>
        </div>
        <div className="btn-movie space-x-5 mb-16">
          <button className='active bg-[#1ACAAC] rounded-md w-[200px] py-2 text-lg' onClick={(e)=>handleLinkClick("",e)}>Đang chiếu</button>
         <button className='bg-[#282727] rounded-md w-[200px] py-2 text-lg' onClick={(e)=>handleLinkClick("new",e)}>Sắp chiếu</button>
          <button className='bg-[#282727] rounded-md w-[200px] py-2 text-lg'onClick={(e)=>handleLinkClick("dacbiet",e)}>Đặc biệt</button>
        </div>
        </div>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  )
}

export default LayoutPerson