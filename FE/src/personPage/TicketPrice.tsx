import React from 'react'
import Menu from '../components/layouts/layoutGuest/menu'

type Props = {}

const TicketPrice = (props: Props) => {
    return (
        <div className='bg-black h-full'>
            <div className='h-[80px]'>
                <Menu />
            </div>
            <div className='ticket-price-content'>
                <div className='ticket-price-title'>
                    <h1>Giá vé</h1>
                    <p>(Áp dụng từ ngày 01/06/2023)</p>
                </div>
                <div className='film2D'>
                    <h2>1. Giá vé xem phim 2D</h2>
                    <table className='ticket-price-table'>
                        <thead>
                            <tr>
                                <th>Ghế</th>
                                <th>Ngày thường</th>
                                <th>Ngày lễ, thứ 7, chủ nhật</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='regular-chair'>
                                <td className='regular-chair-title'>Thường</td>
                                <td className='regular-day'>45.000đ</td>
                                <td className='holiday'>55.000đ</td>
                            </tr>
                            <tr className='vip-chair'>
                                <td className='vip-chair-title'>VIP</td>
                                <td className='regular-day'>50.000đ</td>
                                <td>60.000đ</td>
                            </tr>
                            <tr className='double-chair'>
                                <td className='double-chair-title'>Sweet Box</td>
                                <td className='regular-day'>100.000đ</td>
                                <td className='holiday'>120.000đ</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='film3D'>
                    <h2>2. Giá vé xem phim 3D</h2>
                    <table className='ticket-price-table'>
                        <thead>
                            <tr>
                                <th>Ghế</th>
                                <th>Ngày thường</th>
                                <th>Ngày lễ, thứ 7, chủ nhật</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='regular-chair'>
                                <td className='regular-chair-title'>Thường</td>
                                <td className='regular-day'>55.000đ</td>
                                <td className='holiday'>65.000đ</td>
                            </tr>
                            <tr className='vip-chair'>
                                <td className='vip-chair-title'>VIP</td>
                                <td className='regular-day'>65.000đ</td>
                                <td>75.000đ</td>
                            </tr>
                            <tr className='double-chair'>
                                <td className='double-chair-title'>Sweet Box</td>
                                <td className='regular-day'>120.000đ</td>
                                <td className='holiday'>140.000đ</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='ticket-price-describe'>
                    <p className="ql-align-center">
                        <strong>* Giá vé đối với các đối tượng khán giả ưu tiên (khi trực tiếp sử dụng dịch vụ xem phim tại rạp chiếu phim):
                            </strong>
                            </p>
                            <p className="ql-align-justify">- Giảm 20% giá vé theo qui định đối với: Trẻ em (người dưới 16 tuổi), người cao tuổi (công dân Việt Nam từ đủ 60 tuổi trở lên), người có công với cách mạng, người có hoàn cảnh đặc biệt khó khăn.</p>
                            <p className="ql-align-justify">- Giảm 50% giá vé theo qui định đối với: Người khuyết tật nặng.</p>
                            <p className="ql-align-justify">- Giảm giá vé 100% đối với: Người khuyết tật đặc biệt nặng, trẻ em dưới 0.7m đi kèm với người lớn.</p>
                            <p className="ql-align-justify">
                                <br/>
                                </p>
                                <p className="ql-align-justify">
                                    <strong>
                                        <em>Điều kiện:</em>
                                        </strong>
                                        </p>
                                        <p className="ql-align-justify">- Chỉ áp dụng khi mua vé tại quầy (không áp dụng khi mua online).</p>
                                        <p className="ql-align-justify">- Các đối tượng khán giả trên phải xuất trình giấy tờ chứng minh khi mua vé xem phim và trước khi vào phòng chiếu. Cụ thể:</p>
                                        <p className="ql-align-justify">+ Trẻ em (trường hợp trẻ em từ 14-16 tuổi), người cao tuổi: xuất trình "Căn cước công dân".</p>
                                        <p className="ql-align-justify">+ Người có công với cách mạng: xuất trình giấy xác nhận theo quy định.</p>
                                        <p className="ql-align-justify">+ Người có hoàn cảnh đặc biệt khó khăn: xuất trình "Giấy chứng nhận hộ nghèo".</p>
                                        <p className="ql-align-justify">+ Người khuyết tật: xuất trình "Giấy xác nhận khuyết tật".</p>
                                        <p className="ql-align-justify">
                                            <br/>
                                            </p>
                                            <p className="ql-align-justify">
                                                <strong>* Ưu đãi cho học sinh, sinh viên từ&nbsp;</strong><strong>22</strong><strong>&nbsp;tuổi trở xuống: Đồng giá&nbsp;</strong><strong>55.000</strong><strong>đ&nbsp;/vé&nbsp;2D cho tất cả các suất chiếu phim từ&nbsp;</strong><strong>Thứ 2 đến Thứ 6</strong><strong>&nbsp;<em>(chỉ áp dụng cho hình thức mua vé trực tiếp tại quầy, mỗi thẻ được mua 1 vé/ngày - vui lòng xuất trình thẻ U22 và thẻ HSSV khi mua vé)</em>.</strong></p><p className="ql-align-justify"><br/></p><p className="ql-align-justify"><strong>* Khán giả nghiêm túc thực hiện xem phim đúng độ tuổi theo phân loại phim: </strong><strong>P, K, T13, T16, T18, C. </strong><strong>(Trường hợp vi phạm sẽ xử phạt theo Quy định tại Nghị định 128/2022/NĐ-CP ngày 30/12/2022).</strong></p><p className="ql-align-justify"><br/></p><p className="ql-align-justify"><strong>* Không bán vé cho trẻ em dưới 13 tuổi đối với các suất chiếu phim kết thúc sau 22h00 và không bán vé cho trẻ em dưới 16 tuổi đối với các suất chiếu phim kết thúc sau 23h00.</strong></p><p className="ql-align-justify"><br/></p><p className="ql-align-justify"><strong>* Áp dụng giá vé ngày Lễ, Tết cho các ngày:</strong></p><p className="ql-align-justify">- Các ngày nghỉ Lễ, Tết theo quy định của nhà nước: Tết Nguyên Đán, Tết Dương Lịch, ngày Giỗ Tổ Hùng Vương 10/3 AL, ngày 30/4, 1/5, 2/9.</p><p className="ql-align-justify">- Các ngày: 14/2, 8/3, 24/12.</p><p className="ql-align-justify">- Các ngày: Nghỉ bù do nghỉ Lễ, Tết trùng vào thứ 7, Chủ Nhật.</p><p className="ql-align-justify"><br/></p><p className="ql-align-justify"><strong>* Không áp dụng các chế độ ưu đãi, các chương trình khuyến mại khác vào các ngày 20/10, 20/11, Halloween 31/10, các ngày Lễ, Tết, suất chiếu sớm và suất chiếu đặc biệt.</strong></p><p className="ql-align-justify"><br/></p><p className="ql-align-justify"><strong>* Mua vé xem phim tập thẻ, hợp đồng khoán gọn: Phòng chiếu phim - (024) 35148647.</strong></p><p className="ql-align-justify"><br/></p><p className="ql-align-justify"><strong>* Thuê phòng tổ chức Hội nghị, làm văn phòng, quảng cáo và các dịch vụ khác: Phòng Dịch vụ - (024) 35142856</strong></p><p className="ql-align-justify"><br/></p><p className="ql-align-justify">ĐỀ NGHỊ QUÝ KHÁN GIẢ LƯU Ý KHI MUA VÉ XEM PHIM (ĐẶC BIỆT KHI MUA VÉ ONLINE). TTCPQG KHÔNG CHẤP NHẬN HOÀN TIỀN HOẶC ĐỔI VÉ ĐÃ THANH TOÁN THÀNH CÔNG KHI MUA VÉ ONLINE VÀ VÉ MUA SAI QUY ĐỊNH TẠI QUẦY VÉ.</p><p className="ql-align-justify"><br/></p><p className="ql-align-center">Rất mong Quý khán giả phối hợp thực hiện.</p><p className="ql-align-center">Xin trân trọng cảm ơn!</p><p className="ql-align-center"><br/></p><p className="ql-align-justify"><strong>* Ticket pricing policy for priority audiences watching movies at the cinema:</strong></p><p className="ql-align-justify">- Discount 20% on ticket price for: Children and teenagers (under 16 years old), elderly people (Vietnamese citizens aged from 60 years old), revolutionary contributors, people with difficult living conditions.</p><p className="ql-align-justify">- Discount 50% on ticket price as regulations for: People with severe disabilities.</p><p className="ql-align-justify">- Discount 100% on ticket price for: People with particularly severe disabilities; Children under 0.7m accompanied by adults.</p><p className="ql-align-justify"><br/></p><p className="ql-align-justify"><strong><em>Condition:</em></strong></p><p className="ql-align-justify">- Only applicable when buying tickets at the counter (not applicable for online tickets).</p><p className="ql-align-justify">- The above-mentioned audiences must present Identification Documents when buying movie tickets and before entering the screening room. Particularly:</p><p className="ql-align-justify">+ Teenagers (14-16 years old), elderly people: must present "ID card".</p><p className="ql-align-justify">+ Revolutionary contributors: must present a certificate as prescribed.</p><p className="ql-align-justify">+ People with difficult living conditions: must present "Certificate of Poor Household".</p><p className="ql-align-justify">+ People with disabilities: must present "Certificate of Disability".</p><p className="ql-align-justify"><br/></p><p className="ql-align-justify"><strong>* Special promotion for student who is&nbsp;</strong><strong>22</strong><strong>&nbsp;years old and under:&nbsp;</strong><strong>From Monday to Friday 55.000</strong><strong>&nbsp;đ/2D&nbsp;ticket for all slot times&nbsp;<em>(only apply for direct purchase at the ticket stall, one student card can buy one ticket/day, student should show their U22 and student cards to get this priority).</em></strong></p><p className="ql-align-justify"><br/></p><p className="ql-align-justify"><strong>* Strict implementation of audience classNameification according to their ages: </strong><strong>P, K, T13, T16, T18, C.</strong><strong> (Violation will be sanctioned according to the provisions of Decree 128/2022/ND-CP dated on December 30, 2022).</strong></p><p className="ql-align-justify"><br/></p><p className="ql-align-justify"><strong>* Tickets for movies ending after 22:00 are not sold to teenagers under 13 years old and tickets for movies ending after 23:00 are not sold to teenagers under 16 years old.</strong></p><p className="ql-align-justify"><br/></p><p className="ql-align-justify"><strong>* Holiday price is applied on:</strong></p><p className="ql-align-justify">- The public holidays as prescribed by state: New year, Lunar new year, Hung's King festival (March 10th - lunar calender), April 30th, May 1st, September 2nd.</p><p className="ql-align-justify">- Days: Valentine, Women's Day, Noel.</p><p className="ql-align-justify">- Compensatory days off due to holidays coinciding with Saturday and Sunday.</p><p className="ql-align-justify"><br/></p><p className="ql-align-justify"><strong>* Do not apply preferential programs and different promotional ones in the day 20/10, 20/11, Halloween 31/10, holidays, sneak show and special show.</strong></p><p className="ql-align-justify"><br/></p><p className="ql-align-justify">VALUED AUDIENCES PLEASE TAKE INTO CONSIDERATION WHEN BUYING MOVIE TICKETS (ESPECIALLY FOR ONLINE TICKETS). THE NATIONAL CINEMA CENTER DOES NOT ACCEPT REFUNDS OR EXCHANGES OF SUCCESSFULLY PAID TICKETS (ONLINE TICKETS AND INCORRECTLY PURCHASED TICKETS AT THE COUNTER)</p><p className="ql-align-justify"><br/></p><p className="ql-align-center">Thank you for your valued cooperation.</p><p className="ql-align-center">Best Regards!</p><p className="ql-align-center"><br/></p><p className="ql-align-center">----------------------------------------------------------</p><p className="ql-align-center"><br/></p><p>-&nbsp;&nbsp;Mua vé xem phim tập thể, hợp đồng khoán gọn:&nbsp;</p><p>&nbsp;&nbsp;&nbsp;<strong><em>Phòng Chiếu phim - (024) 35148647</em></strong></p><p><br/></p><p>-&nbsp;&nbsp;Thuê phòng tổ chức Hội nghị, làm văn phòng, quảng cáo và các dịch vụ khác:&nbsp;&nbsp;</p><p>&nbsp;&nbsp;&nbsp;<strong><em>Phòng Dịch vụ - (024) 35142856</em>&nbsp;</strong></p><p><br/></p><p className="ql-align-right"><strong><em>.TTCPQG</em></strong></p></div>
            </div>
        </div>
    )
}

export default TicketPrice