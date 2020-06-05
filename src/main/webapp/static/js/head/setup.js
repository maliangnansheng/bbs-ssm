$(function() {
    // 旧用户名
    $("#setup_span_username").html(username);
    // 旧Email
    $("#setup_span_email").html(email);

    // 修改用户名
    $("#setup_username_save").click(function () {
        var name = $.trim($("#setup_name_id").val());
        if (name == ""){
            layer.tips('请输入用户名', '#setup_name_id', {
                tips: [1, '#ff6620'] //还可配置颜色
            });
            return false;
        } else if (name == username) {
            layer.tips('新名不能和原名相同', '#setup_name_id', {
                tips: [1, '#ff6620'] //还可配置颜色
            });
            return false;
        }
        if (!onkeyupUsernameUpdate()){
            return false;
        }
        var data = {
          "username": name
        };
        $.ajax({
            url: APP_PATH + "/api/rest/nanshengbbs/v3.0/user/updateUsername",
            type: "put",
            data: data,
            dataType: "json",
            success: function(data){
                // 状态码
                var code = data.code;
                // 提示信息
                var msg = data.msg;
                if (code == 200) {
                    layer.msg(msg);
                    // 旧用户名-更新
                    $("#setup_span_username").html(name);
                    // 收回
                    $("#setup_username_on").show();
                    $("#setup_username").hide();
                    // 更新session_username
                    username = name;
                } else if (code == 404) {
                    layer.tips(msg, '#setup_name_id', {
                        tips: [1, '#ff6620'] //还可配置颜色
                    });
                } else if (code == 500) {
                    layer.msg(msg,{icon: 5});
                }
            },
            error : function() {
                layer.msg("出错！",{icon: 5});
            }
        });
    });

    // 修改密码
    $("#setup_password_save").click(function () {
        var passOld = $.trim($("#setup_password_old").val());
        var passNew = $.trim($("#setup_password_new").val());
        if (passOld == ""){
            layer.tips('请输入原密码', '#setup_password_old', {
                tips: [1, '#ff6620'] //还可配置颜色
            });
            return false;
        } else if (passNew == ""){
            layer.tips('请输入新密码', '#setup_password_new', {
                tips: [1, '#ff6620'] //还可配置颜色
            });
            return false;
        }
        if (!onkeyupUserpasswordUpdate()){
            return false;
        }
        var data = {
            "passOld": passOld,
            "passNew": passNew
        };
        $.ajax({
            url: APP_PATH + "/api/rest/nanshengbbs/v3.0/user/updatePassword",
            type: "post",
            data: data,
            dataType: "json",
            success: function(data){
                // 状态码
                var code = data.code;
                // 提示信息
                var msg = data.msg;
                if (code == 200) {
                    // 清空
                    $("#setup_password_old").val("");
                    $("#setup_password_new").val("");
                    // 收回
                    $("#setup_password_on").show();
                    $("#setup_password").hide();
                    layer.msg(msg);
                } else {
                    if (code == 404) {
                        layer.tips(msg, '#setup_password_old', {
                            tips: [1, '#ff6620'] //还可配置颜色
                        });
                    } else if (code == 500) {
                        layer.msg(msg,{icon: 5});
                    }
                    // 清空
                    $("#setup_password_old").val("");
                    $("#setup_password_new").val("");
                }
            },
            error : function() {
                layer.msg("出错！",{icon: 5});
            }
        });
    });

    // 修改Email
    $("#setup_email_save").click(function () {
        var email_new = $.trim($("#setup_email_id").val());
        if (email_new == ""){
            layer.tips('请输入Email', '#setup_email_id', {
                tips: [1, '#ff6620'] //还可配置颜色
            });
            return false;
        } else if (email == email_new) {
            layer.tips('新Email不能和原Email相同', '#setup_email_id', {
                tips: [1, '#ff6620'] //还可配置颜色
            });
            return false;
        } else if (!emialVerify(email_new)){
            layer.tips('邮箱格式不正确或不支持该邮箱', '#setup_email_id',{
                tips: [1, '#ff6620'] //还可配置颜色
            });
            return false;
        }
        var data = {
          "email": email_new
        };
        $.ajax({
            url: APP_PATH + "/api/rest/nanshengbbs/v3.0/user/updateEmail",
            type: "put",
            data: data,
            dataType: "json",
            success: function(data){
                // 状态码
                var code = data.code;
                // 提示信息
                var msg = data.msg;
                if (code == 200) {
                    layer.msg(msg);
                    // 旧Email-更新
                    $("#setup_span_email").html(email_new);
                    // 收回
                    $("#setup_email_on").show();
                    $("#setup_email").hide();
                    // 更新session_email
                    email = email_new;
                } else if (code == 404) {
                    layer.tips(msg, '#setup_email_id', {
                        tips: [1, '#ff6620'] //还可配置颜色
                    });
                } else if (code == 500) {
                    layer.msg(msg,{icon: 5});
                }
            },
            error : function() {
                layer.msg("出错！",{icon: 5});
            }
        });
    });
});

/*--------------------------------- 用户名、密码、Email ---------------------------------*/
$("#setup_username_on").click(function() {  // 展开
    $("#setup_username").show();
    $("#setup_username_on").hide();
});
$("#setup_username_off").click(function() {  // 收回
    $("#setup_username_on").show();
    $("#setup_username").hide();
});

$("#setup_password_on").click(function() {  // 展开
    $("#setup_password").show();
    $("#setup_password_on").hide();
    // 清空
    $("#setup_password_old").val("");
    $("#setup_password_new").val("");
});
$("#setup_password_off").click(function() {  // 收回
    $("#setup_password_on").show();
    $("#setup_password").hide();
    // 清空
    $("#setup_password_old").val("");
    $("#setup_password_new").val("");
});

$("#setup_email_on").click(function() {  // 展开
    $("#setup_email").show();
    $("#setup_email_on").hide();
});
$("#setup_email_off").click(function() {  // 收回
    $("#setup_email_on").show();
    $("#setup_email").hide();
});
/*--------------------------------- 用户名、密码、Email-end ---------------------------------*/

/* 用户名修改预览 */
function onkeyupUsernameUpdate() {
    var name = $.trim($("#setup_name_id").val());   //去掉前后空格
    var count_num = chEnWordCount(name);
    if (count_num > userNameLength){
        layer.tips('不能超过【'+userNameLength+'】个字符，当前数 - '+count_num, '#setup_name_id', {
            tips: [1, '#ff6620'] //还可配置颜色
        });
        return false;
    } else {
        var index = layer.tips("满足");
        // 立即关闭
        layer.close(index);
        return true;
    }
}
/* 用户密码修改预览 */
function onkeyupUserpasswordUpdate() {
    var password = $.trim($("#setup_password_new").val());   //去掉前后空格
    var count_num = chEnWordCount(password);
    if (count_num < userPasswordLength){
        layer.tips('不能少于【'+userPasswordLength+'】个字符，当前数 - '+count_num, '#setup_password_new', {
            tips: [1, '#ff6620'] //还可配置颜色
        });
        return false;
    } else {
        var index = layer.tips("满足");
        // 立即关闭
        layer.close(index);
        return true;
    }
}