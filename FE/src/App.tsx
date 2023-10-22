import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LayoutAdmin from './components/layouts/layoutAdmin/page'
import AdminQlSc from './admin/qlSc/page'
import AdminQlSp from './admin/qlSp/page'
import AdminQlNhanSu from './admin/qlNhanSu/page'
import AdminQlGuest from './admin/qlGuest/page'
import AdminQlDiscount from './admin/discount/page'
import AdminQlPhongChieu from './admin/qlphongChieu/page'
import AdminQlPhim from './admin/qlPhim/page'
function App() {
  return <BrowserRouter>
    <Routes>
      <Route path='/'>
      </Route>
      <Route path='/admin' element={<LayoutAdmin />}>
        <Route path='qlPhim' element={<AdminQlPhim />}></Route>
        <Route path='qlSuatChieu' element={<AdminQlSc />}></Route>
        <Route path='qlSanPham' element={<AdminQlSp />}></Route>
        <Route path='qlNhanSu' element={<AdminQlNhanSu />}></Route>
        <Route path='qlGuest' element={<AdminQlGuest />}></Route>
        <Route path='qlPhongChieu' element={<AdminQlPhongChieu />}></Route>
        <Route path='voucher' element={<AdminQlDiscount />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
}

export default App
