//確認會員登入狀態
//登出按鈕 設定為 #logout_btn
//會員名稱 設定為 #login_member


//利用cookie uid 確認登入狀態
function check_member_state(){
    if (getCookie("UID01") != "" && getCookie("UID02") != "") {
        //傳遞至後端驗證 UID 
        var jsonData = {};
        jsonData["uid01"] = getCookie("UID01");
        jsonData["uid02"] = getCookie("UID02");
        console.log(JSON.stringify(jsonData));

        $.ajax({
            type: "POST",
            url: "moviemem_uid_check_api.php",
            data: JSON.stringify(jsonData),
            dataType: "json",
            async: false,
            success: showdata_uid_check,
            error: function () {
                alert("error-moviemem_uid_check_api.php");
            }
        });
    } else {
        alert("請先登錄或註冊會員!");
        location.href = "前台時刻表首頁.html";
    }    
}


//登出按鈕logout_btn監聽
$("#logout_btn").bind("click", function () {
    setCookie("UID01", "", 7);
    setCookie("UID02", "", 7);
    location.href = "moviemem_control_panel.html";
});


function showdata_uid_check(data) {
    console.log(data);
    if (data.state) {
        //uid 驗證成功
        //顯示會員帳號相關訊息
        $("#login_member").text(data.data[0].Username + "會員您好!");
    } else {
        //uid 驗證失敗
        alert("請先登錄或註冊會員!");
        location.href = "前台時刻表首頁.html";
    }
}

//form w3c
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}