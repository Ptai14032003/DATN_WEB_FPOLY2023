import React, { useState } from 'react';
import { Button, Modal } from 'antd';
type Props = {
    data: string
}
const TrailerPhim: React.FC<Props> = ({ data }: Props) => {
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
            <Button onClick={showModal}>Trailer Phim</Button>
            <Modal title="Trailer Phim" open={isModalOpen} onCancel={handleCancel} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }} className="text-center">
                <iframe width="100%" height="400px" src={dataTrailer} title="YouTube video player" allow="accelerometer; ; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-sautoplayhare" allowFullScreen></iframe>
            </Modal>
        </>
    )
};

export default TrailerPhim;