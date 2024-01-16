import React, { useEffect, useState } from 'react'
import Footer from '../components/layouts/layoutGuest/footer'
import Menu from '../components/layouts/layoutGuest/menu'
import { useTicketHistoryMutation } from '../rtk/booking/booking'
import { message } from 'antd'
import "./personPage.css"
import background from "/noneTicketHistory.png"

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
        
          {data.length === 0 ? (
               <div className='h-[100%]'>
                <h1 className='text-3xl absolute text-white font-semibold uppercase left-[32%] top-[52%]' style={{textShadow: "rgb(255, 255, 255) -1px -2px 0.7em"}}>Chưa có lịch sử đặt vé nào</h1>
                <img src={background} alt="" className='h-[100%] w-full'/>
               </div>
          ) : (
            <div className='h-full text-black space-y-10 my-20'>
            {data?.map((item: any) => (
            
              item?.payment_status === "Đã thanh toán" ?  
                <div key={item?.id} className='max-w-5xl mx-auto bg-white px-8 py-5 rounded-md Bills'>
              <div className='circle-1'>
                <div className='circle-2'>
                  <div className='Rectangle-1'>
                    <div className='Ticket'>
                      <div className='billImage grid grid-cols-4'>
                        <div className='flex justify-center items-center'>
                          <img src={item?.image} alt="" className='w-[80px] h-[150px]' />
                        </div>
                        <div className='col-span-3 my-auto'>
                          <h1 className='text-black text-[16px] font-semibold overflow-wrap break-all'>{item?.movie_name}</h1>
                          <div className='mt-5'>
                            <div className='flex items-center gap-2'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-event-fill" viewBox="0 0 16 16">
                                <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2m-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5" />
                              </svg>
                              <p>{item?.show_date}</p>
                            </div>
                            <div className='flex items-center gap-2'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                              </svg>
                              <p>{item?.show_time}</p>
                            </div>
                            <div className='flex items-center gap-2'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                              </svg>
                              <p>Wonder Cinema</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='billUser space-y-1'>
                        <div className='flex justify-between border-b '>
                          <p>{item?.user_code}</p>
                          <p>{item?.user_name}</p>
                        </div>
                        <div className='flex justify-between'>
                          <div>
                            <p className='text-sm'>Ghế</p>
                            <p className='font-semibold'>{item?.seat_code}</p>
                          </div>
                          <div className='text-right'>
                            <p className='text-sm'>Phòng</p>
                            <p className='font-semibold'>{item?.room_name}</p>
                          </div>
                        </div>
                        <div className='flex justify-between  border-b '>
                          <div className='flex gap-2 items-center'>
                            <p className='text-sm'>Bắp nước:</p>
                            <p className='font-semibold'>{item?.food_name || "Không có"}</p>
                          </div>
                        </div>
                        <div className='flex justify-between'>
                          <p className='text-sm'>Phí phụ thu</p>
                          <p className='font-semibold'>{item?.additional_fee || "0đ"}</p>
                        </div>
                        <div className='flex justify-between'>
                          <p className='text-lg'>Tổng tiền</p>
                          <p className='font-semibold text-lg'>{item?.total_money} đ</p>
                        </div>
                      </div>
                      <div className='rotate-90 absolute right-[-28px] top-[43%]'>
                        <p className=' text-[#1ACAAC] font-semibold text-md w-[140px]'>Wonder Cinema</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            : ""
          ))}
          </div>
          )}
      
      </div>
      <footer className='text-white'>
        <Footer />
      </footer>
    </div>
  )
}

export default TicketHistory