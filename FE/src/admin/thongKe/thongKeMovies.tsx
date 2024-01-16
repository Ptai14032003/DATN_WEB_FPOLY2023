
import type { Dayjs } from 'dayjs';
import { useRevenueMoviesAPIMutation } from '../../rtk/statistics/statistics';
import { Space, DatePicker, DatePickerProps, Select, Button, message, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useFetchMoviesPersonQuery } from '../../rtk/moviesPerson/moviesPerson';
import moment from 'moment';
const { Option } = Select;
const ThongKeMovies = () => {
    const [revenueMovies, isLoading] = useRevenueMoviesAPIMutation()
    const [data, setData] = useState<any>()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage()
    const { data: dataMovie } = useFetchMoviesPersonQuery()
    const [date_start, setDateStart] = useState("")
    const [date_end, setDateEnd] = useState("")
    const [nameMovies, setNameMovies] = useState("")
    const movieOptions = dataMovie?.map((movie: any) => ({
        value: movie.movie_name,
        label: movie.movie_name,
    })) || [];;
    const onChangeDateStart = (value: Dayjs | null, dateString: string) => {
        setDateStart(dateString)
    };
    const onChangeDateEnd = (value: Dayjs | null, dateString: string) => {
        setDateEnd(dateString)
    };
    const handleSelect = () => {
        if (!nameMovies) {
            messageApi.error("Vui lòng chọn tên phim !")
        } else
            if (!date_start) {
                messageApi.error("Vui lòng chọn ngày bắt đầu !")
            } else
                if (!date_end) {
                    messageApi.error("Vui lòng chọn ngày kết thúc !")
                } else {
                    const newData = {
                        movie_name: nameMovies,
                        start: date_start,
                        end: date_end
                    }
                    revenueMovies(newData).then((data: any) => {
                        if (data?.data?.message) {
                            message.error(data?.data?.message);
                        } else {
                            setData(data.data)
                        }

                    })
                }
    }
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            {contextHolder}
            <Button onClick={showModal}>Thống kê theo từng phim</Button>
            <Modal title="Thống kê theo từng phim" open={isModalOpen} onCancel={handleCancel} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: false }} width={1200} className="text-center">
                <div className="block mt-[50px]">
                    <Space direction="vertical" size={12}>
                        <div className="flex gap-[40px] pl-[10px]">
                            <Select
                                placeholder="Chọn tên phim"

                                style={{ width: 200 }}
                                options={movieOptions}
                                onChange={(value: any) => setNameMovies(value)}
                            />
                            <div className="flex text-center">
                                <DatePicker
                                    style={{ width: 160 }}
                                    onChange={onChangeDateStart}
                                    placeholder="Ngày bắt đầu"
                                    format={"DD-MM-YYYY"}
                                />
                                <div className="px-[10px] mt-[4px]">đến</div>
                                <DatePicker
                                    style={{ width: 160 }}
                                    onChange={onChangeDateEnd}
                                    placeholder="Ngày kết thúc"
                                    format={"DD-MM-YYYY"}
                                />
                            </div>
                            <Button onClick={() => handleSelect()}>Tra cứu</Button>
                        </div>
                    </Space>
                    <div className="flex justify-around gap-20">
                        {data && data.length > 0 && (
                            <div className="overflow-x-auto rounded-lg border border-gray-200 w-[80%] mt-[50px]">
                                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                    <thead className="ltr:text-left rtl:text-right">
                                        <tr>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Tổng doanh thu</th>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Tổng vé </th>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Ngày bắt đầu chiếu</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {data?.map((item: any) => (
                                            <tr>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-900">{(Number(item?.total_revenue))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item?.total_tickets_sold}</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"> {item?.start_date !== undefined ? `${moment(item?.start_date).format("DD-MM-YYYY")}` : ""}</td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ThongKeMovies