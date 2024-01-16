<?php

namespace App\Console;

use App\Models\Bill;
use Carbon\Carbon;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // $schedule->command('inspire')->hourly();
        $schedule->call(function () {
            // Lấy danh sách hóa đơn có trạng thái 0 và thời gian tạo trước 15 phút
            $pendingBills = Bill::where('status', 0)
                ->where('created_at', '<=', now()->subMinutes(15))
                ->get();

            foreach ($pendingBills as $bill) {
                // Cập nhật trạng thái của hóa đơn thành 2
                $bill->update(['status' => 2]);

                // Gửi thông báo hoặc thực hiện các công việc khác nếu cần thiết
                // ví dụ: $bill->user->notify(new BillStatusUpdated($bill));
            }
            $currentDateTimeVN = now('Asia/Ho_Chi_Minh');

        // Lấy danh sách hóa đơn có trạng thái 0
        $pendingBills =  Bill::join('tickets', 'tickets.bill_id', '=', 'bills.id')
            ->join('showtimes', 'showtimes.id', '=', 'tickets.showtime_id')
            ->where('export_ticket', 0)
            ->where('bills.status', 1)
            ->select(
                'bills.id',
                'showtimes.show_date',
                'showtimes.show_time',
            )
            ->groupBy(
                'bills.id',
                'show_date',
                'show_time',
            )
            ->orderBy('bills.id', 'desc')
            ->get();

        foreach ($pendingBills as $bill) {
            // Kiểm tra xem $bill->showtime có tồn tại không
            if ($bill->show_time) {
                $showDateTimeVN = Carbon::createFromFormat('Y-m-d H:i:s', $bill->show_date . ' ' . $bill->show_time, 'Asia/Ho_Chi_Minh');

                // Kiểm tra điều kiện và cập nhật trạng thái
                if ($currentDateTimeVN->gt($showDateTimeVN)) {
                    // Ngày hiện tại lớn hơn showtimes.show_date
                    $bill->update(['export_ticket' => 2]);
                } elseif ($currentDateTimeVN->toDateString() == $showDateTimeVN->toDateString()) {
                    // Ngày hiện tại bằng showtimes.show_date, kiểm tra giờ
                    $showTimeWithMargin = Carbon::createFromFormat('H:i:s', $bill->show_time, 'Asia/Ho_Chi_Minh')->addMinutes(15);
                    if ($currentDateTimeVN->gt($showTimeWithMargin)) {
                        // Giờ hiện tại lớn hơn showtimes.show_time + 15 phút
                        $bill->update(['export_ticket' => 2]);
                    }
                }
            }
        }
        })->everyMinute();
        // ...

        // Thêm công việc vào schedule để chạy hàm kiểm tra tự động
    }
    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');
        require base_path('routes/console.php');
    }
}
