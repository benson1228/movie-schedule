<?php
    require_once("dbtool.php");

    $conn = create_connect();

    $sql = "SELECT * FROM movie_contents ORDER BY ID DESC";

    $result = execute_sql($conn,"movie_db",$sql);

    if(mysqli_num_rows($result) > 0){
        $row = array();
        while($assoc = mysqli_fetch_assoc($result)){
            $row[] = $assoc;
        }
        echo '{"state":true,"message":"讀取成功","data":'.json_encode($row).'}';

    }else{
        echo '{"state":false,"message":"讀取失敗"}';
    }


    mysqli_close($conn);

?>