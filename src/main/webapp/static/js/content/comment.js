//评论-新增
function commentAdd(fid, fuserid) { // fuserid:该文章对应的用户（博主）
    var data = {
        "fid": fid,
        "userid": userid,
        "pcontent": $("#pcontent").val()
    };

    $.ajax({
        //几个参数需要注意一下
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/comment/setComment" ,
        data: data,
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                //获取最新评论信息
                $.ajax({
                    type: "get",//方法类型
                    dataType: "json",//预期服务器返回的数据类型
                    url: APP_PATH + "/api/rest/nanshengbbs/v3.0/comment/getCommentFid/" + fid ,
                    success: function (data) {
                        var comment_all = "";
                        // 清空评论展示-实际数据
                        $("#comment_all").html("");
                        // 状态码
                        var code = data.code;
                        // 提示信息
                        var msg = data.msg;
                        if (code == 200) {
                            var comments = data.data.listComment;
                            // 最新评论展示
                            getComment(comments, fuserid);
                            $("#pcontent").val("");  //清空评论框
                        } else if (code == 500) {
                            layer.msg(msg,{icon: 5});
                        }
                    },
                    error : function() {
                        layer.msg("出错！",{icon: 5});
                    }
                });
                layer.msg(msg);
            } else if (code == 404) {
                layer.tips(msg, '#pcontent', {
                    tips: [1, '#ff6620'] //还可配置颜色
                });
            } else if (code == 500) {
                layer.msg(msg,{icon: 5});
            }
        },
        error : function() {
            layer.msg("出错！",{icon: 5});
        }
    });
}

//评论-删除
function commentDel(pid) {
    $.ajax({
        //几个参数需要注意一下
        type: "delete",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/comment/deleteComment/" + pid ,
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                // 隐藏被删除的评论
                $(".comment_" + pid).hide();
                layer.msg(msg);
            } else if (code == 500) {
                layer.msg(msg,{icon: 7});
            }
        },
        error : function() {
            layer.msg("出错！",{icon: 5});
        }
    });
}

/**
 * 评论展示
 * @param comments
 * @param fuserid 该文章的创建者
 */
function getComment(comments, fuserid) {
    var comment_all = "";
    for (var j = 0; j < comments.length; j++) {
        var comment = comments[j];
        // 评论id
        var pid = comment.pid;

        $(".comment_pid").attr("class", "comment_" + pid);

        // 评论者头像信息
        $("#comment_photo_a").attr("href", "javascript:void(0)");
        $("#comment_photo_a").attr("onclick", 'getOther("' + comment.userid + '")');
        if (comment.userPhoto != null) {
            $("#comment_photo_img").attr("src", comment.userPhoto);
        } else {
            // 恢复原状
            $("#comment_photo_img").attr("src", APP_PATH + '/static/img/head.png');
        }

        // 如果该评论是本用户的时可以删除所有评论，否则不能
        if (fuserid == userid) {
            $("#form_comment_del").show();
            $("#form_commentDel_btn").attr("onclick", "p_del('" + pid + "')");
        } else {
            // 如果该评论者是本用户时可以删除自己的评论，否则不能
            if (comment.userid == userid){
                $("#form_comment_del").show();
                $("#form_commentDel_btn").attr("onclick", "p_del('" + pid + "')");
            } else {
                // 恢复原始状态
                $("#form_comment_del").hide();
            }
        }

        $("#comment_a").attr("href", "javascript:void(0)");
        $("#comment_a").attr("onclick", 'getOther("' + comment.userid + '")');
        // 评论者名称
        $("#comment_name").html(comment.name);
        // 评论创建时间
        $("#comment_time").html(dateTimeFormat(comment.createTime));
        // 评论内容
        $("#comment_pcontent").html(comment.pcontent);

        $(".comment_" + pid).show();
        comment_all = comment_all + $("#comment_all_hide").html();

        $(".comment_" + pid).attr("class", "comment_pid");
        $("comment_pid").hide();
    }
    $("#comment_all").html(comment_all);
}

/**
 * 最新评论展示
 * @param hotArticles
 */
function getNewComment(newComments) {
    // 此处进行循环展示-热门文章
    var newComment_all = "";
    for (var i = 0; i < newComments.length; i++) {
        var newComment = newComments[i];
        $("#newComment_all_a").attr("onclick", "skipArticle('" + newComment.fid + "')");
        $("#newComment_all_a").html(newComment.name + '：' + newComment.pcontent);

        newComment_all = newComment_all + $("#newComment_all_hide").html();
    }
    $("#newComment_all").html(newComment_all);
}