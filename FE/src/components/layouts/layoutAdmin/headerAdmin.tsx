import { Button, Dropdown, MenuProps, Space } from "antd";
const HeaderAdmin: React.FC = () => {
    const LogOut = () => {
        console.log("ngu vl");

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
                                <div className="text-white my-auto mx-[15px]">Admin</div>
                            </div>
                        </Dropdown>
                    </Space>
                </Space>
            </div>
        </div>
    );
}
export default HeaderAdmin;