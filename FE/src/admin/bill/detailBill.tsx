import React, { useEffect, useState } from 'react';
import { Button, Image, Modal } from 'antd';
import { useGetBillDeitalQuery } from '../../rtk/bill/bill';
type Props = {
    projects: string
}
const DetailBill: React.FC<Props> = ({ projects }: Props) => {
    const { data: dataBill } = useGetBillDeitalQuery(projects)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    console.log(dataBill?.bill.length > 0);

    return (
        <>
            <Button onClick={() => { showModal() }}>Chi tiết hoá đơn</Button>
            <Modal title="Chi tiết hoá đơn" open={isModalOpen} onCancel={handleCancel} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }} className="text-center">
                <div className={`${dataBill && dataBill?.bill ? "" : ""}`}>
                    {dataBill && dataBill?.bill && (
                        <div className="py-5 mt-[-20px]">
                            <div className="flex justify-around mx-[30px]">
                                <div>
                                    <div className="py-5">
                                        <div>Mã hoá đơn :</div>
                                        <div>{dataBill?.bill?.bill_code}</div>
                                    </div>
                                    <div className="">
                                        <div>Mã người dùng :</div>
                                        <div>{dataBill?.bill?.user_code}</div>
                                    </div>
                                    <div className="py-5">
                                        <div>Người dùng :</div>
                                        <div>{dataBill?.bill?.user_name}</div>
                                    </div>
                                    <div className="">
                                        <div>Mã nhân viên :</div>
                                        <div>{dataBill?.bill?.personnel_code}</div>
                                    </div>
                                    <div className="py-5">
                                        <div>Nhân viên  :</div>
                                        <div>{dataBill?.bill?.personnel_name}</div>
                                    </div>
                                    <div className="">
                                        <div>Phụ phí :</div>
                                        <div>{dataBill?.bill?.additional_fee}</div>
                                    </div>
                                    <div className="py-5">
                                        <div>Tổng tiền :</div>
                                        <div>{`${(Number(dataBill?.bill?.total_money))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ`}</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="py-5">
                                        <div>Tên phim :</div>
                                        <div>{dataBill?.bill?.movie_name}</div>
                                    </div>
                                    <div className="">
                                        <div>Ảnh phim :</div>
                                        <div><Image
                                            width={100}
                                            src={dataBill?.bill?.image}
                                        /></div>
                                    </div>
                                    <div className="py-5">
                                        <div>Phòng chiếu :</div>
                                        <div>{dataBill?.bill?.room_name}</div>
                                    </div>
                                    <div className="">
                                        <div>Ngày đặt vé :</div>
                                        <div>{dataBill?.bill?.booking_date}</div>
                                    </div>
                                    <div className="py-5">
                                        <div>Ngày chiếu :</div>
                                        <div>{dataBill?.bill?.show_date}</div>
                                    </div>
                                    <div className="">
                                        <div>Giờ chiếu :</div>
                                        <div>{dataBill?.bill?.show_time}</div>
                                    </div>
                                    <div className="py-5">
                                        <div>Trạng thái vé :</div>
                                        <div>{dataBill?.bill?.payment_status}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
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