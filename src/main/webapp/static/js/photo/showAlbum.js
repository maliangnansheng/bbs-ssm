//我的相册-相册
$(function () {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var userid = document.getElementById("session_userid").value;
    if (userid == "" || userid == null) {
        layer.msg("请登录！",{icon: 4});
        return;
    }

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
});