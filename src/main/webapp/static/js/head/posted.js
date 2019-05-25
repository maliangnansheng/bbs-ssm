//发帖-展示
function postedShow() {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var userid = document.getElementById("session_userid").value;
    $.ajax({
        //几个参数需要注意一下
        url: "plateController/getPlate2",//url
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        success: function (data) {
            if (data.resultCode == 200) {
                var plates = data["plate"];
                var posted_plate = "";
                for (var i=0;i<plates.length;i++){
                    var plate = plates[i];
                    posted_plate = posted_plate +
                        '<option>'+plate["bname"]+'</option>';
                }
                var posted_all =
                    '<form action="'+APP_PATH+'/articleController/setArticle" method="post" enctype="multipart/form-data">' +
                        '<p class="text-muted">写下你的标题：</p>' +
                        '<div class="form-group">' +
                            '<input type="text" class="form-control" placeholder="标题" id="titles" name="titles" required>' +
                        '</div>' +
                        '' +
                        '<p class="text-muted">选择所属板块：</p>' +
                        '<div class="form-group">' +
                            '<select class="form-control" name="bname">'+posted_plate+'</select>' +
                        '</div>' +
                        '' +
                        '<p class="text-muted">写下你的内容：</p>' +
                        '<div class="form-group">' +
                            '<textarea class="form-control" placeholder="内容" id="fcontent"' +
                            'name="fcontent" style="position: relative; height: 200px;" required></textarea>' +
                        '</div>' +
                        '' +
                        '<p class="text-muted">在本地选择你的配图<span class="text-danger">（视频只支持.mp4和.avi格式）：</span></p>' +
                        '<div class="form-group">' +
                            '<div id="f_preview">' +
                                '<a href="#">' +
                                    '<img style="position: relative; width: 100%; height: 100%;"' +
                                    'id="f_imghead" src="'+APP_PATH+'/static/img/fatiePhoto.png" onclick="$(\'#f_previewImg\').click();">' +
                                '</a>' +
                            '</div>' +
                            '<input type="file" onchange="f_previewImage(this)" style="display: none;" id="f_previewImg" name="photo">' +
                        '</div>' +
                        '' +
                        '<div class="modal-footer">' +
                            '<button type="reset" class="btn btn-default">清空</button>' +
                            '<button type="submit" class="btn btn-primary">发帖</button>' +
                        '</div>' +
                    '</form>';
                $("#posted_all").html(posted_all);
            } else {
                layer.msg("失败",{icon: 7});
            }
        },
        error : function() {
            layer.msg("异常！",{icon: 5});
        }
    });
}