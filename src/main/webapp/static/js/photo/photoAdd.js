/*--------------------------------------------------------- 相册 ---------------------------------------------------------*/
/* 相册名创建预览 */
function onkeyupAlbumNameCreate() {
    var albumName = $.trim($("#photoProAdd_name").val());   //去掉前后空格
    var count_num = chEnWordCount(albumName);
    if (count_num > albumNameLength){
        layer.tips('不能超过【'+albumNameLength+'】个字符，当前数 - '+count_num, '#photoProAdd_name', {
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

/*创建相册*/
function photoProAdd() {
    var album_name = $.trim($("#photoProAdd_name").val());   //去掉前后空格
    if (album_name == ""){
        layer.tips('请输入相册名!', '#photoProAdd_name', {
            tips: [1, '#ff6620'] //还可配置颜色
        });
        return false;
    }
    if (!onkeyupAlbumNameCreate()) {
        return false;
    }

    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/photoPro/setPhotoPro",
        type: "post",
        dataType: "json",
        data: $('#form_photoProAdd').serialize(),
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                $(".photoProAdd_name").val("");  //清空创建相册输入框
                $('#photoProAdd').modal('hide');     // 关闭模态框
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
                layer.msg(msg);
            } else if (code == 404) {
                layer.tips(msg, '#photoProAdd_name', {
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
/*--------------------------------------------------------- 相册 ---------------------------------------------------------*/

/*--------------------------------------------------------- 相片 ---------------------------------------------------------*/
/*上传照片-获取相册名*/
function photoAddShow(fid, name) {
    $("#photoAdd_albumFid").val(fid);
    $("#photoAdd_albumName").html(name);
}

/*上传照片*/
function photoAdd() {
    var formData = new FormData();
    var picture = $("#user_previewImg")[0].files[0];
    if (picture == null){  //未配图
        layer.tips('请选择要上传的照片!', '#user_preview', {
            tips: [1, '#ff6620'] //还可配置颜色
        });
        return;
    }
    if (picture.size > sourceFileSize) {    // 超过上传源文件允许的最大值
        layer.msg("请上传不超过 " + sourceFileSize/(1024*1024) + "M 的图片!",{icon: 5});
        return;
    }
    formData.append("photo", picture);
    var fid = $("#photoAdd_albumFid").val();

    $.ajax({
        //几个参数需要注意一下
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: APP_PATH + "/tbPhotoController/setTbPhoto/" + fid ,
        data: formData ,
        // 告诉jQuery不要去处理发送的数据
        processData : false,
        // 告诉jQuery不要去设置Content-Type请求头
        contentType : false,
        xhr: function(){
            $(".picture-progress").show();
            myXhr = $.ajaxSettings.xhr();
            if(myXhr.upload){
                myXhr.upload.addEventListener('progress',function(e) {
                    if (e.lengthComputable) {
                        var percent = Math.floor(e.loaded/e.total*100);
                        if (percent <= 100) {
                            var ratio = dynamicStorageUnit(e.loaded) + '/' + dynamicStorageUnit(e.total) + ' ' + percent + '%';
                        }
                        if (percent >= 100) {
                            var ratio = '<small>压缩上传中...</small>';
                        }
                        $(".picture-progress .progress-bar").attr("style", "width:" + percent + '%');
                        $(".picture-progress .progress-bar").html(ratio);
                    }
                }, false);
            }
            return myXhr;
        },
        success: function (data) {
            // 隐藏进度条
            $(".picture-progress").hide();
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                // 清空选择的文件
                $("#user_imghead").attr("src", APP_PATH + '/static/img/fatiePhoto.png');
                $("#user_previewImg").val("");

                $('#photoAdd').modal('hide');     // 关闭模态框
                layer.msg(msg);
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
            } else if (code == 500) {
                layer.msg(msg, {icon: 5});
            }
        },
        error: function () {
            layer.msg("出错！", {icon: 5});
        }

    });
}
/*--------------------------------------------------------- 相片-end ---------------------------------------------------------*/