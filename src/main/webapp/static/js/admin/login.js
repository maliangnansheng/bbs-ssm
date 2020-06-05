/* 管理员登录 */
function adminLogin(){
    var name = $.trim($("#admin_name").val());   // 去掉前后空格
    var password = $.trim($("#admin_password").val());   // 去掉前后空格
    if (name == ""){
        layer.tips('用户名不能为空', '#admin_name', {
            tips: [1, '#ff6620'] //还可配置颜色
        });
        return false;
    } else if (password == "") {
        layer.tips('密码不能为空', '#admin_password', {
            tips: [1, '#ff6620'] //还可配置颜色
        });
        return false;
    }

    //调ajax
    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/admin/getLogin",
        data: $('#form_adminLogin').serialize(),
        type: "post",
        dataType: "json",
        success: function(data){
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                layer.msg(msg);
                setTimeout(goAdmin, 500);   // 0.5秒后页面跳转
            } else {
                if (code == 404) {
                    layer.tips(msg, '#admin_name', {
                        tips: [1, '#ff6620'] //还可配置颜色
                    });
                } else if (code == 500) {
                    layer.msg(msg,{icon: 5});
                }
                // 清空输入框
                $("#admin_name").val("");
                $("#admin_password").val("");
            }
        },
        error : function() {
            layer.msg("出错！",{icon: 5});
        }
    });
}

/* 管理员退出登录 */
function adminLogout(){
    //调ajax
    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/admin/adminExit",
        type: "get",
        dataType: "json",
        success: function(data){
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                layer.msg(msg);
                setTimeout(goAdmin, 500);   // 0.5秒后页面跳转
            } else if (code == 500) {
                layer.msg(msg,{icon: 5});
            }
        },
        error : function() {
            layer.msg("出错！",{icon: 5});
        }
    });
}