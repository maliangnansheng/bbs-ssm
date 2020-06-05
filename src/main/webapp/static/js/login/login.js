/*---------------------------------------- 注册 ----------------------------------------*/
// 用户注册预览-用户名
function onkeyupUserNameAdd() {
    var name = $.trim($("#name2").val());   //去掉前后空格
    var count_num = chEnWordCount(name);
    if (name == ""){
        layer.tips('请输入用户名', '#name2', {
            tips: [1, '#ff6620'] //还可配置颜色
        });
        return false;
    } else if (count_num > userNameLength){
        layer.tips('不能超过【'+userNameLength+'】个字符，当前数 - '+count_num, '#name2', {
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

// 用户注册预览-密码
function onkeyupUserPasswordAdd() {
    var pass = $.trim($("#password2").val());   //去掉前后空格
    var count_num = chEnWordCount(pass);
    if (pass == ""){
        layer.tips('请输入密码', '#password2', {
            tips: [1, '#ff6620'] //还可配置颜色
        });
        return false;
    } else if (count_num < userPasswordLength){
        layer.tips('不能少于【'+userPasswordLength+'】个字符，当前数 - '+count_num, '#password2', {
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

// 邮箱
function emailAdd() {
    var email = $.trim($("#email").val());
    if (email == ""){
        layer.tips('请输入Email', '#email', {
            tips: [1, '#ff6620'] //还可配置颜色
        });
        return false;
    } else if (!emialVerify(email)){
        layer.tips('邮箱格式不正确或不支持该邮箱', '#email',{
            tips: [1, '#ff6620'] //还可配置颜色
        });
        return false;
    } else {
        return true;
    }
}

$('#name2').bind('keyup', function(event) {
    if (event.keyCode == "13") {
        register();
    }
});
$('#password2').bind('keyup', function(event) {
    if (event.keyCode == "13") {
        register();
    }
});
$('#repassword').bind('keyup', function(event) {
    if (event.keyCode == "13") {
        register();
    }
});$('#email').bind('keyup', function(event) {
    if (event.keyCode == "13") {
        register();
    }
});
$("#register").click(function() {
    register();
});

function register() {
    var pass = $.trim($("#password2").val());
    var repass = $.trim($("#repassword").val());

    if (!onkeyupUserNameAdd() || !onkeyupUserPasswordAdd() || !emailAdd()){
        return false;
    } else if (pass != repass) {
        layer.tips('两次输入的密码不一致！', '#repassword', {
            tips: [1, '#ff6620'] //还可配置颜色
        });
        // 清空
        $("#password2").val("");
        $("#repassword").val("");
        return false;
    }
    var data = {
        "name": $.trim($("#name2").val()),
        "password": pass,
        "email": $.trim($("#email").val())
    };
    //调ajax
    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/user/setSignUp",
        data: data,
        type: "POST",
        dataType: "json",
        success: function(data){
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                layer.msg(msg);
                setTimeout(go, 500);   // 0.5秒后页面跳转
            } else if (code == 404) {
                layer.tips(msg, '#email', {
                    tips: [1, '#ff6620'] //还可配置颜色
                });
            } else if (code == 405) {
                layer.tips(msg, '#name2', {
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
}
/*---------------------------------------- 注册-end ----------------------------------------*/

/*---------------------------------------- 登录 ----------------------------------------*/
//回车事件绑定
$('#name').bind('keyup', function(event) {
    if (event.keyCode == "13") {
        login();
    }
});
$('#password').bind('keyup', function(event) {
    if (event.keyCode == "13") {
        login();
    }
});
$("#login").click(function(){
    login();
});

function login() {
    //获取用户名和密码
    var name = $.trim($("#name").val());//输入的用户名
    var password = $.trim($("#password").val());//输入的密码

    if (name == ""){
        layer.tips('请输入用户名/邮箱', '#name', {
            tips: [1, '#ff6620'] //还可配置颜色
        });
        return false;
    } else if (password == "") {
        layer.tips('请输入密码', '#password', {
            tips: [1, '#ff6620'] //还可配置颜色
        });
        return false;
    }
    var data = {
        "name": name,
        "password": password
    };
    //调ajax
    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/user/getLogin",
        data: data,
        type: "post",
        dataType: "json",
        success: function(data){
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                layer.msg(msg);
                setTimeout(reload, 500);   // 0.5秒后 刷新当前页面
            } else if (code == 404) {
                layer.tips(msg, '.modal-body', {
                    tips: [1, '#ff6620'] //还可配置颜色
                });
                // 清空输入框
                $("#name").val("");
                $("#password").val("");
            } else if (code == 500) {
                layer.msg(msg, {icon: 5});
            }
        },
        error : function() {
            layer.msg("出错！", {icon: 5});
        }
    });
}
/*---------------------------------------- 登录-end ----------------------------------------*/

/*---------------------------------------- 退出登录 ----------------------------------------*/
/* 用户退出登录 */
$("#userExit").click(function () {
    //调ajax
    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/user/userExit",
        type: "get",
        dataType: "json",
        success: function(data){
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                layer.msg(data.msg);
                setTimeout(go, 500);   // 0.5秒后页面跳转
            } else if (code == 500) {
                layer.msg(msg,{icon: 5});
            }
        },
        error : function(data) {
            layer.msg("出错！",{icon: 5});
        }
    });
});
/*---------------------------------------- 退出登录-end ----------------------------------------*/