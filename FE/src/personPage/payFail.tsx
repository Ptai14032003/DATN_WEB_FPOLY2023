import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const PayFail = (props: Props) => {
    return (
        <div>
            <div className='pay-success-screen h-screen grid place-content-center text-black'>
                <div className='pay-success-box bg-white h-[500px] w-[600px] rounded-xl'>
                    <div className='check-icon text-center mt-10 space-y-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="red" className="bi bi-exclamation-circle-fill mx-auto" viewBox="0 0 24 24">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
                        </svg>
                        <p className='font-medium text-2xl'>Thanh toán thất bại</p>
                        <span className='block text-4xl text-red-500 font-medium'>100.000 đ</span>
                    </div>
                    <div className='pay-content text-center mt-10 space-y-3'>
                        <p>Đã có sự cố xảy ra trong lúc thanh toán</p>
                        <p>Vui lòng thử lại</p>
                        <div className='pt-5'>
                            <Link to="/">
                                <button className='bg-blue-500 text-white text-lg font-medium rounded-lg p-3'>Quay về trang chủ</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PayFail