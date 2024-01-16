import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useGetBillDeitalMutation } from '../../rtk/bill/bill';
type Props = {
    projects: string
}
const DetailBill: React.FC<Props> = ({ projects }: Props) => {
    const [fetch] = useGetBillDeitalMutation()
    const [dataBill, setData] = useState<any>()
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        if (!dataBill) {
            const newData = {
                bill_id: projects
            }
            fetch(newData).then((data: any) => {
                setData(data?.data)
            })
        }
    }, [dataBill])
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setData(undefined);
    };
    console.log(dataBill);

    return (
        <>
            <Button onClick={() => { showModal() }}>Chi tiết hoá đơn</Button>
            <Modal title="Chi tiết hoá đơn" open={isModalOpen} onCancel={handleCancel} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }} className="text-center">
                <div className={`${dataBill && dataBill.tickets && dataBill.tickets.length > 0 ? "flex" : ""}`}>

                    <div>
                        {dataBill && dataBill.tickets && dataBill.tickets.length > 0 ? (
                            <div className="py-5">
                                {dataBill?.tickets?.map((item: any, index: number) => (
                                    <div key={index}>
                                        <div className="text-2xl font-bold">Hoá đơn</div>
                                        <div className="py-5">
                                            <div>Mã hoá đơn :</div>
                                            <div>{item?.bill_code}</div>
                                        </div>
                                        <div className="">
                                            <div>Mã người dùng :</div>
                                            <div>{item?.user_code}</div>
                                        </div>
                                        <div className="py-5">
                                            <div>Người dùng</div>
                                            <div>{item?.user_name}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-[16px] font-bold">Trống</div>
                        )}
                    </div>
                    <div>
                        <div className="overflow-x-auto rounded-lg border border-gray-200 my-[20px]">
                            <div className="text-[18px]">Ghế đã mua</div>
                            {dataBill && dataBill.tickets && dataBill.tickets.length > 0 ? (
                                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                    <thead className="ltr:text-left rtl:text-right">
                                        <tr>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Mã ghế</th>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Giá tiền (VNĐ)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {dataBill?.tickets?.map((item: any, index: number) => (
                                            <tr key={index}>
                                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{item?.seat_code}</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{`${(Number(item?.price))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ`}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="text-[16px] font-bold">Trống</div>
                            )}
                        </div>
                        <div className="overflow-x-auto rounded-lg border border-gray-200 my-[20px]">
                            <div className="text-[18px]">Sản phẩm đã mua</div>
                            {dataBill && dataBill.ticket_foods && dataBill.ticket_foods.length > 0 ? (
                                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                    <thead className="ltr:text-left rtl:text-right">
                                        <tr>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Sản phẩm</th>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Số lượng</th>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Tổng giá tiền (VNĐ)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {dataBill?.ticket_foods?.map((item: any, index: number) => (
                                            <tr key={index}>
                                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{item?.food_name}</td>
                                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{item?.quantity}</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{`${(Number(item?.total_money))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ`}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="text-[16px] font-bold">Trống</div>
                            )}
                        </div>
                    </div>
                </div>
            </Modal >
        </>
    )
};

export default DetailBill;