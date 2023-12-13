import { useEffect, useState } from 'react'
import { useCheckBillMutation } from '../rtk/bill/bill';
import { Link } from 'react-router-dom';
const CheckPay = () => {
    const [checkBill] = useCheckBillMutation()
    const [mess, setMess] = useState("")
    const url = new URL(window.location.href);
    const urlSearchParams = new URLSearchParams(new URL(window.location.href).search);
    const vnp_Amount = urlSearchParams.get('vnp_Amount');
    const vnp_BankCode = urlSearchParams.get('vnp_BankCode');
    const vnp_BankTranNo = urlSearchParams.get('vnp_BankTranNo');
    const vnp_CardType = urlSearchParams.get('vnp_CardType');
    const vnp_OrderInfo = urlSearchParams.get('vnp_OrderInfo');
    const vnp_PayDate = urlSearchParams.get('vnp_PayDate');
    const vnp_ResponseCode = urlSearchParams.get('vnp_ResponseCode');
    const vnp_TmnCode = urlSearchParams.get('vnp_TmnCode');
    const vnp_TransactionNo = urlSearchParams.get('vnp_TransactionNo');
    const vnp_TransactionStatus = urlSearchParams.get('vnp_TransactionStatus');
    const vnp_TxnRef = urlSearchParams.get('vnp_TxnRef');
    const vnp_SecureHash = urlSearchParams.get('vnp_SecureHash');
    useEffect(() => {
        if (url.pathname === "/listvnp") {
            const data = {
                vnp_Amount: vnp_Amount,
                vnp_BankCode: vnp_BankCode,
                vnp_BankTranNo: vnp_BankTranNo,
                vnp_OrderInfo: vnp_OrderInfo,
                vnp_PayDate: vnp_PayDate,
                vnp_ResponseCode: vnp_ResponseCode,
                vnp_TmnCode: vnp_TmnCode,
                vnp_TransactionNo: vnp_TransactionNo,
                vnp_TransactionStatus: vnp_TransactionStatus,
                vnp_TxnRef: vnp_TxnRef,
                vnp_SecureHash: vnp_SecureHash,
                vnp_CardType: vnp_CardType
            }
            checkBill(data).then((req) => setMess(req?.data?.Message)

            )
        }
    }, [])
    const moneny = (Number(vnp_Amount) / 100)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
                    <p className='font-medium text-lg'>{mess}</p>
                    <span className='block text-4xl text-[#81c038] font-medium'>{moneny} đ </span>
                </div>
                <div className='pay-content text-center mt-10 space-y-3'>
                    <p>Thời gian giao dịch: <span className=' font-medium'>21:20, 10/12/2023</span>.</p>
                    <p>Mã giao dịch của bạn là <span className='text-[#81c038] font-medium'>{vnp_TxnRef}</span>.</p>
                    <p>Xem chi tiết thông tin vé tại đây <a href="" className='text-blue-500'>Ticket Infomation</a>.</p>
                    <div className='pt-5'>
                        <Link to="/">
                            <button className='bg-blue-500 text-white text-lg font-medium rounded-lg p-4'>Quay về trang chủ</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CheckPay