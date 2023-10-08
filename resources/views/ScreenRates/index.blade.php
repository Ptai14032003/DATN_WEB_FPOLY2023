@extends('layout.template')
@section('content')
    <table class="table" style="text-align: center">
        <tr>
            <td>Id</td>
            <td>Movie</td>
            <td>Theater</td>
            <td>Show date</td>
            <td>Show time</td>
            <td>Type movie</td>
            <td>Action</td>
        </tr>
        @foreach ($screen_rates as $item)
            <tr>
                <td>{{ $item->id }}</td>
                <td>{{ $item->movie_name}}</td>
                <td>{{ $item->name}}</td>
                <td>{{ $item->show_time }}</td>
                <td>{{ $item->show_date }}</td>
                <td>{{ $item->type_name }}</td>
                <td>
                    <a class="btn btn-success" href="{{ route('edit-screen-rates',['id'=>$item->id]) }}">Edit</a>
                    <a class="btn btn-danger" onclick="return confirm('Are you sure?')" 
                    href="{{ route('delete-screen-rates',['id' =>$item->id]) }}">Delete</a>
                </td>
            </tr>
        @endforeach
    </table>
    <a class="btn btn-primary" href="{{ route('add-screen-rates') }}">ADD</a>
@endsection