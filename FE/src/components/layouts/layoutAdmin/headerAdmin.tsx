import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Dropdown, MenuProps, Space } from "antd";
const HeaderAdmin: React.FC = () => {
    const checkLocal = localStorage.getItem("user");
    const checkUser = checkLocal ? JSON.parse(checkLocal) : null;
    const nameAdmin = checkUser?.name
    const navigate = useNavigate();
    const LogOut = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        navigate('/')
    }
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Button className="pb-10" onClick={LogOut}>
                    <div className="">Log out</div>
                </Button >
            ),
        },
    ];
    return (
        <div className="header-admin flex justify-around h-[90px]">
            <div>
                <img src="/logo.png" alt="" />
            </div>
            <div className="w-[1050px]"></div>
            <div className="flex">
                <Space direction="vertical">
                    <Space wrap>
                        <Dropdown menu={{ items }} placement="bottom">
                            <div className="flex mt-[18px]">
                                <div className=""><img src="/avatarAdmin.png" alt="" /></div>
                                <div className="text-white my-auto mx-[15px]">{nameAdmin}</div>
                            </div>
                        </Dropdown>
                    </Space>
                </Space>
            </div>
        </div>
    );
}
export default HeaderAdmin;