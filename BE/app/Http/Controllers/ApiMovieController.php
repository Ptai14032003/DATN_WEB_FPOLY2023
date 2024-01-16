<?php

namespace App\Http\Controllers;
use App\Models\Actor;
use App\Models\Movie;
use App\Models\Movie_Genre;
use App\Models\Movie_Type;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Cloudinary\Cloudinary;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ApiMovieController extends Controller
{ 
   public function index(){
    $movies =  Movie::
        join('movie_types', 'movies.movie_type_id', '=', 'movie_types.id')
        ->select('movies.*', 'movie_types.type_name')
        ->whereNull('movies.deleted_at')
        ->orderBy('movies.id', 'desc')
        ->get();

    $movies->makeHidden([ 'movie_type_id']);
    return response()->json($movies);
}

public function showingAdmin(){
    $currentDate = Carbon::now();

    $movies = Movie::join('movie_types', 'movies.movie_type_id', '=', 'movie_types.id')
        ->select('movies.*', 'movie_types.type_name')
        ->whereNull('movies.deleted_at')
        ->where('movies.start_date', '<=', $currentDate)
        ->where('movies.end_date', '>=', $currentDate)
        ->orderBy('movies.id', 'asc')
        ->get();

    return response()->json($movies);
}
    public function store(Request $request){
        $validator = Validator::make(
            $request->all(),
            [  
                'movie_name' => "unique:movies,movie_name",
                'start_date' => 'after:today',
                'end_date' => 'after:start_date',
              
            ],
            [
                'movie_name.unique' => "Tên phim đã tồn tại",
                'start_date.after' => "Ngày bắt đầu không được nhỏ hơn ngày hiện tại",
                'end_date.after' => "Ngày kết thúc không được nhỏ hơn ngày bát đầu"
            ]
        );
        if ($validator->fails()) {
            return response()->json($validator->messages());
        } else {
        // if($request->image){
            // $result = cloudinary()->uploadApi()->upload($request->file);
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
    

            $type_name = $request->get('type_name');
            $movie_type = Movie_Type::where('type_name',$type_name)->first();

            $movie_name = $request->get('movie_name');
            $producer_name = $request->get('producer_name');
            $country_name = $request->get('country_name');
            $genre = $request->get('genre');
            $director = $request->get('director');
            $start_date = $request->get('start_date');
            $end_date = $request->get('end_date');
            $trailer = $request->get('trailer');
            $actor_name = $request->get('actor_name');
            $movie_time = $request->get('movie_time');
            $describe = $request->get('describe');
            $data = [
                'movie_name' => $movie_name,
                'country_name' => $country_name,
                'movie_type_id' => $movie_type->id,
                'genre' => $genre,
                'director' => $director,
                'actor_name' => $actor_name,
                'start_date' => $start_date,    
                'end_date' =>  $end_date,
                'movie_time'=> $movie_time,
                'image' => $response,
                'trailer' => $trailer,
                'describe' => $describe
            ];
            Movie::create($data); 
            return response()->json([$data,'message' => 'Thêm phim thành công']);

        // }
        // }else{
        //     return $this->returnError(202, 'file is required');
        // }
       
    }
}

    public function edit(string $id)
    {
     
        $movie = Movie::
            join('movie_types', 'movies.movie_type_id', '=', 'movie_types.id')
            ->select('movies.*', 'movie_types.type_name')
            ->where('movies.id', $id)
            ->whereNull('movies.deleted_at')
            ->first();
 
            if ($movie){
            return response()->json($movie);
        } else {
            return response()->json(['message' => 'Không tồn tại'], 404);
        }
    }
    
    public function update(Request $request, string $id) {
        $movie = Movie::find($id);

        $validator = Validator::make(
            $request->all(),
            [  
                'end_date' => 'after:start_date'
            ],
            [
                'end_date.after' => "Ngày kết thúc không được nhỏ hơn ngày bát đầu"
            ]
        );
        if ($validator->fails()) {
            return response()->json($validator->messages());
        } else {
        // Update other fields based on the request
        $movie->update($request->except('image'));
    
        // Handle image upload if a new image is provided in the request
        // if ($request->input('image')['fileList']) {
        //     $fileData = $request->input('image')['fileList'][0]['thumbUrl'];
        //     $elements = explode(',', $fileData);
        //     $elementsAfterComma = array_slice($elements, 1);
        //     $decodedData = base64_decode($elementsAfterComma[0]);
        //     $uniqueFileName = uniqid('file_');
        //     $filePath = storage_path('app/' . $uniqueFileName);
        //     file_put_contents($filePath, $decodedData);
        //     $imagePath = cloudinary()->upload($filePath)->getSecurePath();
    
        //     // Save the new image path to the movie record
        //     $movie->image = $imagePath;
        //     $movie->save();
        // }else{
        //     $movie->image = $request->image;
        // }
    
        return response()->json(['message' => 'Phim đã được cập nhật thành công'], 200);
    }
}

    public function destroy(string $id){
        $movie = Movie::find($id);

        $movie->delete();
        return response()->json([
            'message'=> 'Xóa Phim Thành Công'
        ]);
    }    

    public function destroyMultipleMovie(Request $request){
        // Lấy danh sách id của các phim cần xóa
        $ids = $request->input('ids');
        // Xóa các phim có id trong danh sách
        Movie::whereIn('id', $ids)->delete();
        // Trả về kết quả thành công
        return response()->json(['success' => 'Xóa nhiều phim thành công']);
    }
}