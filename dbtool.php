<?php

function create_connect(){
    $conn = mysqli_connect("localhost","movie","123456");
    mysqli_query($conn,'SET NAMES utf8');
    return $conn;
}

function execute_sql($conn,$dbname,$sql)
{
    mysqli_select_db($conn,$dbname)
        or die(mysqli_error($conn));

    $result = mysqli_query($conn,$sql);

    return $result;
}







?>