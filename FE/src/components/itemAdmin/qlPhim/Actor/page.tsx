import { useState } from 'react';
import { Button, Modal } from 'antd';
type Props = {
    data: string
}
const ActorPhim = ({ data }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataActor, setActor] = useState("");
    const showModal = () => {
        setIsModalOpen(true);
        setActor(data)
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setActor("")
    };
    return (
        <>
            <Button onClick={showModal}>ActorMovies</Button>

            <Modal title="Actor" open={isModalOpen} onCancel={handleCancel} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }} className="text-center px-[85px]">
                <p>{dataActor}</p>
            </Modal>
        </>
    )
}

export default ActorPhim