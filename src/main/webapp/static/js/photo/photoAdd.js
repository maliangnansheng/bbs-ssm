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
    var APP_PATH = document.getElementById("APP_PATH").value;
    var userid = document.getElementById("session_userid").value;

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
        url: APP_PATH + "/photoProController/setPhotoPro",
        type: "post",
        dataType: "json",
        data: $('#form_photoProAdd').serialize(),
        success: function (result) {
            if (result.resultCode == 200){
                $(".photoProAdd_name").val("");  //清空创建相册输入框
                $('#photoProAdd').modal('hide');     // 关闭模态框
                $.ajax({
                    url: "common/getPhoto",
                    type: "post",
                    dataType: "json",
                    success: function (data) {
                        var showPhoto_all = "";
                        var showPhoto_exist = "";
                        var listPhotoPros = data["listPhotoPros"];
                        // 新建相册
                        var showPhoto_new =
                            '<div class="col-md-2 col-xs-6">' +
                            '<a href="#" data-toggle="modal" data-target="#photoProAdd">' +
                            '<div style="position: relative;width: 160px;height:160px; background-color: #ffffff;" class="text-center img-thumbnail">' +
                            '<br><br>' +
                            '<span class="col-md-12 col-xs-12 glyphicon glyphicon-plus text-primary" style="font-size: 30px;"></span>' +
                            '<span class="col-md-12 col-xs-12 text-primary" style="top: 10px;">新建相册</span>' +
                            '</div>' +
                            '</a>' +
                            '</div>';

                        for (var i=0; i<listPhotoPros.length; i++){
                            var listPhotoPro = listPhotoPros[i];
                            var showPhoto_img = "";
                            var showPhoto_button = "";
                            if (listPhotoPro.photo == "" || listPhotoPro.photo == null){
                                showPhoto_img =
                                    '<img src="'+APP_PATH+'/static/img/photo/wuzhaopian.png"' +
                                    'style="position: relative;width: 100%;height:100%; border-radius: 5px 5px 0px 0px; border-bottom: 1px dashed rgba(0,0,0,0.11);"' +
                                    'class="img-thumbnail">';
                            } else {
                                showPhoto_img =
                                    '<img src="'+APP_PATH+'/static/upload/photo/'+listPhotoPro.photo+'"' +
                                    'style="position: relative;width: 100%;height:100%; border-radius: 5px 5px 0px 0px; border-bottom: 1px dashed rgba(0,0,0,0.11);"' +
                                    'class="img-thumbnail">';
                            }
                            showPhoto_button =
                                '<button class="btn btn-default btn-sm"' +
                                'style="width: 100%; border-radius: 0px 0px 5px 5px; border-top: none;">'+listPhotoPro.name+'</button>';
                            showPhoto_exist = showPhoto_exist +
                                '<div class="col-md-2 col-xs-6" id="showPhoto_Fid'+listPhotoPro.fid+'">' +
                                    '<div style="position: relative;width: 160px;height:160px;" class="text-center">' +
                                        '<a href="'+APP_PATH+'/photo.jsp?'+listPhotoPro.fid+'">'+showPhoto_img+showPhoto_button+'</a>' +
                                        '<a href="javascript:void(0)" onclick="deletePhotoPro('+listPhotoPro.fid+');"' +
                                            'class="glyphicon glyphicon-remove" style="color: red; position: relative; top: -185px;left: 70px;"></a>' +
                                    '</div>' +
                                    '<br><br>' +
                                '</div>';
                        }
                        showPhoto_all = showPhoto_new + showPhoto_exist;
                        $("#showPhoto_all").html(showPhoto_all);
                    },
                    error: function () {
                        layer.msg("异常！", {icon: 5});
                    }

                });
                layer.msg("成功");
            } else if (result.resultCode == 201){
                layer.tips('该相册名已存在!', '#photoProAdd_name', {
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
};

/*上传照片-获取相册名*/
function photoAddShow(fid, name) {
    $("#photoAdd_albumFid").val(fid);
    $("#photoAdd_albumName").html(name);
};

/*上传照片*/
function photoAdd() {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var userid = document.getElementById("session_userid").value;

    var formData = new FormData();
    if ($("#user_previewImg")[0].files[0] == null){  //未配图
        layer.tips('请选择要上传的照片!', '#user_preview', {
            tips: [1, '#ff6620'] //还可配置颜色
        });
        return;
    }
    formData.append("photo",$("#user_previewImg")[0].files[0]);
    var fid = $("#photoAdd_albumFid").val();

    $.ajax({
        //几个参数需要注意一下
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: APP_PATH + "/tbPhotoController/setTbPhoto/" + fid ,//url
        data: formData ,
        // 告诉jQuery不要去处理发送的数据
        processData : false,
        // 告诉jQuery不要去设置Content-Type请求头
        contentType : false,
        success: function (result) {
            if (result.resultCode == 200){
                $('#photoAdd').modal('hide');     // 关闭模态框
                layer.msg("成功");

                $.ajax({
                    url: "photoProController/getPhotoProFid/"+fid,
                    type: "post",
                    dataType: "json",
                    success: function (data) {
                        var photoPro = data["photoPro"];
                        var name = photoPro.name;

                        var showPhoto_name = '<h4><b class="text-info">【'+name+'】</b> </h4>';
                        $("#showPhoto_name").html(showPhoto_name);

                        $.ajax({
                            url: "tbPhotoController/getTbPhoto/"+fid,
                            type: "post",
                            dataType: "json",
                            success: function (data) {
                                var listTbPhotos = data["listTbPhotos"];
                                var showPhoto_all = "";
                                var showPhoto_photo = "";

                                var showPhoto_top =
                                    '<div class="col-md-1 col-xs-3" style="top: 4px;">' +
                                        '<button class="btn btn-info btn-sm" data-toggle="modal" data-target="#albumEdit" onclick="albumEditShow('+fid+')">' +
                                            '<span class="glyphicon glyphicon-pencil"></span> 编辑相册</button>' +
                                    '</div>' +
                                    '<div class="col-md-1 col-xs-3" style="top: 4px;">' +
                                        '<button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#photoAdd" onclick=photoAddShow('+fid+',"'+name+'")>' +
                                            '<span class="glyphicon glyphicon-arrow-up"></span> 上传照片</button>' +
                                    '</div>';
                                $("#showPhoto_top").html(showPhoto_top);

                                if (listTbPhotos.length == 0){  // 该相册下无照片
                                    showPhoto_photo =
                                        '<div>' +
                                            '<br><br><br>' +
                                            '<div class="text-center">' +
                                                '<p class="text-danger">生活点滴，不忘记录</p>' +
                                                '<button class="btn btn-primary" data-toggle="modal" data-target="#photoAdd" onclick=photoAddShow('+fid+',"'+name+'")>' +
                                                    '<span class="glyphicon glyphicon-arrow-up"></span> 上传照片</button>' +
                                                '<br>' +
                                                '<img alt="该相册下无照片" src="'+APP_PATH+'/static/img/photo/wuzhaopian.png">' +
                                            '</div>' +
                                        '</div>';
                                } else {    // 该相册下有照片
                                    for (var i=0; i<listTbPhotos.length; i++){
                                        var listTbPhoto = listTbPhotos[i];
                                        showPhoto_photo = showPhoto_photo +
                                            '<div class="col-md-2 col-xs-6" id="showPhoto_Xid'+listTbPhoto.xid+'">' +
                                                '<li>' +
                                                    '<div style="position: relative;width: 160px;height:160px;" class="text-center">' +
                                                        '<a href="'+APP_PATH+'/static/upload/photo/'+listTbPhoto.photo+'" target="_blank">' +
                                                            '<img src="'+APP_PATH+'/static/upload/photo/'+listTbPhoto.photo+'"' +
                                                                'style="position: relative;width: 100%;height:100%;" class="img-rounded">' +
                                                        '</a>' +
                                                    '</div>' +
                                                    '<div>' +
                                                        '<a href="javascript:void(0)"' +
                                                            'style="position: relative;top: -160px;left: 145px; z-index: 9; color: red;" class="glyphicon glyphicon-remove"' +
                                                            'onclick="deletePhoto('+listTbPhoto.xid+')"></a>' +
                                                    '</div>' +
                                                '</li>' +
                                            '</div>';

                                    }
                                }
                                showPhoto_all = showPhoto_all +
                                    '<ul>'+showPhoto_photo+'</ul>';
                                $("#showPhoto_all").html(showPhoto_all);
                            },
                            error: function () {
                                layer.msg("异常！", {icon: 5});
                            }
                        });
                    },
                    error: function () {
                        layer.msg("异常！", {icon: 5});
                    }

                });
            } else {
                layer.msg("失败",{icon: 7});
            }
        },
        error: function () {
            layer.msg("异常！", {icon: 5});
        }

    });
};

