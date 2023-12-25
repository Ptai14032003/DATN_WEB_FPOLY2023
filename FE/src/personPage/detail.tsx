import { useNavigate, useParams } from "react-router-dom"
import "./page.css"
import { useFetchMovieIdPersonQuery } from "../rtk/moviesPerson/moviesPerson"

import Footer from "../components/layouts/layoutGuest/footer";

import { FormComment, formComment } from "../types/comment"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react";
import { useForm } from "react-hook-form"; 

export default function Detail() {
    const { id } = useParams()
    const { data: movieBooking } = useFetchMovieIdPersonQuery(id);
    const { register, handleSubmit, formState: { errors }, } = useForm<FormComment>({
        resolver: yupResolver(formComment),
    })
    const movie = movieBooking?.movie
    const st_movie = movieBooking?.st_movie
    const genres = movieBooking?.movie_genres
    const actor = movieBooking?.actor
    const navigate = useNavigate();
    const redirectToLink = (link: any) => {
        navigate(link);
    };
    const [checkComment, setComment] = useState(false)
    const [checkPhanHoi, setPhanHoi] = useState<number>(0)
    const postComment = () => {

    }
    const closeComment = () => {
        setPhanHoi(0)
    }
    const onSubmit = (data: any) => {
        console.log(data);

    }
    return (
        <div className="container-detail text-white">

                <div>
                    <iframe width="100%" height="700" src={movie?.trailer} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
                <div className="mx-[5%] mb-[5%]">
                    <div className="flex gap-[8%] my-[3%]">
                        <div className="block w-[190px]">
                            <div className="mb-[25px]"><span className="text-left">{movie?.movie_name}</span></div>
                            <div className="w-[190px]"><img width="190" height="240" src={movie?.image} alt="" /></div>
                        </div>
                        <div className="w-[100%] mt-[3%] flex ">
                            {st_movie?.map((item: any) => (
                                <div className="w-[20%]" key={item.show_date}>
                                    <div className="flex border-b-2 border-red">
                                        <button className={`btn-date`}>
                                            <div className="w-[90px] h-full flex flex-col items-center justify-center text-xs transition-colors">
                                                <span>{item.weekday}</span>
                                                <span className="text-xl font-bold">{item?.show_date}</span>
                                            </div>
                                        </button>
                                    </div>
                                    <div className="w-[70%] grid grid-cols-5 gap-5 mt-[20px] text-black">
                                        <button className="detail-time w-[100px] h-[40px] bg-white rounded-sm" onClick={() => redirectToLink('/booking/' + movie?.id + `?show_seat=${item?.showtime_id}`)}>
                                            <p className="font-bold text-sm">{item?.show_time}</p>
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
                                        <span className="mx-[5px]" key={item.actor_name}>{item?.actor_name},</span>
                                    ))}
                                </div>

                            </div>
                            <div className="detail-content">
                                <div>Thể loại</div>
                                <div>
                                    {genres?.map((item: any) => (
                                        <span className="mx-[5px]" key={item?.genre}>{item?.genre},</span>
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
            </div>
            <div className="w-[90%] mx-auto bg-white text-black px-[25px] py-[15px]">
                <h2 className="mb-[15px]">Bình luận</h2>
                <div className="flex gap-10 rounder">
                    <div><img src="/avata.jpg" alt="" width={56} height={48} /></div>
                    <div className={`w-[75%] h-[85px] relative ${checkComment === true ? "bg-[#f5f6f7]" : ""} `}>
                        <input type="text" name="" id="" className="w-[100%] h-[50px] outline-none border-[2px] pl-2 placeholder:text-gray-500 text-[15px] " placeholder="Viết bình luận ....." autoComplete="false" onClick={() => setComment(true)} />
                        <div className={`bg-blue-600 w-[60px] my-[6px] absolute right-5 text-center ${checkComment === true ? "" : "hidden"}`}>
                            <button type="submit" className="rounder bg-transparent text-white" onSubmit={() => postComment()}>Đăng</button>
                        </div>
                    </div>
                </div>
                <div className={`flex gap-10 mb-[90px] ${checkPhanHoi === 0 ? "" : `${checkPhanHoi === 1 ? "" : ``}`}`}>
                    <div><img src="/avata.jpg" alt="" width={56} height={48} /></div>
                    <div className={`w-[75%] h-[85px] block`}>
                        <div className="text-[#4267b2] font-bold">Đinh Tài</div>
                        <div className="">Cuốn vc :)))</div>
                        <div className="flex gap-2 text-[12px] text-blue-500 mt-2">
                            <div className="btn-comment hover:cursor-pointer">Thích</div>
                            <div>-</div>
                            <div className="btn-comment hover:cursor-pointer" onClick={() => { setPhanHoi(1) }}>Phản hồi</div>
                            <div>-</div>
                            <div className="text-slate-400">4 ngày</div>
                        </div>
                        <div className={`border-l-[1px] pl-[10px] ${checkPhanHoi === 1 ? "" : "hidden"}`}>
                            <div className="flex gap-4 rounded mt-[10px] ">
                                <div><img src="/avata.jpg" alt="" width={36} height={36} /></div>
                                <div className={`w-[75%] h-[90px] relative bg-[#f5f6f7]`}>
                                    <input type="text" name="" id="" className="w-[100%] h-[50px] outline-none border-[2px] pl-2 placeholder:text-gray-500 text-[15px] " placeholder="Viết bình luận ....." autoComplete="false" />
                                    <div className={`bg-transparent w-[60px] my-[6px] absolute right-[120px] text-center rounded border-[2px]`}>
                                        <button type="submit" className="bg-transparent mx-[10px] text-slate-500" onClick={() => closeComment()}>Huỷ</button>
                                    </div>
                                    <div className={`bg-blue-600 w-[80px] my-[6px] absolute right-5 text-center rounded border-[1px]`}>
                                        <button type="submit" className=" bg-transparent mx-[10px] text-white" onSubmit={() => postComment()}>Trả lời</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <footer>
                    <Footer/>
                </footer>
        </div >
    );
}
