<form action="" method="post" action="{{ route('themmoi.store') }}">
@csrf   
<input type="text" name="name">
   <select name="produce" id="">
    @foreach($produ as $produce)
    <option value="<?php echo $produce['id']; ?>"><?php echo $produce['id']; ?></option>
    @endforeach
   </select>
   <select name="country" id="">
    @foreach($country as $contry)
    <option value="<?php echo $contry['id']; ?>"><?php echo $contry['id']; ?></option>
    @endforeach
   </select>
   <select name="movie_type" id="">
    @foreach($movie_type as $movi_type)
    <option value="<?php echo $movi_type['id']; ?>"><?php echo $movi_type['id']; ?></option>
    @endforeach
   </select>
   <input type="text" name="director">
    <input type="date" name="start_date" id="">
    <input type="date" name="end_date" id="">
    <input type="number" name="tatol_revenue" id="">

    <input type="text" name="image" placeholder="image">

<button type="submit">them mowi</button>
</form>
