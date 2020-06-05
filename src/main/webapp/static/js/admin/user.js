/*用户删除确认框*/
function user_del(userid, pageStart) {
    layer.confirm('确定删除该用户吗？<br>这将同时删除与该用户相关的所有信息<br>删除后无法恢复！', {
        btn:["确定","取消"],
        icon:2,
        title: "删除提示"
    }, function(){
        //点击确后关闭提示框
        layer.closeAll('dialog');
        userDel(userid, pageStart);
    });
}

/*删除用户信息*/
function userDel(userid, pageStart) {
    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/user/deleteUser/"+userid,
        type: "delete",
        dataType: "json",
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                $.ajax({
                    url: APP_PATH + "/api/rest/nanshengbbs/v3.0/user/getUser?pageStart="+pageStart,
                    type: "get",
                    dataType: "json",
                    success: function (data) {
                        // 状态码
                        var code = data.code;
                        // 提示信息
                        var msg = data.msg;
                        if (code == 200) {
                            /*########################################### 用户管理 ############################################################*/
                            /*----------------------------------------- 用户列表（用户管理） ----------------------------------------*/
                            $("#listUser_all").html(getUserList(data.data));
                            // 用户总数
                            $("#user_total").html('（' + data.data.total + '人）');
                            /*----------------------------------------- 分页（用户管理） ----------------------------------------*/
                            getPaging(data.data, "user");
                            /*########################################### 用户管理-end ############################################################*/
                        } else if (code == 500) {
                            layer.msg(msg,{icon: 5});
                        }
                    },
                    error : function() {
                        layer.msg("出错！",{icon: 5});
                    }
                });
                layer.msg(msg);
            } else if (code == 500) {
                layer.msg(msg, {icon: 5});
            }
        },
        error : function() {
            layer.msg("出错！",{icon: 5});
        }
    });
}

/*分页操作*/
function userPage(pageStart) {
    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/user/getUser?pageStart="+pageStart,
        type: "get",
        dataType: "json",
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                /*########################################### 用户管理 ############################################################*/
                /*----------------------------------------- 用户列表（用户管理） ----------------------------------------*/
                $("#listUser_all").html(getUserList(data.data));
                // 用户总数
                $("#user_total").html('（' + data.data.total + '人）');
                /*----------------------------------------- 分页（用户管理） ----------------------------------------*/
                getPaging(data.data, "user");
                /*########################################### 用户管理-end ############################################################*/
            } else if (code == 500) {
                layer.msg(msg,{icon: 5});
            }
        },
        error : function() {
            layer.msg("出错！",{icon: 5});
        }
    });
}