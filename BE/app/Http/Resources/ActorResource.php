<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActorResource extends JsonResource
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
            "actor_name" => $this->actor_name,
            "movie_id" => [
                'movie_id' => $this->movie_id,
                'movie_name'=>$this->movie_name
            ],
           
            "gender" => $this->gender,
            "role" => $this->role,
            "movie_role" => $this->movie_role,
           
        ];
    }   
 }

