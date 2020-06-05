/*########################################### 仪表盘 ############################################################*/
//首页展示
$(function () {
    // 默认选中仪表盘
    $(".cut-ybp").attr("style", "color: #36e2ff !important; background-color: #1d262a; border-left: 3px solid #3c8dbc;");
    // 仪表盘
    dashboard();
});

$(".cut-ybp").click(function() {
    // 仪表盘
    dashboard();
});
/*########################################### 仪表盘-end ############################################################*/

/*########################################### 用户管理 ############################################################*/
$(".cut-yhgl").click(function() {
    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/user/getUser",
        type: "get",
        dataType: "json",
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                /*----------------------------------------- 用户列表（用户管理） ----------------------------------------*/
                $("#listUser_all").html(getUserList(data.data));
                // 用户总数
                $("#user_total").html('（' + data.data.total + '人）');
                /*----------------------------------------- 分页（用户管理） ----------------------------------------*/
                getPaging(data.data, "user");
            } else if (code == 500) {
                layer.msg(msg,{icon: 5});
            }
        },
        error : function() {
            layer.msg("出错！",{icon: 5});
        }
    });
});
/*########################################### 用户管理-end ############################################################*/

/*########################################### 文章管理 ############################################################*/
$(".cut-tzgl").click(function() {
    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/article/getArticleManagement",
        type: "get",
        dataType: "json",
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                $("#listArticle_all").html(getArticleList(data.data));
                //文章总数
                $("#article_total").html('（' + data.data.total + '篇）');
                /*----------------------------------------- 分页（用户管理） ----------------------------------------*/
                getPaging(data.data, "article");
            } else if (code == 500) {
                layer.msg(msg,{icon: 5});
            }
        },
        error : function() {
            layer.msg("出错！",{icon: 5});
        }
    });
});
/*########################################### 文章管理-end ############################################################*/

/*########################################### 板块管理 ############################################################*/
$(".cut-bkgl").click(function() {
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
                $("#plate_all").html(getPlateList(data.data));
                //板块总数
                $("#plate_total").html('（' + data.data.total + '类）');
            } else if (code == 500) {
                layer.msg(msg,{icon: 5});
            }
        },
        error : function() {
            layer.msg("出错！",{icon: 5});
        }
    });
});
/*########################################### 板块管理-end ############################################################*/

/*########################################### 访问管理 ############################################################*/
$(".cut-fwjl").click(function() {
    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/visit/getVisit",
        type: "get",
        dataType: "json",
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                $("#listVisit_all").html(getVisitList(data.data));
                //访问总数
                $("#visit_total").html(data.data.total + '条');
                //月访问量
                $("#visit_month").html(data.data.month + '条');
                //周访问量
                $("#visit_week").html(data.data.week + '条');
                //日访问量
                $("#visit_day").html(data.data.day + '条');

                /*----------------------------------------- 分页（用户管理） ----------------------------------------*/
                getPaging(data.data, "visit");
            } else if (code == 500) {
                layer.msg(msg,{icon: 5});
            }
        },
        error : function() {
            layer.msg("出错！",{icon: 5});
        }
    });
});
/*########################################### 访问管理-end ############################################################*/

// 仪表盘
function dashboard() {
    // 用户、文章、板块、访问总数
    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/admin/getUserArticlePlateVisitSum",
        type: "get",
        dataType: "json",
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            data = data.data;
            if (code == 200) {
                $("#h3-user").html(data.userSum);
                $("#h3-article").html(data.articleSum);
                $("#h3-plate").html(data.plateSum);
                $("#h3-visit").html(data.visitSum);
            } else if (code == 500) {
                layer.msg(msg,{icon: 5});
            }
        },
        error : function() {
            layer.msg("出错！",{icon: 5});
        }
    });
    // 排行版
    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/user/getUserRankByArticleSum",
        type: "get",
        dataType: "json",
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                $("#rank_listUser_all").html(getUserRankList(data.data));
            } else if (code == 500) {
                layer.msg(msg,{icon: 5});
            }
        },
        error : function() {
            layer.msg("出错！",{icon: 5});
        }
    });
    // 新注册用户
    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/user/getNewUser",
        type: "get",
        dataType: "json",
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                $("#new_listUser_all").html(getNewUserList(data.data));
            } else if (code == 500) {
                layer.msg(msg,{icon: 5});
            }
        },
        error : function() {
            layer.msg("出错！",{icon: 5});
        }
    });
    // 访问统计
    visitDay();
}

/*跳转到文章详情（新开一个tab）*/
function skipArticle(fid) {
    var url = APP_PATH + '/article.jsp?fid=' + fid;
    window.open(url,"_blank");
}