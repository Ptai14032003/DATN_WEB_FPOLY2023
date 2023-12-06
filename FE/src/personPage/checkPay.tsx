import React, { useEffect } from 'react'
import { useCheckBillMutation } from '../rtk/bill/bill';

type Props = {}

const CheckPay = (props: Props) => {
    const [checkBill] = useCheckBillMutation()
    const url = new URL(window.location.href);
    const urlSearchParams = new URLSearchParams(new URL(window.location.href).search);
    const vnp_Amount = urlSearchParams.get('vnp_Amount');
    const vnp_BankCode = urlSearchParams.get('vnp_BankCode');
    const vnp_BankTranNo = urlSearchParams.get('vnp_BankTranNo');
    const vnp_OrderInfo = urlSearchParams.get('vnp_OrderInfo');
    const vnp_PayDate = urlSearchParams.get('vnp_PayDate');
    const vnp_ResponseCode = urlSearchParams.get('vnp_ResponseCode');
    const vnp_TmnCode = urlSearchParams.get('vnp_TmnCode');
    const vnp_TransactionNo = urlSearchParams.get('vnp_TransactionNo');
    const vnp_TransactionStatus = urlSearchParams.get('vnp_TransactionStatus');
    const vnp_TxnRef = urlSearchParams.get('vnp_TxnRef');
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
            }
            checkBill(data)
        }
    }, [])
    return (
        <div>checkPay</div>
    )
}
export default CheckPay