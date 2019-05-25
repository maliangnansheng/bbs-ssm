//评论-新增
function commentAdd(fid) {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var userid = document.getElementById("session_userid").value;
    $.ajax({
        //几个参数需要注意一下
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "commentController/setComment" ,//url
        data: $('#form_commentAdd_'+fid).serialize(),
        success: function (result) {
            if (result.resultCode == 200) {
                //获取最新评论信息
                $.ajax({
                    type: "post",//方法类型
                    dataType: "json",//预期服务器返回的数据类型
                    url: "commentController/getCommentFid/"+fid ,//url
                    success: function (data) {
                        var comment_traversals = "";
                        var comments = data["listComment"];
                        //最新评论数
                        var commentCount = comments.length;
                        $("#listArticle_sum"+fid).html(commentCount+ " 条评论");
                        for (var j = 0; j < commentCount; j++){
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
                        $("#pcontent_"+fid).val("");  //清空评论框
                        $("#comment_traversals"+fid).html(comment_traversals);
                    },
                    error : function() {
                        layer.msg("异常！",{icon: 5});
                    }
                });
                layer.msg("成功");
            }else if (result.resultCode == 201) {
                layer.tips('请输入评论内容!', '#pcontent_'+fid, {
                    tips: [1, '#ff6620'] //还可配置颜色
                });
            } else {
                layer.msg("失败",{icon: 7});
            }
        },
        error : function() {
            layer.msg("异常！",{icon: 5});
        }
    });
}

//评论-删除
function commentDel(fid,pid) {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var userid = document.getElementById("session_userid").value;
    $.ajax({
        //几个参数需要注意一下
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "commentController/deleteComment/"+pid ,//url
        success: function (result) {
            if (result.resultCode == 200) {
                //获取最新评论信息
                $.ajax({
                    type: "post",//方法类型
                    dataType: "json",//预期服务器返回的数据类型
                    url: "commentController/getCommentFid/"+fid ,//url
                    success: function (data) {
                        var myself_article_comment = "";
                        var comments = data["listComment"];
                        for (var j = 0; j < comments.length; j++){
                            var comment = comments[j];
                            myself_article_comment = myself_article_comment +
                                '<hr style="position: relative; margin-top: 2px;height:1px;border:none;border-top:1px dashed #dddddd;">' +
                                '<div class="row" style="position: relative; margin-top: -10px;">' +
                                    '<div class="col-xs-9 col-md-11">' +
                                        '<a href="'+ APP_PATH +'/userController/getOthers?userid='+comment["userid"]+'" class="a_p">' +
                                        '<!-- 评论者姓名 -->' +
                                        '<b>'+comment["name"]+'</b>' +
                                        '</a>' +
                                        '&nbsp;&nbsp;&nbsp;' +
                                        '<small>'+comment["time"]+'</small>' +
                                        '<!-- 评论者内容 -->' +
                                        '<p>'+comment["pcontent"]+'</p>' +
                                    '</div>' +
                                    '<div class="col-xs-3 col-md-1">' +
                                        '<form >' +
                                            '<button type="button" class="btn btn-danger btn-sm" onclick="p_del('+fid+","+comment["pid"]+')">删除</button>' +
                                        '</form>' +
                                    '</div>' +
                                '</div>';
                        }
                        $("#myself_article_comment"+fid).html(myself_article_comment);
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

//评论-删除(回复)
function huifuCommentDel(fid,pid) {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var userid = document.getElementById("session_userid").value;
    $.ajax({
        //几个参数需要注意一下
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "commentController/deleteComment/"+pid ,//url
        success: function (result) {
            if (result.resultCode == 200) {
                //获取最新评论信息
                $.ajax({
                    type: "post",//方法类型
                    dataType: "json",//预期服务器返回的数据类型
                    url: "commentController/getCommentFid/"+fid ,//url
                    success: function (data) {
                        /*评论*/
                        var huifu_comment_all = "";
                        var huifu_comments = data["listComment"];
                        for (var j =0 ;j<huifu_comments.length;j++){
                            var huifu_comment = huifu_comments[j];
                            var huifu_comment_del = "";
                            // 如果该评论者是本用户时可以修改自己的评论，否则不能
                            if (huifu_comment["userid"] == userid){
                                huifu_comment_del =
                                    '<form>' +
                                    '<button type="button" class="btn btn-danger btn-sm" onclick="p_del_huifu('+fid+","+huifu_comment["pid"]+')">删除</button>' +
                                    '</form>';
                            }
                            huifu_comment_all = huifu_comment_all +
                                '<hr style="position: relative; margin-top: 2px;height:1px;border:none;border-top:1px dashed #dddddd;">' +
                                '<div class="row" style="position: relative; margin-top: -10px;">' +
                                '<div class="col-xs-10 col-md-11">' +
                                '<a href="'+APP_PATH+'/userController/getOthers?userid='+huifu_comment["userid"]+'" class="a_p">' +
                                '<!-- 评论者姓名 -->' +
                                '<b>'+huifu_comment["name"]+'</b>' +
                                '</a>' +
                                '&nbsp;&nbsp;&nbsp;' +
                                '<!-- 时间 -->' +
                                '<small>'+huifu_comment["time"]+'</small>' +
                                '<!-- 评论者内容 -->' +
                                '<p>'+huifu_comment["pcontent"]+'</p>' +
                                '</div>' +
                                '<!-- 如果该评论者是本用户时可以修改自己的评论，否则不能 -->' +
                                '<div id="huifu_comment_del">'+huifu_comment_del+'</div>' +
                                '</div>';
                        }
                        $("#huifu_comment_all_"+fid).html(huifu_comment_all);
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