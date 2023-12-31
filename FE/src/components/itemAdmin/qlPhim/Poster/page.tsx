import React, { useState } from 'react';
import { Button, Image, Modal } from 'antd';
type Props = {
    data: string
}
const PosterPhim: React.FC<Props> = ({ data }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataTrailer, setTrailer] = useState("");
    const showModal = () => {
        setIsModalOpen(true);
        setTrailer(data)
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setTrailer("")
    };
    return (
        <>
            <Button onClick={showModal}>Poster</Button>

            <Modal title="Poster" open={isModalOpen} onCancel={handleCancel} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }} className="text-center px-[85px]">
                <Image width={300} src={dataTrailer} alt="Lỗi poster" />

            </Modal>
        </>
    )
};

export default PosterPhim;