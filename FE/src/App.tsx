import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LayoutAdmin from './components/layouts/layoutAdmin/page'
import AdminQlSc from './admin/qlSc/page'
import AdminQlSp from './admin/qlFood/page'
import AdminQlNhanSu from './admin/qlNhanSu/page'
import AdminQlGuest from './admin/qlGuest/page'
import AdminQlDiscount from './admin/discount/page'
import AdminQlPhongChieu from './admin/qlphongChieu/page'
import AdminQlPhim from './admin/qlPhim/page'
import AdminQlActors from './admin/itemAdmin/actors/page'
import DsCountry from './admin/itemAdmin/countries/page'
import DsGenres from './admin/itemAdmin/listGenres/page'
import ThongKe from './admin/thongKe/page'
import LayoutPerson from './components/layouts/layoutGuest/LayoutPerson'
import NewFilm from './personPage/newFilm'
import HomePage from './personPage/Homepage'
import Signin from './personPage/Signin'
import Signup from './personPage/Signup'
import Booking from './personPage/Booking'
import Detail from './personPage/detail.tsx'
import Seat from './components/itemAdmin/Seat/page.tsx'
import TicketPrice from './personPage/TicketPrice.tsx'
import Profile from './personPage/Profile.tsx'
import CheckPay from './personPage/checkPay.tsx'
import Payment from './personPage/Payment.tsx'


function App() {

  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<LayoutPerson />}>
        <Route index element={<HomePage />} />
        <Route path="new" element={<NewFilm />} />
        <Route path="seat" element={<Seat />} />
      </Route>
      <Route path="ticket-price" element={<TicketPrice />} />
      <Route path="profile" element={<Profile />} />
      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<Signup />} />
      <Route path='movie_show_time/:id' element={<Detail />}></Route>
      <Route path='booking/:id' element={<Booking />} />
      <Route path='payment' element={<Payment />} />

      <Route path='/admin' element={<LayoutAdmin />}>
        <Route path='qlPhim' element={<AdminQlPhim />}></Route>
        <Route path='qlSuatChieu' element={<AdminQlSc />}></Route>
        <Route path='qlSanPham' element={<AdminQlSp />}></Route>
        <Route path='qlNhanSu' element={<AdminQlNhanSu />}></Route>
        <Route path='qlGuest' element={<AdminQlGuest />}></Route>
        <Route path='qlPhongChieu' element={<AdminQlPhongChieu />}></Route>
        <Route path='voucher' element={<AdminQlDiscount />}></Route>
        <Route path='actors' element={<AdminQlActors />}></Route>
        <Route path='country' element={<DsCountry />}></Route>
        <Route path='listGenres' element={<DsGenres />}></Route>
        <Route path='thongKe' element={<ThongKe />}></Route>
      </Route>
      <Route path="listvnp" element={<CheckPay />} />
    </Routes>
  </BrowserRouter>
}

export default App
