<?php
require_once("../dbtool.php");

$conn = create_connect();

$sql = "SELECT COUNT(*) as num FROM `movie_contents` WHERE ID";

$result = execute_sql($conn,"movie_db",$sql);

if(mysqli_num_rows($result) == 1){
    $array = array();
    while($assoc = mysqli_fetch_assoc($result)){
        $array[] = $assoc;
    }
    echo '{"state": true, "message":"電影總數統計成功!", "data" : '.json_encode($array).'}';

}else{
    echo '{"state": false, "message":"電影總數讀取失敗!'.mysqli_error($conn).'"}';
}

mysqli_close($conn);








?>