// 添加点赞
function enjoyAdd(fid,userid) {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var userid = document.getElementById("session_userid").value;
    $.ajax({
        //几个参数需要注意一下
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "enjoyController/setEnjoy" ,//url
        data: $('#form_enjoyAdd_'+fid).serialize(),
        success: function (result) {
            if (result.resultCode == 200) {
                //获取最新评论信息
                $.ajax({
                    type: "post",//方法类型
                    dataType: "json",//预期服务器返回的数据类型
                    url: "enjoyController/getEnjoyFid/"+fid ,//url
                    success: function (data) {
                        var enjoy = data["enjoy"];
                        var form_enjoy =
                            '<form id="form_enjoyDel_'+fid+'" method="post">' +
                                '<input type="hidden" name="eid" value="'+enjoy["eid"]+'">' +
                                '<button type="button" style="border: none;background-color: #ffffff;" onclick="enjoyDel('+fid+","+userid+')">' +
                                    '<samp title="取消点赞" class="glyphicon glyphicon-thumbs-up enjoy_end"></samp>' +
                                '</button>' +
                            '</form>';
                        $("#form_enjoy"+fid).html(form_enjoy);
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

// 取消点赞
function enjoyDel(fid,userid) {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var userid = document.getElementById("session_userid").value;
    $.ajax({
        //几个参数需要注意一下
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "enjoyController/deleteEnjoy" ,//url
        data: $('#form_enjoyDel_'+fid).serialize(),
        success: function (result) {
            if (result.resultCode == 200) {
                //获取最新评论信息
                $.ajax({
                    type: "post",//方法类型
                    dataType: "json",//预期服务器返回的数据类型
                    url: "enjoyController/getEnjoyFid/"+fid ,//url
                    success: function (data) {
                        var form_enjoy =
                            '<form id="form_enjoyAdd_'+fid+'" method="post">' +
                                '<input type="hidden" name="userid" value="'+userid+'">' +
                                '<input type="hidden" name="fid" value="'+fid+'">' +
                                '<button type="button" style="border: none;background-color: #ffffff;" onclick="enjoyAdd('+fid+","+userid+')">' +
                                    '<samp title="点赞该帖子" class="glyphicon glyphicon-thumbs-up enjoy_start"></samp>' +
                                '</button>' +
                            '</form>';
                        $("#form_enjoy"+fid).html(form_enjoy);
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