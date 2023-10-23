<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MovieGenreResource extends JsonResource
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

            "movie_id" => [
                'movie_id' => $this->movie_id,
                'movie_name'=>$this->movie_name
            ],
            "list_genre_id" => [
                'list_genre_id' => $this->list_genre_id,
                "genre" => $this->genre
            ],

            ];
    }
}
