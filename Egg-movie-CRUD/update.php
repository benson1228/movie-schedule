<?php
//{"mv_title":"OOO","mv_poster":" OOO", "mv_release":"OOO","mv_intro":" OOO","mv_dir":"OOO","mv_casting":" OOO","mv_genre":"OOO","mv_length":" OOO","mv_awarding":"OOO"}
require_once("dbtool.php");

$data = file_get_contents("php://input","r");
$jsonData = array();
$jsonData =json_decode($data, true);

if(isset($jsonData["mv_title"]) && isset($jsonData["mv_poster"]) && isset($jsonData["mv_release"]) && isset($jsonData["mv_length"]) && isset( $jsonData["mv_intro"]) && isset($jsonData["mv_dir"]) && isset($jsonData["mv_casting"]) && isset($jsonData["mv_genre"]) && isset($jsonData["mv_awarding"]) ){
    if($jsonData["mv_title"] != "" && $jsonData["mv_poster"] != "" && $jsonData["mv_release"] != "" && $jsonData["mv_intro"] != "" && $jsonData["mv_dir"] != "" && $jsonData["mv_casting"] != "" && $jsonData["mv_genre"] != "" && $jsonData["mv_length"] != "" && $jsonData["mv_awarding"] != ""){
        $p_ID = $jsonData["id"];
        $p_mv_title = $jsonData["mv_title"];
        $p_mv_poster = $jsonData["mv_poster"];
        $p_mv_release = $jsonData["mv_release"];
        $p_mv_intro = $jsonData["mv_intro"];
        $p_mv_dir = $jsonData["mv_dir"];
        $p_mv_casting = $jsonData["mv_casting"];
        $p_mv_genre = $jsonData["mv_genre"];
        $p_mv_length = $jsonData["mv_length"];
        $p_mv_awarding = $jsonData["mv_awarding"];

        $db = "movie_db";

        $conn = create_connect();

        if(!$conn){
            echo ("連線失敗".mysqli_connect_error());
        }

        $sql = "UPDATE movie_contents SET Mv_title = '$p_mv_title',Mv_poster = '$p_mv_poster',Mv_release = '$p_mv_release',Mv_intro = '$p_mv_intro',Mv_director = '$p_mv_dir',Mv_casting = '$p_mv_casting',Mv_genre = '$p_mv_genre',Mv_length = '$p_mv_length',Mv_awarding = '$p_mv_awarding' WHERE ID = '$p_ID' ";

        $result = execute_sql($conn,$db,$sql);

        if($result && mysqli_affected_rows($conn) == 1){
            echo '{"state": true, "message":"更新資料成功!"}';
        }else{
            echo '{"state": false, "message":"更新資料失敗!"}';
        }


        mysqli_close($conn);

    }else{
        echo '{"state": false, "message":"欄位不得為空白!"}';
    }
}else{
echo '{"state": false, "message":"缺少規定欄位!"}';
}

?>
