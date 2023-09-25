import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LayoutAdmin from './components/layouts/layoutAdmin/page'
import AdminQlPhim from './admin/qlPhim/page'
import AdminQlSc from './admin/qlSc/page'
import AdminQlSp from './admin/qlSp/page'
function App() {
  return <BrowserRouter>
    <Routes>
      <Route path='/'>
      </Route>
      <Route path='/admin' element={<LayoutAdmin />}>
        <Route path='qlPhim' element={<AdminQlPhim />}></Route>
        <Route path='qlSuatChieu' element={<AdminQlSc />}></Route>
        <Route path='qlSanPham' element={<AdminQlSp />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
}

export default App
