<?php
//檢查帳號是否存在(會員註冊時會顯示的訊息)
//INPUT: {"username":"owner"}
//Output:
// {"state": true, "message":"該帳號不存在, 帳號可以使用!"}
// {"state": false, "message":"該帳號已存在, 帳號不可以使用!"}
// {"state": false, "message":"欄位不得為空白!"}
// {"state": false, "message":"缺少規定欄位!"}

    $data = file_get_contents("php://input","r");
    $mydata = array();
    $mydata = json_decode($data,true);

    if(isset($mydata["username"])){
        if($mydata["username"] != ""){
            $p_username = $mydata["username"];

            require_once("dbtool.php");
            $link = create_connect();
            $sql = "SELECT Username FROM movie_member WHERE Username = '$p_username'";
            $result = execute_sql($link,"movie_db", $sql);
            if(mysqli_num_rows($result) == 1)
            {
                //帳號已經存在 
                //狀態:錯誤 訊息:帳號存在
                echo '{"state": false,"message":"該帳號已經存在，帳號不可以使用"}';
            }else{
                //帳號不存在
                //狀態:正確 訊息:帳號不存在
                echo '{"state":true,"message":"該帳號不存在,帳號可以使用!"}';
            }
            mysqli_close($link);
        }else{
            echo '{"state": false,"message":"欄位不得為空白!"}';
        }
    }else{
        echo '{"state": false,"message":"缺少規定欄位!"}';
    }
?>