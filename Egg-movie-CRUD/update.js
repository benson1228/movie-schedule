function update() {    
    if (typeof (location.href.split("=")[1]) != "undefined") {
        id = location.href.split("=")[1];
        var jsondata = {};
        jsondata["ID"] = id;

        $.ajax({
            type: "POST",
            url: "update-byID.php",
            data: JSON.stringify(jsondata),
            dataType: "json",
            async: false,
            success: show_id_data,
            error: function () {
                alert("error_20221220_food_byID_api.php")
            }
        });
    } else {
        console.log("網址錯誤!");
        location.href = "Updata-not-find-ID";
    }


    function show_id_data(data) {

        //update_file
        let mv_preview_poster = data.data[0]["Mv_poster"];
        mv_preview_poster = mv_preview_poster.split(",");
        for (let i = 0; i < mv_preview_poster.length; i++) {
            let mv_poster_img = `<img src="../img/${mv_preview_poster[i]}" class="img-thumbnail rounded ms-3" alt="圖片" style="height:150px;width:150px">`;
            $("#img_poster").append(mv_poster_img);
        }

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
                    }

                } else {
                    alert("這檔案不是圖片檔，" + fileList[i].name);
                    $("#mv_poster").val("");
                    $("#img_poster").empty();
                }
            }

        });

        //checkbox
        let checkbox_genre = data.data[0]["Mv_genre"];
        checkbox_genre = checkbox_genre.split(",");
        let genre01 = $("#genre01").val();
        let genre02 = $("#genre02").val();
        let genre03 = $("#genre03").val();
        let genre04 = $("#genre04").val();
        let genre05 = $("#genre05").val();
        let genre06 = $("#genre06").val();
        let genre07 = $("#genre07").val();
        let genre08 = $("#genre08").val();
        let genre09 = $("#genre09").val();
        let genre10 = $("#genre10").val();
        let genre11 = $("#genre11").val();
        let genre12 = $("#genre12").val();

        for (let i = 0; i < checkbox_genre.length; i++) {
            switch (checkbox_genre[i]) {
                case genre01:
                    $("#genre01").attr("checked", true);
                    break;
                case genre02:
                    $("#genre02").attr("checked", true);
                    break;
                case genre03:
                    $("#genre03").attr("checked", true);
                    break;
                case genre04:
                    $("#genre04").attr("checked", true);
                    break;
                case genre05:
                    $("#genre05").attr("checked", true);
                    break;
                case genre06:
                    $("#genre06").attr("checked", true);
                    break;
                case genre07:
                    $("#genre07").attr("checked", true);
                    break;
                case genre08:
                    $("#genre08").attr("checked", true);
                    break;
                case genre09:
                    $("#genre09").attr("checked", true);
                    break;
                case genre10:
                    $("#genre10").attr("checked", true);
                    break;
                case genre11:
                    $("#genre11").attr("checked", true);
                    break;
                case genre12:
                    $("#genre12").attr("checked", true);
                    break;
            }
        }

        //select
        let mv_length = data.data[0]["Mv_length"];
        mv_length = mv_length.split("");
        $("#mv_length01").val(mv_length[0] + mv_length[1]);
        $("#mv_length02").val(mv_length[4] + mv_length[5]);

        //other
        let mv_title = data.data[0]["Mv_title"];
        let mv_release = data.data[0]["Mv_release"];
        let mv_intro = data.data[0]["Mv_intro"];
        let mv_dir = data.data[0]["Mv_director"];
        let mv_casting = data.data[0]["Mv_casting"];
        let mv_awarding = data.data[0]["Mv_awarding"];

        $("#mv_title").val(mv_title);
        $("#mv_release").val(mv_release);
        $("#mv_intro").val(mv_intro);
        $("#mv_dir").val(mv_dir);
        $("#mv_casting").val(mv_casting);
        $("#mv_awarding").val(mv_awarding);

        $("#up2_btn").bind("click", function () {

            var flag_mv_title;
            var flag_mv_poster;
            var flag_mv_release;
            var flag_mv_intro;
            var flag_mv_dir;
            var flag_mv_casting;
            var flag_mv_length;
            var flag_mv_genre;
            var flag_mv_awarding;
            var flag_mv_length01;
            var flag_mv_length02;

            var hour;
            var min;

            if ($("#mv_title").val().length < 31 && $("#mv_title").val().length > 0) {
                $("#mv_title").addClass("is-valid");
                $("#mv_title").removeClass("is-invalid");
                // $("#err_mv_title").html("字數符合規則");
                // $("#err_mv_title").css("color", "green");
                flag_mv_title = true;
            } else {
                $("#mv_title").addClass("is-invalid");
                $("#mv_title").removeClass("is-valid");
                // $("#err_mv_title").html("字數不符合規則");
                // $("#err_mv_title").css("color", "red");
                flag_mv_title = false;
            }

            //file_submit
            let mv_poster = $("#mv_poster").val();
            let Form_Data_array = [];
            if (mv_poster == '') {
                Form_Data_array.push(data.data[0]["Mv_poster"]);
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


            if ($("#mv_release").val() != "") {
                // $("#err_mv_release").html("字數符合規則");
                // $("#err_mv_release").css("color", "green");
                $("#mv_release").addClass("is-valid");
                $("#mv_release").removeClass("is-invalid");
                flag_mv_release = true;
            } else {
                // $("#err_mv_release").html("字數不符合規則");
                // $("#err_mv_release").css("color", "red");
                $("#mv_release").addClass("is-invalid");
                $("#mv_release").removeClass("is-valid");
                flag_mv_release = false;
            }

            if ($("#mv_intro").val().length > 0) {
                // $("#err_mv_intro").html("字數符合規則");
                // $("#err_mv_intro").css("color", "green");
                $("#mv_intro").addClass("is-valid");
                $("#mv_intro").removeClass("is-invalid");
                flag_mv_intro = true;
            } else {
                // $("#err_mv_intro").html("字數不符合規則");
                // $("#err_mv_intro").css("color", "red");
                $("#mv_intro").addClass("is-invalid");
                $("#mv_intro").removeClass("is-valid");
                flag_mv_intro = false;
            }

            if ($("#mv_dir").val().length < 51 && $("#mv_dir").val().length > 0) {
                // $("#err_mv_dir").html("字數符合規則");
                // $("#err_mv_dir").css("color", "green");
                $("#mv_dir").addClass("is-valid");
                $("#mv_dir").removeClass("is-invalid");
                flag_mv_dir = true;
            } else {
                // $("#err_mv_dir").html("字數不符合規則");
                // $("#err_mv_dir").css("color", "red");
                $("#mv_dir").addClass("is-invalid");
                $("#mv_dir").removeClass("is-valid");
                flag_mv_dir = false;
            }

            if ($("#mv_casting").val().length > 0) {
                // $("#err_mv_casting").html("字數符合規則");
                // $("#err_mv_casting").css("color", "green");
                $("#mv_casting").addClass("is-valid");
                $("#mv_casting").removeClass("is-invalid");
                flag_mv_casting = true;
            } else {
                // $("#err_mv_casting").html("字數不符合規則");
                // $("#err_mv_casting").css("color", "red");
                $("#mv_casting").addClass("is-invalid");
                $("#mv_casting").removeClass("is-valid");
                flag_mv_casting = false;
            }

            if ($("#mv_awarding").val().length > 0 && $("#mv_awarding").val().length < 101) {
                // $("#err_mv_awarding").html("字數符合規則");
                // $("#err_mv_awarding").css("color", "green");
                $("#mv_awarding").addClass("is-valid");
                $("#mv_awarding").removeClass("is-invalid");
                flag_mv_awarding = true;
            } else {
                // $("#err_mv_awarding").html("字數不符合規則");
                // $("#err_mv_awarding").css("color", "red");
                $("#mv_awarding").addClass("is-invalid");
                $("#mv_awarding").removeClass("is-valid");
                flag_mv_awarding = false;
            }

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

            }

            //select01
            if ($("#mv_length01").val() == 00 && $("#mv_length02").val() == 00) {

                $("#err_mv_length").html("時間填寫不可以為00小時00分鐘");
                $("#err_mv_length").css("color", "red");
                $("#mv_length01").addClass("is-invalid");
                $("#mv_length01").removeClass("is-valid");
                flag_mv_length01 = false;

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

            } else {
                $("#err_mv_length").html("時間填寫符合規則");
                $("#err_mv_length").css("color", "green");
                $("#mv_length02").addClass("is-valid");
                $("#mv_length02").removeClass("is-invalid");
                flag_mv_length02 = true;
            }

            if (flag_mv_title && flag_mv_release && flag_mv_intro && flag_mv_dir && flag_mv_casting && flag_mv_genre && flag_mv_length01 && flag_mv_length02 && flag_mv_awarding) {

            //checkbox
            let mv = [];
            $.each($("input[name='checkbox_genre']:checked"), function () {
                mv.push($(this).val());
            });

            let hour = $("#mv_length01").val();
            let min = $("#mv_length02").val();

            var jsonDATA = {};
            jsonDATA["id"] = id;
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
                url: "update.php",
                dataType: "json",
                data: JSON.stringify(jsonDATA),
                success: showdata,
                error: function () {
                    alert("error_update.php");
                }
            });
        } else {
            alert("欄位不得為空白!");
        }


        });
    }
};

function showdata(data) {
    if (data.state) {
        alert(data.message);
        location.href = "read_list.html";
    } else {
        alert(data.message);
        location.href = "read_list.html";
    }
}

