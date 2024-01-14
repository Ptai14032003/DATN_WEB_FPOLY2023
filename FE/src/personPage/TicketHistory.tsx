import React, { useEffect, useState } from 'react'
import Footer from '../components/layouts/layoutGuest/footer'
import Menu from '../components/layouts/layoutGuest/menu'
// import { useTicketHistoryMutation } from '../rtk/booking/booking'
import { message } from 'antd'

const TicketHistory = () => {
  const [ticketHistory] = useTicketHistoryMutation();
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  
  
  const userCode = user?.user_code;

  
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log('userCode:', userCode); 
      try {
        if (userCode) {
          await ticketHistory(userCode).unwrap()
          .then((data)=> console.log(data))
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
                <Menu/>
            </div>
            <div className='h-[1000px] text-white'>
              {/* {data?.map((item)=>())} */}
            </div> 
            <footer className='text-white'>
                <Footer/>
            </footer>
        </div>
  )
}

export default TicketHistory