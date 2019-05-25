//展示热门帖子
function getFid(fid) {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var userid = document.getElementById("session_userid").value;
    $.ajax({
        //几个参数需要注意一下
        url: "articleController/getArticleFid/"+fid ,//url
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        success: function (data) {
            var articles_all = "";
            var article = data["listArticle"];

            //帖子来源的板块
            var bname = "";
            //帖子发布的时间
            var time = "";
            //帖子发布者头像信息
            var userphoto = "";
            //帖子发布者用户名
            var username = "";
            //关注按钮
            var form_attention = "";
            // 帖子标题
            var listArticle_titles = "";
            //帖子内容
            var listArticle_fcontent = "";
            //帖子配图
            var listArticle_photo = "";
            //评论数
            var listArticle_sum = "";
            //收藏按钮
            var form_collect = "";
            //登录后可收藏
            var collect_userid_null = "";
            //评论框
            var comment_box = "";
            // 评论展示
            var comment_traversals = "";

            //只显示通过审核的帖子
            if (article["status"] == 1) {
                bname = '<a href="#" onclick=getBid("'+article["bname"]+'") >' + article["bname"] + '</a>';

                time = article["time"];

                //帖子发布者头像信息
                var head_png;
                if (article["userphoto"] == null) {
                    head_png = '<img class="img_head" alt="Brand" src=' + APP_PATH + '/static/img/head.png>';
                } else {
                    head_png = '<img class="img_head" alt="Brand" src=' + APP_PATH + '/static/upload/user/' + article["userphoto"] + '>';
                }
                userphoto = '<a href=' + APP_PATH + '/userController/getOthers?userid=' + article["userid"] + '>' + head_png + '</a>';

                username = '<a class="a_b" href=' + APP_PATH + '/userController/getOthers?userid=' + article["userid"] + '>' +
                    '<h5 class="bottom_left_name">' +
                    '<b>' + article["username"] + '</b>' +
                    '</h5>' +
                    '</a>';

                //用户登录后才显示关注按钮 && 如果是登录用户本人，则不显示关注按钮
                if (userid != "" && article["userid"] != userid) {
                    // 每一次遍历帖子时初始化attention_record为“false”
                    var attention_record = false;
                    var attentions = data["attention"];
                    // 遍历关注表信息
                    for (var j = 0; j < attentions.length; j++) {
                        var attention = attentions[j];
                        //判断该帖子对应的用户是否被关注，如果是，则将“true”保存到"attention_record"中
                        if (attention["userid"] == userid && attention["beuserid"] == article["userid"]) {
                            form_attention =
                                '<form id="form_attentionDel_'+article["fid"]+'" method="post">' +
                                '<input type="hidden" name="gid" value=' + attention["gid"] + '>' +
                                '<div class="attention_content">' +
                                '<a href="javascript:void(0)">' +
                                '<button type="button" onclick="attentionDel('+article["fid"]+","+article["userid"]+","+userid+')" class="btn button2" style="width:80px;">取消关注</button>' +
                                '<button type="button" onclick="attentionDel('+article["fid"]+","+article["userid"]+","+userid+')" class="btn" style="width:80px;">已关注</button>' +
                                '</a>' +
                                '</div>' +
                                '</form>';
                            //当该用户被关注时，给attention_record赋值“true”
                            attention_record = true;
                        }
                    }
                    //判断attention_record中是否有“false”，有表示该帖子对应的用户还没有被关注
                    if (attention_record == false) {
                        form_attention =
                            '<form id="form_attentionAdd_'+article["fid"]+'" method="post">' +
                            '<input type="hidden" name="userid" value="' + userid + '">' +
                            '<input type="hidden" name="beuserid" value="' + article["userid"] + '">' +
                            '<button type="button" onclick="attentionAdd('+article["fid"]+","+article["userid"]+","+userid+')" class="btn btn-info btn-sm">' +
                            '<samp class="glyphicon glyphicon-plus"></samp> 关注她' +
                            '</button>' +
                            '</form>';
                    }
                }

                listArticle_titles = article["titles"];

                listArticle_fcontent = article["fcontent"];

                //帖子配图
                if (article["photo"] != "photo"){
                    var img_video;
                    if (article["photo"].endsWith(".mp4")||article["photo"].endsWith(".avi")){
                        img_video = '<video class="img_content" controls="controls" src=' + APP_PATH + '/static/upload/article/'+article["photo"] + '></video>';
                    }else {
                        img_video = '<img class="img_content" controls="controls" src=' + APP_PATH + '/static/upload/article/'+article["photo"] + '>';
                    }
                    listArticle_photo = '<a href=' + APP_PATH + '/static/upload/article/'+article["photo"] + ' target="_blank">' + img_video + '</a>';
                }

                //评论数
                listArticle_sum = article["sum"] + " 条评论";

                // 用户登录后才显示心形收藏 && 如果不是登录用户本人所发帖子，则显示心形收藏
                if (userid != "" && article["userid"] != userid){
                    // 每一次遍历帖子时初始化collect_record为“false”
                    var collect_record = false;
                    // 遍历收藏表信息
                    var collects = data["collect"];
                    for (var j = 0; j < collects.length; j++){
                        var collect = collects[j];
                        // 判断该帖子是否被收藏，如果是，则将“true”保存到"collect_record"中
                        if (collect["userid"] == userid && collect["fid"]==article["fid"]){
                            form_collect =
                                '<form id="form_collectDel_'+article["fid"]+'" method="post">' +
                                '<input type="hidden" name="sid" value="'+collect["sid"]+'">' +
                                '<button type="button" style="border: none;background-color: #ffffff;" onclick="collectDel('+article["fid"]+","+userid+')">' +
                                '<samp title="取消收藏" class="glyphicon glyphicon-heart collect_end"></samp>' +
                                '</button>' +
                                '</form>';
                            // 当该用户被收藏时，给attention_record赋值“true”
                            collect_record = true;
                        }
                    }
                    // 判断collect_record中是否有“false”，有表示该帖子还没有被收藏
                    if (collect_record == false){
                        form_collect =
                            '<form id="form_collectAdd_'+article["fid"]+'" method="post">' +
                            '<input type="hidden" name="userid" value="'+userid+'">' +
                            '<input type="hidden" name="fid" value="'+article["fid"]+'">' +
                            '<button type="button" style="border: none;background-color: #ffffff;" onclick="collectAdd('+article["fid"]+","+userid+')">' +
                            '<samp title="收藏该帖子" class="glyphicon glyphicon-heart collect_start"></samp>' +
                            '</button>' +
                            '</form>';
                    }
                }
                // 用户未登录才显示文字收藏 && 如果不是登录用户本人所发帖子，则显示文字收藏
                if (userid == "" && article["userid"] != userid){
                    collect_userid_null = "登录后可收藏";
                }

                // 用户登录后才显示评论框
                if (userid != ""){
                    // 评论框
                    comment_box =
                        '<form id="form_commentAdd_'+article["fid"]+'">' +
                        '<div class="col-xs-10 col-md-11">' +
                        '<input type="hidden" name="userid" value="'+userid+'">' +
                        '<input type="hidden" name="fid" value="'+article["fid"]+'">' +
                        '<input type="text" class="form-control" id="pcontent_'+article["fid"]+'" name="pcontent" placeholder="写下你的评论..." required>' +
                        '</div>' +
                        '<div class="col-xs-2 col-md-1">' +
                        '<button type="button" class="btn btn-primary" style="position: relative; left: -25px;" onclick="commentAdd('+article["fid"]+')">评论</button>' +
                        '</div>' +
                        '</form>';
                }

                var listComment_Fid = "listComment_"+article["fid"];
                var comments = data[listComment_Fid];
                for (var j = 0; j < comments.length; j++){
                    var comment = comments[j];
                    comment_traversals = comment_traversals +
                        '<a class="a_p" href=' + APP_PATH + '/userController/getOthers?userid='+comment["userid"]+'>' +
                        '<!-- 评论者姓名 -->' +
                        '<b>'+comment["name"]+'</b>' +
                        '</a>' +
                        '&nbsp;&nbsp;&nbsp;' +
                        '<!-- 时间 -->' +
                        '<small>'+comment["time"]+'</small>' +
                        '<!-- 评论内容 -->' +
                        '<p>'+comment["pcontent"]+'</p>';
                }

                articles_all = articles_all +
                    '<div class="row show_article">' +
                    '<div class="col-md-12 show_article_go">' +
                    '<div class="row">' +
                    '<div class="col-xs-7 col-md-9" style="position: relative; padding-top: 10px;">' +
                    '<small>热门内容，来自：<small id="listArticle_bname">'+bname+'</small></small>' +
                    '</div>' +
                    '<div class="col-xs-5 col-md-3" style="position: relative; padding-top: 10px;">' +
                    '<!-- 时间 -->' +
                    '<small id="listArticle_time">'+time+'</small>' +
                    '</div>' +
                    '</div>' +
                    '' +
                    '<div class="row">' +
                    '<!-- 头像 -->' +
                    '<div class="col-xs-2 col-md-1" id="listArticle_userphoto">'+userphoto+'</div>' +
                    '<!-- 发帖人名字 -->' +
                    '<div class="col-xs-6 col-md-8" id="listArticle_username">'+username+'</div>' +
                    '<div class="col-xs-4 col-md-3">' +
                    '<!-- 关注按钮 -->' +
                    '<div id="form_attention'+article["fid"]+'">'+form_attention+'</div>' +
                    '</div>' +
                    '</div>' +
                    '' +
                    '<div class="row">' +
                    '<div class="col-md-12">' +
                    '<a class="bottom_left_aaa a_b" href="#">' +
                        '<h4>' +
                        '<!-- 帖子标题 -->' +
                        '<b id="listArticle_titles">'+listArticle_titles+'</b>' +
                        '</h4>' +
                    '</a>' +
                    '</div>' +
                    '</div>' +
                    '' +
                    '<div class="row">' +
                    '<div class="col-md-12">' +
                    '<!-- 帖子内容 -->' +
                    '<p id="listArticle_fcontent">'+listArticle_fcontent+'</p>' +
                    '</div>' +
                    '</div>' +
                    '' +
                    '<div class="row">' +
                    '<!-- 帖子配图 -->' +
                    '<div class="col-md-12" id="listArticle_photo">'+listArticle_photo+'</div>' +
                    '</div>' +
                    '' +
                    '<br>' +
                    '<div class="row" style="position: relative;top: -10px;">' +
                    '<div class="col-xs-10 col-md-6">' +
                    '<div class="col-xs-5 col-md-6">' +
                    '<!-- 评论数 -->' +
                    '<small id="listArticle_sum">'+listArticle_sum+'</small>' +
                    '</div>' +
                    '<div class="col-xs-7 col-md-6">' +
                    '<!-- 收藏按钮 -->' +
                    '<div id="form_collect'+article["fid"]+'">'+form_collect+'</div>' +
                    '<small id="collect_userid_null">'+collect_userid_null+'</small>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '' +
                    '<!--评论框-->' +
                    '<div class="row" style="position: relative; margin-top: 10px;">' +
                    '<div class="col-xs-12 col-md-12" id="comment_box">'+comment_box+'</div>' +
                    '</div>' +
                    '' +
                    '<!--评论展示-->' +
                    '<hr style="position: relative; margin-top: 5px;">' +
                    '<div class="row" style="position: relative; margin-top: -10px;">' +
                    '<!--评论展示-->' +
                    '<div class="col-md-12" id="comment_traversals'+article["fid"]+'">'+comment_traversals+'</div>' +
                    '</div>' +
                    '' +
                    '<br>' +
                    '<div class="row">' +
                    '<div class="col-md-12" style="position: relative; background-color: #f6f6f6; height: 10px;"></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            }
            $("#articles_all").html(articles_all);
            //取消加载更多
            $("#appendMore").html("");
        },
        error : function() {
            layer.msg("异常！",{icon: 5});
        }
    });
}


//帖子-删除
function articleDel(fid) {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var userid = document.getElementById("session_userid").value;
    $.ajax({
        //几个参数需要注意一下
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "articleController/deleteArticle/"+fid ,//url
        success: function (result) {
            if (result.resultCode == 200) {
                //获取最新本人帖子信息
                $.ajax({
                    type: "post",//方法类型
                    dataType: "json",//预期服务器返回的数据类型
                    url: "userController/getMyselfArticle" ,//url
                    success: function (data) {
                        /*下半部分*/
                        var myself_article_all ="";
                        //动态
                        var articles = data["myListArticles"];
                        var count_Article = articles.length;        //动态数
                        $("#count_Article").html(count_Article);

                        /*帖子循环-开始（动态）*/
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

/*收藏-帖子展示*/
function collectShow(fid) {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var userid = document.getElementById("session_userid").value;
    $.ajax({
        //几个参数需要注意一下
        url: "articleController/getArticleFid/"+fid ,//url
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        success: function (data) {
            var collectArticle_all = "";
            var article = data["listArticle"];

            //帖子来源的板块
            var bname = "";
            //帖子发布的时间
            var time = "";
            //帖子发布者头像信息
            var userphoto = "";
            //帖子发布者用户名
            var username = "";
            //帖子标题
            var listArticle_titles = "";
            //帖子内容
            var listArticle_fcontent = "";
            //帖子配图
            var listArticle_photo = "";
            //评论数
            var listArticle_sum = "";
            //登录后可收藏
            var collect_userid_null = "";
            // 评论展示
            var comment_traversals = "";

            //只显示通过审核的帖子
            if (article["status"] == 1) {
                bname = '<small class="text-primary">' + article["bname"] + '</small>';

                time = article["time"];

                //帖子发布者头像信息
                var head_png;
                if (article["userphoto"] == null) {
                    head_png = '<img class="img_head" alt="Brand" src=' + APP_PATH + '/static/img/head.png>';
                } else {
                    head_png = '<img class="img_head" alt="Brand" src=' + APP_PATH + '/static/upload/user/' + article["userphoto"] + '>';
                }
                userphoto = '<a href=' + APP_PATH + '/userController/getOthers?userid=' + article["userid"] + '>' + head_png + '</a>';

                username = '<a class="a_b" href=' + APP_PATH + '/userController/getOthers?userid=' + article["userid"] + '>' +
                    '<h5 class="bottom_left_name">' +
                    '<b>' + article["username"] + '</b>' +
                    '</h5>' +
                    '</a>';

                listArticle_titles = article["titles"];

                listArticle_fcontent = article["fcontent"];

                //帖子配图
                if (article["photo"] != "photo"){
                    var img_video;
                    if (article["photo"].endsWith(".mp4")||article["photo"].endsWith(".avi")){
                        img_video = '<video class="img_content" controls="controls" src=' + APP_PATH + '/static/upload/article/'+article["photo"] + '></video>';
                    }else {
                        img_video = '<img class="img_content" controls="controls" src=' + APP_PATH + '/static/upload/article/'+article["photo"] + '>';
                    }
                    listArticle_photo = '<a href=' + APP_PATH + '/static/upload/article/'+article["photo"] + ' target="_blank">' + img_video + '</a>';
                }

                //评论数
                listArticle_sum = article["sum"] + " 条评论";

                var listComment_Fid = "listComment_"+article["fid"];
                var comments = data[listComment_Fid];
                for (var j = 0; j < comments.length; j++){
                    var comment = comments[j];
                    comment_traversals = comment_traversals +
                        '<a class="a_p" href=' + APP_PATH + '/userController/getOthers?userid='+comment["userid"]+'>' +
                        '<!-- 评论者姓名 -->' +
                        '<b>'+comment["name"]+'</b>' +
                        '</a>' +
                        '&nbsp;&nbsp;&nbsp;' +
                        '<!-- 时间 -->' +
                        '<small>'+comment["time"]+'</small>' +
                        '<!-- 评论内容 -->' +
                        '<p>'+comment["pcontent"]+'</p>';
                }

                collectArticle_all = collectArticle_all +
                    '<div class="row show_article">' +
                        '<div class="col-md-12 show_article_go">' +
                            '<div class="row">' +
                                '<div class="col-xs-7 col-md-9" style="position: relative; padding-top: 10px;">' +
                                    '<small>热门内容，来自：<small id="listArticle_bname">'+bname+'</small></small>' +
                                '</div>' +
                                '<div class="col-xs-5 col-md-3" style="position: relative; padding-top: 10px;">' +
                                    '<!-- 时间 -->' +
                                    '<small id="listArticle_time">'+time+'</small>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="row">' +
                                '<!-- 头像 -->' +
                                '<div class="col-xs-2 col-md-1" id="listArticle_userphoto">'+userphoto+'</div>' +
                                '<!-- 发帖人名字 -->' +
                                '<div class="col-xs-6 col-md-8" id="listArticle_username">'+username+'</div>' +
                            '</div>' +
                            '' +
                            '<div class="row">' +
                                '<div class="col-md-12">' +
                                '<a class="bottom_left_aaa a_b" href="#">' +
                                    '<h4>' +
                                    '<!-- 帖子标题 -->' +
                                    '<b id="listArticle_titles">'+listArticle_titles+'</b>' +
                                    '</h4>' +
                                '</a>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="row">' +
                                '<div class="col-md-12">' +
                                    '<!-- 帖子内容 -->' +
                                    '<p id="listArticle_fcontent">'+listArticle_fcontent+'</p>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="row">' +
                                '<!-- 帖子配图 -->' +
                                '<div class="col-md-12" id="listArticle_photo">'+listArticle_photo+'</div>' +
                            '</div>' +
                            '' +
                            '<br>' +
                            '<div class="row" style="position: relative;top: -10px;">' +
                                '<div class="col-xs-10 col-md-6">' +
                                    '<div class="col-xs-5 col-md-6">' +
                                        '<!-- 评论数 -->' +
                                        '<small id="listArticle_sum">'+listArticle_sum+'</small>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<!--评论展示-->' +
                            '<hr style="position: relative; margin-top: 5px;">' +
                            '<div class="row" style="position: relative; margin-top: -10px;">' +
                                '<!--评论展示-->' +
                                '<div class="col-md-12" id="comment_traversals'+article["fid"]+'">'+comment_traversals+'</div>' +
                            '</div>' +
                            '' +
                            '<br>' +
                            '<div class="row">' +
                                '<div class="col-md-12" style="position: relative; background-color: #f6f6f6; height: 10px;"></div>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
            }
            $("#collectArticle_all").html(collectArticle_all);
        },
        error : function() {
            layer.msg("异常！",{icon: 5});
        }
    });
}