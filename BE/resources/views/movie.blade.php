<form action="" method="post" action="{{ route('themmoi.store') }}">
@csrf   
<input type="text" name="name">
   <select name="produce" id="">
    @foreach($produ as $produce)
    <option value="<?php echo $produce['id']; ?> "><?php echo $produce['id']; ?></option>
    @endforeach
   </select>
   <br>
   <select name="country" id="">
    @foreach($country as $contry)
    <option value="<?php echo $contry['id']; ?>"><?php echo $contry['id']; ?></option>
    @endforeach
   </select>
   <br>
   <select name="movie_type" id="">
    @foreach($movie_type as $movi_type)
    <option value="<?php echo $movi_type['id']; ?>"><?php echo $movi_type['id']; ?></option>
    @endforeach
   </select>
   <br>
    <input type="date" name="start_date" id="">
    <br>
    <input type="date" name="end_date" id="">
    <br>
    <input type="number" name="tatol_revenue" id="">
    <br>
    <input type="text" name="image" placeholder="image">
    <br>
    <br>
   <input type="text" name="director" placeholder="dien vien">
   <br>
   <br>
   <input type="text" name="gender" placeholder="gioi tinh">
   <br>
   <br>
   <input type="text" name="role" placeholder="role">
   <br>
   <br>
   <input type="text" name="movie_role" placeholder="movie_role">
   <br>

<button type="submit">them mowi</button>
</form>
