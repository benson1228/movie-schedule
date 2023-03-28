function create() {
    $("#mv_title").bind("input propertychange", function () {
        if ($(this).val().length < 31 && $(this).val().length > 0) {
            $(this).addClass("is-valid");
            $(this).removeClass("is-invalid");
            // $("#err_mv_title").html("字數符合規則");
            // $("#err_mv_title").css("color", "green");
            flag_mv_title = true;
            
        } else {
            $(this).addClass("is-invalid");
            $(this).removeClass("is-valid");
            // $("#err_mv_title").html("字數不符合規則");
            // $("#err_mv_title").css("color", "red");
            flag_mv_title = false;
            //輸入錯誤可以直接移到錯誤的位置
            moveId('#s01');
        }
    });

    $("#mv_poster").bind("change", function () {
        $("#img_poster").empty();
        const fileList = $("#mv_poster").prop("files");
        for (let i = 0; i < fileList.length; i++) {
            if (fileList[i].type === "image/jpg" || fileList[i].type === "image/jpeg") {
                if (fileList[i].size < 10 * 1024 * 1024) {
                    const fr = new FileReader();
                    fr.onload = function (e) {
                        let preview_img = `<img src="${e.target.result}" class="img-thumbnail rounded ms-3" alt="圖片" style="height:150px;width:150px">`;
                        $("#img_poster").append(preview_img);
                    }
                    fr.readAsDataURL(fileList[i]);
                    

                } else {
                    alert("單一圖片不得以超過10MB:" + fileList[i].name);
                    $("#mv_poster").val("");
                    $("#img_poster").empty();
                    //輸入錯誤可以直接移到錯誤的位置
                    moveId('#s02');
                }

            } else {
                alert("這檔案不是圖片檔，" + fileList[i].name);
                $("#mv_poster").val("");
                $("#img_poster").empty();
                
                //輸入錯誤可以直接移到錯誤的位置
                moveId('#s02');

            }
        }

    });



    $("#mv_release").bind("input propertychange", function () {
        if ($(this).val() != "") {
            // $("#err_mv_release").html("字數符合規則");
            // $("#err_mv_release").css("color", "green");
            $(this).addClass("is-valid");
            $(this).removeClass("is-invalid");
            flag_mv_release = true;
           
        } else {
            // $("#err_mv_release").html("字數不符合規則");
            // $("#err_mv_release").css("color", "red");
            $(this).addClass("is-invalid");
            $(this).removeClass("is-valid");
            flag_mv_release = false;
            //輸入錯誤可以直接移到錯誤的位置
            moveId('#s03');
        }
    });

    $("#mv_intro").bind("input propertychange", function () {

        if ($(this).val().length > 0) {
            // $("#err_mv_intro").html("字數符合規則");
            // $("#err_mv_intro").css("color", "green");
            $(this).addClass("is-valid");
            $(this).removeClass("is-invalid");
            flag_mv_intro = true;
        } else {
            // $("#err_mv_intro").html("字數不符合規則");
            // $("#err_mv_intro").css("color", "red");
            
            $(this).addClass("is-invalid");
            $(this).removeClass("is-valid");
            flag_mv_intro = false;
            //輸入錯誤可以直接移到錯誤的位置
            moveId("#s04");

        }
    });

    $("#mv_dir").bind("input propertychange", function () {
        if ($(this).val().length < 51 && $(this).val().length > 0) {
            // $("#err_mv_dir").html("字數符合規則");
            // $("#err_mv_dir").css("color", "green");
            $(this).addClass("is-valid");
            $(this).removeClass("is-invalid");
            flag_mv_dir = true;

        } else {
            // $("#err_mv_dir").html("字數不符合規則");
            // $("#err_mv_dir").css("color", "red");
            $(this).addClass("is-invalid");
            $(this).removeClass("is-valid");
            flag_mv_dir = false;
            //輸入錯誤可以直接移到錯誤的位置
            moveId('#s05');

        }
    });

    $("#mv_casting").bind("input propertychange", function () {
        if ($(this).val().length > 0) {
            // $("#err_mv_casting").html("字數符合規則");
            // $("#err_mv_casting").css("color", "green");
            $(this).addClass("is-valid");
            $(this).removeClass("is-invalid");
            flag_mv_casting = true;
            $("#ok_btn").removeAttr("href","#s06");
        } else {
            // $("#err_mv_casting").html("字數不符合規則");
            // $("#err_mv_casting").css("color", "red");
            $(this).addClass("is-invalid");
            $(this).removeClass("is-valid");
            flag_mv_casting = false;
            //輸入錯誤可以直接移到錯誤的位置
            moveId('#s06');

        }
    });



    $("#mv_awarding").bind("input propertychange", function () {
        if ($(this).val().length > 0 && $(this).val().length < 101) {
            // $("#err_mv_awarding").html("字數符合規則");
            // $("#err_mv_awarding").css("color", "green");
            $(this).addClass("is-valid");
            $(this).removeClass("is-invalid");
            flag_mv_awarding = true;
        } else {
            // $("#err_mv_awarding").html("字數不符合規則");
            // $("#err_mv_awarding").css("color", "red");
            $(this).addClass("is-invalid");
            $(this).removeClass("is-valid");
            flag_mv_awarding = false;
            //輸入錯誤可以直接移到錯誤的位置
            moveId('#s09');

        }
    });

    $("#ok_btn").bind("click", function () {
        //checkbox
        let checkbox_length = $("input[name='checkbox_genre']:checked").length;
        if (checkbox_length >= 2) {
            $("#err_checkbox_genre").html("勾選成功");
            $("#err_checkbox_genre").css("color", "green");
            flag_mv_genre = true;
            

        } else {
            $("#err_checkbox_genre").html("至少勾選兩個類別");
            $("#err_checkbox_genre").css("color", "red");
            flag_mv_genre = false;
            //輸入錯誤可以直接移到錯誤的位置
            moveId('#s07');

        }
        //select01
        if ($("#mv_length01").val() == 00 && $("#mv_length02").val() == 00) {

            $("#err_mv_length").html("時間填寫不可以為00小時00分鐘");
            $("#err_mv_length").css("color", "red");
            $("#mv_length01").addClass("is-invalid");
            $("#mv_length01").removeClass("is-valid");
            flag_mv_length01 = false;
            //輸入錯誤可以直接移到錯誤的位置
            moveId('#s08');
            
        } else {
            $("#err_mv_length").html("時間填寫符合規則");
            $("#err_mv_length").css("color", "green");
            $("#mv_length01").addClass("is-valid");
            $("#mv_length01").removeClass("is-invalid");
            flag_mv_length01 = true;
            
        }


        //select02
        if ($("#mv_length01").val() == 00 && $("#mv_length02").val() == 00) {

            $("#err_mv_length").html("時間填寫不可為00小時00分鐘");
            $("#err_mv_length").css("color", "red");
            $("#mv_length02").addClass("is-invalid");
            $("#mv_length02").removeClass("is-valid");
            flag_mv_length02 = false;
            //輸入錯誤可以直接移到錯誤的位置
            moveId('#s08');
            
        } else {
            $("#err_mv_length").html("時間填寫符合規則");
            $("#err_mv_length").css("color", "green");
            $("#mv_length02").addClass("is-valid");
            $("#mv_length02").removeClass("is-invalid");
            flag_mv_length02 = true;
        }

        if (flag_mv_title && flag_mv_release && flag_mv_intro && flag_mv_dir && flag_mv_casting && flag_mv_genre && flag_mv_length01 && flag_mv_length02 && flag_mv_awarding) {

            //file_submit
            let mv_poster = $("#mv_poster").val();
            let Form_Data_array = [];
            if (mv_poster == '' || mv_poster == null) {
                alert("請輸入圖片");
                //輸入錯誤可以直接移到錯誤的位置
                moveId('#s02');
            } else {
                const fileList = $("#mv_poster").prop("files");
                const Form_Data = new FormData();
                for (let i = 0; i < fileList.length; i++) {
                    Form_Data.append("file", fileList[i]);
                    $.ajax({
                        type: "post",
                        url: "upload.php",
                        data: Form_Data,
                        contentType: false,
                        cache: false,
                        async: false,
                        processData: false,
                        error: function () {
                            alert("error_upload.php");
                        }
                    });
                    
                    Form_Data_array.push(fileList[i].name);
                    
                }

            }


            //checkbox
            let mv = [];
            $.each($("input[name='checkbox_genre']:checked"), function () {
                mv.push($(this).val());
            });

            let hour = $("#mv_length01").val();
            let min = $("#mv_length02").val();

            var jsonDATA = {};
            jsonDATA["mv_title"] = $("#mv_title").val();
            jsonDATA["mv_poster"] = Form_Data_array.join(",");
            jsonDATA["mv_release"] = $("#mv_release").val();
            jsonDATA["mv_length"] = hour + "小時" + min + "分鐘";
            jsonDATA["mv_intro"] = $("#mv_intro").val();
            jsonDATA["mv_dir"] = $("#mv_dir").val();
            jsonDATA["mv_casting"] = $("#mv_casting").val();
            jsonDATA["mv_awarding"] = $("#mv_awarding").val();
            jsonDATA["mv_genre"] = mv.join(",");

            $.ajax({
                type: "POST",
                url: "create.php",
                dataType: "json",
                data: JSON.stringify(jsonDATA),
                success: showdata,
                error: function () {
                    alert("error_create.php");
                }
            });
        } else {
            alert("欄位錯誤或空白!");
            
        }

    });


    //清除按鈕
    $("#ok_btn_cls").bind("click", function () {

        $("#mv_title").val("");
        $("#mv_poster").val("");
        $("#img_poster").empty();
        $("#mv_release").val("");
        $("#err_checkbox_genre").html("")
        $("#mv_length01").val("00");
        $("#mv_length02").val("00");
        $("#err_mv_length").text("");
        $("#mv_intro").val("");
        $("#mv_dir").val("");
        $("#mv_casting").val("");
        $("#mv_awarding").val("");
        $("input[name='checkbox_genre']").prop("checked", false);

        //is-valid
        $("#mv_title").removeClass("is-valid");
        $("#mv_release").removeClass("is-valid");
        $("#mv_intro").removeClass("is-valid");
        $("#mv_dir").removeClass("is-valid");
        $("#mv_casting").removeClass("is-valid");
        $("#mv_length01").removeClass("is-valid");
        $("#mv_length02").removeClass("is-valid");
        $("#mv_awarding").removeClass("is-valid");

        //is-invalid
        $("#mv_title").removeClass("is-invalid");
        $("#mv_release").removeClass("is-invalid");
        $("#mv_intro").removeClass("is-invalid");
        $("#mv_dir").removeClass("is-invalid");
        $("#mv_casting").removeClass("is-invalid");
        $("#mv_length01").removeClass("is-invalid");
        $("#mv_length02").removeClass("is-invalid");
        $("#mv_awarding").removeClass("is-invalid");



    });
};

function showdata(data) {
    if (data.state) {
        alert(data.message);
        location.href = "read_list.html"
    } else {
        alert(data.message);
    }
}

//送出後錯誤引導位置
function moveId(id){
    $("#ok_btn").attr("href",id);
}