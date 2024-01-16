<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Gửi mail</title>
    <style>
        .container {
            background-image: url(https://e1.pxfuel.com/desktop-wallpaper/553/111/desktop-wallpaper-old-film-strip-powerpoint-templates-powerpoint-background-movie-theme.jpg);
            background-size: 100% 100%;
            padding-left: 100px;
            padding-top: 175px;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1 style="text-align: center;">Kính chào quý khách <strong style="color:blue">{{ $name }}</strong></h1>
        <br>
        <h3>Cảm ơn quý khách đã đặt vé xem phim: <strong style="color:blue">{{ $movie_name }}</strong></h3>
        <h3>Mã hóa đơn: {{ $bill_code }}</h3>
        <h3>Ngày chiếu: {{ $show_date }}</h3>
        <h3>Xuất chiếu: {{ $show_time }}</h3>
        <h3>Thời lượng: {{ $movie_time }} phút</h3>
        <h3>Số ghế: {{ $seat }}</h3>
        <h3>Phòng chiếu: {{ $room_name }}</h3>
        <h3 {{ $food !="" ? "" : "hidden" }}>Đồ ăn (nước, bỏng,...): {{ $food }}</h3>
        <h3>Cảm ơn quý khách đã đặt vé xem phim tại <strong style="color:blue">{{ $to_name }}</strong></h3>
        <h1 style="color: red">CHÚC QUÝ KHÁCH CÓ MỘT BUỔI XEM PHIM VUI VẺ</h1>
    </div>

</body>

</html>