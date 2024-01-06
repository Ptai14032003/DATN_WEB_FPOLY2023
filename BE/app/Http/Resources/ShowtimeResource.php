<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class ShowtimeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "movie_id" => $this->movie_id,
            "room_id" => $this->room_id,
            "show_date" => Carbon::parse($this->show_date)->format('d-m'),
            "show_time" => Carbon::parse($this->show_time)->format('H:i'),
            "total_ticket_sold" => $this->total_ticket_sold,
            "total_money" => $this->total_money
        ];
    }
}
