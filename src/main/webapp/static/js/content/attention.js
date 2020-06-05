// 添加关注
function attentionAdd(beuserid) {
    // 构造参数
    var data = {
      "userid": userid,
      "beuserid": beuserid
    };
    $.ajax({
        //几个参数需要注意一下
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/attention/setAttention" ,
        data: data,
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                // 隐藏“关注她”
                $(".form_attentionAdd_" + beuserid).hide();
                // 显示“取消关注”
                $(".form_attentionDel_" + beuserid).show();
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

// 取消关注（非个人主页）
function attentionDel(beuserid) {
    $.ajax({
        //几个参数需要注意一下
        type: "delete",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/attention/deleteByUserid/" + beuserid ,
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                // 隐藏“取消关注”
                $(".form_attentionDel_" + beuserid).hide();
                // 显示“关注她”
                $(".form_attentionAdd_" + beuserid).show();
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

// 取消关注（个人主页）
function attentionDelMyself(beuserid, gid) {
    $.ajax({
        //几个参数需要注意一下
        type: "delete",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/attention/deleteAttention/" + gid ,
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                // 隐藏刚刚取消关注的用户信息
                $(".attention_num_" + beuserid).hide();
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