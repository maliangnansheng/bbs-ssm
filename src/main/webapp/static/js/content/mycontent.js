//个人主页展示
$(function () {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var userid = document.getElementById("session_userid").value;
    $.ajax({
        url: "userController/getMyself",
        type: "post",
        dataType: "json",
        success: function (data) {
            /*上半部分*/
            var myself_userphoto = "";
            var myself_name = "";
            var myself_family = "";
            var myself_intro = "";
            var myself_email = "";
            var myself_sex_age = "";

            var user = data["myListUser"];
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

            //用户名
            myself_name = user["name"];
            $("#myself_name").html(myself_name);

            //居住地
            myself_family = user["family"];
            $("#myself_family").html(myself_family);

            //个人简介
            myself_intro = user["intro"];
            $("#myself_intro").html(myself_intro);

            //电子邮箱
            myself_email = user["email"];
            $("#myself_email").html(myself_email);

            //性别年龄
            myself_sex_age = user["sex"] + "、" +user["age"];
            $("#myself_sex_age").html(myself_sex_age);


            /*下半部分*/
            var myself_article_all ="";
            //动态
            var articles = data["myListArticles"];
            //回复
            var huifus_comment = data["myComments_huifu"];
            //我关注的
            var myAttentions = data["myListAttentions"];
            //关注我的
            var myAttentions_be = data["myListAttentions_be"];
            //收藏
            var collects = data["myListCollects"];
            var count_Article = articles.length;                                    //动态数
            var count_Comment = huifus_comment.length;                              //回答数
            var count_Attention = myAttentions.length + myAttentions_be.length;     //关注数
            var count_Collect = collects.length;                                    //收藏数
            $("#count_Article").html(count_Article);
            $("#count_Comment").html(count_Comment);
            $("#count_Attention").html(count_Attention);
            $("#count_Collect").html(count_Collect);

            /*########################################### 帖子循环-开始（动态）############################################################*/
            if (articles == "") { //判断是否有动态
                var article_null =
                    '<br><br><br><br>' +
                    '<div class="text-center">' +
                        '<img alt="没发过帖子" src="'+ APP_PATH +'/static/img/article.png">' +
                        '<p style="color: #999999">你很懒，还没有发过帖子</p>' +
                    '</div>' +
                    '<br><br><br><br>';
                $("#article_null").html(article_null);
            }
            for (var i=0;i<count_Article;i++){
                var article = articles[i];
                var myself_article_status = "";
                var myself_article_time = "";
                var myself_article_titles = "";
                var myself_article_fcontent = "";
                var myself_article_photo = "";
                var myself_article_update = "";
                var myself_article_del = "";

                /*审核状态*/
                if (article["status"] == 0){ //待审核状态
                    myself_article_status = '<small class="btn-warning">待审核。。。</small>';
                } else if (article["status"] == 1){ //审核通过状态
                    myself_article_status = '<small class="text-success"><b>审核通过</b></small>';
                } else if (article["status"] == 2){ //审核未通过状态
                    myself_article_status = '<small class="btn-danger">审核未通过</small>';
                }

                /*发帖时间*/
                myself_article_time = article["time"];

                /*帖子标题*/
                myself_article_titles = article["titles"];

                /*帖子内容*/
                myself_article_fcontent = article["fcontent"];

                /*帖子配图*/
                if (article["photo"] != "photo"){   //无配图
                    var img_video;
                    if (article["photo"].endsWith(".mp4")||article["photo"].endsWith(".avi")){  //视频
                        img_video = '<video controls="controls" src="'+ APP_PATH +'/static/upload/article/'+article["photo"]+'" ' +
                            'style="position: relative; width: 30%; height: 30%;"></video>';
                    }else {     //图片
                        img_video = '<img src="'+ APP_PATH +'/static/upload/article/'+article["photo"]+'"' +
                            'style="position: relative; width: 30%; height: 30%;">';
                    }
                    myself_article_photo = '<a href="'+ APP_PATH +'/static/upload/article/'+article["photo"]+'" target="_blank">'+img_video+'</a>';
                }

                /*修改*/
                myself_article_update =
                    '<form id="form_articleUpdate_'+article["fid"]+'">' +
                        '<input type="hidden" name="titles" value="'+article["titles"]+'">' +
                        '<input type="hidden" name="bname" value="'+article["bname"]+'">' +
                        '<input type="hidden" name="fcontent" value="'+article["fcontent"]+'">' +
                        '<input type="hidden" name="photo" value="'+article["photo"]+'">' +
                        '<button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#articleEdit" onclick="setArticleEdit('+article["fid"]+')">修改</button>' +
                    '</form>';

                /*删除*/
                myself_article_del =
                    '<form>' +
                        '<button type="button" class="btn btn-danger btn-sm" onclick="f_del('+article["fid"]+')">删除</button>' +
                    '</form>';

                /*评论*/
                var myself_article_comment = "";
                var myListComment_Fid = "myListComment_"+article["fid"];
                var comments = data[myListComment_Fid];
                for (var j=0;j<comments.length;j++){
                    var comment = comments[j];
                    myself_article_comment = myself_article_comment +
                        '<hr style="position: relative; margin-top: 2px;height:1px;border:none;border-top:1px dashed #dddddd;">' +
                        '<div class="row" style="position: relative; margin-top: -10px;">' +
                            '<div class="col-xs-9 col-md-11">' +
                                '<a href="'+ APP_PATH +'/userController/getOthers?userid='+comment["userid"]+'" class="a_p">' +
                                '<!-- 评论者姓名 -->' +
                                '<b>'+comment["name"]+'</b>' +
                                '</a>' +
                                '&nbsp;&nbsp;&nbsp;' +
                                '<small>'+comment["time"]+'</small>' +
                                '<!-- 评论者内容 -->' +
                                '<p>'+comment["pcontent"]+'</p>' +
                            '</div>' +
                            '<div class="col-xs-3 col-md-1">' +
                                '<form>' +
                                    '<button type="button" class="btn btn-danger btn-sm" onclick="p_del('+article["fid"]+","+comment["pid"]+')">删除</button>' +
                                '</form>' +
                            '</div>' +
                        '</div>';
                }

                myself_article_all = myself_article_all +
                    '<!--动态-->' +
                    '<div class="row">' +
                        '<div class="col-xs-7 col-md-6">' +
                            '<!-- 帖子审核状态 -->' +
                            '<small>审核状态：</small>' +
                            '<!-- 审核状态显示 -->' +
                            '<span id="myself_article_status">'+myself_article_status+'</span>' +
                        '</div>' +
                        '<div class="col-xs-5 col-md-2 col-md-offset-4" style="position: relative;">' +
                            '<!-- 时间 -->' +
                            '<small id="myself_article_time">'+myself_article_time+'</small>' +
                        '</div>' +
                        '' +
                        '<div class="col-xs-12 col-md-12">' +
                            '<h4>' +
                                '<!-- 标题 -->' +
                                '<b id="myself_article_titles">'+myself_article_titles+'</b>' +
                            '</h4>' +
                        '</div>' +
                        '<div class="col-xs-12 col-md-12">' +
                            '<!-- 内容 -->' +
                            '<p id="myself_article_fcontent">'+myself_article_fcontent+'</p>' +
                        '</div>' +
                        '<!-- 配图 -->' +
                        '<div class="col-xs-12 col-md-12" id="myself_article_photo">'+myself_article_photo+'</div>' +
                        '<div class="col-xs-7 col-md-10"></div>' +
                        '<!-- 修改 -->' +
                        '<div class="col-xs-2 col-md-1" id="myself_article_update">'+myself_article_update+'</div>' +
                        '<!-- 删除 -->' +
                        '<div class="col-xs-3 col-md-1" id="myself_article_del">'+myself_article_del+'</div>' +
                    '</div>' +
                    '' +
                    '<!--评论-循环开始（动态）-->' +
                    '<div id="myself_article_comment'+article["fid"]+'">'+myself_article_comment+'</div>' +
                    '<!--评论-循环结束（动态）-->' +
                    '<hr style="height:1px;border:none;border-top:3px solid #bbbbbb;">';
            }
            $("#myself_article_all").html(myself_article_all);
            /*########################################### 帖子循环-开始（动态）-end ############################################################*/

            /*########################################### 帖子循环-开始（回复）############################################################*/
            var huifu_all = "";
            if (huifus_comment == "") { //判断是否有动态
                var article_huifu_null =
                    '<br><br><br><br>' +
                    '<div class="text-center">' +
                        '<img alt="没评论过帖子" src="'+APP_PATH+'/static/img/comment.png">' +
                        '<p style="color: #999999">你很懒，还没有评论过任何帖子</p>' +
                    '</div>' +
                    '<br><br><br><br>';
                $("#article_huifu_null").html(article_huifu_null);
            }
            for (var i =0 ;i<huifus_comment.length;i++){
               var huifu_comment = huifus_comment[i];
                var myArticle_Fid = "myArticle_"+huifu_comment["fid"];
                var huifu_article = data[myArticle_Fid];
                // 只显示通过审核的帖子
                if (huifu_article["status"] == 1){
                    var huifu_article_photo = "";
                    // 判断配图
                    if (huifu_article["photo"] != "photo"){ //有配图
                        var huifu_article_photo_type = "";
                        //配图是图片还是视频
                        if (huifu_article["photo"].endsWith(".mp4") || huifu_article["photo"].endsWith(".avi")){  //视频
                            huifu_article_photo_type =
                                '<video controls="controls" src="'+APP_PATH+'/static/upload/article/'+huifu_article["photo"]+'"' +
                                    'style="position: relative; width: 30%; height: 30%;"></video>';
                        } else {    //图片
                            huifu_article_photo_type =
                                '<img src="'+APP_PATH+'/static/upload/article/'+huifu_article["photo"]+'"' +
                                    'style="position: relative; width: 30%; height: 30%;">';
                        }
                        huifu_article_photo =
                            '<a href="'+APP_PATH+'/static/upload/article/'+huifu_article["photo"]+'" target="_blank">'+huifu_article_photo_type+'</a>';
                    }

                    /*评论*/
                    var huifu_comment_all = "";
                    var myListComment_Fid = "myListComment_huifu_"+huifu_article["fid"];
                    var huifu_comments = data[myListComment_Fid];
                    for (var j =0 ;j<huifu_comments.length;j++){
                        var huifu_comment = huifu_comments[j];
                        var huifu_comment_del = "";
                        // 如果该评论者是本用户时可以修改自己的评论，否则不能
                        if (huifu_comment["userid"] == userid){
                            huifu_comment_del =
                                '<form>' +
                                    '<button type="button" class="btn btn-danger btn-sm" onclick="p_del_huifu('+huifu_article["fid"]+","+huifu_comment["pid"]+')">删除</button>' +
                                '</form>';
                        }
                        huifu_comment_all = huifu_comment_all +
                            '<hr style="position: relative; margin-top: 2px;height:1px;border:none;border-top:1px dashed #dddddd;">' +
                            '<div class="row" style="position: relative; margin-top: -10px;">' +
                                '<div class="col-xs-10 col-md-11">' +
                                '<a href="'+APP_PATH+'/userController/getOthers?userid='+huifu_comment["userid"]+'" class="a_p">' +
                                '<!-- 评论者姓名 -->' +
                                '<b>'+huifu_comment["name"]+'</b>' +
                                '</a>' +
                                '&nbsp;&nbsp;&nbsp;' +
                                '<!-- 时间 -->' +
                                '<small>'+huifu_comment["time"]+'</small>' +
                                '<!-- 评论者内容 -->' +
                                '<p>'+huifu_comment["pcontent"]+'</p>' +
                                '</div>' +
                                '<!-- 如果该评论者是本用户时可以修改自己的评论，否则不能 -->' +
                                '<div id="huifu_comment_del">'+huifu_comment_del+'</div>' +
                            '</div>';
                    }
                    huifu_all = huifu_all +
                        '<div class="row">' +
                            '<div class="col-xs-7 col-md-6">' +
                                '<!-- 帖子作者 -->' +
                                '<small>作者：'+huifu_article["username"]+'</small>' +
                            '</div>' +
                            '<div class="col-xs-5 col-md-2 col-md-offset-4" style="position: relative;">' +
                                '<!-- 时间 -->' +
                                '<small>'+huifu_article["time"]+'</small>' +
                            '</div>' +
                            '' +
                            '<div class="col-xs-12 col-md-12">' +
                                '<h4>' +
                                    '<!-- 标题 -->' +
                                    '<b>'+huifu_article["titles"]+'</b>' +
                                '</h4>' +
                            '</div>' +
                            '<div class="col-xs-12 col-md-12">' +
                                '<!-- 内容 -->' +
                                '<p>'+huifu_article["fcontent"]+'</p>' +
                            '</div>' +
                            '<div class="col-xs-12 col-md-12" id="huifu_article_photo">'+huifu_article_photo+'</div>' +
                        '</div>' +
                        '' +
                        '<!--评论-循环开始（回复）-->' +
                        '<div id="huifu_comment_all_'+huifu_article["fid"]+'">'+huifu_comment_all+'</div>' +
                        '<hr style="height:1px;border:none;border-top:1px solid #bbbbbb;">';
                }
            }
            $("#huifu_all").html(huifu_all);
            /*########################################### 帖子循环-开始（回复）-end ############################################################*/


            /*########################################### 关注 ############################################################*/
            //我关注的用户数
            var attention_count = myAttentions.length;
            //关注我的用户数
            var attention_count_be = myAttentions_be.length;

            $("#attention_count").html(attention_count);
            $("#attention_count_be").html(attention_count_be);

            /*我关注的*/
            var attention_all = "";
            if (myAttentions == ""){    //判断是否有关注他人
                var attention_null =
                    '<br><br><br><br>' +
                    '<div class="text-center">' +
                        '<img alt="没关注过人" src="'+APP_PATH+'/static/img/attention.png">' +
                        '<p style="color: #999999">可能，你还没遇见感兴趣的人</p>' +
                    '</div>' +
                    '<br><br><br><br>';
                $("#attention_null").html(attention_null);
            } else {
                for (var i=0;i<myAttentions.length;i++){
                    var myAttention = myAttentions[i];
                    var myAttention_userphoto = "";
                    if (myAttention["userphoto"] != null){  //该用户有修改头像
                        myAttention_userphoto =
                            '<img class="img-thumbnail" alt="Brand" style="position:relative;width: 70px;height: 70px;" ' +
                                'src="'+APP_PATH+'/static/upload/user/'+myAttention["userphoto"]+'">';
                    } else {    //该用户没有修改头像，只有默认头像
                        myAttention_userphoto =
                            '<img class="img-thumbnail" alt="Brand" style="position:relative;width: 70px;height: 70px;"' +
                                'src="'+APP_PATH+'/static/img/head.png">';
                    }
                    attention_all = attention_all +
                        '<div class="row">' +
                            '<div class="col-xs-3 col-md-2">' +
                                '<a href="'+APP_PATH+'/userController/getOthers?userid='+myAttention["userid"]+'">'+myAttention_userphoto+'</a>' +
                            '</div>' +
                            '<div class="col-xs-5 col-md-8">' +
                                '<a class="a_b" href="'+APP_PATH+'/userController/getOthers?userid='+myAttention["userid"]+'">' +
                                    '<!-- 发帖人名字 -->' +
                                    '<b style="font-size: 16px;">'+myAttention["name"]+'</b>' +
                                '</a>' +
                                '<br>' +
                                '<samp>'+myAttention["intro"]+'</samp>' +
                                '<br>' +
                                '<samp>有<b class="text-success">'+myAttention["attcount"]+'</b>人关注</samp>' +
                            '</div>' +
                            '<div class="col-xs-4 col-md-2 attention">' +
                                '<form id="form_attentionDel_'+myAttention["userid"]+'">' +
                                    '<a href="javascript:void(0)">' +
                                        '<input type="hidden" name="userid" value="'+userid+'">' +
                                        '<input type="hidden" name="beuserid" value="'+myAttention["userid"]+'">' +
                                        '<button type="button" class="btn button2" style="width:80px;" onclick="attentionDel_Myself('+myAttention["userid"]+')">取消关注</button>' +
                                        '<button type="button" class="btn" style="width:80px;" onclick="attentionDel_Myself('+myAttention["userid"]+')">已关注</button>' +
                                    '</a>' +
                                '</form>' +
                            '</div>' +
                        '</div>' +
                        '<hr>';
                }
            }
            $("#attention_all").html(attention_all);

            /*关注我的*/
            var attention_be_all = "";
            if (myAttentions_be == ""){    //判断是否有人关注我
                var attention_be_null =
                    '<br><br><br><br>' +
                    '<div class="text-center">' +
                        '<img alt="没人关注你" src="'+APP_PATH+'/static/img/attention.png">' +
                        '<p style="color: #999999">可能，你并不是别人的菜</p>' +
                    '</div>' +
                    '<br><br><br><br>';
                $("#attention_be_null").html(attention_be_null);
            } else {
                for (var i=0;i<myAttentions_be.length;i++){
                    var myAttention_be = myAttentions_be[i];
                    var myAttention_be_userphoto = "";
                    if (myAttention_be["userphoto"] != null){  //该用户有修改头像
                        myAttention_be_userphoto =
                            '<img class="img-thumbnail" alt="Brand" style="position:relative;width: 70px;height: 70px;"' +
                                'src="'+APP_PATH+'/static/upload/user/'+myAttention_be["userphoto"]+'">';
                    } else {    //该用户没有修改头像，只有默认头像
                        myAttention_be_userphoto =
                            '<img class="img-thumbnail" alt="Brand" style="position:relative;width: 70px;height: 70px;"' +
                            'src="'+APP_PATH+'/static/img/head.png">';
                    }
                    attention_be_all = attention_be_all +
                        '<div class="row">' +
                            '<div class="col-xs-3 col-md-2">' +
                                '<a href="'+APP_PATH+'/userController/getOthers?userid='+myAttention_be["userid"]+'">'+myAttention_be_userphoto+'</a>' +
                            '</div>' +
                            '<div class="col-xs-9 col-md-8">' +
                                '<a class="a_b" href="'+APP_PATH+'/userController/getOthers?userid='+myAttention_be["userid"]+'">' +
                                    '<!-- 发帖人名字 -->' +
                                    '<b style="font-size: 16px;">'+myAttention_be["name"]+'</b>' +
                                '</a>' +
                                '<br>' +
                                '<samp>'+myAttention_be["intro"]+'</samp>' +
                                '<br>' +
                                '<samp>有<b class="text-success">'+myAttention_be["attcount"]+'</b>人关注</samp>' +
                            '</div>' +
                        '</div>' +
                        '<hr>';
                }
            }
            $("#attention_be_all").html(attention_be_all);
            /*########################################### 关注-end ############################################################*/


            /*########################################### 收藏 ############################################################*/
            var collect_all = "";
            if (collects == ""){    //判断是否有收藏过帖子
                var collect_null = 
                    '<br><br><br><br>' +
                    '<div class="text-center">' +
                        '<img alt="没收藏过帖子" src="'+APP_PATH+'/static/img/attention.png">' +
                        '<p style="color: #999999">可能，你还没遇见感兴趣的帖子</p>' +
                    '</div>' +
                    '<br><br><br><br>';
                $("#collect_null").html(collect_null);
            } else {
                for (var i=0;i<collects.length;i++){
                    var collect = collects[i];
                    collect_all = collect_all +
                        '<div class="row">' +
                            '<div class="col-xs-2 col-md-1">' +
                                '<form id="form_collectDel_'+collect["fid"]+'" method="post">' +
                                    '<input type="hidden" name="userid" value="'+userid+'">' +
                                    '<input type="hidden" name="fid" value="'+collect["fid"]+'">' +
                                    '<button type="button" style="border: none;background-color: #ffffff;" onclick="collectDel_Myself('+collect["fid"]+')">' +
                                        '<samp title="取消收藏" class="glyphicon glyphicon-heart collect_end"></samp>' +
                                    '</button>' +
                                '</form>' +
                            '</div>' +
                            '<div class="col-xs-10 col-md-9">' +
                                '<a href="javascript:void(0)" onclick="collectShow('+collect["fid"]+')" data-toggle="modal" data-target="#collectArticle" >'+collect["titles"]+'</a>' +
                            '</div>' +
                            '<div class="col-xs-5 col-md-2 col-xs-offset-7">' +
                                '<small>'+collect["time"]+'</small>' +
                            '</div>' +
                        '</div>' +
                        '<hr>';

                }
            }
            $("#collect_all").html(collect_all);
            /*########################################### 收藏-end ############################################################*/
        },
        error : function() {
            layer.msg("请登录！",{icon: 4});
        }

    });
});