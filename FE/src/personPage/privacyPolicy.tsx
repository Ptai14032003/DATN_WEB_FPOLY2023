import React from 'react'
import Footer from '../components/layouts/layoutGuest/footer'
import Menu from '../components/layouts/layoutGuest/menu'

type Props = {}

const PrivacyPolicy = (props: Props) => {
  return (
    <div className='bg-black h-full'>
        <header>
            <Menu/>
        </header>
        <section className='text-white w-[82%] mx-auto py-[8rem] Private-Policy'>
            <div className='Policy-title text-center mb-[2rem]'>
            <h1 className='text-3xl font-bold'>Chính sách</h1>
            </div>
            <div className='Policy-content'>
                <div className='mb-[2rem]'>
                    <p>Xin vui lòng đọc các điều khoản sau cẩn thận trước khi sử dụng dịch vụ thanh toán trực tuyến. Với việc truy cập vào phần này của website, bạn đã đồng ý với các điều khoản sử dụng của chúng tôi. Các điều khoản này có thể thay đổi theo thời gian và bạn sẽ phải tuân theo các điều khoản được hiển thị từ thời điểm bạn đọc được các điều khoản này. Wonder Cinema luôn luôn mong muốn đem đến những giây phút giải trí tuyệt vời cho khách hàng với chất lượng dịch vụ tốt nhất. Dưới đây sẽ là một số hướng dẫn cho chính sách thanh toán vé trực tuyến.</p>
                </div>
                <div className='Policy-1 mb-[2rem]'>
                    <h2 className='text-lg font-bold'>1. Đối tượng áp dụng</h2>
                    <p>Chương trình thanh toán online chỉ áp dụng cho các suất chiếu quy định tại Wonder Cinema. Việc đăng kí tham gia Thành Viên Wonder Cinema là hoàn toàn miễn phí. Khách hàng của Wonder Cinema có thể thanh toán trực tuyến tối đa 8 vé cho một lần giao dịch. Nếu bạn có nhu cầu mua vé với số lượng lớn hơn, vui lòng liên hệ với 0398658438 hoặc gửi thông tin vào hòm thư wondercinema569@gmail.com</p>
                </div>
                <div className='Policy-2 mb-[2rem]'>
                    <h2 className='text-lg font-bold'>2. Thư và tin nhắn xác nhận đặt vé</h2>
                    <p>Sau khi hoàn thành việc thanh toán vé trực tuyến, bạn sẽ nhận được thư xác nhận thông tin chi tiết vé đã thanh toán thông qua địa chỉ thư điện tử (email) mà bạn đã cung cấp. Ngoài ra, bạn sẽ nhận được một tin nhắn miễn phí, xác nhận mã số đặt vé và các thông tin vé đã đặt. Lưu ý email và tin nhắn này chỉ có tính chất dự phòng. Do đó, chúng tôi đề nghị bạn khi tiến hành các bước thanh toán, cần đọc kĩ các thông tin trên màn hình về rạp chiếu phim, tên phim, suất chiếu, và chỗ ngồi trước khi hoàn tất việc xác nhận tất cả các thông tin về vé.</p>
                    <p className='mt-[1.5rem]'>Email xác nhận thông tin đặt vé có thể đi vào hộp thư rác (spam mail) của bạn, vì vậy hãy kiểm tra chúng trước khi liên lạc với chúng tôi. Nếu bạn có thắc mắc hoặc gặp vấn đề với việc đặt vé của bạn, bạn có thể liên hệ với chúng tôi theo số điện thoại: 02435141791 để được hỗ trợ.</p>
                </div>
                <div className='Policy-3 mb-[2rem]'>
                    <h2 className='text-lg font-bold'>3. Nhận Vé</h2>
                    <p>Hiện tại chúng tôi chưa có dịch vụ hủy hoặc thay đổi thông tin vé thanh toán trực tuyến. Vui lòng kiểm tra lại những xác nhận trực tuyến, trong e-mail (và/hoặc) trên di động của bạn một cách cẩn thận vì chúng sẽ cung cấp cho bạn những thông tin quan trọng để nhận vé cho suất chiếu bạn đã chọn. Hãy nhớ mang theo thư xác nhận đặt vé đến Wonder Cinema. Nếu bạn không có máy in hay không thể in thư xác nhận, bạn chỉ cần nhớ mã đặt vé. Khi tới rạp, bạn hãy tìm các bảng chỉ dẫn tới quầy thông tin dành riêng cho vé mua qua mạng. Bên cạnh đó, bạn cần mang theo giấy tờ tùy thân có ảnh của bạn như CMND, thẻ sinh viên hoặc passport. Bằng việc thanh toán qua website này, bạn chấp nhận vị trí ghế ngồi mà bạn đã đặt. Bạn đồng ý rằng, trong những trường hợp có sự thay đổi về chương trình phim hoặc bất khả kháng, chúng tôi có quyền hoàn trả lại bất kỳ vé nào từ việc mua bán qua trang web này hoặc thực hiện việc chuyển vé cho bạn qua suất chiếu khác theo yêu cầu của bạn.</p>
                </div>
                <div className='Policy-4 mb-[2rem]'>
                    <h2 className='text-lg font-bold'>4. Phí Đặt Vé</h2>
                    <p>Những vé thanh toán trên web site Wonder Cinema sẽ phải chấp nhận một phụ phí không hoàn lại gọi là Phí Đặt Vé, ngoại trừ các trường hợp đặc biệt khi Wonder Cinema không thể cung cấp cho bạn vé đã đặt Hiện tại mức phí này là 0 VND cho tất cả các giao dịch thanh toán vé online. Tuy nhiên, mức phí này có thể thay đổi bất cứ khi nào. Chúng tôi sẽ thông báo đến bạn khi có thay đổi.</p>
                </div>
                <div className='Policy-5 mb-[2rem]'>
                    <h2 className='text-lg font-bold'>5. Chức năng chống gian lận</h2>
                    <p>Wonder Cinema (hoặc bên thứ ba - nhà cung cấp cổng thanh toán điện tử, hoặc/và các bên ký kết khác) sẽ sử dụng các công nghệ đặc biệt để nhận biết các hoạt động giả mạo trên trang mạng, ví dụ: sử dụng thẻ tín dụng giả. Sự chấp nhận hợp tác của bạn cùng với nỗ lực của Wonder Cinema là rất cần thiết. Bạn chấp nhận rằng Wonder Cinema có thể chấm dứt quyền truy cập và sử dụng trang mạng của Wonder Cinema nếu bạn hoặc người khác hành động nhân danh bạn nằm trong diện nghi vấn có gian lận hoặc vi phạm các quy định của Trung tâm..</p>
                </div>
                <div className='Policy-6 mb-[2rem]'>
                    <h2 className='text-lg font-bold'>6. Sử dụng thẻ tín dụng/ thẻ ghi nợ</h2>
                    <p>Nếu bạn phát hiện thẻ của mình bị sử dụng giả mạo để mua hàng trên trang mạng này, bạn hãy lập tức liên hệ với ngân hàng phát hành thẻ của bạn theo qui trình.</p>
                </div>
                <div className='Policy-7 mb-[2rem]'>
                    <h2 className='text-lg font-bold'>7. Cảnh Báo An Ninh</h2>
                    <p>Wonder Cinema sẽ hết sức cố gắng sử dụng mọi biện pháp và theo mọi cách thức có thể đảm bảo an toàn cho tất cả các thông tin cá nhân của bạn, và chúng tôi cũng sẽ thường xuyên cập nhật những thông tin chính xác nhất. Trang mạng này có những công nghệ an ninh đảm bảo việc bảo vệ các thông tin không bị thất lạc, lạm dụng hoặc thay đổi. Tất cả các giao dịch và thông tin về thẻ đươc sử dụng đều được mã hóa qua công nghệ Secure Sockets Layer (SSL). Đó là phần mềm tốt nhất về đảm bảo an toàn cho các giao dịch kinh tế ngày nay. Mặc dù vậy, không phải tất cả các dữ liệu truyền qua Internet đều có thể đảm bảo 100%, vì thế chúng tôi không thể đưa ra một sự đảm bảo tuyệt đối rằng mọi thông tin bạn cung cấp đều được bảo vệ tất cả mọi lúc, mọi nơi.</p>
                </div>
                <div className='Policy-8 mb-[2rem]'>
                    <h2 className='text-lg font-bold'>LIÊN HỆ</h2>
                    <p>Các bạn có thể liên hệ với chúng tôi theo số điện thoại : 0398658438 để được hỗ trợ thêm.</p>
                </div>
            </div>
        </section>
        <footer className='text-white'>
            <Footer/>
        </footer>
    </div>
  )
}

export default PrivacyPolicy