import { Menu } from 'antd'
import { Footer } from 'antd/es/layout/layout'
import React from 'react'

type Props = {}

const TicketStory = (props: Props) => {
    return (
        <div className='bg-black h-full'>
            <div className='h-[80px]'>
                <Menu />
            </div>
            <footer className='text-white'>
                <Footer />
            </footer>
        </div>
    )
}

export default TicketStory