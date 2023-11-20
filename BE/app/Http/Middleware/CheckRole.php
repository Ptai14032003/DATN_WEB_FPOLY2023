<?php

namespace App\Http\Middleware;

use App\Http\Resources\PersonnelResource;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;
use Laravel\Sanctum\Sanctum;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Lấy token bearer từ header Authorization
        $token = $request->bearerToken();
        $entropy = PersonalAccessToken::findToken($token);
        if (!$token || !$entropy) {
            return response()->json(['error' => 'Phải đăng nhập mới có thể thực hiện hành động này'], 401);
        } else {
            $model = $entropy->tokenable_type;
            $id = $entropy->tokenable_id;
            if ($model == "App\\Models\\Personnel") {
                $personnel = $model::where("id", $id)->first();
                if ($personnel->role == 1) {
                    return $next($request);
                } else {
                    return response(['mesage' => "Chỉ có admin mới truy cập được vào đây"], 403);
                }
            } else {
                return response(['mesage' => "Chỉ có admin mới truy cập được vào đây"], 403);
            }
        }
    }
}
