/* 相册名创建预览 */
function onkeyupAlbumNameUpadate() {
    var albumName = $.trim($("#album_name").val());   //去掉前后空格
    var count_num = chEnWordCount(albumName);
    if (count_num > albumNameLength){
        layer.tips('不能超过【'+albumNameLength+'】个字符，当前数 - '+count_num, '#album_name', {
            tips: [1, '#ff6620'] //还可配置颜色
        });
        return false;
    } else {
        var index = layer.tips("满足");
        // 立即关闭
        layer.close(index);
        return true;
    }
}

/*修改相册*/
function albumEditShow(fid) {
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
                var photoPro = data.data.photoPro;
                var name = photoPro.name;
                // 相册id
                $("#album_fid").attr("value", fid);
                // 相册名
                $("#album_name").attr("value", name);
                // 修改按钮
                $("#album_update_submit").attr("onclick", "albumEdit('" + name + "')");
            } else if (code == 500) {
                layer.msg(msg, {icon: 5});
            }
        },
        error: function () {
            layer.msg("出错！", {icon: 5});
        }
    });
};

/*修改相册*/
function albumEdit(name) {
    var album_name = $.trim($("#album_name").val());   //去掉前后空格
    if (album_name == ""){
        layer.tips('请输入相册名!', '#album_name', {
            tips: [1, '#ff6620'] //还可配置颜色
        });
        return;
    } else if (album_name == name){
        layer.tips('请修改', '#album_name', {
            tips: [1, '#ff6620'] //还可配置颜色
        });
        return;
    }
    if (!onkeyupAlbumNameUpadate()){
        return;
    }

    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/photoPro/updatePhotoPro",
        type: "put",
        dataType: "json",
        data: $('#form_albumEdit').serialize(),
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                $('#albumEdit').modal('hide');     // 关闭模态框
                // 相册名
                $("#showPhoto_name").html("【" + album_name + "】");
                layer.msg(msg);
            } else if (code == 404) {
                layer.tips(msg, '#album_name', {
                    tips: [1, '#ff6620'] //还可配置颜色
                });
            } else if (code == 500) {
                layer.msg(msg, {icon: 5});
            }
        },
        error: function () {
            layer.msg("出错！", {icon: 5});
        }

    });
}