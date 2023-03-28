<?php
$data = file_get_contents("php://input","r");
$jsondata = array();
$jsondata = json_decode($data,true);

if(isset($jsondata["mv_search"])){
    if($jsondata["mv_search"] != ''){
        require_once("dbtool.php");

        $conn = create_connect();
        
        $mv_search = $jsondata["mv_search"];
        
        $sql = "SELECT * FROM `movie_contents` WHERE Mv_title LIKE '%$mv_search%' OR Mv_director LIKE '%$mv_search%' OR Mv_casting LIKE '%$mv_search%' ORDER BY ID DESC";
        
        $result = execute_sql($conn,"movie_db",$sql);
        
        if(mysqli_num_rows($result) > 0){
        
            $row = array();
            while($assoc = mysqli_fetch_assoc($result)){
                $row[] = $assoc;
            }
            echo '{"state": true, "message":"查詢資料成功!", "data":'.json_encode($row).'}';
        
            
        }else{
            echo '{"state": false, "message":"查無資料!"}';  
        }
        
        mysqli_close($conn);

    }else{
        echo '{"state": false, "message":"欄位不得為空白!"}';
    }
}else{
echo '{"state": false, "message":"缺少規定欄位!"}';
}




?>