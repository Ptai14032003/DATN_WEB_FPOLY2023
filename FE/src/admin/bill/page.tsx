import React, { useEffect, useState } from 'react';
import { Space, Table, Input, Button, message, Popconfirm, Image } from 'antd';
import { useDeleteMoviesMutation } from '../../rtk/movies/movies';
import { Waveform } from '@uiball/loaders';
import { checkApiStatus } from "../checkApiStatus"; // Import hàm trợ giúp
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { useFetchBillAdminQuery } from '../../rtk/bill/bill';

const { Column } = Table;

export type QlPhim = {
    key: string;
    user_code: string;
    user_name: string;
    personnel_code: string;
    personnel_name: string;
    total_ticket: number;
    total_combo: number;
    additional_fee: string;
    total_money: number;
    movie_name: string
    image: string;
    booking_date: string;
    show_date: string;
    payment_status: string
}
const AdminQlBill: React.FC = () => {
    const { data: dataBill, isLoading, error } = useFetchBillAdminQuery()
    const navigate = useNavigate();
    const status = error?.status;
    //checkApiStatus(status);
    const [deleteMovie] = useDeleteMoviesMutation()
    const [dataTable, setDataTable] = useState<QlPhim[]>([])
    const [searchTerm, setSearchTerm] = useState('');
    const fuseOptions = {
        includeScore: true,
        includeMatches: true,
        isCaseSensitive: true,
        findAllMatches: true,
        useExtendedSearch: true,
        keys: ["user_code", "user_name", "payment_status"]
    }

    const fuse = new Fuse(dataBill, fuseOptions)

    const searchProject = (value: string) => {

        setSearchTerm(value);
    };
    const deleteOne = (key: string) => {
        deleteMovie(key).then(() => message.success("Xóa thành công"))
    }
    const checkLocal = localStorage.getItem("user");
    const checkUser = checkLocal ? JSON.parse(checkLocal) : null;
    const checkRoleAdmin = checkUser?.role === "Admin"
    useEffect(() => {
        // chưa có kiểu dữ liệu cho data
        if (Array.isArray(dataBill)) {
            const mapMovies = dataBill.map((item: any) => ({
                key: item.id,
                user_code: item.user_code,
                user_name: item.user_name,
                personnel_code: item.personnel_code,
                personnel_name: item.personnel_name,
                total_ticket: item.total_ticket,
                total_combo: item.total_combo,
                additional_fee: item.additional_fee,
                total_money: item.total_money,
                movie_name: item.movie_name,
                image: item.image,
                booking_date: item.booking_date,
                show_date: item.show_date,
                payment_status: item.payment_status,
            }))
            setDataTable(mapMovies)
        }
        if (status) {
            checkApiStatus(status, navigate);
        }
    }, [dataBill, status])

    useEffect(() => {
        if (searchTerm.length > 0) {
            const results = fuse?.search(searchTerm);
            const newData = results?.map((result) => result.item);
            if (Array.isArray(newData)) {
                const mapMovies = newData.map((item: any) => ({
                    key: item.id,
                    user_code: item.user_code,
                    user_name: item.user_name,
                    personnel_code: item.personnel_code,
                    personnel_name: item.personnel_name,
                    total_ticket: item.total_ticket,
                    total_combo: item.total_combo,
                    additional_fee: item.additional_fee,
                    total_money: item.total_money,
                    movie_name: item.movie_name,
                    image: item.image,
                    booking_date: item.booking_date,
                    show_date: item.show_date,
                    payment_status: item.payment_status,
                }))
                setDataTable(mapMovies)
            }
        }
        if (searchTerm.length === 0) {
            if (Array.isArray(dataBill)) {
                const mapMovies = dataBill.map((item: any) => ({
                    key: item.id,
                    user_code: item.user_code,
                    user_name: item.user_name,
                    personnel_code: item.personnel_code,
                    personnel_name: item.personnel_name,
                    total_ticket: item.total_ticket,
                    total_combo: item.total_combo,
                    additional_fee: item.additional_fee,
                    total_money: item.total_money,
                    movie_name: item.movie_name,
                    image: item.image,
                    booking_date: item.booking_date,
                    show_date: item.show_date,
                    payment_status: item.payment_status,
                }))
                setDataTable(mapMovies)
            }
        }
    }, [searchTerm, dataBill])

    return (
        <div>
            <div className='mb-[25px] mt-[-30px] text-2xl' >Danh sách Bill</div>
            <div className='flex justify-between mb-[10px]'>
                <Input style={{ width: '20%' }} placeholder='Tìm kiếm bill'
                    value={searchTerm}
                    onChange={(e) => searchProject(e.target.value)} />
            </div>
            {isLoading ? (
                <Waveform
                    size={40}
                    lineWeight={3.5}
                    speed={1}
                    color="black"
                />
            ) : (
                <Table dataSource={dataTable} pagination={{ pageSize: 4, }}>
                    <Column title="Mã người dùng " dataIndex="user_code" key="user_code" />
                    <Column title="Tên người dùng " dataIndex="user_name" key="user_name" />
                    <Column title="Phim " dataIndex="movie_name" key="movie_name" />
                    <Column title="Poster " dataIndex="image" key="image" render={(image: any) => (
                        <Image
                            width={100}
                            src={image}
                        />
                    )} />
                    <Column title="Tổng vé" dataIndex="total_ticket" key="total_ticket" />
                    <Column title="Tổng combo" dataIndex="total_combo" key="total_combo" />
                    <Column title="Tổng tiền" dataIndex="total_money" key="total_money" render={(price: any) => (Number(price))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} />
                    <Column title="Trang thái" dataIndex="payment_status" key="payment_status" />
                    {checkRoleAdmin && (
                        <Column
                            title="Action"
                            key="action"
                            render={(_: any, record: QlPhim) => (
                                <Space size="middle">
                                    <a>
                                        <Popconfirm
                                            title="Xoá"
                                            description="Bạn có muốn xoá bill này?"
                                            onConfirm={() => {
                                                deleteOne(record.key);
                                            }}
                                            okButtonProps={{
                                                style: { backgroundColor: "#007bff" },
                                            }}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <Button danger>Delete</Button>
                                        </Popconfirm></a>
                                </Space>
                            )}
                        />
                    )}
                </Table>
            )}
        </div>
    );
}
export default AdminQlBill;