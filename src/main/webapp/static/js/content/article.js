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
                        var count_Article = articles.length;                                    //动态数
                        $("#count_Article").html(count_Article);

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
                                        'style="position: relative; width: 100%; height: 100%;border-radius: 3px;"></video>';
                                }else {     //图片
                                    img_video = '<img src="'+ APP_PATH +'/static/upload/article/'+article["photo"]+'"' +
                                        'style="position: relative; width: 100%; height: 100%;border-radius: 3px;">';
                                }
                                myself_article_photo = img_video;
                            }

                            /*修改*/
                            myself_article_update =
                                '<form id="form_articleUpdate_'+article["fid"]+'">' +
                                '<input type="hidden" name="fid" value="'+article["fid"]+'">' +
                                '<input type="hidden" name="bname" value="'+article["bname"]+'">' +
                                '<button type="button" class="btn btn-info btn-sm" onclick="skipUpdateArticle('+article["fid"]+')">修改</button>' +
                                '</form>';

                            /*删除*/
                            myself_article_del =
                                '<form>' +
                                '<button type="button" class="btn btn-danger btn-sm" onclick="f_del('+article["fid"]+')">删除</button>' +
                                '</form>';

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
                                '<!-- 配图 -->' +
                                '<div onclick="skipArticle('+article["fid"]+')" class="col-xs-12 col-md-3" id="myself_article_photo" style="cursor:pointer;">'+myself_article_photo+'</div>' +
                                '<div class="col-xs-12 col-md-9">' +
                                '   <div onclick="skipArticle('+article["fid"]+')" style="overflow: hidden;white-space: nowrap;text-overflow:ellipsis;color: #000000;">' +
                                '       <!-- 标题 -->' +
                                '       <b id="myself_article_titles" style="cursor:pointer; font-size:18px;">'+myself_article_titles+'</b>' +
                                '   </div>' +
                                '   <div onclick="skipArticle('+article["fid"]+')" id="myself_article_content" style="cursor:pointer;overflow: hidden;text-overflow:ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;">' +
                                '       <span style="word-break: break-word;line-height: 1.6;">'+myself_article_fcontent+'</span>' +
                                '   </div>' +
                                '</div>' +
                                '<div class="col-xs-7 col-md-10"></div>' +
                                '<!-- 修改 -->' +
                                '<div class="col-xs-2 col-md-1" id="myself_article_update">'+myself_article_update+'</div>' +
                                '<!-- 删除 -->' +
                                '<div class="col-xs-2 col-md-1" id="myself_article_del">'+myself_article_del+'</div>' +
                                '</div>' +
                                '' +
                                '<!--评论-循环结束（动态）-->' +
                                '<hr style="height:1px;border:none;border-top:1px solid #bbbbbb;">';
                        }
                        $("#myself_article_all").html(myself_article_all);
                        /*########################################### 帖子循环-开始（动态）-end ############################################################*/
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