<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
class PersonnelResource extends JsonResource
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
            'personnel_code' => $this->personnel_code,
            'name' => $this->name,
            'email' => $this->email,
            'phone_number' => $this->phone_number,
            'password' => $this->password,
            'address' => $this->address,
            'birthday' => Carbon::parse($this->birthday)->format('d-m-Y'),
            'gender' => $this->gender == 0 ? 'Nữ' : 'Nam',
            'role' => $this->role == 0 ? 'Nhân Viên' : 'Admin',
            'date_start' => Carbon::parse($this->date_start)->format('d-m-Y')
        ];
    }
}
