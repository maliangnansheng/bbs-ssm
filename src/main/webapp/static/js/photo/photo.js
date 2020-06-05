// 构造【照片】信息
function getPhoto(data, fid) {
    var photoPro = data.photoPro;
    var name = photoPro.name;
    // 相册名
    $("#showPhoto_name").html("【" + name + "】");

    $.ajax({
        url: APP_PATH + "/tbPhotoController/getTbPhoto/" + fid,
        type: "get",
        dataType: "json",
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                var showPhoto_all = "";
                var listTbPhotos = data.data.listTbPhotos;

                // 编辑相册
                $("#albumEdit_button").attr("onclick", "albumEditShow('" + fid + "')");
                // 上传照片
                $("#photoAdd_button").attr("onclick", "photoAddShow('" + fid + "','" + name + "')");

                if (listTbPhotos.length == 0){  // 该相册下无照片
                    $("#photo_null").show();
                    $("#photo_all").hide();
                    // 上传照片
                    $("#photo_null_photoAdd").attr("onclick", "photoAddShow('" + fid + "','" + name + "')");
                } else {    // 该相册下有照片
                    $("#photo_null").hide();
                    $("#photo_all").show();
                    for (var i=0; i<listTbPhotos.length; i++){
                        var listTbPhoto = listTbPhotos[i];
                        // 照片展示
                        var showPhoto_Xid_id = "showPhoto_Xid_" + listTbPhoto.xid;
                        $("#showPhoto_Xid").attr("id", showPhoto_Xid_id);
                        // 照片
                        $("#showPhoto_a").attr("href", listTbPhoto.photo);
                        $("#showPhoto_a img").attr("src", listTbPhoto.photo);
                        // 删除
                        $("#showPhoto_del").attr("onclick", "deletePhoto('" + listTbPhoto.xid + "')");

                        showPhoto_all = showPhoto_all + $("#showPhoto_hide").html();

                        // 复原
                        $("#" + showPhoto_Xid_id).attr("id", "showPhoto_Xid");
                    }
                    $("#showPhoto_all").html(showPhoto_all);
                }
            } else if (code == 500) {
                layer.msg(msg, {icon: 5});
            }
        },
        error: function () {
            layer.msg("出错！", {icon: 5});
        }
    });
}