
type Props = {}

const NotFound = (props: Props) => {
    return (
        <div className="text-center pt-[20%]">
            <div>Trang này không có sẵn. Mong bạn thông cảm.</div>
            <div className="pt-[20px] text-blue-500"><a href="/">Trở về trang home</a></div>
        </div>
    )
}

export default NotFound