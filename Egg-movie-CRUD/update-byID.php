<?php
  // header("Access-Control-Allow-Origin: *");
require_once("dbtool.php");

$data = file_get_contents("php://input","r");
$jsondata = array();
$jsondata = json_decode($data,true);

if(isset($jsondata["ID"])){
  if($jsondata["ID"] != ""){

    $p_id = $jsondata["ID"];

    $dbname = "movie_db";

    $conn = create_connect();

    $sql = "SELECT * FROM movie_contents WHERE ID ='$p_id'"; 

      $result = execute_sql($conn,$dbname,$sql);

      if(mysqli_num_rows($result) == 1){
          $mydata = array();

          while($row = mysqli_fetch_assoc($result)){
            $mydata[] = $row; 
          }
          
          echo '{"state": true, "message":"讀取資料成功!", "data":'.json_encode($mydata).'}';    
      }else{

        echo '{"state": false, "message":"讀取資料失敗或查無資料!"}';     
      }

      mysqli_close($conn);

  }else{
    echo '{"state": false, "message":"欄位不得為空白!"}';
  }
}else{
  echo '{"state": false, "message":"缺少規定欄位!"}';
}




?>