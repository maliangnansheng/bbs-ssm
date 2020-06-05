/*相册删除*/
function photoProDel(fid) {
    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/photoPro/deletePhotoPro?fid=" + fid,
        type: "delete",
        dataType: "json",
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                //隐藏删除相册
                $("#showPhoto_Fid_" + fid).hide();
                layer.msg(msg);
            } else if (code == 500) {
                layer.msg(msg, {icon: 5});
            }
        },
        error: function () {
            layer.msg("出错！", {icon: 5});
        }
    });
}

/*照片删除*/
function tbPhotoDel(xid) {
    $.ajax({
        url: APP_PATH + "/tbPhotoController/deleteTbPhoto/" + xid,
        type: "delete",
        dataType: "json",
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                //隐藏删除相册
                $("#showPhoto_Xid_" + xid).hide();
                layer.msg(msg);
            } else if (code == 500) {
                layer.msg(msg, {icon: 5});
            }
        },
        error: function () {
            layer.msg("出错！", {icon: 5});
        }
    });
}


