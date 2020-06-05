//文章-删除（个人主页）
function articleDel(fid) {
    $.ajax({
        //几个参数需要注意一下
        type: "delete",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/article/deleteArticle/"+fid ,
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                layer.msg(msg);
                // 隐藏删除的文章
                $(".myself_article_num_" + fid).hide();
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
 * 热门文章展示
 * @param hotArticles
 */
function getHotArticle(hotArticles) {
    // 此处进行循环展示-热门文章
    var hotArticle_all = "";
    for (var i = 0; i < hotArticles.length; i++) {
        var hotArticle = hotArticles[i];
        $("#hotArticle_all_a").attr("onclick", "skipArticle('" + hotArticle.fid + "')");
        $("#hotArticle_all_a").html(hotArticle.titles);

        hotArticle_all = hotArticle_all + $("#hotArticle_all_hide").html();
    }
    $("#hotArticle_all").html(hotArticle_all);
}