import React from 'react'
import logoweb from "/Wonder-logo-1.png"
import fb from "/facebook-icon.png"
import yt from "/youtube-icon.png"
import zl from "/zalo-icon.png"
import "../../../personPage/responsive.css"

const Footer = () => {
  return (
    <div className='bg-[#0B0D13] py-8'>
      <nav>
        <ul className='flex justify-center space-x-10 text-lg'>
          <li><a href="">Chính sách</a></li>
          <li><a href="">Lịch chiếu</a></li>
          <li><a href="">Tin tức</a></li>
          <li><a href="">Giá vé</a></li>
          <li><a href="">Hỏi đáp</a></li>
          <li><a href="">Liên hệ</a></li>
        </ul>
      </nav>
      <div className='logo flex justify-center space-x-5 items-center my-1'>
        <img src={logoweb} alt="" className='w-[10%]' />
        <h2 className=' text-2xl'>Wonder Cinema Việt Nam</h2>
      </div>
      <div className='max-w-4xl mx-auto'>
        <div className='flex justify-center space-x-8 items-center'>
          <img src={fb} alt="" className='w-[60px] icon-fb'/>
          <img src={zl} alt=""  className='w-[40px] h-[40px] icon-zl'/>
          <img src={yt} alt=""  className='w-[50px] icon-yt'/>
        </div>
        <div className="address-footer text-center mt-3">
          <p className='mb-2'>Địa chỉ: Phố Trịnh Văn Bô, Phường Phương Canh, Quận Nam Từ Liêm, Tp. Hà Nội - Điện thoại: 0398658438</p>
          <p className='uppercase'>Copyright 2023. Wonder Cinema. All Rights Reservered</p>
        </div>
      </div>
    </div>
  )
}

export default Footer