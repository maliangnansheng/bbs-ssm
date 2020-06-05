// 添加收藏
function collectAdd(fid) {
    // 参数构造
    var data = {
        "userid": userid,
        "fid": fid
    };
    $.ajax({
        //几个参数需要注意一下
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/collect/setCollect" ,
        data: data,
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                // 隐藏“收藏”
                $(".form_collectAdd_" + fid).hide();
                // 显示“取消收藏”
                $(".form_collectDel_" + fid).show();
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

// 取消收藏（非个人主页）
function collectDel(fid) {
    $.ajax({
        //几个参数需要注意一下
        type: "delete",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/collect/deleteCollectUseridAndFid/" + fid,
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                // 隐藏“取消收藏”
                $(".form_collectDel_" + fid).hide();
                // 显示“收藏”
                $(".form_collectAdd_" + fid).show();
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

// 取消收藏（个人主页）
function collectDelMyself(fid) {
    $.ajax({
        //几个参数需要注意一下
        type: "delete",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/collect/deleteCollectUseridAndFid/" + fid,
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                // 隐藏“取消收藏”
                // 隐藏刚刚取消收藏的文章信息
                $(".collect_num_" + fid).hide();
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