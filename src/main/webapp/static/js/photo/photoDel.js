/*相册删除*/
function photoProDel(fid) {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var userid = document.getElementById("session_userid").value;

    $.ajax({
        url: APP_PATH + "/photoProController/deletePhotoPro?fid=" + fid,
        type: "post",
        dataType: "json",
        success: function (result) {
            if (result.resultCode == 200){
                //隐藏删除相册
                $("#showPhoto_Fid"+fid).hide();
                layer.msg("成功");
            } else {
                layer.msg("失败",{icon: 7});
            }
        },
        error: function () {
            layer.msg("异常！", {icon: 5});
        }

    });
};

/*照片删除*/
function tbPhotoDel(xid) {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var userid = document.getElementById("session_userid").value;

    $.ajax({
        url: APP_PATH + "/tbPhotoController/deleteTbPhoto/" + xid,
        type: "post",
        dataType: "json",
        success: function (result) {
            if (result.resultCode == 200){
                //隐藏删除相册
                $("#showPhoto_Xid"+xid).hide();
                layer.msg("成功");
            } else {
                layer.msg("失败",{icon: 7});
            }
        },
        error: function () {
            layer.msg("异常！", {icon: 5});
        }

    });
};


