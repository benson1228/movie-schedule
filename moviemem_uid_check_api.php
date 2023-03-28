<?php
//INPUT: {"uid01":"xxx","uid02":"xxx"}
//Output:
// {"state": true, "message":"登入狀態成功!","data":"該筆會員資料相關"}
//{"state": false, "message":"登入狀態失敗!錯誤代碼或相關訊息"}
//{"state": false, "message":"欄位不得為空白!"}
//{"state": false, "message":"缺少規定欄位!"}

    $data = file_get_contents("php://input", "r");
    $mydata = array();
    $mydata = json_decode($data, true);

    if(isset($mydata["uid01"]) && isset($mydata["uid02"])){
        if($mydata["uid01"] != "" && $mydata["uid02"] != "" ){
            $p_uid01 = $mydata["uid01"];
            $p_uid02 = $mydata["uid02"];
            

            require_once("dbtool.php");
            $link = create_connect();
            $sql = "SELECT Username,Email, UserState,Created_at FROM movie_member WHERE UID01 = '$p_uid01' AND  UID02 = '$p_uid02' ";

            $result = execute_sql($link, "movie_db", $sql);

            if(mysqli_num_rows($result) == 1){
                //UID合法
                $userData = array();
                $row = mysqli_fetch_assoc($result);
                $userData[] = $row;
                echo '{"state": true, "message":"登入狀態成功!","data": '.json_encode($userData).'}';
            }else{
                //UID 非法
                echo '{"state": false, "message":"登入狀態失敗!'.mysqli_error($link).'"}';
            }
            mysqli_close($link);
        }else{
            echo '{"state": false, "message":"欄位不得為空白!"}';
        }
    }else{
        echo '{"state": false, "message":"缺少規定欄位!"}';
    }
?>