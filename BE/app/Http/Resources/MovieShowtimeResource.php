<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class MovieShowtimeResource extends JsonResource
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
            "movie_name" => $this->movie_name,
            "show_date" => Carbon::parse($this->show_date)->format('d-m-Y'),
            "show_time" => Carbon::parse($this->show_time)->format('H:i'),
            "room_name" => $this->name
        ];
    }
}
