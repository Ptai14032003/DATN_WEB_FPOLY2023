import React, { useState } from 'react';
import { Button, Modal } from 'antd';
type Props = {
    data: string
}
const DescriptionPhim = ({ data }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataDesc, setDesc] = useState("");
    const showModal = () => {
        setIsModalOpen(true);
        setDesc(data)
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setDesc("")
    };
    return (
        <>
            <Button onClick={showModal}>Description</Button>

            <Modal title="Description" open={isModalOpen} onCancel={handleCancel} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }} className="text-center px-[85px]">
                <p>{dataDesc}</p>
            </Modal>
        </>
    )
}

export default DescriptionPhim