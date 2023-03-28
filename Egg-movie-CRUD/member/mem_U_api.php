<?php

$mydata = file_get_contents("php://input","r");
$data = array();
$data = json_decode($mydata,true);
if(isset($data["id"]) && isset($data["grade"]) && isset($data["email"])){
    if($data["id"] != '' && $data["grade"] !='' && $data["email"] != ''){
        require_once("../dbtool.php");
        $conn = create_connect();
        
        $id = $data["id"];
        $grade = $data["grade"];
        $email = $data["email"];
        
        $sql = "UPDATE movie_member SET Mem_grade = '$grade', Email = '$email' WHERE ID = '$id'";
        
        $result = execute_sql($conn,"movie_db",$sql);
        
        if($result && mysqli_affected_rows($conn) == 1){
            echo '{"state": true, "message":"更新會員成功!"}';
        }else{
            echo '{"state": false, "message":"更新會員失敗!錯誤代碼或相關訊息"'.mysqli_error($conn).'}';
        }
        mysqli_close($conn);
    }else{
        echo '{"state": false, "message":"欄位不得為空白!"}';
    }
}else{
    echo '{"state": false, "message":"缺少規定欄位!"}';
}





?>