import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import type { DatePickerProps, TimePickerProps } from 'antd';
import { useRevenueAllAPIMutation } from '../../rtk/statistics/statistics';
import { Space, DatePicker, DatePickerProps, Select, Button } from 'antd';
import { useEffect, useState } from 'react';
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
    const [type, setType] = useState<any>('year');
    const [valueDate, setvalueDate] = useState<any>((new Date)?.getFullYear())
    const [dataChart, setDataChart] = useState<any>()
    const [traCuu, setTraCuu] = useState<any>()
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        setvalueDate(dateString)
        if (date) {
            const dateData = {
                timeline: type,
                year: date?.year(),
                month: Number(date?.month() + 1),
            }
            setTraCuu(dateData)
        }
    };
    const handleSelect = () => {
        if (traCuu) {
            getRevenueAll(traCuu).then((fetchdata: any) => {
                if (fetchdata?.data?.error) {
                    setData({
                        quantity_bill: 0,
                        total_money: 0,
                        total_money_ticket: 0,
                        total_money_food: 0
                    })
                    if (type === "month") {
                        setDataChart(fetchdata?.data?.dailyRevenue)
                    } else {
                        setDataChart(fetchdata?.data?.monthlyRevenue)
                    }
                } else {
                    setData(fetchdata?.data)
                    if (type === "month") {
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
                    timeline: "momth",
                    year: currentTime?.getFullYear(),
                    month: currentTime?.getMonth() + 1,
                }
                getRevenueAll(dateData).then((fetchdata: any) => {
                    if (fetchdata?.data?.error) {
                        setData({
                            quantity_bill: 0,
                            total_money: 0,
                            total_money_ticket: 0,
                            total_money_food: 0
                        })
                        if (type === "month") {
                            setDataChart(fetchdata?.data?.dailyRevenue)
                        } else {
                            setDataChart(fetchdata?.data?.monthlyRevenue)
                        }
                    } else {
                        setData(fetchdata?.data)
                        if (type === "month") {
                            setDataChart(fetchdata?.data?.dailyRevenue)
                        } else {
                            setDataChart(fetchdata?.data?.monthlyRevenue)
                        }
                    }
                })
            }
    }, [data])
    return (
        <>
            <div className="flex gap-20 mt-[5%]">
                <div>
                    <Space direction="vertical" size={12}>
                        <div className="flex gap-[40px]">
                            <Select value={type} onChange={setType}>
                                <Option value="month">Month</Option>
                                <Option value="year">Year</Option>
                            </Select>
                            <DatePicker picker={type} onChange={onChange} format={`${type === 'month' ? "MM / YYYY" : "YYYY"}`} />
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
                            <div>Chu kì : {type === "month" ? "Theo tháng" : "Theo năm"}</div>
                            <div className="py-2">Thời gian : {valueDate}</div>
                            <div>Số hoá đơn : {data?.quantity_bill}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <LineChart
                        width={800}
                        height={350}
                        data={dataChart}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={`${type === "month" ? "date" : "month"}`} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="total_money" stroke="#82ca9d" />
                    </LineChart>
                </div>
            </div>
        </>
    )
}

export default ThongKe