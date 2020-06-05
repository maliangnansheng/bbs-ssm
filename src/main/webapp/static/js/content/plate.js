//查询属于该板块下的所有文章
function getBid(bid, bname) {
    <!-- 文章展示-详情-除去 -->
    $(".articleDetails").remove();
    var loading =
        '<div class="text-center">' +
            '<br><br><br><br><br><br><br><br><br><br>' +
            '<img src="'+APP_PATH+'/static/img/loading.gif" alt="加载中...">' +
        '</div>';
    // 背景颜色设置为透明
    $("#content_left").css("background-color","transparent");
    // 显示加载loading
    $("#articles_all").html(loading);
    // 隐藏“加载更多”
    $("#appendMore").hide();

    $.ajax({
        //几个参数需要注意一下
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/article/getArticleBid/" + bid ,
        type: "get",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        success: function (data) {
            // 恢复背景颜色为白色
            $("#content_left").css("background-color","#ffffff");
            var articles_all = "";
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                data = data.data;
                var articles = data.listArticle;

                layer.tips('【' + bname + '】下共 ' + data.plateArticleCount + ' 条文章', '#articles_all',{
                    tips: [1, '#37afff'] //还可配置颜色
                });

                if (articles.length == 0){  //该板块下没有文章
                    articles_all =
                        '<br>' +
                        '<div class="text-center">' +
                        '   <img alt="该板块下无文章" src="'+APP_PATH+'/static/img/article.png">' +
                        '   <p style="color: #999999">该板块下还没有人发布过文章...</p>' +
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
                    $("#appendMore").attr("onClick", "appendMore('" + pageStart + "','" + bid + "')");
                } else {
                    $("#appendMore").hide();
                }
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
 * 板块展示
 * @param plates
 */
function getPlate(plates) {
    // 此处进行循环展示-板块
    var plates_all = "";
    var num = 0; //计数
    for (var i = 0; i < plates.length; i++) {
        var plate = plates[i];
        num++;
        $("#plates_all_a").attr("onclick", "getBid('" + plate.bid + "','" + plate.bname + "')");
        $("#plates_all_bname").html(plate.bname);
        <!-- 每循环3次就加一些跳行符 -->
        if (num % 3 == 0) {
            // $("#plates_all_hide").append("<br><br><br><br>");
        }

        plates_all = plates_all + $("#plates_all_hide").html();
    }
    $("#plates_all").html(plates_all);
}