//我的相册-照片
$(function () {
    //获取上一个页面传来的参数
    var twoText = window.location.href;
    var twodata = twoText.split("?"); //截取 url中的“?”,获得“?”后面的参数
    var fid = decodeURI(twodata[1]); //decodeURI解码 - 相册id

    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/photoPro/getPhotoProFid/" + fid,
        type: "get",
        dataType: "json",
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                getPhoto(data.data, fid);
            } else if (code == 500) {
                layer.msg(msg, {icon: 5});
            }
        },
        error: function () {
            layer.msg("出错！", {icon: 5});
        }

    });
});