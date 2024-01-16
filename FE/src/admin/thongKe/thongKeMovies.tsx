
import type { Dayjs } from 'dayjs';
import { useRevenueMoviesAPIMutation } from '../../rtk/statistics/statistics';
import { Space, DatePicker, DatePickerProps, Select, Button, message, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useFetchMoviesPersonQuery } from '../../rtk/moviesPerson/moviesPerson';
import moment from 'moment';
const { Option } = Select;
const ThongKeMovies = () => {
    const [revenueMovies] = useRevenueMoviesAPIMutation()
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
        if (nameMovies.length < 0) {
            messageApi.error("Vui lòng chọn tên phim !")
        } else
            if (date_start.length < 0) {
                messageApi.error("Vui lòng chọn ngày bắt đầu !")
            } else
                if (date_end.length < 0) {
                    messageApi.error("Vui lòng chọn ngày kết thúc !")
                } else {
                    const newData = {
                        movie_name: nameMovies,
                        start: date_start,
                        end: date_end
                    }
                    console.log(newData);

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
                        <div className="py-5 text-left">
                            <div className="text-2xl font-bold">Doanh thu phim</div>
                            <div className="py-5">
                                <div>Tổng doanh thu :</div>
                                <div>{data?.total_revenue}</div>
                            </div>
                            <div className="">
                                <div>Tổng vé : </div>
                                <div>{data?.total_tickets_sold}</div>
                            </div>
                            <div className="py-5">
                                <div>Ngày bắt đầu chiếu :</div>
                                <div>
                                    {data?.start_date !== undefined ? `${moment(data?.start_date).format("DD-MM-YYYY")}}` : ""}</div>
                            </div>
                            <div>
                                <div className="py-2">Thời gian : {date_start !== "" && date_end !== "" ? `${moment(date_start).format("DD-MM-YYYY")} đến ${moment(date_end).format("DD-MM-YYYY")}` : ""} </div>
                            </div>
                        </div>
                        <div className="mt-[50px]">
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ThongKeMovies