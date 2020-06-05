//个人主页展示
$(function () {
    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/user/getUserId/" + getAddressArgs("userid"),
        type: "get",
        dataType: "json",
        success: function (data) {
            // 隐藏加载loading
            $("#myHome_loading").hide();
            // 恢复上半部分的显示
            $("#myHome_top").show();
            // 恢复下半部分的显示
            $("#myHome_bottom").show();

            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                // 将用户头像显示到个人中心
                getMePicture(data.data);
                // 将用户信息显示到“个人中心”
                getAboutMe(data.data);
            } else if (code == 500) {
                layer.msg(msg,{icon: 5});
            }
        },
        error : function() {
            layer.msg("出错！",{icon: 5});
        }
    });
    // 动态、回答、关注、收藏总数
    daacCount();
    // 动态
    dynamic();
});

/**
 * 动态、回答、关注、收藏总数
 */
function daacCount() {
    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/user/getDynamicAnswerAttentionCollectSum/" + getAddressArgs("userid"),
        type: "get",
        dataType: "json",
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                $("#count_Article").html(data.data.dynamicCount);
                $("#count_Comment").html(data.data.answerCount);
                $("#count_Attention").html(data.data.attentionCount);
                $("#count_Collect").html(data.data.collectCount);
            } else if (code == 500) {
                layer.msg(msg,{icon: 5});
            }
        },
        error : function() {
            layer.msg("出错！",{icon: 5});
        }
    });
}

/**
 * 动态
 */
function dynamic() {
    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/article/getArticleUserid/" + getAddressArgs("userid"),
        type: "get",
        dataType: "json",
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                var myself_article_all ="";
                // 动态
                var articles = data.data.listArticle;
                var count_Article = articles.length;
                // $("#count_Article").html(count_Article);

                if (articles.length == 0) { // 无动态
                    $("#article_null").show();
                }
                for (var i=0; i < count_Article; i++){
                    var article = articles[i];

                    /* 审核状态 */
                    if (article.status == 0){ //待审核状态
                        $("#myself_article_status").attr("class", "btn-warning");
                        $("#myself_article_status").html("等待审核");
                    } else if (article.status == 1){ //审核通过状态
                        $("#myself_article_status").attr("class", "btn-success");
                        $("#myself_article_status").html("审核通过");
                    } else if (article.status == 2){ //审核未通过状态
                        $("#myself_article_status").attr("class", "btn-danger");
                        $("#myself_article_status").html("审核拒绝");
                    }

                    /* 文章发布时间 */
                    $("#myself_article_time").html(dateTimeFormat(article.createTime));
                    /* 文章标题 */
                    $("#myself_article_titles_div").attr("onclick", "skipArticle('" + article.fid + "')");
                    $("#myself_article_titles").html(article.titles);
                    /* 文章内容 */
                    $("#myself_article_content_div").attr("onclick", "skipArticle('" + article.fid + "')");
                    $("#myself_article_content").html(article.fcontent);
                    // 文章配图
                    if (article.photo != "") { // 有“配图”
                        $("#myself_article_photo").attr("onclick", "skipArticle('" + article.fid + "')");
                        if (article.photo.endsWith(".mp4") || article.photo.endsWith(".avi")) {
                            $("#listArticle_video").attr("src", article.photo);
                            // 显示“视频”
                            $("#listArticle_video").show();
                            // 隐藏“图片”
                            $("#listArticle_img").hide();
                        } else {
                            $("#listArticle_img").attr("src", article.photo);
                            // 显示“图片”
                            $("#listArticle_img").show();
                            // 隐藏“视频”
                            $("#listArticle_video").hide();
                        }
                    } else {
                        // 隐藏“图片”
                        $("#listArticle_img").hide();
                        // 隐藏“视频”
                        $("#listArticle_video").hide();
                    }

                    /* 修改 */
                    $(".form_articleUpdate").attr("class", "form_articleUpdate_" + article.fid);
                    $("#form_articleUpdate_button").attr("onclick", "skipUpdateArticle('" + article.fid + "')");
                    /* 删除 */
                    $("#myself_article_del").attr("onclick", "f_del('" + article.fid + "')");

                    /* 文章编号 */
                    $(".myself_article_num").attr("class", "myself_article_num_" + article.fid);

                    myself_article_all = myself_article_all + $("#myself_article_hide").html();

                    // 修改 - 复原
                    $(".form_articleUpdate_" + article.fid).attr("class", "form_articleUpdate");
                    // 文章编号- 复原
                    $(".myself_article_num_" + article.fid).attr("class", "myself_article_num");
                }
                $("#myself_article_all").html(myself_article_all);
            } else if (code == 500) {
                layer.msg(msg,{icon: 5});
            }
        },
        error : function() {
            layer.msg("出错！",{icon: 5});
        }
    });
}

/**
 * 回答
 */
function answer() {
    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/article/getAnswerArticleUserid/" + getAddressArgs("userid"),
        type: "get",
        dataType: "json",
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                var huifu_article_all = "";
                // 回复
                var huifus_comment = data.data.listArticle_answer;
                var count_Comment = huifus_comment.length;
                // $("#count_Comment").html(count_Comment);

                if (huifus_comment.length == 0) {     // 无回答
                    $("#huifu_article_null").show();
                }
                for (var i = 0 ; i < count_Comment; i++){
                    var huifu_article = huifus_comment[i];
                    // 只显示通过审核的文章
                    if (huifu_article.status == 1){
                        // 文章作者
                        $("#huifu_article_username").html("作者：" + huifu_article.name);
                        // 文章时间
                        $("#huifu_article_time").html(dateTimeFormat(huifu_article.createTime));

                        // 文章配图
                        if (huifu_article.photo != "") { // 有“配图”
                            $("#huifu_article_photo").attr("onclick", "skipArticle('" + huifu_article.fid + "')");
                            if (huifu_article.photo.endsWith(".mp4") || huifu_article.photo.endsWith(".avi")) {
                                $("#huifu_article_video").attr("src", huifu_article.photo);
                                // 显示“视频”
                                $("#huifu_article_video").show();
                                // 隐藏“图片”
                                $("#huifu_article_img").hide();
                            } else {
                                $("#huifu_article_img").attr("src", huifu_article.photo);
                                // 显示“图片”
                                $("#huifu_article_img").show();
                                // 隐藏“视频”
                                $("#huifu_article_video").hide();
                            }
                        } else {
                            // 隐藏“图片”
                            $("#huifu_article_img").hide();
                            // 隐藏“视频”
                            $("#huifu_article_video").hide();
                        }
                        /* 文章标题 */
                        $("#huifu_article_titles_div").attr("onclick", "skipArticle('" + huifu_article.fid + "')");
                        $("#huifu_article_titles").html(huifu_article.titles);
                        /* 文章内容 */
                        $("#huifu_article_content_div").attr("onclick", "skipArticle('" + huifu_article.fid + "')");
                        $("#huifu_article_content").html(huifu_article.fcontent);
                    }
                    huifu_article_all = huifu_article_all + $("#huifu_article_hide").html();
                }
                $("#huifu_article_all").html(huifu_article_all);
            } else if (code == 500) {
                layer.msg(msg,{icon: 5});
            }
        },
        error : function() {
            layer.msg("出错！",{icon: 5});
        }
    });
}

/**
 * 关注
 */
function attention() {
    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/user/getAttentionUserId/" + getAddressArgs("userid"),
        type: "get",
        dataType: "json",
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                // 我关注的
                var myAttentions = data.data.listUser;
                // 关注我的
                var myAttentions_be = data.data.listUser_be;
                var count_Attention = myAttentions.length + myAttentions_be.length;     //关注数
                // $("#count_Attention").html(count_Attention);

                //我关注的用户数
                var attention_count = myAttentions.length;
                //关注我的用户数
                var attention_count_be = myAttentions_be.length;

                $("#attention_count").html(attention_count);
                $("#attention_count_be").html(attention_count_be);

                /*我关注的*/
                var attention_all = "";
                if (attention_count == 0){    // 没有关注他人
                    $("#attention_null").show();
                }
                for (var i = 0 ; i < attention_count ; i++){
                    var myAttention = myAttentions[i];
                    // 头像
                    $("#myAttention_userphoto").attr("href", "javascript:void(0)");
                    $("#myAttention_userphoto").attr("onclick", 'getOther("' + myAttention.userid + '")');
                    if (myAttention.photo != null){  // 修过改头像
                        $("#myAttention_userphoto img").attr("src", myAttention.photo);
                    } else {    // 默认头像
                        $("#myAttention_userphoto img").attr("src", APP_PATH + "/static/img/head.png");
                    }
                    // 用户名
                    $("#myAttention_username").attr("href", "javascript:void(0)");
                    $("#myAttention_username").attr("onclick", 'getOther("' + myAttention.userid + '")');
                    $("#myAttention_username b").html(myAttention.name);
                    // 简介
                    $("#myAttention_intro").html(myAttention.intro);
                    // 粉丝数
                    $("#myAttention_fans").html(myAttention.fansCount);
                    // 关注时间
                    $("#attentionTime").html(dateTimeFormat(myAttention.attentionTime));

                    // 已经关注、取消关注
                    $(".form_attentionDel").attr("class", "form_attentionDel_" + myAttention.userid);
                    // "取消关注"
                    $("#form_attentionDel_btn").attr("onclick", "attentionDelMyself('" + myAttention.userid + "','" + myAttention.gid + "')");
                    // article.userid
                    $("#form_attentionDel_btn").attr("class", "btn btn-sm " + myAttention.userid);
                    // 鼠标移上去显示
                    $("#form_attentionDel_btn").attr("onmouseover", "onmouseoverAttentioned('" + myAttention.userid + "')");
                    // 鼠标移出显示
                    $("#form_attentionDel_btn").attr("onmouseout", "onmouseoutAttentioned('" + myAttention.userid + "')");

                    /* 我关注的编号 */
                    $(".attention_num").attr("class", "attention_num_" + myAttention.userid);

                    attention_all = attention_all + $("#attention_hide").html();

                    // 已经关注、取消关注 - 模板 - 复原
                    $(".form_attentionDel_" + myAttention.userid).attr("class", "form_attentionDel");
                    // 我关注的编号- 复原
                    $(".attention_num_" + myAttention.userid).attr("class", "attention_num");
                }
                $("#attention_all").html(attention_all);

                /*关注我的*/
                var attention_be_all = "";
                if (attention_count_be == 0){    //没有人关注我
                    $("#attention_be_null").show();
                }
                for (var i=0;i<attention_count_be;i++){
                    var myAttention_be = myAttentions_be[i];
                    // 头像
                    $("#myAttention_be_userphoto").attr("href", "javascript:void(0)");
                    $("#myAttention_be_userphoto").attr("onclick", 'getOther("' + myAttention_be.userid + '")');
                    if (myAttention_be.photo != null){  // 修过改头像
                        $("#myAttention_be_userphoto img").attr("src", myAttention_be.photo);
                    } else {    // 默认头像
                        $("#myAttention_be_userphoto img").attr("src", APP_PATH + "/static/img/head.png");
                    }
                    // 用户名
                    $("#myAttention_be_username").attr("href", "javascript:void(0)");
                    $("#myAttention_be_username").attr("onclick", 'getOther("' + myAttention_be.userid + '")');
                    $("#myAttention_be_username b").html(myAttention_be.name);
                    // 简介
                    $("#myAttention_be_intro").html(myAttention_be.intro);
                    // 粉丝数
                    $("#myAttention_be_fans").html(myAttention_be.fansCount);
                    // 被关注时间
                    $("#attention_be_time").html(dateTimeFormat(myAttention_be.attentionTime));

                    attention_be_all = attention_be_all + $("#attention_be_hide").html();
                }
                $("#attention_be_all").html(attention_be_all);
            } else if (code == 500) {
                layer.msg(msg,{icon: 5});
            }
        },
        error : function() {
            layer.msg("出错！",{icon: 5});
        }
    });
}

/**
 * 收藏
 */
function collect() {
    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/article/getCollectArticleUserid/" + getAddressArgs("userid"),
        type: "get",
        dataType: "json",
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                var collect_all = "";
                // 收藏
                var collects = data.data.listArticle_collect;
                var count_Collect = collects.length;
                // $("#count_Collect").html(count_Collect);

                if (count_Collect == 0){    // 没有收藏过文章
                    $("#collect_null").show();
                }
                for (var i=0; i<count_Collect; i++){
                    var article = collects[i];
                    // 文章id
                    var fid = article.fid;
                    // 已收藏、取消收藏
                    $(".form_collectDel").attr("class", "form_collectDel_" + fid);
                    // "取消收藏"
                    $("#form_collectDel_btn").attr("onclick", "collectDelMyself('" + fid + "')");

                    // 标题
                    $("#collect_article_titles").attr("onclick", "skipArticle('" + fid + "')");
                    $("#collect_article_titles").html(article.titles);
                    // 文章配图
                    if (article.photo != "") { // 有“配图”
                        $("#collect_article_photo").attr("onclick", "skipArticle('" + fid + "')");
                        if (article.photo.endsWith(".mp4") || article.photo.endsWith(".avi")) {
                            $("#collect_article_video").attr("src", article.photo);
                            // 显示“视频”
                            $("#collect_article_video").show();
                            // 隐藏“图片”
                            $("#collect_article_img").hide();
                        } else {
                            $("#collect_article_img").attr("src", article.photo);
                            // 显示“图片”
                            $("#collect_article_img").show();
                            // 隐藏“视频”
                            $("#collect_article_video").hide();
                        }
                    } else {
                        // 隐藏“图片”
                        $("#collect_article_img").hide();
                        // 隐藏“视频”
                        $("#collect_article_video").hide();
                    }
                    // 收藏时间
                    $("#collect_article_time").html(dateTimeFormat(article.collectTime));

                    /* 我收藏的编号 */
                    var collect_num = "collect_num_" + fid;
                    $(".collect_num").attr("class", collect_num);

                    collect_all = collect_all + $("#collect_hide").html();

                    // 我收藏的编号- 复原
                    $("." + collect_num).attr("class", "collect_num");
                }
                $("#collect_all").html(collect_all);
            } else if (code == 500) {
                layer.msg(msg,{icon: 5});
            }
        },
        error : function() {
            layer.msg("出错！",{icon: 5});
        }
    });
}

/*--------------------------------- tab点击事件 ---------------------------------*/
// 动态
$("#tab_dynamic").click(function () {
    dynamic();
});
// 回答
$("#tab_answer").click(function () {
    answer();
});
// 关注
$("#tab_attention").click(function () {
    attention();
});
// 收藏
$("#tab_collect").click(function () {
    collect();
});
/*--------------------------------- tab点击事件-end ---------------------------------*/

/*跳转到文章详情（新开一个tab）*/
function skipArticle(fid) {
    var url = APP_PATH + '/article.jsp?fid=' + fid;
    window.open(url,"_blank");
}

/*跳转到修改文章（不新开一个tab）*/
function skipUpdateArticle(fid) {
    var url = APP_PATH + '/update.jsp?fid=' + fid + "&source=myself";
    window.location.href = url;
}

/* 取消关注-鼠标移上去 */
function onmouseoverAttentioned(userid) {
    $("." + userid).css("background-color", "#d43f3a");
    $("." + userid).css("color", "#ffffff");
    $("." + userid).html('<samp class="glyphicon glyphicon-minus-sign"></samp> 取消关注');
}
/* 取消关注-鼠标移出 */
function onmouseoutAttentioned(userid) {
    $("." + userid).removeAttr("style");
    $("." + userid).html('<samp class="glyphicon glyphicon-ok-sign"></samp> 已经关注');
}