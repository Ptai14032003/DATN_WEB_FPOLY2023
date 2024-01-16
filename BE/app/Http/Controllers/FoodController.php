<?php

namespace App\Http\Controllers;

use App\Models\Food;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use Cloudinary\Cloudinary;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class FoodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $food = Food::join('food_types', 'foods.food_type_id', '=', 'food_types.id')
        ->select('foods.*', 'food_types.name')
        ->orderBy('foods.id', 'desc')
        ->whereNull('foods.deleted_at')
        ->get();
        $food->makeHidden(['food_type_id']);

        return response()->json($food);

    }

    public function store(Request $request){
        $validator = Validator::make(
            $request->all(),
            [  
                'food_name' => "unique:foods,food_name",
               
            ],
            [
                'food_name.unique' => "Tên sản phẩm đã tồn tại",
              
            ]
        );
        if ($validator->fails()) {
            return response()->json($validator->messages());
        } else {

    $fileData = $request->input('image')['fileList'][0]['thumbUrl'];
    
    $elements = explode(',', $fileData);

    // Lấy tất cả các phần tử sau dấu ','
    $elementsAfterComma = array_slice($elements, 1);
    // Giải mã dữ liệu base64
    $decodedData = base64_decode($elementsAfterComma[0]);

    // Tạo một tên tệp tin duy nhất
    $uniqueFileName = uniqid('file_');

    // Lưu dữ liệu vào tệp tin mới tạo
    $filePath = storage_path('app/' . $uniqueFileName);
    file_put_contents($filePath, $decodedData);
    $response = cloudinary()->upload($filePath)->getSecurePath();

    $food_name = $request->get('food_name');
    $price = $request->get('price');
    $food_type_id = $request->get('food_type_id');
    $data = [
        'image' => $response,
        'food_name' => $food_name,
        'price' => $price,
        'food_type_id' => $food_type_id,
    ];

    Food::create($data);   
    // Đây là real path của tệp tin
    return response()->json([$data, 'message' => 'Sản phẩm đã được thêm thành công'], 200);
    }
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $food = Food::join('food_types', 'foods.food_type_id', '=', 'food_types.id')
            ->select('foods.*', 'food_types.name', 'foods.food_type_id')
            ->where('foods.id', $id)
            ->whereNull('foods.deleted_at')
            ->first();
    
        if ($food) {
            return response()->json($food);
        } else {
            return response()->json(['message' => 'Không tồn tại'], 404);
        }
    }
    
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,string $id){
        
        // $validator = Validator::make(
        //     $request->all(),
        //     [  
        //         'food_name' => [
        //             Rule::unique('foods')->ignore($id),
        //             function ($attribute, $value, $fail) use ($id) {
        //                 // Kiểm tra sự tồn tại trong users khi email thay đổi
        //                 $name = Food::where('food_name', $value)->first();
        //                 if ($name) {
        //                     $fail('Tên đã tồn tại');
        //                 }
        //             },
        //         ],
               
        //     ],
        // );
        // if ($validator->fails()) {
        //     return response()->json($validator->messages());
        // } else {
            $food = Food::find($id);
        if (!$food) {
            return response()->json(['messages' => 'Đô ăn không tồn tại'], 404);
        }
     
        $food->update($request->except('image'));
    
        if ($request->input('image')['fileList']) {
            $fileData = $request->input('image')['fileList'][0]['thumbUrl'];
            $elements = explode(',', $fileData);
            $elementsAfterComma = array_slice($elements, 1);
            $decodedData = base64_decode($elementsAfterComma[0]);
            $uniqueFileName = uniqid('file_');
            $filePath = storage_path('app/' . $uniqueFileName);
            file_put_contents($filePath, $decodedData);
            $imagePath = cloudinary()->upload($filePath)->getSecurePath();
    
            // Save the new image path to the movie record
            $food->image = $imagePath;
            $food->save();

        }else{
            $food->image = $request->image;
        }
    
        return response()->json(['message' => 'Sản phẩm đã được cập nhật thành công'], 200);
    }
// }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
       $food = Food::find($id);
       $food->delete();
       return response()->json([
        "message" => "delete successfully"
       ]);
    }

    
    public function destroyMultipleFood(Request $request){
    
        $ids = $request->input('ids');

        Food::whereIn('id', $ids)->delete();
        
        return response()->json(['success' => 'Xóa nhiều sản phẩm thành công']);
    }
}

