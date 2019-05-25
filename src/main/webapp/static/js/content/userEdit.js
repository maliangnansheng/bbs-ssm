//编辑头像-展示
function userPhotoShow() {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var userid = document.getElementById("session_userid").value;
    $.ajax({
        //几个参数需要注意一下
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "userController/getMyselfUser",//url
        success: function (data) {
            var userPhotoEdit_all = "";
            var user = data["myListUser"];

            userPhotoEdit_all =
                '<form method="post" enctype="multipart/form-data">' +
                    '<p class="text-muted">在本地选择你的头像：</p>' +
                    '<div class="form-group">' +
                        '<div id="user_preview">' +
                            '<a href="javascript:void(0)">' +
                                '<img class="img-thumbnail" style="position: relative; width: 100%; height: 100%;"' +
                                'id="user_imghead" src="'+APP_PATH+'/static/img/fatiePhoto.png"' +
                                'onclick="$(\'#user_previewImg\').click();">' +
                            '</a>' +
                        '</div>' +
                        '<input type="file" onchange="user_previewImage(this)" style="display: none;" id="user_previewImg" name="photo">' +
                    '</div>' +
                    '' +
                    '<div class="modal-footer">' +
                        '<button type="button" class="btn btn-default" data-dismiss="modal">返回</button>' +
                        '<button type="button" class="btn btn-primary" onclick="userPhotoUpdate()">保存</button>' +
                    '</div>' +
                '</form>';

            $("#userPhotoEdit_all").html(userPhotoEdit_all);
        },
        error: function () {
            layer.msg("异常！",{icon: 5});
        }
    });
}

//编辑头像-修改
function userPhotoUpdate() {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var userid = document.getElementById("session_userid").value;
    var formData = new FormData();
    if ($("#user_previewImg")[0].files[0] == null){  //未配图
        layer.tips('修改头像[必须]重新在本地选择!', '#user_preview', {
            tips: [1, '#ff6620'] //还可配置颜色
        });
        return;
    }
    formData.append("photo",$("#user_previewImg")[0].files[0]);
    $.ajax({
        //几个参数需要注意一下
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "viaController/setUserPhoto" ,//url
        data: formData ,
        // 告诉jQuery不要去处理发送的数据
        processData : false,
        // 告诉jQuery不要去设置Content-Type请求头
        contentType : false,
        success: function (result) {
            if (result.resultCode == 200) {
                $('#userPhoto').modal('hide');     // 关闭模态框无效
                //获取最新本人帖子信息
                $.ajax({
                    type: "post",//方法类型
                    dataType: "json",//预期服务器返回的数据类型
                    url: "userController/getMyselfUser" ,//url
                    success: function (data) {
                        var user = data["myListUser"];
                        var myself_userphoto = "";
                        //判断头像显示
                        if (user["userphoto"] == null){
                            myself_userphoto =
                                '<img class="img-thumbnail" style="position: relative; width: 140px; height: 140px; left: 10px; top: -20px;"' +
                                'src="'+ APP_PATH +'/static/img/head.png">';

                        }else {
                            myself_userphoto =
                                '<img class="img-thumbnail" style="position: relative; width: 140px; height: 140px; left: 10px; top: -20px;"' +
                                'src="'+ APP_PATH +'/static/upload/user/'+user["userphoto"]+'">';
                        }
                        $("#myself_userphoto").html(myself_userphoto);
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


//编辑个人资料-展示
function editUser() {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var userid = document.getElementById("session_userid").value;
    $.ajax({
        //几个参数需要注意一下
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "userController/getMyselfUser",//url
        success: function (data) {
            var user_Edit_all = "";
            var user = data["myListUser"];
            var age = user["age"];
            var family = user["family"];
            var intro = user["intro"];

            if (user["age"] == null){
                age = "";
            }
            if (user["family"] == null){
                family = "";
            }
            if (user["intro"] == null){
                intro = "";
            }
            var user_sex = "";
            var user_sexVersa = "";

            if (user["sex"] == "男"){
                user_sex = "男";
                user_sexVersa = "女";
            } else {
                user_sex = "女";
                user_sexVersa = "男";
            }

            user_Edit_all =
                '<form id="form_userUpdate" method="post" class="form-horizontal">' +
                    '<input type="hidden" class="form-control" id="userid" name="userid" value="'+userid+'">' +
                    '' +
                    '<div class="form-group">' +
                        '<label class="col-sm-2 control-label">用户名</label>' +
                        '<div class="col-sm-10">' +
                            '<p class="form-control-static">'+user["name"]+'</p>' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="age" class="col-sm-2 control-label">年龄</label>' +
                        '<div class="col-sm-10">' +
                            '<input type="text" class="form-control" id="age" name="age" value="'+age+'">' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label class="col-sm-2 control-label">性别</label>' +
                        '<div class="col-sm-10">' +
                            '<label class="radio-inline">' +
                                '<input type="radio" name="sex" id="sex" value="'+user_sex+'" id="user_sex" checked> '+user_sex+'' +
                            '</label>' +
                            '<label class="radio-inline">' +
                                '<input type="radio" name="sex" id="sex" value="'+user_sexVersa+'"> '+user_sexVersa+'' +
                            '</label>' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label class="col-sm-2 control-label">Email</label>' +
                        '<div class="col-sm-10">' +
                            '<p class="form-control-static">'+user["email"]+'</p>' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="family" class="col-sm-2 control-label">家庭住址</label>' +
                        '<div class="col-sm-10">' +
                            '<input type="text" class="form-control" id="family" name="family" value="'+family+'">' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="intro" class="col-sm-2 control-label">个人简介</label>' +
                        '<div class="col-sm-10">' +
                            '<textarea class="form-control" id="intro" name="intro" style="position: relative;height: 150px;">'+intro+'</textarea>' +
                        '</div>' +
                    '</div>' +
                    '' +
                    '<div class="modal-footer">' +
                        '<button type="reset" class="btn btn-default">还原</button>' +
                        '<button type="button" class="btn btn-primary" onclick="updateUser()">保存</button>' +
                    '</div>' +
                '</form>';

            $("#user_Edit_all").html(user_Edit_all);
        },
        error: function () {
            layer.msg("异常！",{icon: 5});
        }
    });
}

//编辑个人资料-修改
function updateUser() {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var userid = document.getElementById("session_userid").value;
    $.ajax({
        //几个参数需要注意一下
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "userController/updateUser" ,//url
        data: $('#form_userUpdate').serialize(),
        success: function (result) {
            if (result.resultCode == 200) {
                $('#edit').modal('hide');     // 关闭模态框无效
                //获取最新本人帖子信息
                $.ajax({
                    type: "post",//方法类型
                    dataType: "json",//预期服务器返回的数据类型
                    url: "userController/getMyselfUser" ,//url
                    success: function (data) {
                        var user = data["myListUser"];

                        //用户名
                        var myself_name = user["name"];
                        $("#myself_name").html(myself_name);

                        //居住地
                        var myself_family = user["family"];
                        $("#myself_family").html(myself_family);

                        //个人简介
                        var myself_intro = user["intro"];
                        $("#myself_intro").html(myself_intro);

                        //电子邮箱
                        var myself_email = user["email"];
                        $("#myself_email").html(myself_email);

                        //性别年龄
                        var myself_sex_age = user["sex"] + "、" +user["age"];
                        $("#myself_sex_age").html(myself_sex_age);
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