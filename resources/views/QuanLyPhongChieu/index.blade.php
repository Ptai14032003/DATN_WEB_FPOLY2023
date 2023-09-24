@extends('layout.template')
@section('content')

    <table class="table">
        <tr>
            <td>ID</td>
            <td>Ten phong</td>
            <td>Tong so ghe</td>
            <td>Thao tac</td>
        </tr>
        @foreach ($show as $rooms)
            <tr>
                <td>{{ $rooms->id }}</td>
                <td>{{ $rooms->name }}</td>
                <td>{{ $rooms->total_seat }}</td>
                <td>
                    <a class="btn btn-success" href="{{ route('edit-rooms',['id'=>$rooms->id]) }}">Sua</a>
                    <a class="btn btn-danger" onclick="return confirm('Are you sure?')" href="{{route('delete-rooms',['id'=>$rooms->id])}}">Xoa</a>
                </td>
            </tr>
        @endforeach
    </table>
    <a class="btn btn-primary" href="{{ route('add-rooms') }}">Them</a>
@endsection