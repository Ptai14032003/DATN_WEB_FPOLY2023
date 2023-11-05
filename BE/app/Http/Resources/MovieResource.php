<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MovieResource extends JsonResource
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
            "producer_id" => [
                'producer_id' => $this->producer_id,
                'producer_name'=>$this->producer_name
            ],
            "country_id" => [
                'country_id' => $this->country_id,
                'country_name' => $this->country_name
            ],
            "movie_type_id" => [
                'movie_type_id' => $this->movie_type_id,
                'type_name' => $this->type_name
            ],
           
            "director" => $this->director,
            "start_date" => $this->start_date,
            "end_date" => $this->end_date,
            "total_revenue" => $this->total_revenue,
            "image" => $this->image,
            "traler" => $this->traler
        ];
    }
}
