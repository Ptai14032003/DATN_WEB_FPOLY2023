import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import dayjs from 'dayjs';
import type { DatePickerProps, TimePickerProps } from 'antd';
import { useTop5FoodsMutation, useTop5MoviesMutation } from '../../rtk/statistics/statistics';
import { Space, DatePicker, DatePickerProps, Select, Button, message } from 'antd';
import { useEffect, useState } from 'react';
import TableTop5 from './table';
import { Waveform } from '@uiball/loaders';
const { RangePicker } = DatePicker;
const { Option } = Select;
const HomeAdmin = () => {
    const [Top5Foods] = useTop5FoodsMutation()
    const [Top5Movies] = useTop5MoviesMutation()
    const [dataFoods, setDataFoods] = useState<any>()
    const [dataMovies, setDataMovies] = useState<any>()
    const [typeSearch, setType] = useState<any>('year');
    const [valueDateFood, setValueDateFood] = useState<any>(dayjs().year())
    const [valueDateMovie, setValueDateMovie] = useState<any>(dayjs().year())
    const [dataChartFoods, setDataChartFoods] = useState<any>()
    const [dataChartMovies, setDataChartMovies] = useState<any>()
    const [traCuu, setTraCuu] = useState<any>()
    const onChange1: DatePickerProps['onChange'] = (date, dateString) => {
        setValueDateFood(dateString)
        setTraCuu({
            timeline: typeSearch,
            year: date?.year(),
            month: Number(date?.month()) + 1,
        })
    };
    const onChange2: DatePickerProps['onChange'] = (date, dateString) => {
        setValueDateMovie(dateString)
        setTraCuu({
            timeline: typeSearch,
            year: date?.year(),
            month: Number(date?.month()) + 1,
        })
    };
    const handleSelectFoods = () => {
        if (valueDateFood === null) {
            message.error("Vui lòng nhập lại thời gian khi thay đổi trạng thái");
            return;
        }
        if (traCuu) {
            Top5Foods(traCuu).then((fetchdata: any) => {
                if (fetchdata?.data?.error) {
                    setDataFoods({
                        food_name: "",
                        total_tickets_sold: 0,
                        total_revenue: 0,
                    })
                    if (typeSearch === "month") {
                        setDataChartFoods(fetchdata?.data)
                    } else {
                        setDataChartFoods(fetchdata?.data)
                    }
                } else {
                    setDataFoods(fetchdata?.data)
                    if (typeSearch === "month") {
                        setDataChartFoods(fetchdata?.data)
                    } else {
                        setDataChartFoods(fetchdata?.data)
                    }
                }
            })
        }
    }
    const handleSelectMovies = () => {
        if (valueDateMovie === null) {
            message.error("Vui lòng nhập lại thời gian khi thay đổi trạng thái");
            return;
        }
        if (traCuu) {
            Top5Movies(traCuu).then((fetchdata: any) => {
                if (fetchdata?.data?.error) {
                    setDataMovies({
                        moveie_name: "",
                        total_tickets_sold: 0,
                        total_revenue: 0,
                    })
                    if (typeSearch === "month") {
                        setDataChartMovies(fetchdata?.data)
                    } else {
                        setDataChartFoods(fetchdata?.data)
                    }
                } else {
                    setDataMovies(fetchdata?.data)
                    if (typeSearch === "month") {
                        setDataChartMovies(fetchdata?.data)
                    } else {
                        setDataChartMovies(fetchdata?.data)
                    }
                }
            })
        }
    }
    useEffect(() => {
        const currentTime = new Date()
        if (dataFoods) {
            const total_revenue = (Number(dataFoods?.total_revenue))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0
        } else
            if (!dataFoods) {
                const dateData = {
                    timeline: "year",
                    year: currentTime?.getFullYear(),
                    month: currentTime?.getMonth() + 1,
                }
                Top5Foods(dateData).then((fetchdata: any) => {
                    if (fetchdata?.data?.error) {
                        setDataFoods({
                            food_name: "",
                            total_tickets_sold: 0,
                            total_revenue: 0,
                        })
                        if (typeSearch === "month") {
                            setDataChartFoods(fetchdata?.data)
                        } else {
                            setDataChartFoods(fetchdata?.data)
                        }
                    } else {
                        setDataFoods(fetchdata?.data)
                        if (typeSearch === "month") {
                            setDataChartFoods(fetchdata?.data)
                        } else {
                            setDataChartFoods(fetchdata?.data)
                        }
                    }
                })
                Top5Movies(dateData).then((fetchdata: any) => {
                    if (fetchdata?.data?.error) {
                        setDataMovies({
                            moveie_name: "",
                            total_tickets_sold: 0,
                            total_revenue: 0,
                        })
                        if (typeSearch === "month") {
                            setDataChartMovies(fetchdata?.data)
                        } else {
                            setDataChartMovies(fetchdata?.data)
                        }
                    } else {
                        setDataMovies(fetchdata?.data)
                        if (typeSearch === "month") {
                            setDataChartMovies(fetchdata?.data)
                        } else {
                            setDataChartMovies(fetchdata?.data)
                        }
                    }
                })
            }
    }, [dataFoods])
    const ContentRechart = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className="box-border rounded border-2 bg-slate-300 px-[10px]">
                    <h4>{`${label}`}</h4>
                    <h4>{`${(Number(payload[0]?.value))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}(VNĐ)`}</h4>
                </div>
            )
        }
    }
    const Content = ({ data }: { data: string }) => {
        return (
            <div className="px-[52%]">{data}</div>
        );
    };
    const setTypeChange1 = (type: string) => {
        setType(type)
        setValueDateFood(null)
    }
    const setTypeChange2 = (type: string) => {
        setType(type)
        setValueDateMovie(null)
    }
    return (
        <>
            <div className='mb-[20px] text-2xl mt-[-55px]' >Xu hướng</div>
            <div className="">
                <div className="mt-[20px] flex justify-around ">
                    <div>
                        <div className="mb-[25px] text-2xl">Top 5 Sản phẩm  </div>
                        <div className='mb-[40px]'>
                            <Space direction="vertical" size={12}>
                                <div className="flex gap-[40px]">
                                    <Select value={typeSearch} onChange={(e) => setTypeChange1(e)}>
                                        <Option value="month">Month</Option>
                                        <Option value="year">Year</Option>
                                    </Select>
                                    <DatePicker picker={typeSearch} onChange={onChange1} defaultValue={dayjs(`${valueDateFood}`, `${typeSearch === 'month' ? "MM / YYYY" : "YYYY"}`)} format={`${typeSearch === 'month' ? "MM / YYYY" : "YYYY"}`} className='w-[100px]' />
                                    <Button onClick={() => handleSelectFoods()}>Tra cứu</Button>
                                </div>
                            </Space>
                        </div>
                        <BarChart width={400} height={300} data={dataChartFoods}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}>
                            <XAxis dataKey="food_name" tickFormatter={(value) => ``} padding={{ left: 20 }} />
                            <YAxis domain={[0, Number(dataFoods?.total_money_ticket)]} tickCount={20} tickSize={0} height={600} tickFormatter={(value) => `${(Number(value))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`} padding={{}} />
                            <Tooltip content={<ContentRechart label={`food_name`} />} />
                            <Legend content={<Content data="Foods" />} />
                            <Bar dataKey="total_revenue" fill="#8884d8" />
                        </BarChart>
                    </div>
                    <div></div>
                    <div>
                        <div className="mb-[25px] text-2xl">Top 5 Phim  </div>
                        <div className='mb-[40px]'>
                            <Space direction="vertical" size={12}>
                                <div className="flex gap-[40px]">
                                    <Select value={typeSearch} onChange={(e) => setTypeChange2(e)}>
                                        <Option value="month">Month</Option>
                                        <Option value="year">Year</Option>
                                    </Select>
                                    <DatePicker picker={typeSearch} onChange={onChange2} defaultValue={dayjs(`${valueDateMovie}`, `${typeSearch === 'month' ? "MM / YYYY" : "YYYY"}`)} format={`${typeSearch === 'month' ? "MM / YYYY" : "YYYY"}`} className='w-[100px]' />
                                    <Button onClick={() => handleSelectMovies()}>Tra cứu</Button>
                                </div>
                            </Space>
                        </div>
                        <BarChart width={400} height={300} data={dataChartMovies}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}>
                            <XAxis dataKey="movie_name" tickFormatter={(value) => ``} padding={{ left: 20 }} />
                            <YAxis domain={[0, Number(dataFoods?.total_money_ticket)]} tickCount={20} tickSize={0} height={600} tickFormatter={(value) => `${(Number(value))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`} padding={{}} />
                            <Tooltip content={<ContentRechart />} />
                            <Legend content={<Content data="Movies" />} />
                            <Bar dataKey="total_revenue" fill="#8884d8" />
                        </BarChart>
                    </div>
                </div>
                <div className='flex justify-around mt-[30px]'>
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm text-center">
                            <thead className="ltr:text-left rtl:text-right bg-gray-100">
                                <tr>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">STT</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Sản phẩm</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Tổng lượng sản phẩm bán</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Tổng doanh thu</th>
                                </tr>
                            </thead>
                            {dataFoods && dataFoods.length > 0 ? (
                                <tbody className="divide-y divide-gray-200">
                                    {dataFoods.map((value: any, index: number) => (
                                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index + 1}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-900">{value?.food_name}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{value?.total_quantity_sold}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{(Number(value?.total_revenue))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (
                                <div className='flex items-center justify-center h-40 text-xl text-gray-500'>
                                    Thông tin trống
                                </div>
                            )}
                        </table>
                    </div>
                    <div></div>
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm text-center">
                            <thead className="ltr:text-left rtl:text-right bg-gray-100">
                                <tr>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">STT</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Phim</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Tổng lượng vé bán</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Tổng doanh thu</th>
                                </tr>
                            </thead>
                            {dataMovies && dataMovies.length > 0 ? (
                                <tbody className="divide-y divide-gray-200">
                                    {dataMovies.map((value: any, index: number) => (
                                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index + 1}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-900">{value?.movie_name}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{value?.total_tickets_sold}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{(Number(value?.total_revenue))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (
                                <div className='flex items-center justify-center h-40 text-xl text-gray-500'>
                                    Thông tin trống
                                </div>
                            )}
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeAdmin