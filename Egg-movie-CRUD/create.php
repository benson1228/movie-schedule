<?php

    require_once("dbtool.php");

    $data = file_get_contents("php://input", "r");
    $mydata = array();
    $mydata = json_decode($data,true);

    if(isset($mydata["mv_title"]) 
    && isset($mydata["mv_poster"]) 
    && isset($mydata["mv_release"]) 
    && isset($mydata["mv_intro"]) 
    && isset($mydata["mv_dir"])     
    && isset($mydata["mv_casting"]) 
    && isset($mydata["mv_length"])  
    && isset($mydata["mv_genre"]) 
    && isset($mydata["mv_awarding"])
){
        if(($mydata["mv_title"]) != "" 
        && ($mydata["mv_poster"]) != "" 
        && ($mydata["mv_release"]) != ""
        && ($mydata["mv_intro"]) != "" 
        && ($mydata["mv_dir"]) != "" 
        && ($mydata["mv_casting"]) != "" 
        && ($mydata["mv_length"]) != "" 
        && ($mydata["mv_genre"]) != ""
        && ($mydata["mv_awarding"]) != "" 
        ){
            
            $m_mv_title = $mydata["mv_title"];
            $m_mv_poster = $mydata["mv_poster"];
            $m_mv_release = $mydata["mv_release"];
            $m_mv_intro = $mydata["mv_intro"];
            $m_mv_dir = $mydata["mv_dir"];
            $m_mv_casting = $mydata["mv_casting"];
            $m_mv_length = $mydata["mv_length"];
            $m_mv_genre = $mydata["mv_genre"];
            $m_mv_awarding = $mydata["mv_awarding"];

            // create connection 

            $dbname = "movie_db";

            $conn = create_connect();
            if(!$conn){
                die("connection failure".mysqli_connect_error());
            }
            
            $sql = "INSERT INTO movie_contents(Mv_title, Mv_intro, Mv_director, Mv_casting, Mv_length, Mv_awarding, Mv_poster, Mv_release,Mv_genre) VALUES ('$m_mv_title','$m_mv_intro','$m_mv_dir','$m_mv_casting','$m_mv_length','$m_mv_awarding','$m_mv_poster','$m_mv_release','$m_mv_genre')";

            $result = execute_sql($conn,$dbname,$sql);
            
            if($result){
                echo'{"state": true, "message":"新增資料成功!"}';
            }else{
                echo '{"state": false, "message":"新增資料失敗！錯誤代碼或相關訊息'.$sql.mysqli_error($conn).'}';
            }
            mysqli_close($conn);
        }else{
            echo'{"state": false, "message":"欄位不得為空白!"}';
        }
    }else{
        echo '{"state": false, "message":"缺少規定欄位!"}';
    }

?>