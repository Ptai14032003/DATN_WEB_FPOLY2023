import React, { useState } from 'react';
import { Button, Modal } from 'antd';
type Props = {
    projects: string
}
const DetailBill: React.FC<Props> = ({ projects }: Props) => {
    console.log(projects);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button onClick={showModal}>Thêm sản phẩm mới</Button>
            <Modal title="Tạo sản phẩm mới" open={isModalOpen} onCancel={handleCancel} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }} className="text-center">
            </Modal>
        </>
    )
};

export default DetailBill;