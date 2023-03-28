<?php
require_once("../dbtool.php");

$conn = create_connect();
$sql = "SELECT COUNT(Month(Mv_release)) num,Mv_release FROM `movie_contents` WHERE Year(Mv_release) = '2023' GROUP BY Month(Mv_release)";

$result = execute_sql($conn,"movie_db",$sql);

if(mysqli_num_rows($result) > 0){
    
    $array = array();
    while($assoc = mysqli_fetch_assoc($result)){
        $array[]=$assoc;
    }
    echo '{"state": true, "message":"每月電影總數統計成功!", "data" : '.json_encode($array).'}';

    
}else{
    echo '{"state": false, "message":"每月電影總數統計失敗!'.mysqli_error($conn).'"}';
}

mysqli_close($conn);




?>