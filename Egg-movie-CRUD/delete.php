<?php

    require_once("dbtool.php");

    $data = file_get_contents("php://input", "r");
    $mydata = array();
    $mydata = json_decode($data, true);


    
    if(isset($mydata["ID"])){
        if($mydata["ID"] != ""){
            $p_ID = $mydata["ID"];


            $dbname = "movie_db";

            $conn = create_connect();

            if(!$conn){
                die("連線失敗".mysqli_connect_error());
            }
            
            $sql = "DELETE FROM movie_contents WHERE ID = '$p_ID' " ; 

            $result = execute_sql($conn,$dbname,$sql);
            
            if($result && mysqli_affected_rows($conn) == 1){   
                echo '{"state": true, "message":"刪除資料成功!"}';
            }else{
                echo '{"state": false, "message":"刪除資料失敗!"'.$sql.mysqli_error($conn).'}';
            }
            mysqli_close($conn);
        }else{
            echo '{"state": false, "message":"欄位不得為空白!"}';
        }
    }else{
        echo '{"state": false, "message":"缺少規定欄位!"}';
    }


?>