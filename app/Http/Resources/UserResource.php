<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        //return parent::toArray($request);
        return [
            'id' => $this->id,
            'user_code' => $this->user_code,
            'name' => $this->name,
            'email' => $this->email,
            'phone_number' => $this->phone_number,
            'password' => $this->password,
            'address' => $this->address,
            'birthday' =>Carbon::parse($this->birthday)->format('d-m-Y'),
            'gender' => $this->gender == 0 ? 'Nữ' : 'Nam'
        ];
    }
}
