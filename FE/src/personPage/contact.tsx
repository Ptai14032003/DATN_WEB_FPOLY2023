import React from 'react'
import Footer from '../components/layouts/layoutGuest/footer'
import Menu from '../components/layouts/layoutGuest/menu'

type Props = {}

const Contact = (props: Props) => {
    return (
        <div className='bg-black h-full'>
            <header>
                <Menu />
            </header>
            <section className='text-white w-[82%] mx-auto py-[8rem] Contact'>
                <div className='Contact-title text-center mb-[2rem]'>
                    <h1 className='text-3xl font-bold'>Liên hệ</h1>
                </div>
                <div className='grid grid-cols-3 gap-5 Contact-content'>
                    <div>
                        <div className='mb-5 Web-address'>
                            <h2 className='font-bold'>TRỤ SỞ</h2>
                            <p className='leading-relaxed'>Phố Trịnh Văn Bô, Phường Phương Canh, Quận Nam Từ Liêm, Tp. Hà Nội</p>
                        </div>
                        <div className='Web-contact'>
                            <h2 className='font-bold'>HỖ TRỢ KHÁCH HÀNG</h2>
                            <p className='leading-relaxed'>Hotline: 039.8658438</p>
                            <p className='leading-relaxed'>Giờ làm việc: 8:00 - 22:00</p>
                            <p className='leading-relaxed'>Tất cả các ngày bao gồm cả Lễ tết</p>
                            <p className='leading-relaxed'>Email hỗ trợ: wondercinema569@gmail.com</p>
                        </div>
                    </div>
                    <div className='col-span-2 Web-map'>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.841032192449!2d105.74057277508116!3d21.039045780612827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454962c0b6523%3A0x5c76c67564d9d1b9!2zUC4gVHLhu4tuaCBWxINuIELDtCwgUGjGsMahbmcgQ2FuaCwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1705462834212!5m2!1svi!2s" width="100%" height="450" style={{ border: "0" }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </section>
            <footer className='text-white'>
                <Footer />
            </footer>
        </div>
    )
}

export default Contact