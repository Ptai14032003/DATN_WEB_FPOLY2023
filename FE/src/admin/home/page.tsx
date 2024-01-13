import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import dayjs from 'dayjs';
import type { DatePickerProps, TimePickerProps } from 'antd';
import { useTop5FoodsMutation, useTop5MoviesMutation } from '../../rtk/statistics/statistics';
import { Space, DatePicker, DatePickerProps, Select, Button, message } from 'antd';
import { useEffect, useState } from 'react';
const { RangePicker } = DatePicker;
const { Option } = Select;
const HomeAdmin = () => {
    const [Top5Foods] = useTop5FoodsMutation()
    const [Top5Movies] = useTop5MoviesMutation()
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
            Top5Foods(traCuu).then((fetchdata: any) => {
                if (fetchdata?.data?.error) {
                    setData({
                        quantity_bill: 0,
                        total_money: 0,
                        total_money_ticket: 0,
                        total_money_food: 0
                    })
                    if (typeSearch === "month") {
                        setDataChart(fetchdata?.data)
                    } else {
                        setDataChart(fetchdata?.data)
                    }
                } else {
                    setData(fetchdata?.data)
                    if (typeSearch === "month") {

                        setDataChart(fetchdata?.data)
                    } else {
                        setDataChart(fetchdata?.data)
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
                Top5Foods(dateData).then((fetchdata: any) => {
                    console.log(fetchdata);

                    if (fetchdata?.data?.error) {
                        setData({
                            quantity_bill: 0,
                            total_money: 0,
                            total_money_ticket: 0,
                            total_money_food: 0
                        })
                        if (typeSearch === "month") {
                            setDataChart(fetchdata?.data)
                        } else {
                            setDataChart(fetchdata?.data)
                        }
                    } else {
                        setData(fetchdata?.data)
                        if (typeSearch === "month") {
                            setDataChart(fetchdata?.data)
                        } else {
                            setDataChart(fetchdata?.data)
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
    const Content = () => {
        return (
            <div className="px-[52%]">Food</div>
        )
    }
    const setTypeChange = (type: string) => {
        setType(type)
        setValueDate(null)
    }
    return (
        <>
            <div className='mb-[25px] mt-[-30px] text-2xl' >Xu hướng</div>
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
                </div>
                <div className="ml-[30px] mt-[50px]">
                    {/* <LineChart
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
                        <YAxis  />
                        <Tooltip content={<ContentRechart />} />
                        <Legend />
                        <Line type="monotone" dataKey="total_money" stroke="#82ca9d" format="ngu" />
                    </LineChart> */}
                    <BarChart width={300} height={300} data={dataChart}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}>
                        <XAxis dataKey="name" dataKey={`${tbTime.chuKi === "month" ? "date" : "month"}`} tickFormatter={(value) => `${tbTime.chuKi === "month" ? `Ngày ${value}` : `Tháng ${value}`}`} />
                        <YAxis domain={[0, Number(data?.total_money_ticket)]} tickCount={20} tickSize={0} height={600} tickFormatter={(value) => `${(Number(value))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`} padding={{}} />
                        <Tooltip content={<ContentRechart />} />
                        <Legend content={<Content />} />
                        <Bar dataKey="total_revenue" fill="#8884d8" />
                    </BarChart>
                </div>
            </div>
        </>
    )
}

export default HomeAdmin