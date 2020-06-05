/*文章审核*/
function articleCheck(fid, status) {
    var data = {
        "fid": fid,
        "status": status
    };
    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/article/updateArticleStatus",
        type: "put",
        dataType: "json",
        data: data,
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                /*--------------------- 审核状态 ---------------------*/
                var listArticle_status_id = "listArticle_status_" + fid;
                $("#listArticle_status").attr("id", listArticle_status_id);
                if (status == 0){     //待审核
                    $("#" + listArticle_status_id + " button").attr("class", "btn btn-warning btn-sm");
                    $("#" + listArticle_status_id + " button").html("等待审核");
                } else if (status == 1){   //审核通过
                    $("#" + listArticle_status_id + " button").attr("class", "btn btn-info btn-sm");
                    $("#" + listArticle_status_id + " button").html("审核通过");
                } else if (status == 2){   //审核未通过
                    $("#" + listArticle_status_id + " button").attr("class", "btn btn-danger btn-sm");
                    $("#" + listArticle_status_id + " button").html("审核拒绝");
                }
                /*--------------------- 操作 ---------------------*/
                // 通过
                var form_listArticle_pass_id = "form_listArticle_pass_" + fid;
                // 拒绝
                var form_listArticle_refuse_id = "form_listArticle_refuse_" + fid;
                if (status == 0){     //待审核
                    $("#form_listArticle_notlogin").hide();
                    $("#" + form_listArticle_pass_id).show();
                    $("#" + form_listArticle_refuse_id).show();
                } else if (status == 1){   //审核通过
                    $("#form_listArticle_notlogin").hide();
                    $("#" + form_listArticle_pass_id).hide();
                    $("#" + form_listArticle_refuse_id).show();
                } else if (status == 2){   //审核未通过
                    $("#form_listArticle_notlogin").hide();
                    $("#" + form_listArticle_pass_id).show();
                    $("#" + form_listArticle_refuse_id).hide();
                }

                layer.msg(msg);
            } else if (code == 500) {
                layer.msg(msg,{icon: 5});
            }
        },
        error : function() {
            layer.msg("出错！",{icon: 5});
        }
    });
}

/*分页操作*/
function articlePage(pageStart) {
    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/article/getArticleManagement?pageStart="+pageStart,
        type: "get",
        dataType: "json",
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                /*########################################### 文章管理 ############################################################*/
                $("#listArticle_all").html(getArticleList(data.data));
                //文章总数
                $("#article_total").html('（' + data.data.total + '篇）');
                /*----------------------------------------- 分页（用户管理） ----------------------------------------*/
                getPaging(data.data, "article");
                /*########################################### 文章管理-end ############################################################*/
            } else if (code == 500) {
                layer.msg(msg,{icon: 5});
            }
        },
        error : function() {
            layer.msg("出错！",{icon: 5});
        }
    });
}

/*跳转到文章详情（新开一个tab）*/
function skipArticle(fid) {
    var url = APP_PATH + '/article.jsp?fid=' + fid;
    window.open(url,"_blank");
}