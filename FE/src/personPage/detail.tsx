import { useNavigate, useParams } from "react-router-dom"
import "./page.css"
import { useFetchMovieIdPersonQuery } from "../rtk/moviesPerson/moviesPerson"
export default function Detail() {
    const { id } = useParams()
    const { data: movieBooking } = useFetchMovieIdPersonQuery(id);

    const movie = movieBooking?.movie
    const st_movie = movieBooking?.st_movie
    const genres = movieBooking?.movie_genres
    const actor = movieBooking?.actor
    const navigate = useNavigate();
    const redirectToLink = (link: any) => {
        navigate(link);
    };
console.log(st_movie);


    return (
        <div className="container-detail text-white">
            <>
                <div>
                    <iframe width="100%" height="700" src={movie?.trailer} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
                <div className="mx-[5%]">
                    <div className="flex gap-[8%] my-[3%]">
                        <div className="block w-[190px]">
                            <div className="mb-[25px]"><span className="text-left">{movie?.movie_name}</span></div>
                            <div className="w-[190px]"><img width="190" height="240" src={movie?.image} alt="" /></div>
                        </div>
                        <div className="w-[100%] mt-[3%] flex ">
                            {st_movie?.map((item: any) => (
                                <div className="w-[20%]">
                                    <div className="flex border-b-2 border-red">
                                        <button key={item.id} className={`btn-date`}>
                                            <div className="w-[90px] h-full flex flex-col items-center justify-center text-xs transition-colors">
                                                <span>Thứ năm</span>
                                                <span className="text-xl font-bold">{item.show_date}</span>
                                            </div>
                                        </button>
                                    </div>
                                    <div className="w-[70%] grid grid-cols-5 gap-5 mt-[20px] text-black">
                                        <button className="detail-time w-[100px] h-[40px] bg-white rounded-sm" onClick={() => redirectToLink('/booking/' + movie?.id + `?show_seat=${item?.showtime_id}`)}>
                                            <p className="font-bold text-sm">{item.show_time}</p>
                                        </button>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border-b-2 pb-[15px] text-xl ">
                        <div className="flex">
                            <span className="w-[50%]">Chi tiết</span>
                            <span>Mô tả</span>
                        </div>
                    </div>
                    <div className="flex justify-around">
                        <div className="w-[65%] mr-[50px]">
                            <div className="detail-content">
                                <div>Đạo diễn</div>
                                <div>{movie?.director}</div>
                            </div>
                            <div className="detail-content">
                                <div>Diễn Viên</div>
                                <div>
                                    {actor?.map((item: any) => (
                                        <span className="mx-[5px]">{item.actor_name},</span>
                                    ))}
                                </div>

                            </div>
                            <div className="detail-content">
                                <div>Thể loại</div>
                                <div>
                                    {genres?.map((item: any) => (
                                        <span className="mx-[5px]" key={item.id}>{item.genre},</span>
                                    ))}
                                </div>
                            </div>
                            <div className="detail-content">
                                <div>Khởi chiếu</div>
                                <div>{movie?.start_date}</div>
                            </div>
                            <div className="detail-content">
                                <div>Thời lượng</div>
                                <div>104 phút</div>
                            </div>
                            <div className="detail-content">
                                <div>Ngôn ngữ</div>
                                <div>Tiếng Anh - Phụ đề Tiếng Việt</div>
                            </div>
                            <div className="detail-content">
                                <div>Rated</div>
                                <div>C16 -  ĐỦ 16 TUỔI TRỞ LÊN (16+)</div>
                            </div>
                        </div>
                        <div className="mt-[20px]">
                            <span>Một huyền thoại Marvel mới sắp lộ diện. Là ác nhân hay anh hùng? Sẽ phá hủy hay chữa lành thế giới này? Morbius khởi chiếu 01.07.2023</span>
                        </div>
                    </div>
                    <div className="border-b-2 pb-[10px] text-lg mt-[8%] mb-[50px]">
                        <span>Diễn viên</span>
                    </div>
                    <div className="flex">
                        <div className="w-[40%]">
                            <div className="flex items-start gap-[30px] w-[280px] h-[120px] mb-[30px]">
                                <div className="rounded-full">
                                    <img width="120" height="120" src="/performer2.png" alt="" />
                                </div>
                                <div className="py-[14%]">Jared Leto</div>
                            </div>
                            <div className="flex items-start gap-[30px] w-[280px] h-[120px] mb-[30px]">
                                <div className="rounded-full">
                                    <img width="120" height="120" src="/performer3.png" alt="" />
                                </div>
                                <div className="py-[14%]">Matt Smith</div>
                            </div>
                            <div className="flex items-start gap-[30px] w-[280px] h-[120px] mb-[30px]">
                                <div className="rounded-full">
                                    <img width="120" height="120" src="/performer1.png" alt="" />
                                </div>
                                <div className="py-[14%]">Adria Arjona</div>
                            </div>
                            <div className="flex items-start gap-[30px] w-[280px] h-[120px] mb-[30px]">
                                <div className="rounded-full">
                                    <img width="120" height="120" src="/performer4.png" alt="" />
                                </div>
                                <div className="py-[14%]">Michael Keaton</div>
                            </div>
                        </div>
                        <div className="w-[70%]">
                            <img width="100%" src="/detailPhim.png" alt="" />
                        </div>
                    </div>
                </div>
            </>


        </div >
    );
}
