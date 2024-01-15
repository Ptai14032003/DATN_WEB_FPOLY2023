
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import LayoutAdmin from './components/layouts/layoutAdmin/page'
import AdminQlSp from './admin/qlFood/page'
import AdminQlNhanSu from './admin/qlNhanSu/page'
import AdminQlGuest from './admin/qlGuest/page'
import AdminQlDiscount from './admin/discount/page'
import AdminQlPhongChieu from './admin/qlphongChieu/page'
import AdminQlPhim from './admin/qlPhim/page'
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
import NotFound from './personPage/404.tsx'
import TicketHistory from './personPage/TicketHistory.tsx'
import ResetPassword from './personPage/ResetPassword.tsx'
import AdminQlBill from './admin/bill/page.tsx'
import BookingAdmin from './admin/booking/page.tsx'
import BookingAdminMovies from './admin/booking/booking.tsx'
import BookingSeatAdmin from './admin/booking/bookingSeat.tsx'
import HomeAdmin from './admin/home/page.tsx'
import ExportTicket from './admin/export/exportTicket.tsx'
import ShowingFilm from './personPage/showingFilm.tsx'
import ComingSoonFilm from './personPage/comingSoonFilm.tsx'
import ForgotPassword from './personPage/ForgotPassword.tsx'
import AdminQlSc from './admin/qlSc/page.tsx'

function App() {
  const checkLocal = localStorage.getItem("user");
  const checkUser = checkLocal ? JSON.parse(checkLocal) : null;
  const checkRoleAdmin = checkUser?.role === "Admin"
  const checkRoleNhansu = checkUser?.role === "Nhân Viên"
  // const checktab = document.addEventListener("visibilitychange", () => {
  //   if (document.hidden && checkLocal) {
  //     localStorage.removeItem("user")
  //   }
  // })
  // useEffect(() => {
  //   const timeUse = setInterval(() => {
  //     checktab
  //   }, 3600000)
  //   clearInterval(timeUse);
  //   return;
  // })
  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<LayoutPerson />}>
        <Route index element={<HomePage />} />
        <Route path="new" element={<NewFilm />} />
        <Route path="seat" element={<Seat />} />
      </Route>
      <Route path="showing-film" element={<ShowingFilm />} />
      <Route path="coming-soon-film" element={<ComingSoonFilm />} />
      <Route path="ticket-price" element={<TicketPrice />} />
      <Route path="ticket-history" element={<TicketHistory />} />
      <Route path="profile" element={<Profile />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset_password?" element={<ResetPassword />} />

      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<Signup />} />
      <Route path='movie_show_time/:id' element={<Detail />}></Route>
      <Route path='booking/:id' element={<Booking />} />
      <Route path='payment' element={<Payment />} />
      <Route path="listvnp" element={<CheckPay />} />
      {checkRoleNhansu && (
        <Route path='/admin' element={<LayoutAdmin />}>
          <Route path='' element={<HomeAdmin />}></Route>
          <Route path='qlGuest' element={<AdminQlGuest />}></Route>
          <Route path='bill_history' element={<AdminQlBill />}></Route>
          <Route path='booking'>
            <Route index element={<BookingAdmin />} />
            <Route path="movie_show_time/:id">
              <Route index element={<BookingAdminMovies />} />
              <Route path='seat/:id' element={<BookingSeatAdmin />} />
            </Route>
          </Route>
          <Route path='export-ticket' element={<ExportTicket />}></Route>
        </Route>
      )}
      {checkRoleAdmin && (
        <Route path='/admin' element={<LayoutAdmin />}>
          <Route path='' element={<HomeAdmin />}></Route>
          <Route path='qlPhim' element={<AdminQlPhim />}></Route>
          <Route path='qlSuatChieu' element={<AdminQlSc />}></Route>
          <Route path='qlSanPham' element={<AdminQlSp />}></Route>
          <Route path='qlNhanSu' element={<AdminQlNhanSu />}></Route>
          <Route path='qlGuest' element={<AdminQlGuest />}></Route>
          <Route path='qlPhongChieu' element={<AdminQlPhongChieu />}></Route>
          <Route path='voucher' element={<AdminQlDiscount />}></Route>
          <Route path='bill_history' element={<AdminQlBill />}></Route>
          <Route path='thongKe' element={<ThongKe />}></Route>
          {/* <Route path='booking' element={<BookingAdmin />}></Route> */}
          <Route path='booking'>
            <Route index element={<BookingAdmin />} />
            <Route path="movie_show_time/:id">
              <Route index element={<BookingAdminMovies />} />
              <Route path='seat/:id' element={<BookingSeatAdmin />} />
            </Route>
          </Route>
          <Route path='export-ticket' element={<ExportTicket />}></Route>
        </Route>
      )}
      <Route path='/notfound' element={<NotFound />}></Route>
      <Route path='*' element={<Navigate to='/notfound' />} />
    </Routes>
  </BrowserRouter>
}

export default App
