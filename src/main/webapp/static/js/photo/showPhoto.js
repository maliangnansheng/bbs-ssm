//我的相册-照片
$(function () {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var userid = document.getElementById("session_userid").value;
    if (userid == "" || userid == null) {
        layer.msg("请登录！",{icon: 4});
        return;
    }

    //获取上一个页面传来的参数
    var twoText = window.location.href;
    var twodata = twoText.split("?"); //截取 url中的“?”,获得“?”后面的参数
    var fid = decodeURI(twodata[1]); //decodeURI解码 - 相册id

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
});