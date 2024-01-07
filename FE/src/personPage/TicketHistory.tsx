import React from 'react'
import Footer from '../components/layouts/layoutGuest/footer'
import Menu from '../components/layouts/layoutGuest/menu'

const TicketHistory = () => {
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