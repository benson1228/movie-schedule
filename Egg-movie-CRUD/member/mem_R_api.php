<?php

require_once("../dbtool.php");
$conn = create_connect();
$sql = "SELECT ID, Mem_grade, Username, Password, Email, UserState, Created_at FROM movie_member ORDER BY ID DESC";

$result = execute_sql($conn,"movie_db",$sql);

if(mysqli_num_rows($result) > 0){
    $array = array();
    while($assoc = mysqli_fetch_assoc($result)){
        $array[] = $assoc;
    }
    echo '{"state":true, "message":"查詢成功","data":'.json_encode($array).'}';
    mysqli_close($conn);
}else{
    echo '{"state":false, "message":"查詢失敗"'.mysqli_error($conn).'}';
}





?>