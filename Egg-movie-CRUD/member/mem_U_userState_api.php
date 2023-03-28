<?php

$mydata = file_get_contents("php://input","r");
$data = array();
$data = json_decode($mydata,true);

if(isset($data["id"]) && isset($data["userstate"])){
    if($data["id"] != '' && $data["userstate"] != ''){
        require_once("../dbtool.php");
        $id = $data["id"];
        $state = $data["userstate"];
        
        $conn = create_connect();
        
        $sql = "UPDATE movie_member SET UserState = '$state' WHERE ID = '$id'";
        
        
        $result = execute_sql($conn,"movie_db",$sql);
        
        if($result && mysqli_affected_rows($conn) == 1){
            echo '{"state": true, "message":"更新會員狀態成功!"}';
        }else{
            echo '{"state": false, "message":"更新會員狀態失敗!錯誤代碼或相關訊息"'.mysqli_error($conn).'}';
        }
        mysqli_close($conn);
    }else{
        echo '{"state": false, "message":"欄位不得為空白!"}';
    }
}else{
    echo '{"state": false, "message":"缺少規定欄位!"}';
}







?>