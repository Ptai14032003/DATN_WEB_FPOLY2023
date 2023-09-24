@extends('layout.template')
@section('content')
    <form action="{{ route('add-rooms') }}" enctype="multipart/form-data" method="POST">
        @csrf
        <p>Ten phong</p>
        <input type="text" name="name" class="form-control">
        <p>Tong so ghe</p>
        <input type="text" name="total_seat" class="form-control">
        <button class="btn btn-primary">Them moi</button>
    </form>
@endsection