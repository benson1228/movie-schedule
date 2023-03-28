function read_delete_list() {

    $("#read-list #del_btn").bind("click", function() {
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
                error: function() {
                    alert("error_delete.php");
                }
            });
        } else {
            console.log("not ok");
        }

    });


}

function showdata_delete(data) {
    if (data.state) {
        alert(data.message);
        location.href = "read_list.html";
    } else {
        alert(data.message);
    }
}