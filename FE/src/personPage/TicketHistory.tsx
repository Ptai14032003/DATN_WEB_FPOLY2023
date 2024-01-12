import React, { useEffect } from 'react'
import Footer from '../components/layouts/layoutGuest/footer'
import Menu from '../components/layouts/layoutGuest/menu'
// import { useTicketHistoryMutation } from '../rtk/booking/booking'
import { message } from 'antd'

const TicketHistory = () => {
  const [ticketHistory] = useTicketHistoryMutation();
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  
  const userCode = user?.user_code;

  return (
        <div className='bg-black'>
            <div className='h-[80px]'>
                <Menu/>
            </div>
            <div className='h-[1000px] text-white'>
              <h1>TicketHistory</h1>
            </div> 
            <footer className='text-white'>
                <Footer/>
            </footer>
        </div>
  )
}

export default TicketHistory