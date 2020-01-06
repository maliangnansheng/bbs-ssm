//某一帖子展示
$(function () {
    // layer.msg("请等待，拼命加载中...");
    var APP_PATH = document.getElementById("APP_PATH").value;
    var userid = document.getElementById("session_userid").value;
    var fid = getQueryString("fid");

    var loading =
        '<div class="text-center">' +
            '<br><br><br><br><br><br><br><br><br><br>' +
            '<img src="'+APP_PATH+'/static/img/loading.gif" alt="加载中...">' +
        '</div>';
    // 背景颜色设置为透明
    $("#content_left").css("background-color","transparent");
    // 显示加载loading
    $("#content_loading").html(loading);

    $.ajax({
        url: "articleController/getArticleFid/"+fid ,
        type: "post",
        dataType: "json",
        success: function (data) {
            // 隐藏加载loading
            $("#content_loading").hide();
            // 恢复背景颜色为白色
            $("#content_left").css("background-color","#ffffff");
            // 恢复右边板块的显示
            $("#content_right").show();

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
            //关注/修改按钮
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
            //登录收藏
            var collect_userid_null = "";
            //点赞按钮
            var form_enjoy = "";
            //登录点赞
            var enjoy_userid_null = "";
            //评论框
            var comment_box = "";
            // 评论展示
            var comment_traversals = "";


            bname = '<a href="#" onclick=getBid("' + article["bid"] + '") >' + article["bname"] + '</a>';
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
                            '<form id="form_attentionDel_' + article["fid"] + '" method="post">' +
                            '<input type="hidden" name="gid" value=' + attention["gid"] + '>' +
                            '<div class="attention_content">' +
                            '<a href="javascript:void(0)">' +
                            '<button type="button" onclick="attentionDel(' + article["fid"] + "," + article["userid"] + "," + userid + ')" class="btn button2">取消关注</button>' +
                            '<button type="button" onclick="attentionDel(' + article["fid"] + "," + article["userid"] + "," + userid + ')" class="btn">已关注</button>' +
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
                        '<form id="form_attentionAdd_' + article["fid"] + '" method="post">' +
                        '<input type="hidden" name="userid" value="' + userid + '">' +
                        '<input type="hidden" name="beuserid" value="' + article["userid"] + '">' +
                        '<button type="button" onclick="attentionAdd(' + article["fid"] + "," + article["userid"] + "," + userid + ')" class="btn btn-info btn-sm">' +
                        '<samp class="glyphicon glyphicon-plus"></samp> 关注她' +
                        '</button>' +
                        '</form>';
                }
            } else if(userid != "" && article["userid"] == userid) {    // 用户登录且该帖子是登录用户的，则显示修改按钮
                form_attention =
                    '<form id="form_articleUpdate_'+article["fid"]+'">' +
                    '   <input type="hidden" name="fid" value="'+article["fid"]+'">' +
                    '   <button type="button" class="btn btn-info btn-sm" onclick="skipUpdateArticle('+article["fid"]+')">修改文章</button>' +
                    '</form>';
            }

            listArticle_titles = article["titles"];

            listArticle_fcontent = article["fcontent"];

            //帖子配图
            if (article["photo"] != "photo") {
                var img_video;
                if (article["photo"].endsWith(".mp4") || article["photo"].endsWith(".avi")) {
                    img_video = '<video class="img_content" controls="controls" src=' + APP_PATH + '/static/upload/article/' + article["photo"] + '></video>';
                } else {
                    img_video = '<img class="img_content" controls="controls" src=' + APP_PATH + '/static/upload/article/' + article["photo"] + '>';
                }
                listArticle_photo = img_video;
            }

            //评论数
            listArticle_sum = article["sum"] + " 条评论";

            // 用户登录后才显示心形收藏 && 如果不是登录用户本人所发帖子，则显示心形收藏
            if (userid != "" && article["userid"] != userid) {
                // 每一次遍历帖子时初始化collect_record为“false”
                var collect_record = false;
                // 遍历收藏表信息
                var collects = data["collect"];
                for (var j = 0; j < collects.length; j++) {
                    var collect = collects[j];
                    // 判断该帖子是否被收藏，如果是，则将“true”保存到"collect_record"中
                    if (collect["userid"] == userid && collect["fid"] == article["fid"]) {
                        form_collect =
                            '<form id="form_collectDel_' + article["fid"] + '" method="post">' +
                            '<input type="hidden" name="sid" value="' + collect["sid"] + '">' +
                            '<button type="button" style="border: none;background-color: #ffffff;" onclick="collectDel(' + article["fid"] + "," + userid + ')">' +
                            '<samp title="取消收藏" class="glyphicon glyphicon-heart collect_end"></samp>' +
                            '</button>' +
                            '</form>';
                        // 当该用户被收藏时，给attention_record赋值“true”
                        collect_record = true;
                    }
                }
                // 判断collect_record中是否有“false”，有表示该帖子还没有被收藏
                if (collect_record == false) {
                    form_collect =
                        '<form id="form_collectAdd_' + article["fid"] + '" method="post">' +
                        '<input type="hidden" name="userid" value="' + userid + '">' +
                        '<input type="hidden" name="fid" value="' + article["fid"] + '">' +
                        '<button type="button" style="border: none;background-color: #ffffff;" onclick="collectAdd(' + article["fid"] + "," + userid + ')">' +
                        '<samp title="收藏该帖子" class="glyphicon glyphicon-heart collect_start"></samp>' +
                        '</button>' +
                        '</form>';
                }
            }
            // 用户未登录才显示文字收藏 && 如果不是登录用户本人所发帖子，则显示文字收藏
            if (userid == "" && article["userid"] != userid) {
                collect_userid_null = "登录收藏";
            }

            // 用户登录后才显示手形点赞 && 如果不是登录用户本人所发帖子，则显示心形点赞
            if (userid != "" && article["userid"] != userid) {
                // 每一次遍历帖子时初始化enjoy_record为“false”
                var enjoy_record = false;
                // 遍历点赞表信息
                var enjoys = data["enjoy"];
                for (var j = 0; j < enjoys.length; j++) {
                    var enjoy = enjoys[j];
                    // 判断该帖子是否被点赞，如果是，则将“true”保存到"enjoy_record"中
                    if (enjoy["userid"] == userid && enjoy["fid"] == article["fid"]) {
                        form_enjoy =
                            '<form id="form_enjoyDel_' + article["fid"] + '" method="post">' +
                            '<input type="hidden" name="eid" value="' + enjoy["eid"] + '">' +
                            '<button type="button" style="border: none;background-color: #ffffff;" onclick="enjoyDel(' + article["fid"] + "," + userid + ')">' +
                            '<samp title="取消点赞" class="glyphicon glyphicon-thumbs-up enjoy_end"></samp>' +
                            '</button>' +
                            '</form>';
                        // 当该用户被点赞时，给attention_record赋值“true”
                        enjoy_record = true;
                    }
                }
                // 判断enjoy_record中是否有“false”，有表示该帖子还没有被点赞
                if (enjoy_record == false) {
                    form_enjoy =
                        '<form id="form_enjoyAdd_' + article["fid"] + '" method="post">' +
                        '<input type="hidden" name="userid" value="' + userid + '">' +
                        '<input type="hidden" name="fid" value="' + article["fid"] + '">' +
                        '<button type="button" style="border: none;background-color: #ffffff;" onclick="enjoyAdd(' + article["fid"] + "," + userid + ')">' +
                        '<samp title="点赞该帖子" class="glyphicon glyphicon-thumbs-up enjoy_start"></samp>' +
                        '</button>' +
                        '</form>';
                }
            }
            // 用户未登录才显示文字点赞 && 如果不是登录用户本人所发帖子，则显示文字点赞
            if (userid == "" && article["userid"] != userid) {
                enjoy_userid_null = "登录点赞";
            }

            // 用户登录后才显示评论框
            if (userid != "") {
                // 评论框
                comment_box =
                    '<form id="form_commentAdd_' + article["fid"] + '">' +
                    '   <div class="col-xs-10 col-md-11">' +
                    '       <input type="hidden" name="userid" value="' + userid + '">' +
                    '       <input type="hidden" name="fid" value="' + article["fid"] + '">' +
                    '       <input type="text" class="form-control" id="pcontent_' + article["fid"] + '" name="pcontent" placeholder="写下你的评论..." required>' +
                    '   </div>' +
                    '   <div class="col-xs-2 col-md-1">' +
                    '       <button type="button" class="btn btn-primary" style="position: relative; left: -25px;" onclick="commentAdd(' + article["fid"] + ')">评论</button>' +
                    '   </div>' +
                    '</form>';
            }

            var listComment_Fid = "listComment_" + article["fid"];
            var comments = data[listComment_Fid];
            for (var j = 0; j < comments.length; j++) {
                var comment = comments[j];
                var comment_del = "";
                // 如果该评论者是本用户时可以修改自己的评论，否则不能
                if (comment["userid"] == userid){
                    comment_del =
                        '<form>' +
                        '   <button type="button" class="btn btn-danger btn-sm" onclick="p_del('+article["fid"]+","+comment["pid"]+')">删除</button>' +
                        '</form>';
                }

                comment_traversals = comment_traversals +
                    '<hr style="position: relative; margin-top: 5px;">' +
                    '<div class="row">' +
                    '   <div class="col-md-9 col-xs-7">' +
                    '       <a class="a_p" href=' + APP_PATH + '/userController/getOthers?userid=' + comment["userid"] + '>' +
                    '           <!-- 评论者姓名 -->' +
                    '           <b>' + comment["name"] + '</b>' +
                    '       </a>' +
                    '   </div>' +
                    '   <div class="col-md-3 col-xs-5">' +
                    '       <!-- 时间 -->' +
                    '       <small>' + comment["time"] + '</small>' +
                    '   </div>' +
                    '</div>' +
                    '<div class="row">' +
                    '   <div class="col-md-10 col-xs-12">' +
                    '       <!-- 评论内容 -->' +
                    '       <p>' + comment["pcontent"] + '</p>' +
                    '   </div>' +
                    '   <div class="col-md-2 col-xs-2 col-xs-offset-9">' +
                    '       <!-- 如果该评论者是本用户时可以修改自己的评论，否则不能 -->' +
                    '       <div id="comment_del">'+comment_del+'</div>' +
                    '   </div>' +
                    '</div>';
            }

            var share_title = article["titles"];
            var share_url = window.location.href;
            var share_pics = "";
            if (article["photo"] == "photo" || article["photo"] == ""){ //没有配图
                share_pics = window.location.protocol+'//'+window.location.host+APP_PATH+'/static/img/beijing.jpg';
            } else {
                share_pics = window.location.protocol+'//'+window.location.host+APP_PATH+'/static/upload/article/'+article["photo"];
            }
            articles_all = articles_all +
                '<div class="row show_article">' +
                    '<div class="col-md-12 show_article_go">' +
                        '<div class="row">' +
                            '<div class="col-xs-7 col-md-9" style="position: relative; padding-top: 10px;">' +
                                '<small>热门内容，来自：<small id="listArticle_bname">' + bname + '</small></small>' +
                            '</div>' +
                            '<div class="col-xs-5 col-md-3" style="position: relative; padding-top: 10px;">' +
                                '<!-- 时间 -->' +
                                '<small id="listArticle_time">' + time + '</small>' +
                            '</div>' +
                        '</div>' +
                        '' +
                        '<div class="row">' +
                            '<!-- 头像 -->' +
                            '<div class="col-xs-2 col-md-1" id="listArticle_userphoto">' + userphoto + '</div>' +
                            '<!-- 发帖人名字 -->' +
                            '<div class="col-xs-6 col-md-8" id="listArticle_username">' + username + '</div>' +
                            '<div class="col-xs-4 col-md-3">' +
                                '<!-- 关注按钮 -->' +
                                '<div id="form_attention' + article["fid"] + '">' + form_attention + '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="row">' +
                        '   <div class="col-md-12">' +
                        '       <h4>' +
                        '           <!-- 标题 -->' +
                        '           <b id="myself_article_titles">'+listArticle_titles+'</b>' +
                        '       </h4>' +
                        '   </div>' +
                        '   <!-- 帖子配图 -->' +
                        '   <div class="col-md-12" id="listArticle_photo">' + listArticle_photo + '</div>' +
                        '   <div class="col-md-12">' +
                        '       <div id="artice-doc-content">' +
                        '           <!-- 帖子内容 -->' +
                        '           <textarea style="display:none;">'+listArticle_fcontent+'</textarea>' +
                        '       </div>' +
                        '   </div>' +
                        '</div>' +
                        '<br>' +
                        '<div class="row" style="position: relative;top: -10px;">' +
                            '<div class="col-xs-12 col-md-7">' +
                                '<div class="col-xs-3 col-md-3">' +
                                    '<!-- 评论数 -->' +
                                    '<small id="listArticle_sum' + article["fid"] + '">' + listArticle_sum + '</small>' +
                                '</div>' +
                                '<div class="col-xs-3 col-md-3">' +
                                    '<!-- 收藏按钮 -->' +
                                    '<div id="form_collect' + article["fid"] + '">' + form_collect + '</div>' +
                                    '<small id="collect_userid_null">' + collect_userid_null + '</small>' +
                                '</div>' +
                                '<div class="col-xs-3 col-md-3">' +
                                    '<!-- 点赞按钮 -->' +
                                    '<div id="form_enjoy' + article["fid"] + '">' + form_enjoy + '</div>' +
                                    '<small id="enjoy_userid_null">' + enjoy_userid_null + '</small>' +
                                '</div>' +
                                '<div class="col-xs-3 col-md-3">' +
                                '   <!-- 分享 -->' +
                                '   <div id="share" title="分享到QQ好友">' +
                                '       <img src="'+APP_PATH+'/static/img/share/QQ.png" style="cursor:pointer;" ' +
                                '           onclick="shareToQQ(\''+share_title+'\',\''+share_url+'\',\''+share_pics+'\')">' +
                                '   </div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<!--评论框-->' +
                        '<div class="row" style="position: relative; margin-top: 10px;">' +
                        '   <div class="col-xs-12 col-md-12" id="comment_box">' + comment_box + '</div>' +
                        '</div>' +
                        '<div class="row" style="position: relative; margin-top: -10px;">' +
                        '   <!--评论展示-->' +
                        '   <div class="col-md-12" id="comment_traversals' + article["fid"] + '">' + comment_traversals + '</div>' +
                        '</div>' +
                        '<br>' +
                        '<div class="row">' +
                        '   <div class="col-md-12" style="position: relative; background-color: #f6f6f6; height: 10px;">' +
                        '</div>';

            $("#articles_all").html(articles_all);

            /*把MD语法文档，转换为HTML语法 - js*/
            var testEditor;
            $(function () {
                testEditor = editormd.markdownToHTML("artice-doc-content", {//注意：这里是上面DIV的id
                    htmlDecode: "style,script,iframe",
                    emoji: true,
                    taskList: true,
                    tex: true, // 默认不解析
                    flowChart: true, // 默认不解析
                    sequenceDiagram: true, // 默认不解析
                    codeFold: true,
                });
            });

            //此处进行循环展示-板块
            var plates_all = "";
            var num = 0; //计数
            var plates = data["plate"];
            for (var i = 0; i < plates.length; i++) {
                var plate = plates[i];
                num++;
                var br = "";
                <!-- 每循环3次就加一些跳行符 -->
                if (num % 3 == 0) {
                    br = "<br><br><br><br>";
                }
                plates_all = plates_all +
                    '<div class="col-xs-4 col-md-4 text-center">' +
                        '<a href="#" onclick=getBid("' + plate["bid"] + '") >' +
                            '<img class="img_right_logo_bankuai" src="' + APP_PATH + '/static/img/houtai.png">' +
                            '<p>' + plate["bname"] + '</p>' +
                        '</a>' +
                    '</div>' + br;
                $("#plates_all").html(plates_all);
            }


            //此处进行循环展示-热门帖子
            var hotArticle_all = "";
            var hotArticles = data["listHotArticle"];
            for (var i = 0; i < hotArticles.length; i++) {
                var hotArticle = hotArticles[i];

                hotArticle_all = hotArticle_all +
                    '<div class="row">' +
                    '   <div class="col-md-12">' +
                    '       <a href="#" onclick="skipArticle('+hotArticle["fid"]+')">' + hotArticle["titles"] + '</a>' +
                    '   </div>' +
                    '   <div class="col-md-12"><br></div>' +
                    '</div>';
            }
            $("#hotArticle_all").html(hotArticle_all);


            //统计访问信息-国家
            var visitCountrys = data["visitCountryCount"];
            var countrys = new Array();//地址
            var country_count = new Array()//个数
            for (var i = 0; i < visitCountrys.length; i++) {
                var visitCountry = visitCountrys[i];
                countrys.push(visitCountry["visitcountry"]);
                country_count.push({"value": visitCountry["count"], "name": visitCountry["visitcountry"]})
            }
            var myCharts1 = echarts.init(document.getElementById('visit_country'));
            option = {
                title: {
                    text: '按国家统计',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    x: 'center',
                    y: 'bottom',
                    data: countrys
                },
                calculable: true,
                series: [
                    {
                        name: '面积模式',
                        type: 'pie',
                        radius: [6, 75],
                        center: ['49%', 150],
                        roseType: 'area',
                        x: '50%',               // for funnel
                        max: 40,                // for funnel
                        sort: 'ascending',     // for funnel
                        data: country_count
                    }
                ]
            };
            myCharts1.setOption(option);

            //统计访问信息-中国省份
            var visitProvinces = data["visitProvinceCount"];
            var provinces = new Array();//地址
            var province_count = new Array()//个数
            for (var i = 0; i < visitProvinces.length; i++) {
                var visitProvince = visitProvinces[i];
                provinces.push(visitProvince["visitprovince"]);
                province_count.push({"value": visitProvince["count"], "name": visitProvince["visitprovince"]})
            }
            var myCharts2 = echarts.init(document.getElementById('visit_province'));
            option2 = {
                title: {
                    text: '按中国省份统计',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                calculable: true,
                series: [
                    {
                        name: '面积模式',
                        type: 'pie',
                        radius: '55%',
                        center: ['51%', '60%'],
                        data: province_count
                    }
                ]
            };
            myCharts2.setOption(option2);

        },
        error: function () {
            layer.msg("异常！", {icon: 5});
        }

    });
});

//根据参数名获取对应的url参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

/*跳转到帖子详情（新开一个tab）*/
function skipArticle(fid) {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var url = APP_PATH+'/article.jsp?fid=' + fid;
    window.open(url,"_blank");
}

/*跳转到修改帖子（新开一个tab）*/
function skipUpdateArticle(fid) {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var url = APP_PATH+'/update.jsp?fid=' + fid + "&source=contentArticle";
    window.location.href = url;
}

/*跳转到捐赠详细信息（新开一个tab）*/
function skipDonate() {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var url = APP_PATH+'/donate.jsp';
    window.open(url,"_blank");
}