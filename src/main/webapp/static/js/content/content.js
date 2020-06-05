//首页展示
$(function () {
    // 背景颜色设置为透明
    $("#content_left").css("background-color","transparent");
    /*----------------------------------------- 获取文章信息 -----------------------------------------*/
    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/article/getArticle",
        type: "get",
        dataType: "json",
        success: function (data) {
            // 隐藏加载loading
            $("#content_loading").hide();
            // 恢复背景颜色为白色
            $("#content_left").css("background-color","#ffffff");
            // 恢复右边板块的显示
            $("#content_right").show();

            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            data = data.data;
            if (code == 200) {
                var articles_all = "";
                var articles = data.listArticle;
                if (articles.length == 0) {  //该板块下没有文章
                    articles_all =
                        '<br>' +
                        '<div class="text-center">' +
                        '   <img alt="无文章" src="'+APP_PATH+'/static/img/article.png">' +
                        '   <p style="color: #999999">还没有人发布过文章...</p>' +
                        '</div>' +
                        '<br><br>';
                } else {
                    // 构造首页文章信息
                    articles_all = getArticlesAll(data);
                }
                $("#articles_all").html(articles_all);

                // 加载更多
                if (appendMoreShow(articles.length)) {
                    $("#appendMore").show();
                    var pageStart = data.pageStart + 1;
                    $("#appendMore").attr("onClick", "appendMore('" + pageStart + "')");
                } else {
                    $("#appendMore").hide();
                }
            } else if (code == 500) {
                layer.msg(msg, {icon: 5});
            }
        },
        error: function () {
            layer.msg("出错！", {icon: 5});
        }
    });
    /*----------------------------------------- 获取文章信息-end -----------------------------------------*/

    /*----------------------------------------- 获取所有板块信息 -----------------------------------------*/
    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/plate/getPlate",
        type: "get",
        dataType: "json",
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                // 板块展示
                getPlate(data.data.plate);
            } else if (code == 500) {
                layer.msg(msg, {icon: 5});
            }
        },
        error: function () {
            layer.msg("出错！", {icon: 5});
        }
    });
    /*----------------------------------------- 获取所有板块信息-end -----------------------------------------*/

    /*----------------------------------------- 获取热门文章信息 -----------------------------------------*/
    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/article/getHotArticle",
        type: "get",
        dataType: "json",
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                // 热门文章
                getHotArticle(data.data.listHotArticle);
            } else if (code == 500) {
                layer.msg(msg, {icon: 5});
            }
        },
        error: function () {
            layer.msg("出错！", {icon: 5});
        }
    });
    /*----------------------------------------- 获取热门文章信息-end -----------------------------------------*/

    /*----------------------------------------- 获取最新评论信息 -----------------------------------------*/
    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/comment/getNewComment",
        type: "get",
        dataType: "json",
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                // 热门文章
                getNewComment(data.data.listNewComment);
            } else if (code == 500) {
                layer.msg(msg, {icon: 5});
            }
        },
        error: function () {
            layer.msg("出错！", {icon: 5});
        }
    });
    /*----------------------------------------- 获取最新评论信息-end -----------------------------------------*/

    /*----------------------------------------- 获取访问统计信息 -----------------------------------------*/
    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/visit/getStatVisit",
        type: "get",
        dataType: "json",
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                // 显示扇形图
                showCountrysProvinces(data.data);
            } else if (code == 500) {
                layer.msg(msg, {icon: 5});
            }
        },
        error: function () {
            layer.msg("出错！", {icon: 5});
        }
    });
    /*----------------------------------------- 获取访问统计信息-end -----------------------------------------*/

    /*----------------------------------------- 记录访问信息 -----------------------------------------*/
    // $.ajax({
    //     url: APP_PATH + "/api/rest/nanshengbbs/v3.0/visit/setVisit",
    //     type: "post",
    //     dataType: "json",
    //     success: function (data) {
    //         // 状态码
    //         var code = data.code;
    //         // 提示信息
    //         var msg = data.msg;
    //         if (code == 500) {
    //             layer.msg(msg, {icon: 5});
    //         }
    //     },
    //     error: function () {
    //         layer.msg("出错！", {icon: 5});
    //     }
    // });
    /*----------------------------------------- 记录访问信息-end -----------------------------------------*/
});

/*跳转到文章详情（新开一个tab）*/
function skipArticle(fid) {
    var url = APP_PATH + '/article.jsp?fid=' + fid;
    window.open(url,"_blank");
}

/*跳转到捐赠详细信息（新开一个tab）*/
function skipDonate() {
    var url = APP_PATH + '/donate.jsp';
    window.open(url,"_blank");
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