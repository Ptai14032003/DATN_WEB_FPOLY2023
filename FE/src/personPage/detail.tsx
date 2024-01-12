import { useNavigate, useParams } from "react-router-dom"
import "./page.css"
import { useFetchMovieIdPersonQuery } from "../rtk/moviesPerson/moviesPerson"
import Footer from "../components/layouts/layoutGuest/footer";
import { useEffect, useState } from "react";
import { message } from "antd";
import Menu from "../components/layouts/layoutGuest/menu";
export default function Detail() {
    const { id } = useParams()
    const { data: movieBooking, error } = useFetchMovieIdPersonQuery(id);
    const [checkError, setCheckError] = useState(true);
    const movie = movieBooking?.movie
    const st_movie = movieBooking?.st_movie
    const [dataTime, setDataTime] = useState<any>();
    const [dataDate, setDataDate] = useState<any>("")
    const navigate = useNavigate();
    const redirectToLink = (link: any) => {
        navigate(link);
    };
    useEffect(() => {
        if (error && checkError) {
            message.success("Phim chưa được cập nhật các suất chiếu !", 1).then(() => {
                navigate("/")
            })
            setCheckError(false)
            return;
        }
    }, [error, checkError])
    const onClick = (date: any) => {
        st_movie.map((item: any) => {
            if (date === item.date) {
                setDataTime(item.showtimes);
                setDataDate(item.date)
            }
        })
    }
    return (
        <div className="container-detail text-white">
            <div>
                <Menu />
            </div>
            <div>
                <iframe width="100%" height="700" src={movie?.trailer} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
            <div className="mx-[5%] mb-[5%]">
                <div className="flex gap-[8%] my-[3%]">
                    <div className="block w-[190px]">
                        <div className="mb-[25px]"><span className="text-left">{movie?.movie_name}</span></div>
                        <div className="w-[190px]"><img width="190" height="240" src={movie?.image} alt="" /></div>
                    </div>
                    <div className="w-[100%] mt-[3%]">
                        <div className="w-[20%] ">
                            <div className="flex gap-20">
                                {st_movie?.map((item: any) => (
                                    <button key={item.date} className={`btn-date ${dataDate === item?.date ? "btn-date-action text-red-400" : ""}`} onClick={() => onClick(item?.date)}>
                                        <div className="w-[90px] h-full flex flex-col items-center justify-center text-xs transition-colors">
                                            <span>{item.weekday}</span>
<!--                                            <span className="text-xl font-bold">{item?.show_date}</span> -->

                                            <span className="text-xl font-bold">{item?.date}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                            <div className="flex gap-20">
                                {dataTime?.map((data: any) => (
                                    <div key={data?.show_time} className="w-[70%] mt-[20px] text-black">
                                        <button className="detail-time w-[90px] h-[40px] bg-white rounded-sm" onClick={() => redirectToLink('/booking/' + movie?.id + `?show_seat=${data?.showtime_id}`)}>
                                            <p className="font-bold text-sm">{data?.show_time}</p>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
                <div className="border-b-2 pb-[15px] text-xl ">
                    <div className="flex">
                        <span className="w-[50%]">Chi tiết</span>
                        <span>Mô tả</span>
                    </div>
                </div>
                <div className="flex justify-around">
                    <div className="w-[1600px] pr-[50px]">
                        <div className="detail-content">
                            <div>Quốc gia</div>
                            <div>{movie?.country_name}</div>
                        </div>
                        <div className="detail-content">
                            <div>Đạo diễn</div>
                            <div>{movie?.director}</div>
                        </div>
                        <div className="detail-content">
                            <div className="w-[100px]">Diễn Viên</div>
                            <span>{movie?.actor_name}</span>

                        </div>
                        <div className="detail-content">
                            <div>Thể loại</div>
                            <div>{movie?.genre}</div>
                        </div>
                        <div className="detail-content">
                            <div>Dạng phim</div>
                            <div>{movie?.type_name}</div>
                        </div>
                        <div className="detail-content">
                            <div>Khởi chiếu</div>
                            <div>{movie?.start_date}</div>
                        </div>
                        <div className="detail-content">
                            <div>Thời lượng</div>
                            <div>{movie?.movie_time} phút</div>
                        </div>
                        <div className="detail-content">
                            <div>Rated</div>
                            <div>C16 -  ĐỦ 16 TUỔI TRỞ LÊN (16+)</div>
                        </div>
                    </div>
                    <div className="mt-[20px]">
                        <span>{movie?.describe}</span>
                    </div>
                </div>
            </div>
            <footer>
                <Footer />
            </footer>

        </div >
    );
}
