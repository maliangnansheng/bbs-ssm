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
                            var comment_del = "";
                            // 如果该评论者是本用户时可以修改自己的评论，否则不能
                            if (comment["userid"] == userid){
                                comment_del =
                                    '<form>' +
                                    '   <button type="button" class="btn btn-danger btn-sm" onclick="p_del('+fid+","+comment["pid"]+')">删除</button>' +
                                    '</form>';
                            }
                            comment_traversals = comment_traversals +
                                '<hr style="position: relative; margin-top: 5px;">' +
                                '<div class="row">' +
                                '   <div class="col-md-9 col-xs-7">' +
                                '       <a class="a_p" href=' + APP_PATH + '/userController/getOthers?userid=' + comment["userid"] + '>' +
                                '           <!-- 评论者姓名 -->' +
                                '           <b>' + comment["name"] + '</b>' +
                                '       </a>' +
                                '   </div>' +
                                '   <div class="col-md-3 col-xs-5">' +
                                '       <!-- 时间 -->' +
                                '       <small>' + comment["time"] + '</small>' +
                                '   </div>' +
                                '</div>' +
                                '<div class="row">' +
                                '   <div class="col-md-10 col-xs-12">' +
                                '       <!-- 评论内容 -->' +
                                '       <p>' + comment["pcontent"] + '</p>' +
                                '   </div>' +
                                '   <div class="col-md-2 col-xs-2 col-xs-offset-9">' +
                                '       <!-- 如果该评论者是本用户时可以修改自己的评论，否则不能 -->' +
                                '       <div id="comment_del">'+comment_del+'</div>' +
                                '   </div>' +
                                '</div>';
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
                        /*评论*/
                        var comment_traversals = "";
                        var comments = data["listComment"];
                        for (var j =0 ;j<comments.length;j++){
                            var comment = comments[j];
                            var comment_del = "";
                            // 如果该评论者是本用户时可以修改自己的评论，否则不能
                            if (comment["userid"] == userid){
                                comment_del =
                                    '<form>' +
                                    '   <button type="button" class="btn btn-danger btn-sm" onclick="p_del('+fid+","+comment["pid"]+')">删除</button>' +
                                    '</form>';
                            }
                            comment_traversals = comment_traversals +
                                '<hr style="position: relative; margin-top: 5px;">' +
                                '<div class="row">' +
                                '   <div class="col-md-9 col-xs-7">' +
                                '       <a class="a_p" href=' + APP_PATH + '/userController/getOthers?userid=' + comment["userid"] + '>' +
                                '           <!-- 评论者姓名 -->' +
                                '           <b>' + comment["name"] + '</b>' +
                                '       </a>' +
                                '   </div>' +
                                '   <div class="col-md-3 col-xs-5">' +
                                '       <!-- 时间 -->' +
                                '       <small>' + comment["time"] + '</small>' +
                                '   </div>' +
                                '</div>' +
                                '<div class="row">' +
                                '   <div class="col-md-10 col-xs-12">' +
                                '       <!-- 评论内容 -->' +
                                '       <p>' + comment["pcontent"] + '</p>' +
                                '   </div>' +
                                '   <div class="col-md-2 col-xs-2 col-xs-offset-9">' +
                                '       <!-- 如果该评论者是本用户时可以修改自己的评论，否则不能 -->' +
                                '       <div id="comment_del">'+comment_del+'</div>' +
                                '   </div>' +
                                '</div>';
                        }
                        $("#comment_traversals"+fid).html(comment_traversals);
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