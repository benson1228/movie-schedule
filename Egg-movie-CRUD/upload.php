<?php

    if(is_array($_FILES)){
        if(is_uploaded_file($_FILES["file"]["tmp_name"])){
            if($_FILES["file"]["size"] < 10*1024*1024){
                if($_FILES["file"]["type"] == "image/jpeg" || $_FILES["file"]["type"] == "image/jpg"){

                    $source = $_FILES["file"]["tmp_name"];
                    $location = "../img/".$_FILES["file"]["name"];
                    move_uploaded_file($source,$location);

                }
            }
        }
    }








?>