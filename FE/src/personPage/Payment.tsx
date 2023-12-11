import React from 'react'
import"./personPage.css"
import { Link } from 'react-router-dom'

const Payment = () => {
    return (
        <div className='pay-success-screen h-screen grid place-content-center'>
            <div className='pay-success-box bg-white h-[500px] w-[600px] rounded-xl'>
                <div className='check-icon text-center mt-10 space-y-3'>
                <svg xmlns="http://www.w3.org/2000/svg" className="svg-success" viewBox="0 0 24 24">
                    <g strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10">
                        <circle className="success-circle-outline" cx="12" cy="12" r="11.5" />
                        <circle className="success-circle-fill" cx="12" cy="12" r="11.5" />
                        <polyline className="success-tick" points="17,8.5 9.5,15.5 7,13" />
                    </g>
                </svg>
                <p className='font-medium text-lg'>Thanh toán thành công</p>
                <span className='block text-4xl text-[#81c038] font-medium'>362.000đ</span>
                </div>
                <div className='pay-content text-center mt-10 space-y-3'>
                <p>Thời gian giao dịch: <span className=' font-medium'>21:20, 10/12/2023</span>.</p>
                    <p>Mã giao dịch của bạn là <span className='text-[#81c038] font-medium'>WFGKHXHNGDTKF</span>.</p>
                    <p>Xem chi tiết thông tin vé tại đây <a href="" className='text-blue-500'>Ticket Infomation</a>.</p>
                    <div className='pt-5'>
                        <Link to="/">
                            <button className='bg-blue-500 text-white text-lg font-medium rounded-lg p-4'> Quay về trang chủ</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment