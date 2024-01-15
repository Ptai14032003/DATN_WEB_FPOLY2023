import React, { useEffect, useState } from 'react'
import Footer from '../components/layouts/layoutGuest/footer'
import Menu from '../components/layouts/layoutGuest/menu'
import { useTicketHistoryMutation } from '../rtk/booking/booking'
import { message } from 'antd'
import "./personPage.css"

const TicketHistory = () => {
  const [ticketHistory] = useTicketHistoryMutation();
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;


  const userCode = user?.user_code;


  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const newData = {
        user_code: userCode
      }
      try {
        if (newData) {
          await ticketHistory(newData).unwrap()
            .then((data: any) =>
              setData(data)
              // console.log(data)
              
            )
        } else {
          message.error('Không tìm thấy mã người dùng');
        }
      } catch (error) {
        message.error('Chưa có lịch sử đặt vé nào');
      }
    };
    fetchData();
  }, [ticketHistory, userCode]);

  return (
    <div className='bg-black'>
      <div className='h-[80px]'>
        <Menu />
      </div>
      <div className='h-screen'>
      <div className='h-full text-black space-y-10 my-20'>
        {data?.map((item: any) => (
          <div key={item?.id} className='max-w-5xl mx-auto bg-white px-8 py-5 rounded-md Bills'>
            <div className='circle-1'>
              <div className='circle-2'>
                <div className='Rectangle-1'>
                    <div className='Ticket'>
                      <div className='billImage grid grid-cols-4'>
                        <div className='flex justify-center items-center'>
                          <img src={item?.image} alt="" className='w-[80px] h-[150px]' />
                        </div>
                        <div className='col-span-3'>
                          <h1 className='text-black text-[16px] font-semibold'>{item?.movie_name}</h1>
                          <p>{item?.show_date}</p>
                          <p>{item?.booking_date}</p>
                          <p>{item?.total_combo}</p>
                          <p>Bắp nước: {item?.food_name}</p>
                        </div>
                      </div>
                      <div className='billUser'>
                        <p>{item?.user_code}</p>
                        <p>{item?.user_name}</p>
                        <p>{item?.payment_status}</p>
                        <p>{item?.total_money}</p>
                        <p>{item?.total_ticket}</p>
                      </div>
                      <div className='rotate-90 absolute right-[-28px] top-[40%]'>
                        <p className=' text-[#1ACAAC] font-semibold text-md w-[140px]'>Wonder Cinema</p>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
      <footer className='text-white'>
        <Footer />
      </footer>
    </div>
  )
}

export default TicketHistory