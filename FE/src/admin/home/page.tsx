import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import dayjs from 'dayjs';
import type { DatePickerProps, TimePickerProps } from 'antd';
import { useTop5FoodsMutation, useTop5MoviesMutation, useTop5NhanSuMutation, useTop5UsersMutation } from '../../rtk/statistics/statistics';
import { Space, DatePicker, DatePickerProps, Select, Button, message } from 'antd';
import { useEffect, useState } from 'react';
const { RangePicker } = DatePicker;
const { Option } = Select;
const HomeAdmin = () => {
    const [Top5Foods] = useTop5FoodsMutation()
    const [Top5Movies] = useTop5MoviesMutation()
    const [Top5Users] = useTop5UsersMutation()
    const [Top5NhanSu] = useTop5NhanSuMutation()
    const [dataFoods, setDataFoods] = useState<any>()
    const [dataMovies, setDataMovies] = useState<any>()
    const [dataUsers, setDataUsers] = useState<any>()
    const [dataNhanSu, setDataNhanSu] = useState<any>()
    const [valueDateFood, setValueDateFood] = useState<any>(dayjs().year())
    const [valueDateMovie, setValueDateMovie] = useState<any>(dayjs().year())
    const [valueDateUser, setValueDateUser] = useState<any>(dayjs().year())
    const [valueDateNhanSu, setValueDateNhanSu] = useState<any>(dayjs().year())
    const [dataChartFoods, setDataChartFoods] = useState<any>()
    const [dataChartMovies, setDataChartMovies] = useState<any>()
    const [dataChartUsers, setDataChartUsers] = useState<any>()
    const [dataChartNhanSu, setDataChartNhanSu] = useState<any>()
    const [typeSearchMovies, setTypeSearchMovies] = useState<any>('year');
    const [typeSearchFood, setTypeSearchFood] = useState<any>('year');
    const [typeSearchUser, setTypeSearchUser] = useState<any>('year');
    const [typeSearchNhanSu, setTypeSearchNhanSu] = useState<any>('year');
    const [maxChartFood, setMaxChartFood] = useState<number>()
    const [maxChartMovies, setMaxChartMovies] = useState<number>()
    const [maxChartUser, setMaxChartUser] = useState<number>()
    const [maxChartNhanSu, setMaxChartNhanSu] = useState<number>()
    const [traCuuFood, setTraCuuFood] = useState<any>()
    const [traCuuMovies, setTraCuuMovies] = useState<any>()
    const [traCuuUsers, setTraCuuUsers] = useState<any>()
    const [traCuuNhanSu, setTraCuuNhanSu] = useState<any>()
    const [convert, setConvert] = useState<any>(0)
    const [convert1, setConvert1] = useState<any>(0)
    const onChangeFood: DatePickerProps['onChange'] = (date, dateString) => {
        setValueDateFood(dateString)
        setTraCuuFood({
            timeline: typeSearchFood,
            year: date?.year(),
            month: Number(date?.month()) + 1,
        })
    };
    const onChangeMovies: DatePickerProps['onChange'] = (date, dateString) => {
        setValueDateMovie(dateString)
        setTraCuuMovies({
            timeline: typeSearchMovies,
            year: date?.year(),
            month: Number(date?.month()) + 1,
        })
    };
    const onChangeUser: DatePickerProps['onChange'] = (date, dateString) => {
        setValueDateUser(dateString)
        setTraCuuUsers({
            timeline: typeSearchUser,
            year: date?.year(),
            month: Number(date?.month()) + 1,
        })
    };
    const onChangeNhanSu: DatePickerProps['onChange'] = (date, dateString) => {
        setValueDateNhanSu(dateString)
        setTraCuuNhanSu({
            timeline: typeSearchFood,
            year: date?.year(),
            month: Number(date?.month()) + 1,
        })
    };
    const handleSelectFoods = () => {
        if (valueDateFood === null) {
            message.error("Vui lòng nhập lại thời gian khi thay đổi trạng thái");
            return;
        }
        if (traCuuFood) {
            Top5Foods(traCuuFood).then((fetchdata: any) => {
                if (fetchdata?.data?.message) {
                    message.error(fetchdata?.data?.message)
                    setDataFoods({
                        food_name: "",
                        total_tickets_sold: 0,
                        total_revenue: 0,
                    })
                    setDataChartFoods(fetchdata?.data)
                } else {
                    setDataFoods(fetchdata?.data)
                    setMaxChartFood(fetchdata?.data[0]?.total_revenue);
                    setDataChartFoods(fetchdata?.data)
                }
            })
        }
    }
    const handleSelectMovies = () => {
        if (valueDateMovie === null) {
            message.error("Vui lòng nhập lại thời gian khi thay đổi trạng thái");
            return;
        }
        if (traCuuMovies) {
            Top5Movies(traCuuMovies).then((fetchdata: any) => {
                console.log(fetchdata);

                if (fetchdata?.data?.error) {
                    message.error(fetchdata?.data?.message)
                    setDataMovies({
                        moveie_name: "",
                        total_tickets_sold: 0,
                        total_revenue: 0,
                    })
                    setDataChartFoods(fetchdata?.data)
                } else {
                    setDataMovies(fetchdata?.data)
                    setMaxChartMovies(fetchdata?.data[0]?.total_revenue)
                    setDataChartMovies(fetchdata?.data)
                }
            })
        }
    }
    const handleSelectUsers = () => {
        if (valueDateUser === null) {
            message.error("Vui lòng nhập lại thời gian khi thay đổi trạng thái");
            return;
        }
        if (traCuuUsers) {
            Top5Users(traCuuUsers).then((fetchdata: any) => {
                if (fetchdata?.data?.error) {
                    message.error(fetchdata?.data?.message)
                    setDataUsers({
                        name: "",
                        user_code: "",
                        email: "",
                        phone_number: "",
                        total_spent: 0
                    })
                    setDataChartUsers(fetchdata?.data)
                } else {
                    setDataUsers(fetchdata?.data)
                    setMaxChartUser(fetchdata?.data[0]?.total_spent)
                    setDataChartUsers(fetchdata?.data)
                }
            })
        }
    }
    const handleSelectNhanSu = () => {
        if (valueDateNhanSu === null) {
            message.error("Vui lòng nhập lại thời gian khi thay đổi trạng thái");
            return;
        }
        if (traCuuNhanSu) {
            Top5NhanSu(traCuuNhanSu).then((fetchdata: any) => {
                if (fetchdata?.data?.error) {
                    message.error(fetchdata?.data?.message)
                    setDataNhanSu({
                        name: "",
                        personnel_code: "",
                        phone_number: "",
                        total_spent: 0
                    })
                    setDataChartNhanSu(fetchdata?.data)
                } else {
                    setDataNhanSu(fetchdata?.data)
                    setMaxChartNhanSu(fetchdata?.data[0]?.total_spent)
                    setDataChartNhanSu(fetchdata?.data)
                }
            })
        }
    }
    useEffect(() => {
        const currentTime = new Date()
        const dateData = {
            timeline: "year",
            year: currentTime?.getFullYear(),
            month: currentTime?.getMonth() + 1,
        }
        if (!dataFoods) {
            Top5Foods(dateData).then((fetchdata: any) => {
                if (fetchdata?.data?.error) {
                    message.error(fetchdata?.data?.message)
                    setDataFoods({
                        food_name: "",
                        total_tickets_sold: 0,
                        total_revenue: 0,
                    })
                    setDataChartFoods(fetchdata?.data)
                } else {
                    setDataFoods(fetchdata?.data)
                    setMaxChartFood(fetchdata?.data[0]?.total_revenue);

                    setDataChartFoods(fetchdata?.data)
                }
            })
        }
        if (!dataMovies) {
            Top5Movies(dateData).then((fetchdata: any) => {
                if (fetchdata?.data?.error) {
                    message.error(fetchdata?.data?.message)
                    setDataMovies({
                        moveie_name: "",
                        total_tickets_sold: 0,
                        total_revenue: 0,
                    })
                    setDataChartMovies(fetchdata?.data)
                } else {
                    setMaxChartMovies(fetchdata?.data[0]?.total_revenue)
                    setDataMovies(fetchdata?.data)
                    setDataChartMovies(fetchdata?.data)

                }
            });
        }
        if (!dataUsers) {
            Top5Users(dateData).then((fetchdata: any) => {
                if (fetchdata?.data?.error) {
                    message.error(fetchdata?.data?.message)
                    setDataMovies({
                        name: "",
                        user_code: "",
                        email: "",
                        phone_number: "",
                        total_spent: 0
                    })
                    setDataUsers(fetchdata?.data)
                } else {
                    setDataUsers(fetchdata?.data)
                    setMaxChartUser(fetchdata?.data[0]?.total_spent)
                    setDataChartUsers(fetchdata?.data)
                }
            })
        }
        if (!dataNhanSu) {
            Top5NhanSu(dateData).then((fetchdata: any) => {
                if (fetchdata?.data?.error) {
                    message.error(fetchdata?.data?.message)
                    setDataNhanSu({
                        name: "",
                        personnel_code: "",
                        phone_number: "",
                        total_spent: 0
                    })
                    setDataChartNhanSu(fetchdata?.data)
                } else {
                    setDataNhanSu(fetchdata?.data)
                    setMaxChartNhanSu(fetchdata?.data[0]?.total_spent)
                    setDataChartNhanSu(fetchdata?.data)
                }
            })
        }
    }, [dataFoods, dataMovies, dataUsers, dataNhanSu])
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
            <div className="pl-[48%] pb-[50px]">{data}</div>
        );
    };
    const setTypeFood = (type: string) => {
        setTypeSearchFood(type)
        setValueDateFood(null)
    }
    const setTypeMovies = (type: string) => {
        setTypeSearchMovies(type)
        setValueDateMovie(null)
    }
    const setTypeUser = (type: string) => {
        setTypeSearchUser(type)
        setValueDateUser(null)
    }
    const setTypeNhanSu = (type: string) => {
        setTypeSearchNhanSu(type)
        setValueDateNhanSu(null)
    }
    return (
        <>
            <div className='mb-[20px] text-2xl mt-[-55px] flex gap-5' ><div className={`cursor-pointer ${convert === 0 ? "border rounded px-2 py-1 bg-slate-500 transition-all" : ""}`} onClick={() => setConvert(0)}>Xu hướng</div> | <div className={`cursor-pointer  ${convert === 1 ? "border rounded px-2 py-1 bg-slate-500 transition-all" : ""}`} onClick={() => setConvert(1)}>Bảng xếp hạng</div></div>
            <div className={` ${convert === 0 ? "transition-all duration-300" : "hidden"}`}>
                <div className="mt-[20px] flex justify-around ">
                    <div>
                        <div className="mb-[25px] text-2xl">Top 5 Sản phẩm  </div>
                        <div className='mb-[40px]'>
                            <Space direction="vertical" size={12}>
                                <div className="flex gap-[40px]">
                                    <Select value={typeSearchFood} onChange={(e) => setTypeFood(e)}>
                                        <Option value="month">Month</Option>
                                        <Option value="year">Year</Option>
                                    </Select>
                                    <DatePicker picker={typeSearchFood} onChange={onChangeFood} defaultValue={dayjs(`${valueDateFood}`, `${typeSearchFood === 'month' ? "MM / YYYY" : "YYYY"}`)} format={`${typeSearchFood === 'month' ? "MM / YYYY" : "YYYY"}`} className='w-[100px]' />
                                    <Button onClick={() => handleSelectFoods()}>Tra cứu</Button>
                                </div>
                            </Space>
                        </div>
                        {dataChartFoods && dataChartFoods.length > 0 ? (
                            <BarChart width={400} height={300} data={dataChartFoods}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}>
                                <XAxis dataKey="food_name" tickFormatter={() => ``} padding={{ left: 20 }} />
                                <YAxis domain={[0, Number(maxChartFood)]} tickCount={20} tickSize={0} height={600} tickFormatter={(value) => `${(Number(value))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`} padding={{}} />
                                <Tooltip content={<ContentRechart label={`food_name`} />} />
                                <Legend content={<Content data="Foods" />} />
                                <Bar dataKey="total_revenue" fill="#8884d8" />
                            </BarChart>
                        ) : (
                            <div
                                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                role="status">
                                <span
                                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                >Loading...</span>
                            </div>
                        )}
                    </div>
                    <div></div>
                    <div>
                        <div className="mb-[25px] text-2xl">Top 5 Phim  </div>
                        <div className='mb-[40px]'>
                            <Space direction="vertical" size={12}>
                                <div className="flex gap-[40px]">
                                    <Select value={typeSearchMovies} onChange={(e) => setTypeMovies(e)}>
                                        <Option value="month">Month</Option>
                                        <Option value="year">Year</Option>
                                    </Select>
                                    <DatePicker picker={typeSearchMovies} onChange={onChangeMovies} defaultValue={dayjs(`${valueDateMovie}`, `${typeSearchMovies === 'month' ? "MM / YYYY" : "YYYY"}`)} format={`${typeSearchMovies === 'month' ? "MM / YYYY" : "YYYY"}`} className='w-[100px]' />
                                    <Button onClick={() => handleSelectMovies()}>Tra cứu</Button>
                                </div>
                            </Space>
                        </div>
                        {dataChartMovies && dataChartMovies.length > 0 ? (
                            <BarChart width={400} height={300} data={dataChartMovies}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}>
                                <XAxis dataKey="movie_name" tickFormatter={() => ``} padding={{ left: 20 }} />
                                <YAxis domain={[0, Number(maxChartMovies)]} tickCount={20} tickSize={0} height={600} tickFormatter={(value) => `${(Number(value))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`} padding={{}} />
                                <Tooltip content={<ContentRechart />} />
                                <Legend content={<Content data="Movies" />} />
                                <Bar dataKey="total_revenue" fill="#8884d8" />
                            </BarChart>
                        ) : (
                            <div
                                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                role="status">
                                <span
                                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                >Loading...</span>
                            </div>
                        )}
                    </div>
                </div >
                <div className='flex justify-around mt-[30px]'>
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm text-center">
                            <thead className="ltr:text-left rtl:text-right bg-gray-100">
                                <tr>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">STT</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Sản phẩm</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Tổng lượng sản phẩm bán</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Tổng doanh thu (VNĐ)</th>
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
                                <tbody>
                                    <tr>
                                        <td colSpan={4} className='flex items-center justify-center h-40 text-xl text-gray-500'>
                                            Thông tin trống
                                        </td>
                                    </tr>
                                </tbody>
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
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Tổng doanh thu (VNĐ)</th>
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
                                <tbody>
                                    <tr>
                                        <td colSpan={4} className='flex items-center justify-center h-40 text-xl text-gray-500'>
                                            Thông tin trống
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
            </div >
            <div className={`${convert === 1 ? "" : "hidden"} mt-[10px]`}>
                <div className='mb-[20px] flex gap-5' ><div className={`cursor-pointer ${convert1 === 0 ? "border rounded px-2 py-1 bg-slate-500 transition-all" : ""}`} onClick={() => setConvert1(0)}>Top 5 người dùng</div> | <div className={`cursor-pointer  ${convert1 === 1 ? "border rounded px-2 py-1 bg-slate-500 transition-all" : ""}`} onClick={() => setConvert1(1)}>Top 5 nhân viên</div></div>
                <div className={`${convert1 === 0 ? "" : "hidden"}`}>
                    <div className='mb-[40px]'>
                        <Space direction="vertical" size={12}>
                            <div className="flex gap-[40px]">
                                <Select value={typeSearchUser} onChange={(e) => setTypeUser(e)}>
                                    <Option value="month">Month</Option>
                                    <Option value="year">Year</Option>
                                </Select>
                                <DatePicker picker={typeSearchUser} onChange={onChangeUser} defaultValue={dayjs(`${valueDateUser}`, `${typeSearchUser === 'month' ? "MM / YYYY" : "YYYY"}`)} format={`${typeSearchUser === 'month' ? "MM / YYYY" : "YYYY"}`} className='w-[100px]' />
                                <Button onClick={() => handleSelectUsers()}>Tra cứu</Button>
                            </div>
                        </Space>
                    </div>
                    <div className='mx-[25%]'>
                        {dataChartUsers && dataChartUsers.length > 0 ? (
                            <BarChart width={600} height={400} data={dataChartUsers}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}>
                                <XAxis dataKey="name" tickFormatter={() => ``} padding={{ left: 20 }} />
                                <YAxis domain={[0, Number(maxChartUser)]} tickCount={20} tickSize={0} height={600} tickFormatter={(value) => `${(Number(value))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`} padding={{}} />
                                <Tooltip content={<ContentRechart label={`name`} />} />
                                <Legend content={<Content data="Người dùng" />} />
                                <Bar dataKey="total_spent" fill="#8884d8" />
                            </BarChart>
                        ) : (
                            <div
                                className="ml-[250px] my-[50px] inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                role="status">
                                <span
                                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                >Loading...</span>
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="overflow-x-auto rounded-lg border border-gray-200">
                            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm text-center">
                                <thead className="ltr:text-left rtl:text-right bg-gray-100">
                                    <tr>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">STT</th>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Người dùng</th>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Mã người dùng</th>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Email</th>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Số điện thoại</th>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Tổng tiêu thụ (VNĐ)</th>
                                    </tr>
                                </thead>
                                {dataUsers && dataUsers.length > 0 ? (
                                    <tbody className="divide-y divide-gray-200">
                                        {dataUsers.map((value: any, index: number) => (
                                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index + 1}</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-900">{value?.name}</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{value?.user_code}</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-900">{value?.email}</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{value?.phone_number}</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{(Number(value?.total_spent))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                ) : (
                                    <tbody>
                                        <tr>
                                            <td colSpan={4} className='flex items-center justify-center h-40 text-xl text-gray-500'>
                                                Thông tin trống
                                            </td>
                                        </tr>
                                    </tbody>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
                <div className={`${convert1 === 1 ? "" : "hidden"}`}>
                    <div className='mb-[40px]'>
                        <Space direction="vertical" size={12}>
                            <div className="flex gap-[40px]">
                                <Select value={typeSearchNhanSu} onChange={(e) => setTypeNhanSu(e)}>
                                    <Option value="month">Month</Option>
                                    <Option value="year">Year</Option>
                                </Select>
                                <DatePicker picker={typeSearchNhanSu} onChange={onChangeNhanSu} defaultValue={dayjs(`${valueDateNhanSu}`, `${typeSearchNhanSu === 'month' ? "MM / YYYY" : "YYYY"}`)} format={`${typeSearchNhanSu === 'month' ? "MM / YYYY" : "YYYY"}`} className='w-[100px]' />
                                <Button onClick={() => handleSelectNhanSu()}>Tra cứu</Button>
                            </div>
                        </Space>
                    </div>
                    <div className='mx-[25%]'>
                        {dataChartNhanSu && dataChartNhanSu.length > 0 ? (
                            <BarChart width={600} height={400} data={dataChartNhanSu}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}>
                                <XAxis dataKey="name" tickFormatter={() => ``} padding={{ left: 20 }} />
                                <YAxis domain={[0, Number(maxChartNhanSu)]} tickCount={20} tickSize={0} height={600} tickFormatter={(value) => `${(Number(value))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`} padding={{}} />
                                <Tooltip content={<ContentRechart label={`name`} />} />
                                <Legend content={<Content data="Nhân viên" />} />
                                <Bar dataKey="total_spent" fill="#8884d8" />
                            </BarChart>
                        ) : (
                            <div
                                className="ml-[250px] my-[50px] inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                role="status">
                                <span
                                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                >Loading...</span>
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="overflow-x-auto rounded-lg border border-gray-200">
                            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm text-center">
                                <thead className="ltr:text-left rtl:text-right bg-gray-100">
                                    <tr>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">STT</th>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Nhân viên</th>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Mã nhân viên</th>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Số điện thoại</th>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Doanh thu (VNĐ)</th>
                                    </tr>
                                </thead>
                                {dataNhanSu && dataNhanSu.length > 0 ? (
                                    <tbody className="divide-y divide-gray-200">
                                        {dataNhanSu.map((value: any, index: number) => (
                                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index + 1}</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-900">{value?.name}</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{value?.personnel_code}</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-900">{value?.email}</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{value?.phone_number}</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{(Number(value?.total_spent))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                ) : (
                                    <tbody>
                                        <tr>
                                            <td colSpan={4} className='flex items-center justify-center h-40 text-xl text-gray-500'>
                                                Thông tin trống
                                            </td>
                                        </tr>
                                    </tbody>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeAdmin