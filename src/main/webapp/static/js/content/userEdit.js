/*---------------------------------------------------------- 编辑用户头像end ----------------------------------------------------------*/
// 编辑头像-修改
function userPhotoUpdate() {
    var formData = new FormData();
    var picture = $("#user_previewImg")[0].files[0];
    if (picture == null){  //未配图
        layer.tips('请选择头像!', '#user_preview', {
            tips: [1, '#ff6620'] //还可配置颜色
        });
        return;
    }
    if (picture.size > sourceFileSize) {    // 超过上传源文件允许的最大值
        layer.msg("请上传不超过 " + sourceFileSize/(1024*1024) + "M 的图片!",{icon: 5});
        return;
    }
    formData.append("photo", picture);
    $.ajax({
        //几个参数需要注意一下
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/via/setUserPhoto" ,
        data: formData ,
        // 告诉jQuery不要去处理发送的数据
        processData : false,
        // 告诉jQuery不要去设置Content-Type请求头
        contentType : false,
        xhr: function(){
            $(".picture-progress").show();
            myXhr = $.ajaxSettings.xhr();
            if(myXhr.upload){
                myXhr.upload.addEventListener('progress',function(e) {
                    if (e.lengthComputable) {
                        var percent = Math.floor(e.loaded/e.total*100);
                        if (percent <= 100) {
                            var ratio = dynamicStorageUnit(e.loaded) + '/' + dynamicStorageUnit(e.total) + ' ' + percent + '%';
                        }
                        if (percent >= 100) {
                            var ratio = '<small>压缩上传中...</small>';
                        }
                        $(".picture-progress .progress-bar").attr("style", "width:" + percent + '%');
                        $(".picture-progress .progress-bar").html(ratio);
                    }
                }, false);
            }
            return myXhr;
        },
        success: function (data) {
            // 隐藏进度条
            $(".picture-progress").hide();
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                // 清空选择的文件
                $("#user_imghead").attr("src", APP_PATH + '/static/img/fatiePhoto.png');
                $("#user_previewImg").val("");

                // 更新head上的头像
                getUserPhotoArg(data.data);
                $('#userPhoto').modal('hide');  // 关闭模态框无效
                //获取最新本人文章信息
                $.ajax({
                    type: "get",//方法类型
                    dataType: "json",//预期服务器返回的数据类型
                    url: APP_PATH + "/api/rest/nanshengbbs/v3.0/user/getMyselfUser" ,
                    success: function (data) {
                        // 状态码
                        var code = data.code;
                        // 提示信息
                        var msg = data.msg;
                        if (code == 200) {
                            var user = data.data.user;
                            // 将用户头像显示到个人中心
                            getMePicture(user);
                        } else if (code == 500) {
                            layer.msg(msg, {icon: 5});
                        }
                    },
                    error : function() {
                        layer.msg("出错！",{icon: 5});
                    }
                });
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
/*---------------------------------------------------------- 编辑用户头像end ----------------------------------------------------------*/

/*---------------------------------------------------------- 编辑个人资料 ----------------------------------------------------------*/
// 编辑个人资料-展示
function editUser() {
    $.ajax({
        //几个参数需要注意一下
        type: "get",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/user/getMyselfUser",
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                var user = data.data.user;
                if (user.sex == 0){
                    // 性别
                    $("#user_sex span").html("男");  // 当前
                    $("#user_sex input").attr("value", 0);  // 当前
                    $("#user_sex input").attr("checked", true);  // 当前
                    $("#user_sexVersa span").html("女");    // 另选
                    $("#user_sexVersa input").attr("value", 1);  // 另选
                } else {
                    // 性别
                    $("#user_sex span").html("女");  // 当前
                    $("#user_sex input").attr("value", 1);  // 当前
                    $("#user_sex input").attr("checked", true);  // 当前
                    $("#user_sexVersa span").html("男");    // 另选
                    $("#user_sexVersa input").attr("value", 0);  // 另选
                }

                // 用户名
                $("#edit_user_name").html(user.name);
                // 年龄
                $("#edit_user_age input").attr("value", user.age);
                // email
                $("#edit_user_email").html(user.email);
                // 家庭住址
                $("#edit_user_family input").attr("value", user.family);
                // 个人简介
                $("#edit_user_intro textarea").html(user.intro);
            } else if (code == 500) {
                layer.msg(msg, {icon: 5});
            }
        },
        error: function () {
            layer.msg("出错！",{icon: 5});
        }
    });
}

//编辑个人资料-修改
function updateUser() {
    if (onkeyupUserageUpdate() && onkeyupUserfamilyUpdate() && onkeyupUserintroUpdate()) {
    } else {
        return false;
    }

    $.ajax({
        //几个参数需要注意一下
        type: "put",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/user/updateUser" ,
        data: $('#form_userUpdate').serialize(),
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                $('#edit').modal('hide');     // 关闭模态框
                //获取最新本人文章信息
                $.ajax({
                    type: "get",//方法类型
                    dataType: "json",//预期服务器返回的数据类型
                    url: APP_PATH + "/api/rest/nanshengbbs/v3.0/user/getMyselfUser" ,
                    success: function (data) {
                        // 状态码
                        var code = data.code;
                        // 提示信息
                        var msg = data.msg;
                        if (code == 200) {
                            var user = data.data.user;
                            // 将用户信息显示到“个人中心”
                            getAboutMe(user);
                        } else if (code == 500) {
                            layer.msg(msg, {icon: 5});
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

/* 年龄修改预览 */
function onkeyupUserageUpdate() {
    var age = $("#age").val();   //去掉前后空格
    if (age < 1){
        layer.tips('年龄不能小于【1】岁', '#age', {
            tips: [1, '#ff6620'] //还可配置颜色
        });
        return false;
    } else if (age > userAgeSize){
        layer.tips('年龄不能大于【'+userAgeSize+'】岁', '#age', {
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
/* 家庭住址修改预览 */
function onkeyupUserfamilyUpdate() {
    var family = $.trim($("#family").val());   //去掉前后空格
    var count_num = chEnWordCount(family);
    if (count_num > userFamilyLength){
        layer.tips('不能超过【'+userFamilyLength+'】个字符，当前数 - '+count_num, '#family', {
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
/* 个人简介修改预览 */
function onkeyupUserintroUpdate() {
    var intro = $.trim($("#intro").val());   //去掉前后空格
    var count_num = chEnWordCount(intro);
    if (count_num > userIntroLength){
        layer.tips('不能超过【'+userIntroLength+'】个字符，当前数 - '+count_num, '#intro', {
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
/*---------------------------------------------------------- 编辑个人资料-end ----------------------------------------------------------*/