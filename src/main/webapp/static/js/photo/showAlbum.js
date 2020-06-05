//我的相册-相册
$(function () {
    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/photoPro/getPhoto",
        type: "get",
        dataType: "json",
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                $("#showPhoto_all").html(getAlbum(data.data));
            } else if (code == 500) {
                layer.msg(msg, {icon: 5});
            }
        },
        error: function () {
            layer.msg("出错！", {icon: 5});
        }

    });
});

// 回到我的主页
$(".myself_page").click(function () {
    goMyHome();
});