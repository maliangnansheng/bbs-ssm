// 添加收藏
function collectAdd(fid,userid) {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var userid = document.getElementById("session_userid").value;
    $.ajax({
        //几个参数需要注意一下
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "collectController/setCollect" ,//url
        data: $('#form_collectAdd_'+fid).serialize(),
        success: function (result) {
            if (result.resultCode == 200) {
                //获取最新评论信息
                $.ajax({
                    type: "post",//方法类型
                    dataType: "json",//预期服务器返回的数据类型
                    url: "collectController/getCollectFid/"+fid ,//url
                    success: function (data) {
                        var collect = data["collect"];
                        var form_collect =
                            '<form id="form_collectDel_'+fid+'" method="post">' +
                                '<input type="hidden" name="sid" value="'+collect["sid"]+'">' +
                                '<button type="button" style="border: none;background-color: #ffffff;" onclick="collectDel('+fid+","+userid+')">' +
                                    '<samp title="取消收藏" class="glyphicon glyphicon-heart collect_end"></samp>' +
                                '</button>' +
                            '</form>';
                        $("#form_collect"+fid).html(form_collect);
                    },
                    error : function() {
                        layer.msg("异常！",{icon: 5});
                    }
                });
                layer.msg("成功");
            }else {
                layer.msg("失败",{icon: 7});
            }
        },
        error : function() {
            layer.msg("异常！",{icon: 5});
        }
    });
}

// 取消收藏
function collectDel(fid,userid) {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var userid = document.getElementById("session_userid").value;
    $.ajax({
        //几个参数需要注意一下
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "collectController/deleteCollect" ,//url
        data: $('#form_collectDel_'+fid).serialize(),
        success: function (result) {
            if (result.resultCode == 200) {
                //获取最新评论信息
                $.ajax({
                    type: "post",//方法类型
                    dataType: "json",//预期服务器返回的数据类型
                    url: "collectController/getCollectFid/"+fid ,//url
                    success: function (data) {
                        var form_collect =
                            '<form id="form_collectAdd_'+fid+'" method="post">' +
                                '<input type="hidden" name="userid" value="'+userid+'">' +
                                '<input type="hidden" name="fid" value="'+fid+'">' +
                                '<button type="button" style="border: none;background-color: #ffffff;" onclick="collectAdd('+fid+","+userid+')">' +
                                    '<samp title="收藏该帖子" class="glyphicon glyphicon-heart collect_start"></samp>' +
                                '</button>' +
                            '</form>';
                        $("#form_collect"+fid).html(form_collect);
                    },
                    error : function() {
                        layer.msg("异常！",{icon: 5});
                    }
                });
                layer.msg("成功");
            }else {
                layer.msg("失败",{icon: 7});
            }
        },
        error : function() {
            layer.msg("异常！",{icon: 5});
        }
    });
}

// 取消收藏-个人主页
function collectDel_Myself(fid) {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var userid = document.getElementById("session_userid").value;
    $.ajax({
        //几个参数需要注意一下
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "collectController/deleteCollectUseridAndFid" ,//url
        data: $('#form_collectDel_'+fid).serialize(),
        success: function (data) {
            if (data.resultCode == 200) {
                var collects = data["myListCollects"];
                var collect_all = "";
                //更新收藏数
                $("#count_Collect").html(collects.length);
                if (collects == ""){    //判断是否有收藏过帖子
                    var collect_null =
                        '<br><br><br><br>' +
                        '<div class="text-center">' +
                        '<img alt="没收藏过帖子" src="'+APP_PATH+'/static/img/attention.png">' +
                        '<p style="color: #999999">可能，你还没遇见感兴趣的帖子</p>' +
                        '</div>' +
                        '<br><br><br><br>';
                    $("#collect_null").html(collect_null);
                } else {
                    for (var i=0;i<collects.length;i++){
                        var collect = collects[i];
                        collect_all = collect_all +
                            '<div class="row">' +
                            '<div class="col-xs-2 col-md-1">' +
                            '<form id="form_collectDel_'+collect["fid"]+'" method="post">' +
                            '<input type="hidden" name="userid" value="'+userid+'">' +
                            '<input type="hidden" name="fid" value="'+collect["fid"]+'">' +
                            '<button type="button" style="border: none;background-color: #ffffff;" onclick="collectDel_Myself('+collect["fid"]+')">' +
                            '<samp title="取消收藏" class="glyphicon glyphicon-heart collect_end"></samp>' +
                            '</button>' +
                            '</form>' +
                            '</div>' +
                            '<div class="col-xs-10 col-md-9">' +
                            '<a href="'+APP_PATH+'/articleController/getArticleFid?fid='+collect["fid"]+'">'+collect["titles"]+'</a>' +
                            '</div>' +
                            '<div class="col-xs-5 col-md-2 col-xs-offset-7">' +
                            '<small>'+collect["time"]+'</small>' +
                            '</div>' +
                            '</div>' +
                            '<hr>';

                    }
                }
                $("#collect_all").html(collect_all);
                layer.msg("成功");
            }else {
                layer.msg("失败",{icon: 7});
            }
        },
        error : function() {
            layer.msg("异常！",{icon: 5});
        }
    });
}