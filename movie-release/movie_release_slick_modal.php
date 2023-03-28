<?php

    $data = file_get_contents("php://input", "r");
    $mydata = array();
    $mydata = json_decode($data, true);

    if(isset($mydata["id"])){

        if($mydata["id"] != ''){


            $p_id = $mydata["id"];


            require_once("../dbtool.php");

            $link = create_connect();

            $sql = "SELECT * FROM movie_contents WHERE ID = '$p_id'";

            $result = execute_sql($link, "movie_db", $sql);
            if(mysqli_num_rows($result) == 1){
            
                $row = mysqli_fetch_assoc($result);

                $mv_rating = $row["Mv_rating"];

                $mv_rating++;
                
                echo '{"state": true, "message":"讀取成功!", "data" : '.json_encode($row).'}';

                $sql = "UPDATE movie_contents SET Mv_rating = '$mv_rating' WHERE ID = '$p_id'";

                execute_sql($link, "movie_db", $sql);

            }else{
                

                echo '{"state": false, "message":"讀取失敗!'.mysqli_error($link).'"}';
            }
            mysqli_close($link);
        }else{
            echo '{"state": false, "message":"欄位不得為空白!"}';
        }
    }else{
        echo '{"state": false, "message":"缺少規定欄位!"}';
    }
?>