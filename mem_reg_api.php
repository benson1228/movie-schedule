<?php
//INPUT: {"username":"owner", password":"123456", "email":"xxx@ccc.xom"}
//Output:
// {"state": true, "message":"註冊會員成功!"}
// {"state": false, "message":"註冊會員失敗!錯誤代碼或相關訊息"}
// {"state": false, "message":"欄位不得為空白!"}
// {"state": false, "message":"缺少規定欄位!"}

    $data = file_get_contents("php://input", "r");
    $mydata = array();
    $mydata = json_decode($data, true);

    if(isset($mydata["username"]) && isset($mydata["password"]) && isset($mydata["email"])){
        if($mydata["username"] != "" && $mydata["password"] != "" && $mydata["email"] != ""){
            $p_username = $mydata["username"];
            $p_password = $mydata["password"];
            //password_hash 雜湊函數加密處理
            $p_password = password_hash($p_password, PASSWORD_DEFAULT);
            $p_email = $mydata["email"];

            require_once("dbtool.php");
            $link = create_connect();
            $sql = "INSERT INTO movie_member(Username, Password, Email,UID01,UID02) VALUES('$p_username', '$p_password', '$p_email','','')";
            $result = execute_sql($link, "movie_db", $sql);
            if($result){
                echo '{"state": true, "message":"註冊會員成功!"}';
            }else{
                echo '{"state": false, "message":"註冊會員失敗!"'.mysqli_error($link).'}';
            }
            mysqli_close($link);
        }else{
            echo '{"state": false, "message":"欄位不得為空白!"}';
        }
    }else{
        echo '{"state": false, "message":"缺少規定欄位!"}';
    }
?>