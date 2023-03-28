function read() {
    $.ajax({
        type: "GET",
        url: "read_list.php",
        dataType: "json",
        async: false,
        success: showdata,
        error: function () {
            console.log("讀取失敗+read_list.php");
        }
    });

    $("#read-list #del_btn").bind("click", function () {
        console.log($(this).data("id"));

        if (confirm("確認刪除 id:" + $(this).data("id") + "?")) {
            console.log("ok");

            var jsonData = {};
            jsonData["ID"] = $(this).data("id");
            console.log(JSON.stringify(jsonData));

            $.ajax({
                type: "POST",
                url: "delete.php",
                data: JSON.stringify(jsonData),
                dataType: "json",
                async: false,
                success: showdata_delete,
                error: function () {
                    alert("error_delete.php");
                }
            });
        } else {
            console.log("not ok");
        }

    });


};

function showdata(data) {
    $("#read-list").empty();
    console.log(data);
    if (data.state) {
        alert(data.message);

        for (var i = 0; i < data.data.length; i++) {
            let strHTML =
                `<tr>
                    <th scope="row">${data.data[i]["ID"]}</th>
                    <td>${data.data[i]["Mv_title"]}</td>
                    <td>${data.data[i]["Mv_genre"]}</td>
                    <td>${data.data[i]["Mv_release"]}</td>
                    <td>${data.data[i]["Mv_length"]}</td>
                    <td><a href="update.html?id=${data.data[i]["ID"]}" id="up_btn"><i class='fas fa-edit'
                                style='font-size:24px;color: var(--color11);'></i></a>
                    </td>
                    <td><a href="#" data-id="${data.data[i]["ID"]}" id="del_btn"><i class='fas fa-trash-alt' 
                                style='font-size:24px;color: var(--color27);' ></i></a></td>
                </tr>`;
            $("#read-list").append(strHTML);
        }

    } else {
        console.log(data.message)
    }
};

function showdata_delete(data) {          
            if (data.state) {
                alert(data.message);
                location.href = "read_list.html";
            } else {
                alert(data.message);
            }
}

