<?php
$mydata = file_get_contents("php://input","r");
$data = array();
$data = json_decode($mydata,true);
if(isset($data["id"]) && isset($data["password"])){
    if($data["id"] != '' && $data["password"] != ''){
        require_once("../dbtool.php");
        $conn = create_connect();
        
        $id = $data["id"];
        $hash = password_hash($data["password"],PASSWORD_DEFAULT);
        
        $sql = "UPDATE movie_member SET Password = '$hash' WHERE ID = '$id'";
        
        $result = execute_sql($conn,"movie_db",$sql);
        
        if($result){
            echo '{"state": true, "message":"更新密碼成功!"}';
        }else{
            echo '{"state": false, "message":"更新密碼失敗!錯誤代碼或相關訊息"'.mysqli_error($conn).'}';
        }
        mysqli_close($conn);

    }else{
        echo '{"state": false, "message":"欄位不得為空白!"}';
    }
}else{
    echo '{"state": false, "message":"缺少規定欄位!"}';
}






?>