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
function albumEditShow(fid,name) {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var userid = document.getElementById("session_userid").value;

    $.ajax({
        url: "photoProController/getPhotoProFid/"+fid,
        type: "post",
        dataType: "json",
        success: function (data) {
            var photoPro = data["photoPro"];
            var name = photoPro.name;
            var albumEdit_content =
                '<form class="form-horizontal" id="form_albumEdit">' +
                    '<div class="form-group row">' +
                        '<div class="col-md-3 col-xs-4">' +
                            '<label for="name" style="position: relative;top: 7px;left: 15px;">相册名：</label>' +
                        '</div>' +
                        '<div class="col-md-9 col-xs-8">' +
                            '<input type="hidden" name="fid" value="'+fid+'">' +
                            '<input type="text" class="form-control" id="album_name" name="name" onkeyup="onkeyupAlbumNameUpadate()" value="'+name+'"' +
                                'style="position: relative;left: -15px;" required>' +
                        '</div>' +
                    '</div>' +
                    '<div class="modal-footer">' +
                        '<button type="reset" class="btn btn-default">还原</button>' +
                        '<button type="button" class="btn btn-primary" onclick=albumEdit("'+name+'")>修改</button>' +
                    '</div>' +
                '</form>';
                $("#albumEdit_content").html(albumEdit_content);
        },
        error: function () {
            layer.msg("异常！", {icon: 5});
        }
    });
};

/*修改相册*/
function albumEdit(name) {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var userid = document.getElementById("session_userid").value;

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
        url: APP_PATH + "/photoProController/updatePhotoPro",
        type: "post",
        dataType: "json",
        data: $('#form_albumEdit').serialize(),
        success: function (result) {
            if (result.resultCode == 200){
                $('#albumEdit').modal('hide');     // 关闭模态框
                var showPhoto_name = '<h4><b class="text-info">【'+album_name+'】</b> </h4>';
                $("#showPhoto_name").html(showPhoto_name);

                layer.msg("成功");
            } else if (result.resultCode == 201){
                layer.tips('该相册名已存在!', '#album_name', {
                    tips: [1, '#ff6620'] //还可配置颜色
                });
            } else {
                layer.msg("失败",{icon: 7});
            }
        },
        error: function () {
            layer.msg("异常！", {icon: 5});
        }

    });
}