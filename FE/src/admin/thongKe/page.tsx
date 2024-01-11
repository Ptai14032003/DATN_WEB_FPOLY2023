import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useRevenueAllAPIMutation } from '../../rtk/statistics/statistics';
import { Space, DatePicker, DatePickerProps, Table } from 'antd';
import { useEffect, useState } from 'react';
import Column from 'antd/es/table/Column';
const { RangePicker } = DatePicker;
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
    const [dataTable, setDataTable] = useState<any>()
    const onChange: DatePickerProps['onChange'] = (date) => {
        if (date) {
            const dateData = {
                timeline: "momth",
                year: date?.year(),
                month: Number(date?.month() + 1),
            }
            getRevenueAll(dateData).then((data) => {
                setData(data)
            })
        }
    };
    useEffect(() => {
        const currentTime = new Date()
        if (data) {
            const total_money = (Number(data?.data?.total_money))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            const total_money_ticket = (Number(data?.data?.total_money_ticket))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            const total_money_food = (Number(data?.data?.total_money_food))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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
                console.log(dateData);

                getRevenueAll(dateData).then((data) => {
                    setData(data)
                })
            }
    }, [data])
    console.log(data);

    return (
        <div>
            <Space direction="vertical" size={12}>
                <DatePicker picker="month" onChange={onChange} format={`MM / YYYY`} />
            </Space>
            <div>
                <div>Doanh thu tháng này</div>
                <div>
                    <div>Tổng doanh thu :</div>
                    <div>{total_money}</div>
                </div>
                <div>
                    <div>Doanh thu phim :</div>
                    <div>{total_money_ticket}</div>
                </div>
                <div>
                    <div>Doanh thu sản phẩm :</div>
                    <div>{total_money_food}</div>
                </div>
            </div>
        </div>
    )
}

export default ThongKe