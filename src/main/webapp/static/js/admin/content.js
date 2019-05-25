//首页展示
$(function () {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var adminList = document.getElementById("adminList").value;
    $.ajax({
        url: APP_PATH+"/common/getAll_Admin",
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
                '    <li><a href="javascript:void(0)" onclick="userPage('+data["tail"]+')">尾页</a></li>' +
                '  </ul>';
            $("#listUser_page").html(listUser_page);
            /*########################################### 用户管理-end ############################################################*/


            /*########################################### 帖子管理 ############################################################*/
            var listArticle_all = "";
            var listArticles = data["listArticle"];
            var article_num = (data["article_pageStart"] - 1)*data["article_pageSize"];   //计数
            for (var i=0;i<listArticles.length;i++){
                article_num++;
                var listArticle = listArticles[i];
                var listArticle_photo = "";
                if (listArticle["photo"] != "photo"){   //有配图
                    var listArticle_photo_type = "";
                    if (listArticle["photo"].endsWith(".mp4") || listArticle["photo"].endsWith(".avi")){    //视频
                        listArticle_photo_type =
                            '<video controls="controls" src="'+APP_PATH+'/static/upload/article/'+listArticle["photo"]+'"' +
                                'style="position: relative; width: 100%; height: 100%;"></video>';
                    } else {
                        listArticle_photo_type =
                            '<img src="'+APP_PATH+'/static/upload/article/'+listArticle["photo"]+'"' +
                                'style="position: relative; width: 100%; height: 100%;">';
                    }
                    listArticle_photo =
                        '<a href="'+APP_PATH+'/static/upload/article/'+listArticle["photo"]+'" target="_brank" id="listArticle_photo_type">'+listArticle_photo_type+'</a>';
                }

                //审核状态
                var listArticle_status = "";
                if (listArticle["status"] == 0){     //待审核
                    listArticle_status =
                        '<button type="button" class="btn btn-warning btn-sm" disabled="disabled">待审核。。</button>';
                } else if (listArticle["status"] == 1){   //审核通过
                    listArticle_status =
                        '<button type="button" class="btn btn-info btn-sm" disabled="disabled">审核通过</button>';
                } else if (listArticle["status"] == 2){   //审核未通过
                    listArticle_status =
                        '<button type="button" class="btn btn-danger btn-sm" disabled="disabled">审核未通过</button>';
                }

                //操作
                var listArticle_caozuo = "";
                if (adminList == "" || adminList == null){  //未登录
                    listArticle_caozuo =
                        '<span class="glyphicon glyphicon-ban-circle"></span>';
                } else {
                    if (listArticle["status"] == 0){     //待审核
                        listArticle_caozuo =
                            '<form method="post" id="form_listArticle_'+listArticle["fid"]+'">' +
                                '<input type="hidden" name="fid" value="'+listArticle["fid"]+'">' +
                                '<input type="hidden" name="status" value="1">' +
                                '<input type="button" class="btn btn-info btn-sm" value="通过" onclick="articleCheck('+listArticle["fid"]+",1"+')"/>' +
                            '</form>' +
                            '<form method="post" id="form_listArticle_'+listArticle["fid"]+'">' +
                                '<input type="hidden" name="fid" value="'+listArticle["fid"]+'">' +
                                '<input type="hidden" name="status" value="2">' +
                                '<input type="button" class="btn btn-danger btn-sm" value="拒绝" onclick="articleCheck('+listArticle["fid"]+",2"+')"/>' +
                            '</form>';
                    } else if (listArticle["status"] == 1){   //审核通过
                        listArticle_caozuo =
                            '<form method="post" id="form_listArticle_'+listArticle["fid"]+'">' +
                                '<input type="hidden" name="fid" value="'+listArticle["fid"]+'">' +
                                '<input type="hidden" name="status" value="2">' +
                                '<input type="button" class="btn btn-danger btn-sm" value="拒绝"  onclick="articleCheck('+listArticle["fid"]+",2"+')"/>' +
                            '</form>';
                    } else if (listArticle["status"] == 2){   //审核未通过
                        listArticle_caozuo =
                            '<form method="post" id="form_listArticle_'+listArticle["fid"]+'">' +
                                '<input type="hidden" name="fid" value="'+listArticle["fid"]+'">' +
                                '<input type="hidden" name="status" value="1">' +
                                '<input type="button" class="btn btn-info btn-sm" value="通过"  onclick="articleCheck('+listArticle["fid"]+",1"+')"/>' +
                            '</form>';
                    }
                }
                listArticle_all = listArticle_all +
                    '<tr>' +
                        '<td>' +
                            '<div style="width:10px;word-wrap:break-word;">'+article_num+'</div>' +
                        '</td>' +
                        '<td>' +
                            '<div style="width:50px;word-wrap:break-word;">'+listArticle["titles"]+'</div>' +
                        '</td>' +
                        '<td>' +
                            '<div style="width:300px;word-wrap:break-word;">'+listArticle["fcontent"]+'</div>' +
                        '</td>' +
                        '<td>' +
                            '<div style="position: relative;width:100px;height:100px;" id="listArticle_photo">'+listArticle_photo+'</div>' +
                        '</td>' +
                        '<td>'+listArticle["username"]+'</td>' +
                        '<td>'+listArticle["bname"]+'</td>' +
                        '<td>'+listArticle["time"]+'</td>' +
                        '<td id="listArticle_status_'+listArticle["fid"]+'">'+listArticle_status+'</td>' +
                        '<!-- 操作 -->' +
                        '<td class=" text-center" id="listArticle_caozuo_'+listArticle["fid"]+'">'+listArticle_caozuo+'</td>' +
                    '</tr>';
            }
            $("#listArticle_all").html(listArticle_all);
            //帖子总数
            $("#article_total").html('（'+data["article_total"]+'条）');

            var article_previous = "";
            var article_next = "";
            //上一页
            if (data["article_pageStart"] == 1){
                article_previous =
                    '<span aria-hidden="true" class="btn" disabled="disabled">&larr;</span>';
            } else {
                var pageStart = data["article_pageStart"]-1;
                article_previous =
                    '<a href="javascript:void(0)" onclick="articlePage('+pageStart+')"><span aria-hidden="true">&larr;</span></a>';
            }
            //下一页
            if ((data["article_pageStart"])*data["article_pageSize"] >= data["article_total"]){
                article_next =
                    '<span aria-hidden="true" class="btn" disabled="disabled">&rarr;</span>';
            } else {
                var pageStart = data["article_pageStart"]+1;
                article_next =
                    '<a href="javascript:void(0)" onclick="articlePage('+pageStart+')"><span aria-hidden="true">&rarr;</span></a>';
            }
            var listArticle_page =
                '<ul class="pagination">' +
                '    <li><a href="javascript:void(0)" onclick="articlePage(1)">首页</a></li>' +
                '    <li id="article_previous">'+article_previous+'</li>' +
                '    <li class="active"><a href="javascript:void(0)">'+data["article_pageStart"]+'</a></li>' +
                '    <li id="article_next">'+article_next+'</li>' +
                '    <li><a href="javascript:void(0)" onclick="articlePage('+data["article_tail"]+')">尾页</a></li>' +
                '  </ul>';
            $("#listArticle_page").html(listArticle_page);
            /*########################################### 帖子管理-end ############################################################*/


            /*########################################### 板块管理 ############################################################*/
            var plate_all = "";
            if (adminList != "" && adminList != null){  //已登录
                var plates_add =
                    '<button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#plate_Add">新增</button>';
                $("#plates_add").html(plates_add);
            }
            var plates = data["plate"];
            var plate_num = 0;   //计数
            for (var i=0;i<plates.length;i++){
                plate_num++;
                var plate = plates[i];
                var plate_caozuo = "";
                if (adminList == "" || adminList == null){  //已登录
                    plate_caozuo =
                        '<span class="glyphicon glyphicon-ban-circle"></span>';
                } else {
                    plate_caozuo =
                        '<form method="post">' +
                            '<input type="hidden" id="form_bname'+plate["bid"]+'" value="'+plate["bname"]+'">' +
                            '<button type="button" class="btn btn-info btn-xs" data-toggle="modal" data-target="#plate_Update" ' +
                                'onclick="plateShow('+plate["bid"]+')">修改</button>' +
                        '</form>' +
                        '<form id="form_delPlate'+plate["bid"]+'" method="post">' +
                            '<input type="hidden" name="bid" value="'+plate["bid"]+'">' +
                            '<button type="button" class="btn btn-danger btn-xs" onclick="b_del('+plate["bid"]+')">删除</button>' +
                        '</form>';
                }
                plate_all = plate_all +
                    '<tr>' +
                        '<td>'+plate_num+'</td>' +
                        '<td>'+plate["bname"]+'</td>' +
                        '<td>'+plate["btime"]+'</td>' +
                        '<!-- 操作 -->' +
                        '<td class=" text-center" id="plate_caozuo">'+plate_caozuo+'</td>' +
                    '</tr>';
            }
            $("#plate_all").html(plate_all);
            //板块总数
            $("#plate_total").html('（'+data["plate_total"]+'条）');
            /*########################################### 板块管理-end ############################################################*/


            /*########################################### 访问管理 ############################################################*/
            var listVisit_all = "";
            var listVisits = data["listVisits"];   //计数
            var visit_num = (data["visit_pageStart"] - 1)*data["visit_pageSize"];   //计数
            for (var i=0;i<listVisits.length;i++){
                visit_num++;
                var listVisit = listVisits[i];
                listVisit_all = listVisit_all +
                    '<tr>' +
                        '<td>'+visit_num+'</td>' +
                        '<td>***.***.***.***</td>' +
                        '<td>'+listVisit["visitcountry"]+'</td>' +
                        '<td>'+listVisit["visitprovince"]+'</td>' +
                        '<td>'+listVisit["visitcity"]+'</td>' +
                        '<td>'+listVisit["visittime"]+'</td>' +
                    '</tr>';
            }
            $("#listVisit_all").html(listVisit_all);
            //访问总数
            $("#visit_total").html('（'+data["visit_total"]+'条）');

            var visit_previous = "";
            var visit_next = "";
            //上一页
            if (data["visit_pageStart"] == 1){
                visit_previous =
                    '<span aria-hidden="true" class="btn" disabled="disabled">&larr;</span>';
            } else {
                var pageStart = data["visit_pageStart"]-1;
                visit_previous =
                    '<a href="javascript:void(0)" onclick="visitPage('+pageStart+')"><span aria-hidden="true">&larr;</span></a>';
            }
            //下一页
            if ((data["visit_pageStart"])*data["visit_pageSize"] >= data["visit_total"]){
                visit_next =
                    '<span aria-hidden="true" class="btn" disabled="disabled">&rarr;</span>';
            } else {
                var pageStart = data["visit_pageStart"]+1;
                visit_next =
                    '<a href="javascript:void(0)" onclick="visitPage('+pageStart+')"><span aria-hidden="true">&rarr;</span></a>';
            }
            var listVisit_page =
                '<ul class="pagination">' +
                '    <li><a href="javascript:void(0)" onclick="visitPage(1)">首页</a></li>' +
                '    <li id="visit_previous">'+visit_previous+'</li>' +
                '    <li class="active"><a href="javascript:void(0)">'+data["visit_pageStart"]+'</a></li>' +
                '    <li id="visit_next">'+visit_next+'</li>' +
                '    <li><a href="javascript:void(0)" onclick="visitPage('+data["visit_tail"]+')">尾页</a></li>' +
                '  </ul>';
            $("#listVisit_page").html(listVisit_page);
            /*########################################### 访问管理-end ############################################################*/

        },
        error : function() {
            layer.msg("异常！",{icon: 5});
        }
    });
});