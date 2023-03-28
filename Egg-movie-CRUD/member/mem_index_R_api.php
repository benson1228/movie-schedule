<?php
$mydata = file_get_contents("php://input","r");
$data = array();
$data = json_decode($mydata,true);

if(isset($data["username"]) && isset($data["password"])){
    if($data["username"] != "" && $data["password"] != ""){
        require_once("../dbtool.php");

        $conn = create_connect();
        
        $username = $data["username"];
        $password = $data["password"];
        
        $sql = "SELECT Mem_grade, Username, Password, UserState FROM movie_member WHERE Username = '$username'";
        
        $result = execute_sql($conn,"movie_db",$sql);
        
        if(mysqli_num_rows($result) == 1){
            $assoc = mysqli_fetch_assoc($result);
            if($assoc["Mem_grade"] == "管理員" && password_verify($password,$assoc["Password"]) && $assoc["UserState"] == "y"){
                $array = array();
                $array[] = $assoc;
                echo '{"state":true,"message":"登入成功", "data":'.json_encode($array).'}';
            }else{
                echo '{"state":false,"message":"登入失敗"'.mysqli_error($conn).'}';
            }
            mysqli_close($conn);
        }else{
            echo '{"state":false,"message":"登入失敗"}';
        }

    }else{
        echo '{"state":false,"message":"欄位不得為空白"}';
    }
}else{
    echo '{"state":false,"message":"缺少規定欄位"}';
}





?>