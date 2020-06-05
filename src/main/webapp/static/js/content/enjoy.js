// 添加点赞
function enjoyAdd(fid) {
    // 参数构造
    var data = {
        "userid": userid,
        "fid": fid
    };
    $.ajax({
        //几个参数需要注意一下
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/enjoy/setEnjoy" ,
        data: data,
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                // 隐藏“点赞”
                $(".form_enjoyAdd_" + fid).hide();
                // 显示“取消点赞”
                $(".form_enjoyDel_" + fid).show();
                layer.msg(msg);
            } else if (code == 500) {
                layer.msg(msg,{icon: 5});
            }
        },
        error : function() {
            layer.msg("出错！",{icon: 5});
        }
    });
}

// 取消点赞
function enjoyDel(fid) {
    $.ajax({
        //几个参数需要注意一下
        type: "delete",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/enjoy/deleteEnjoyUseridAndFid/" + fid ,
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                // 隐藏“取消点赞”
                $(".form_enjoyDel_" + fid).hide();
                // 显示“点赞”
                $(".form_enjoyAdd_" + fid).show();
                layer.msg(msg);
            } else if (code == 500) {
                layer.msg(msg,{icon: 5});
            }
        },
        error : function() {
            layer.msg("出错！",{icon: 5});
        }
    });
}