<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScreenRateResource extends JsonResource
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
            "show_date" => $this->show_date,
            "show_time" => $this->show_time,
            "total_ticket_sold" => $this->total_ticket_sold,
            "total_money" => $this->total_money
        ];
    }
}
