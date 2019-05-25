//首页展示
$(function () {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var userid = document.getElementById("session_userid").value;
    $.ajax({
        url: "common/getAll",
        type: "post",
        dataType: "json",
        success: function (data) {
            var articles_all = "";
            var articles = data["listArticle"];
            //此处进行循环展示-帖子
            for (var i = 0; i < articles.length; i++) {
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


                var article = articles[i];
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
                            '<b id="listArticle_titles" onclick=getFid("'+article["fid"]+'")>'+listArticle_titles+'</b>' +
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
                        '<small id="listArticle_sum'+article["fid"]+'">'+listArticle_sum+'</small>' +
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
            }
            $("#articles_all").html(articles_all);

            /*加载更多*/
            var pageStart = data["pageStart"] + 1
            var appendMore =
                '<a class="text-info" href="javascript:void(0)" onClick="appendMore('+pageStart+')">点击--->加载更多</a>';
            $("#appendMore").html(appendMore);


            //此处进行循环展示-板块
            var plates_all = "";
            var num = 0; //计数
            var plates = data["plate"];
            for (var i = 0; i < plates.length; i++) {
                var plate = plates[i];
                num++;
                var br = "";
                <!-- 每循环3次就加一些跳行符 -->
                if (num%3 == 0){
                    br = "<br><br><br><br>";
                }
                plates_all = plates_all +
                    '<div class="col-xs-4 col-md-4">' +
                        '<a href="#" onclick=getBid("'+plate["bname"]+'") >' +
                            '<img class="img_right_logo_bankuai" src="' + APP_PATH + '/static/img/houtai.png">' +
                            '<p>'+plate["bname"]+'</p>' +
                        '</a>' +
                    '</div>' + br;
                $("#plates_all").html(plates_all);
            }


            //此处进行循环展示-热门帖子
            var hotArticle_all = "";
            var articles = data["listArticle"];
            for (var i = 0; i < articles.length; i++) {
                var article = articles[i];
                // 只显示通过审核的帖子且评论数大于1文章
                if (article["status"] == 1 && article["sum"]>1){
                    hotArticle_all = hotArticle_all +
                        '<div class="row">' +
                            '<div class="col-md-12">' +
                                '<a href="#" onclick=getFid("'+article["fid"]+'") >'+article["titles"]+'</a>' +
                            '</div>' +
                            '<div class="col-md-12"><br></div>' +
                        '</div>';
                }
            }
            $("#hotArticle_all").html(hotArticle_all);


            //统计访问信息-国家
            var visitCountrys = data["visitCountryCount"];
            var countrys = new Array();//地址
            var country_count = new Array()//个数
            for (var i=0;i<visitCountrys.length;i++){
                var visitCountry = visitCountrys[i];
                countrys.push(visitCountry["visitcountry"]);
                country_count.push({"value":visitCountry["count"], "name":visitCountry["visitcountry"]})
            }
            var myCharts1 = echarts.init(document.getElementById('visit_country'));
            option = {
                title : {
                    text: '按国家统计',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    x : 'center',
                    y : 'bottom',
                    data:countrys
                },
                calculable : true,
                series : [
                    {
                        name:'面积模式',
                        type:'pie',
                        radius : [6, 75],
                        center : ['49%', 150],
                        roseType : 'area',
                        x: '50%',               // for funnel
                        max: 40,                // for funnel
                        sort : 'ascending',     // for funnel
                        data:country_count
                    }
                ]
            };
            myCharts1.setOption(option);

            //统计访问信息-中国省份
            var visitProvinces = data["visitProvinceCount"];
            var provinces = new Array();//地址
            var province_count = new Array()//个数
            for (var i=0;i<visitProvinces.length;i++){
                var visitProvince = visitProvinces[i];
                provinces.push(visitProvince["visitprovince"]);
                province_count.push({"value":visitProvince["count"], "name":visitProvince["visitprovince"]})
            }
            var myCharts2 = echarts.init(document.getElementById('visit_province'));
            option2 = {
                title : {
                    text: '按中国省份统计',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                calculable : true,
                series : [
                    {
                        name:'面积模式',
                        type:'pie',
                        radius : '55%',
                        center: ['51%', '60%'],
                        data: province_count
                    }
                ]
            };
            myCharts2.setOption(option2);

        },
        error : function() {
            layer.msg("异常！",{icon: 5});
        }

    });
});