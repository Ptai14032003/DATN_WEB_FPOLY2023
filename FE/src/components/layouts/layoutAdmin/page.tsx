import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { NavLink, Outlet, redirect } from 'react-router-dom';
import HeaderAdmin from './headerAdmin';
import { HomeOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Trang chủ', '1', <NavLink to="/admin/"><HomeOutlined width={10} /> </NavLink>,),
    getItem('Quản lý phim', '2', <NavLink to="/admin/qlPhim"><img src="/qlphim.png" alt="" width={10} /> </NavLink>,),
    getItem('Quản lý suất chiếu', '3', <NavLink to="/admin/qlSuatChieu"><img src="/qlsc.png" alt="" width={10} /> </NavLink>),
    getItem('Quản lý phòng chiếu', '4', <NavLink to="/admin/qlPhongChieu"><img src="/qlkh.png" alt="" width={10} /></NavLink >),
    getItem('Quản lý sản phẩm', '5', <NavLink to="/admin/qlSanPham"><img src="/qlfood.png" alt="" width={10} /></NavLink>),
    getItem('Quản lý nhân sự', '6', <NavLink to="/admin/qlNhanSu"><img src="/qlnv.png" alt="" width={10} /></NavLink>),
    getItem('Quản lý khách hàng', '7', <NavLink to="/admin/qlGuest"><img src="/qlkh.png" alt="" width={10} /></NavLink >),
    getItem('Thống kê', '8', <img src="/tke.png" alt="" width={10} />),
    getItem('Lịch sử', '9', <img src="/ls.png" alt="" width={10} />),
    getItem('Voucher', '10', <NavLink to="/admin/voucher" > <img src="/voucher.png" alt="" width={10} /></NavLink >),
    getItem('Sự cố', '11', <img src="/error.png" alt="" width={10} />)
];

const AdminLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    // const userString = localStorage.getItem('user');
    // const user = userString ? JSON.parse(userString) : null;
    // console.log(user.role);
    // if (user.role !== 'Admin') {
    //     redirect('/')
    // }
    return (
        <div>
            <HeaderAdmin />
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
                </Sider>
                <Layout>
                    <Header style={{ padding: 0, background: colorBgContainer }} />
                    <Content style={{ margin: '0 10px' }}>
                        <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
                            <Outlet />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default AdminLayout;