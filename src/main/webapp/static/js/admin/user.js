/*用户删除确认框*/
function user_del(userid, pageStart) {
    layer.confirm('您真的确定要删除该用户吗？删除后不能复原！', {
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
    var APP_PATH = document.getElementById("APP_PATH").value;
    var adminList = document.getElementById("adminList").value;
    $.ajax({
        url: APP_PATH + "/userController/deleteUser/"+userid,
        type: "post",
        dataType: "json",
        success: function (result) {
            if (result.resultCode == 200){
                $.ajax({
                    url: APP_PATH + "/userController/getUser?pageStart="+pageStart,
                    type: "post",
                    dataType: "json",
                    success: function (data) {
                        /*########################################### 用户管理 ############################################################*/
                        var listUser_all = "";
                        var listUsers = data["listUser"];
                        var user_num = (data["pageStart"] - 1)*data["pageSize"];   //计数
                        for (var i=0;i<listUsers.length;i++){
                            user_num ++;
                            var listUser = listUsers[i];
                            var listUser_userphoto = "";
                            //头像
                            if(listUser["userphoto"] == null){  //默认头像
                                listUser_userphoto =
                                    '<a href="'+APP_PATH+'/static/img/head.png" target="_brank">' +
                                    '<img src="'+APP_PATH+'/static/img/head.png" style="position: relative; width: 100%; height: 100%;">' +
                                    '</a>';
                            } else {
                                listUser_userphoto =
                                    '<a href="'+APP_PATH+'/static/upload/user/'+listUser["userphoto"]+'" target="_brank">' +
                                    '<img src="'+APP_PATH+'/static/upload/user/'+listUser["userphoto"]+'" style="position: relative; width: 100%; height: 100%;">' +
                                    '</a>';
                            }

                            //操作
                            var user_caozuo = "";
                            if (adminList == "" || adminList == null){
                                user_caozuo =
                                    '<span class="glyphicon glyphicon-ban-circle"></span>';
                            } else {
                                user_caozuo =
                                    '<form method="post">' +
                                        '<button type="button" class="btn btn-danger btn-xs" onclick="user_del('+listUser["userid"]+","+data["pageStart"]+')">删除</button>' +
                                    '</form>';
                            }
                            listUser_all = listUser_all +
                                '<tr>' +
                                '<td>'+user_num+'</td>' +
                                '<td>'+listUser["name"]+'</td>' +
                                '<td>'+listUser["age"]+'</td>' +
                                '<td>'+listUser["sex"]+'</td>' +
                                '<td>'+listUser["email"]+'</td>' +
                                '<td>'+listUser["family"]+'</td>' +
                                '<td>'+listUser["intro"]+'</td>' +
                                '<td>'+listUser["time"]+'</td>' +
                                '<!-- 头像 -->' +
                                '<td style="position: relative;width:80px; height: 80px;" id="listUser_userphoto">'+listUser_userphoto+'</td>' +
                                '<!-- 操作 -->' +
                                '<td class="text-center" id="user_caozuo">'+user_caozuo+'</td>' +
                                '</tr>';
                        }
                        $("#listUser_all").html(listUser_all);
                        //用户总数
                        $("#user_total").html('（'+data["total"]+'人）');

                        var user_previous = "";
                        var user_next = "";
                        //上一页
                        if (data["pageStart"] == 1){
                            user_previous =
                                '<span aria-hidden="true" class="btn" disabled="disabled">&larr;</span>';
                        } else {
                            var pageStart = data["pageStart"]-1;
                            user_previous =
                                '<a href="javascript:void(0)" onclick="userPage('+pageStart+')"><span aria-hidden="true">&larr;</span></a>';
                        }
                        //下一页
                        if ((data["pageStart"])*data["pageSize"] >= data["total"]){
                            user_next =
                                '<span aria-hidden="true" class="btn" disabled="disabled">&rarr;</span>';
                        } else {
                            var pageStart = data["pageStart"]+1;
                            user_next =
                                '<a href="javascript:void(0)" onclick="userPage('+pageStart+')"><span aria-hidden="true">&rarr;</span></a>';
                        }
                        var listUser_page =
                            '<ul class="pagination">' +
                            '    <li><a href="javascript:void(0)" onclick="userPage(1)">首页</a></li>' +
                            '    <li id="user_previous">'+user_previous+'</li>' +
                            '    <li class="active"><a href="javascript:void(0)">'+data["pageStart"]+'</a></li>' +
                            '    <li id="user_next">'+user_next+'</li>' +
                            '    <li><a href="javascript:void(0)"  onclick="userPage('+data["tail"]+')">尾页</a></li>' +
                            '  </ul>';
                        $("#listUser_page").html(listUser_page);
                        /*########################################### 用户管理-end ############################################################*/
                    },
                    error : function() {
                        layer.msg("异常！",{icon: 5});
                    }
                });
                layer.msg("成功");
            } else {
                layer.msg("失败",{icon: 7});
            }

        },
        error : function() {
            layer.msg("异常！",{icon: 5});
        }
    });
}

/*分页操作*/
function userPage(pageStart) {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var adminList = document.getElementById("adminList").value;
    $.ajax({
        url: APP_PATH + "/userController/getUser?pageStart="+pageStart,
        type: "post",
        dataType: "json",
        success: function (data) {
            /*########################################### 用户管理 ############################################################*/
            var listUser_all = "";
            var listUsers = data["listUser"];
            var user_num = (data["pageStart"] - 1)*data["pageSize"];   //计数
            for (var i=0;i<listUsers.length;i++){
                user_num ++;
                var listUser = listUsers[i];
                var listUser_userphoto = "";
                //头像
                if(listUser["userphoto"] == null){  //默认头像
                    listUser_userphoto =
                        '<a href="'+APP_PATH+'/static/img/head.png" target="_brank">' +
                        '<img src="'+APP_PATH+'/static/img/head.png" style="position: relative; width: 100%; height: 100%;">' +
                        '</a>';
                } else {
                    listUser_userphoto =
                        '<a href="'+APP_PATH+'/static/upload/user/'+listUser["userphoto"]+'" target="_brank">' +
                        '<img src="'+APP_PATH+'/static/upload/user/'+listUser["userphoto"]+'" style="position: relative; width: 100%; height: 100%;">' +
                        '</a>';
                }

                //操作
                var user_caozuo = "";
                if (adminList == "" || adminList == null){
                    user_caozuo =
                        '<span class="glyphicon glyphicon-ban-circle"></span>';
                } else {
                    user_caozuo =
                        '<form method="post">' +
                            '<button type="button" class="btn btn-danger btn-xs" onclick="user_del('+listUser["userid"]+","+data["pageStart"]+')">删除</button>' +
                        '</form>';
                }
                listUser_all = listUser_all +
                    '<tr>' +
                    '<td>'+user_num+'</td>' +
                    '<td>'+listUser["name"]+'</td>' +
                    '<td>'+listUser["age"]+'</td>' +
                    '<td>'+listUser["sex"]+'</td>' +
                    '<td>'+listUser["email"]+'</td>' +
                    '<td>'+listUser["family"]+'</td>' +
                    '<td>'+listUser["intro"]+'</td>' +
                    '<td>'+listUser["time"]+'</td>' +
                    '<!-- 头像 -->' +
                    '<td style="position: relative;width:80px; height: 80px;" id="listUser_userphoto">'+listUser_userphoto+'</td>' +
                    '<!-- 操作 -->' +
                    '<td class="text-center" id="user_caozuo">'+user_caozuo+'</td>' +
                    '</tr>';
            }
            $("#listUser_all").html(listUser_all);
            //用户总数
            $("#user_total").html('（'+data["total"]+'人）');

            var user_previous = "";
            var user_next = "";
            //上一页
            if (data["pageStart"] == 1){
                user_previous =
                    '<span aria-hidden="true" class="btn" disabled="disabled">&larr;</span>';
            } else {
                var pageStart = data["pageStart"]-1;
                user_previous =
                    '<a href="javascript:void(0)" onclick="userPage('+pageStart+')"><span aria-hidden="true">&larr;</span></a>';
            }
            //下一页
            if ((data["pageStart"])*data["pageSize"] >= data["total"]){
                user_next =
                    '<span aria-hidden="true" class="btn" disabled="disabled">&rarr;</span>';
            } else {
                var pageStart = data["pageStart"]+1;
                user_next =
                    '<a href="javascript:void(0)" onclick="userPage('+pageStart+')"><span aria-hidden="true">&rarr;</span></a>';
            }
            var listUser_page =
                '<ul class="pagination">' +
                '    <li><a href="javascript:void(0)" onclick="userPage(1)">首页</a></li>' +
                '    <li id="user_previous">'+user_previous+'</li>' +
                '    <li class="active"><a href="javascript:void(0)">'+data["pageStart"]+'</a></li>' +
                '    <li id="user_next">'+user_next+'</li>' +
                '    <li><a href="javascript:void(0)"  onclick="userPage('+data["tail"]+')">尾页</a></li>' +
                '  </ul>';
            $("#listUser_page").html(listUser_page);
            /*########################################### 用户管理-end ############################################################*/
        },
        error : function() {
            layer.msg("异常！",{icon: 5});
        }
    });
}

