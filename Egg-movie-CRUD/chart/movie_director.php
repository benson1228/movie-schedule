<?php
require_once("../dbtool.php");

$conn = create_connect();
$sql = "SELECT COUNT(Mv_director) num,Mv_director FROM `movie_contents` GROUP BY Mv_director";

$result = execute_sql($conn,"movie_db",$sql);

if(mysqli_num_rows($result) > 0){

    $array = array();
    while($assoc = mysqli_fetch_assoc($result)){
        $array[]=$assoc;
    }

    echo '{"state": true, "message":"導演總數統計成功!", "data" : '.json_encode($array).'}';

    
}else{
    echo '{"state": false, "message":"導演總數統計失敗!'.mysqli_error($conn).'"}';
}

mysqli_close($conn);




?>