import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import dayjs from 'dayjs';
import type { DatePickerProps } from 'antd';
import { useRevenueAllAPIMutation } from '../../rtk/statistics/statistics';
import { Space, DatePicker, DatePickerProps, Select, Button, message } from 'antd';
import { useEffect, useState } from 'react';
import ThongKeMovies from './thongKeMovies';
const { RangePicker } = DatePicker;
const { Option } = Select;
interface TotalRevenue {
    quantity_bill: number,
    total_money: number,
    total_money_ticket: number,
    percent_ticket: number,
    total_money_food: number,
    percent_food: number,
}
const ThongKe = () => {
    const [getRevenueAll] = useRevenueAllAPIMutation()
    const [data, setData] = useState<any>()
    const [total_money, setData_money] = useState<any>("0")
    const [total_money_food, setData_food] = useState<any>("0")
    const [total_money_ticket, setData_ticket] = useState<any>("0")
    const [typeSearch, setType] = useState<any>('year');
    const [valueDate, setValueDate] = useState<any>(dayjs().year())
    const [dataChart, setDataChart] = useState<any>()
    const [tbTime, setTbTime] = useState<any>(dayjs().year())
    const [traCuu, setTraCuu] = useState<any>()
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        setValueDate(dateString)
        setTraCuu({
            timeline: typeSearch,
            year: date?.year(),
            month: Number(date?.month()) + 1,
        })
    };
    const handleSelect = () => {
        if (valueDate === null) {
            message.error("Vui lòng nhập lại thời gian khi thay đổi trạng thái");
            return;
        }
        if (traCuu) {
            setTbTime({
                chuKi: typeSearch,
                time: valueDate
            })
            getRevenueAll(traCuu).then((fetchdata: any) => {
                if (fetchdata?.data?.error) {
                    message.error(fetchdata?.data?.error)
                    setData({
                        quantity_bill: 0,
                        total_money: 0,
                        total_money_ticket: 0,
                        total_money_food: 0
                    })
                    if (typeSearch === "month") {
                        setDataChart(fetchdata?.data?.dailyRevenue)
                    } else {
                        setDataChart(fetchdata?.data?.monthlyRevenue)
                    }
                } else {
                    setData(fetchdata?.data)
                    if (typeSearch === "month") {
                        setDataChart(fetchdata?.data?.dailyRevenue)
                    } else {
                        setDataChart(fetchdata?.data?.monthlyRevenue)
                    }
                }

            })
        }
    }
    useEffect(() => {
        const currentTime = new Date()
        if (data) {
            const total_money = (Number(data?.total_money))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0
            const total_money_ticket = (Number(data?.total_money_ticket))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0
            const total_money_food = (Number(data?.total_money_food))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0
            setData_money(total_money);
            setData_food(total_money_food);
            setData_ticket(total_money_ticket);
        } else
            if (!data) {
                const dateData = {
                    timeline: "year",
                    year: currentTime?.getFullYear(),
                    month: currentTime?.getMonth() + 1,
                }
                setTbTime({
                    chuKi: typeSearch,
                    time: valueDate
                })
                getRevenueAll(dateData).then((fetchdata: any) => {
                    if (fetchdata?.data?.error) {
                        message.error(fetchdata?.data?.error)
                        setData({
                            quantity_bill: 0,
                            total_money: 0,
                            total_money_ticket: 0,
                            total_money_food: 0
                        })
                        if (typeSearch === "month") {
                            setDataChart(fetchdata?.data?.dailyRevenue)
                        } else {
                            setDataChart(fetchdata?.data?.monthlyRevenue)
                        }
                    } else {
                        setData(fetchdata?.data)
                        if (typeSearch === "month") {
                            setDataChart(fetchdata?.data?.dailyRevenue)
                        } else {
                            setDataChart(fetchdata?.data?.monthlyRevenue)
                        }
                    }
                })
            }
    }, [data])
    const ContentRechart = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className="box-border rounded border-2 bg-slate-300 px-[10px]">
                    <h4>{`${typeSearch === "month" ? `Ngày ${label}` : `Tháng ${label}`}`}</h4>
                    <h4>{`${(Number(payload[0]?.value))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}(VNĐ)`}</h4>
                </div>
            )
        }
    }
    const DataName = () => {
        return (
            <div className="text-center mx-[42%] flex gap-4 w-[200px]">
                <div className="pt-1">
                    <svg width="14" height="14" viewBox="0 0 32 32" >
                        <path strokeWidth="4" fill="none" stroke="#82ca9d" d="M0,16h10.666666666666666
            A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16
            H32M21.333333333333332,16
            A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16">
                        </path>
                    </svg>
                </div>
                <div>
                    Thông tin doanh thu
                </div>
            </div>
        )
    }
    const setTypeChange = (type: string) => {
        setType(type)
        setValueDate(null)
    }
    return (
        <>
            <div className='mb-[25px] mt-[-30px] text-2xl' >Thống kê tổng doanh thu</div>
            <div className="flex justify-end mr-[60px]">
                <ThongKeMovies />
            </div>
            <div className="flex gap-10 ml-[4%] mt-[5%]">
                <div>
                    <Space direction="vertical" size={12}>
                        <div className="flex gap-[40px]">
                            <Select value={typeSearch} onChange={(e) => setTypeChange(e)}>
                                <Option value="month">Month</Option>
                                <Option value="year">Year</Option>
                            </Select>
                            <DatePicker picker={typeSearch} onChange={onChange} defaultValue={dayjs(`${valueDate}`, `${typeSearch === 'month' ? "MM / YYYY" : "YYYY"}`)} format={`${typeSearch === 'month' ? "MM / YYYY" : "YYYY"}`} className='w-[100px]' />
                            <Button onClick={() => handleSelect()}>Tra cứu</Button>
                        </div>
                    </Space>
                    <div className="py-5">
                        <div className="text-2xl font-bold">Doanh thu</div>
                        <div className="py-5">
                            <div>Tổng doanh thu :</div>
                            <div>{total_money}</div>
                        </div>
                        <div className="">
                            <div>Doanh thu phim :</div>
                            <div>{total_money_ticket}</div>
                        </div>
                        <div className="py-5">
                            <div>Doanh thu sản phẩm :</div>
                            <div>{total_money_food}</div>
                        </div>
                        <div>
                            <div>Chu kì : {tbTime.chuKi === "month" ? "Theo tháng" : "Theo năm"}</div>
                            <div className="py-2">Thời gian : {tbTime?.time}</div>
                            <div>Số hoá đơn : {data?.quantity_bill}</div>
                        </div>
                    </div>
                </div>
                <div className="ml-[30px] mt-[50px]">
                    <LineChart
                        width={780}
                        height={350}
                        data={dataChart}
                        margin={{
                            top: 10,
                            left: 20,
                            right: 30,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={`${tbTime.chuKi === "month" ? "date" : "month"}`} tickFormatter={(value) => `${tbTime.chuKi === "month" ? `Ngày ${value}` : `Tháng ${value}`}`} />
                        <YAxis axisLine={false} domain={[0, Number(data?.total_money_ticket)]} tickCount={20} tickSize={0} height={600} tickFormatter={(value) => `${(Number(value))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`} padding={{}} />
                        <Tooltip content={<ContentRechart />} />
                        <Legend content={<DataName />} />
                        <Line type="monotone" dataKey="total_money" stroke="#82ca9d" format="ngu" />
                    </LineChart>
                </div>
            </div>
        </>
    )
}

export default ThongKe