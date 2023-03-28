<?php
    $data = file_get_contents("php://input", "r");
    $mydata = array();
    $mydata = json_decode($data, true);

    if(isset($mydata["id"])){
        if($mydata["id"]){

            $id = $mydata["id"];

            require_once("dbtool.php");
            $link = create_connect();

            $sql = "SELECT * FROM movie_contents WHERE ID = '$id'";
            $result = execute_sql($link, "movie_db", $sql);

            
            if(mysqli_num_rows($result) == 1){

                while($assoc = mysqli_fetch_assoc($result)){
                    
                    $row[] =$assoc;
                    $mv_rating = $assoc["Mv_rating"];
                    $mv_rating++;
                }
                echo '{"state": true, "data": '.json_encode($row).'}';

                $sql = "UPDATE movie_contents SET Mv_rating = '$mv_rating' WHERE ID = '$id'";
                execute_sql($link, "movie_db", $sql);
            
            }else{
                echo '{"state": false, "message":"查詢失敗!'.mysqli_error($link).'"}';
            }
            mysqli_close($link);
        }else{
            echo '{"state": false, "message":"欄位不得為空白!"}';
        }
    }else{
        echo '{"state": false, "message":"缺少規定欄位!"}';
    }
?>