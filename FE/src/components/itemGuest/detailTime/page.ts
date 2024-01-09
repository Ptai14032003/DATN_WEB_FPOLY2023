import React from 'react'
import { useNavigate } from 'react-router-dom';

type Props = {
    data: []
}

const DetailTime = (props: Props) => {
    const navigate = useNavigate();
    const redirectToLink = (link: any) => {
        navigate(link);
    };
    return (
        <div className="w-[70%] grid grid-cols-5 gap-5 mt-[20px] text-black">
            <button className="detail-time w-[100px] h-[40px] bg-white rounded-sm" >
                <p className="font-bold text-sm">12</p>
            </button>
        </div>
    )
}

export default DetailTime