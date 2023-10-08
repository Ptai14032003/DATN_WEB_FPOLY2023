@extends('layout.template')
@section('content')
    <form action="{{ route('edit-screen-rates',['id'=>request()->route('id')]) }}" enctype="multipart/form-data" method="POST">
        @csrf
        <p>Movie name</p>
        <select name="movie_id" id="" class="form-control">
            <option>--Choice--</option>
            <option value="3">Lien minh cong ly </option>
            <option value="4">Lien minh cong ly 2</option>
        </select>
        <p>Theater name</p>
        <select name="room_id" id="" class="form-control">
            <option>--Choice--</option>
            <option value="1">room 1 </option>
            <option value="2">room 2</option>
            <option value="3">room 3</option>
        </select>
        <p>Show date</p>
        <input type="date" name="show_date" class="form-control" value="{{ $screen_rates->show_date }}">
        <p>Show time</p>
        <input type="date" name="show_time" class="form-control" value="{{ $screen_rates->show_time }}">
        <p>Type movie</p>
        <select name="type_name" id="" class="form-control">
            <option>--Choice--</option>
            <option value="1" name="type_name">2D</option>
            <option value="0" name="type_name">3D</option>
        </select>
        <p>Total ticket sold</p>
        <input type="text" name="total_ticket_sold" class="form-control" value="{{ $screen_rates->total_ticket_sold }}">
        <p>Revenue</p>
        <input type="text" name="total_money"class="form-control" value="{{ $screen_rates->total_money }}">
        <button class="btn btn-primary">Update</button>
    </form>
@endsection