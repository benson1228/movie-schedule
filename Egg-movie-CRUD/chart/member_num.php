<?php
require_once("../dbtool.php");

$conn = create_connect();
$sql = "SELECT COUNT(*) num FROM `movie_member` WHERE ID";

$result = execute_sql($conn,"movie_db",$sql);

if(mysqli_num_rows($result) == 1){

    $array = array();
    while($assoc = mysqli_fetch_assoc($result)){
        $array[]=$assoc;
    }

    echo '{"state": true, "message":"會員總數統計成功!", "data" : '.json_encode($array).'}';

    
}else{
    echo '{"state": false, "message":"會員總數統計失敗!'.mysqli_error($conn).'"}';
}

mysqli_close($conn);




?>