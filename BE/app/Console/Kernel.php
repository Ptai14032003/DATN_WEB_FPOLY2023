<?php

namespace App\Console;
use App\Models\Bill;
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
        })->everyMinute();
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
