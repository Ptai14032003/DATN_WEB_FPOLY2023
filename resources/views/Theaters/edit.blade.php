@extends('layout.template')
@section('content')
    <form action="{{ route('edit-room',['id'=>request()->route('id')]) }}" enctype="multipart/form-data" method="POST">
        @csrf
        <p>Ten phong</p>
        <input type="text" name="name" class="form-control" value="{{ $rooms->name }}">
        <p>Tong so ghe</p>
        <input type="text" name="total_seat" class="form-control" value="{{ $rooms->total_seat }}">
        <button class="btn btn-primary">Update</button>
    </form>
@endsection