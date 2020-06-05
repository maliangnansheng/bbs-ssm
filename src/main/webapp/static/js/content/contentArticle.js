//某一文章展示
$(function () {
    var fid = getQueryString("fid");

    // 背景颜色设置为透明
    $("#content_left").css("background-color","transparent");
    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/article/getArticleFid/" + fid ,
        type: "get",
        dataType: "json",
        success: function (data) {
            // 隐藏加载loadinglistArticle_bname
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
                var article = data.article;
                // 文章创建者id
                var fuserid = article.userid;
                // 文章id
                var fid = article.fid;
                // 板块id
                var bid = article.bid;
                // 板块名
                var bname = article.bname;
                // 板块信息
                $("#listArticle_bname").html(bname);
                $("#listArticle_bname").attr("onclick", "getBid('" + bid + "','" + bname + "')");

                // 时间
                $("#listArticle_time").html(dateTimeFormat(article.createTime));

                //文章发布者头像信息
                $("#listArticle_userphoto_a").attr("href", "javascript:void(0)");
                $("#listArticle_userphoto_a").attr("onclick", 'getOther("' + fuserid + '")');
                if (article.userPhoto != null) {
                    $("#listArticle_userphoto_img").attr("src", article.userPhoto);
                }

                //发帖人姓名
                $("#listArticle_username_href").attr("href", "javascript:void(0)");
                $("#listArticle_username_href").attr("onclick", 'getOther("' + fuserid + '")');
                $("#listArticle_username").html(article.name);

                /*--------------------------------------------------- 关注and修改文章 ---------------------------------------------------*/
                //用户登录后才显示关注按钮 && 如果是登录用户本人，则不显示关注按钮
                if (userid != "" && fuserid != userid) {
                    // 关注表信息
                    var gid = article.gid;

                    $(".form_attentionDel").attr("class", "form_attentionDel_" + fuserid);
                    $(".form_attentionAdd").attr("class", "form_attentionAdd_" + fuserid);

                    //判断该文章对应的用户是否被关注
                    if (gid != null) {    // 被关注
                        // "取消关注"
                        $("#form_attentionDel_btn").attr("onclick", "attentionDel('" + fuserid + "')");
                        // fuserid
                        $("#form_attentionDel_btn").attr("class", "btn btn-sm " + fuserid);
                        // 鼠标移上去显示
                        $("#form_attentionDel_btn").attr("onmouseover", "onmouseoverAttentioned('" + fuserid + "')");
                        // 鼠标移出显示
                        $("#form_attentionDel_btn").attr("onmouseout", "onmouseoutAttentioned('" + fuserid + "')");
                        // "关注她"
                        $("#form_attentionAdd_btn").attr("onclick", "attentionAdd('" + fuserid + "')");
                        // 显示“取消关注”
                        $(".form_attentionDel_" + fuserid).show();
                    } else {    // 未被关注
                        // "取消关注"
                        $("#form_attentionDel_btn").attr("onclick", "attentionDel('" + fuserid + "')");
                        // fuserid
                        $("#form_attentionDel_btn").attr("class", "btn btn-sm " + fuserid);
                        // 鼠标移上去显示
                        $("#form_attentionDel_btn").attr("onmouseover", "onmouseoverAttentioned('" + fuserid + "')");
                        // 鼠标移出显示
                        $("#form_attentionDel_btn").attr("onmouseout", "onmouseoutAttentioned('" + fuserid + "')");
                        // "关注她"
                        $("#form_attentionAdd_btn").attr("onclick", "attentionAdd('" + fuserid + "')");
                        // 显示“关注她”
                        $(".form_attentionAdd_" + fuserid).show();
                    }
                } else if(userid != "" && fuserid == userid) {    // 用户登录且该文章是登录用户的，则显示修改按钮
                    // "修改文章"
                    $("#form_articleUpdate_btn").attr("onclick", "skipUpdateArticle('" + fid + "')");
                    // 显示“修改文章”
                    $(".form_articleUpdate").show();
                }
                /*--------------------------------------------------- 关注and修改文章-end ---------------------------------------------------*/

                // 标题
                $("#listArticle_title").html(article.titles);

                // 内容
                $("#listArticle_fcontent").html(article.fcontent);

                // 文章配图
                if (article.photo != "") { // 有“配图”
                    if (article.photo.endsWith(".mp4") || article.photo.endsWith(".avi")) {
                        $("#listArticle_video").attr("src", article.photo);
                        // 显示“视频”
                        $("#listArticle_video").show();
                    } else {
                        $("#listArticle_img").attr("src", article.photo);
                        // 显示“图片”
                        $("#listArticle_img").show();
                    }
                } else {
                    // 隐藏“视频”
                    $("#listArticle_video").hide();
                    // 隐藏“图片”
                    $("#listArticle_img").hide();
                }

                // 评论数
                $("#listArticle2_sum").html(article.commentCount + " 条评论");

                /*--------------------------------------------------- 收藏 ---------------------------------------------------*/
                // 用户登录后才显示心形收藏 && 如果不是登录用户本人所发文章，则显示心形收藏
                if (userid != "" && fuserid != userid) {
                    // 收藏表信息
                    var sid = article.sid;

                    $(".form_collectDel").attr("class", "form_collectDel_" + fid);
                    $(".form_collectAdd").attr("class", "form_collectAdd_" + fid);

                    // 判断该文章是否被收藏
                    if (sid != null) {   // 已收藏
                        // "取消收藏"
                        $("#form_collectDel_btn").attr("onclick", "collectDel('" + fid + "')");
                        // "收藏"
                        $("#form_collectAdd_btn").attr("onclick", "collectAdd('" + fid + "')");
                        // 显示“取消收藏”
                        $(".form_collectDel_" + fid).show();
                    } else {    // 未收藏
                        // "取消收藏"
                        $("#form_collectDel_btn").attr("onclick", "collectDel('" + fid + "')");
                        // "收藏"
                        $("#form_collectAdd_btn").attr("onclick", "collectAdd('" + fid + "')");
                        // 显示“收藏”
                        $(".form_collectAdd_" + fid).show();
                    }
                }
                // 用户未登录才显示文字收藏
                if (userid == "") {
                    $("#collect_userid_null").html("登录收藏");
                }
                /*--------------------------------------------------- 收藏-end ---------------------------------------------------*/

                /*--------------------------------------------------- 点赞 ---------------------------------------------------*/
                // 用户登录后才显示手形点赞 && 如果不是登录用户本人所发文章，则显示心形点赞
                if (userid != "" && fuserid != userid) {
                    // 点赞表信息
                    var eid = article.eid;

                    $(".form_enjoyDel").attr("class", "form_enjoyDel_" + fid);
                    $(".form_enjoyAdd").attr("class", "form_enjoyAdd_" + fid);

                    // 判断该文章是否被点赞
                    if (eid != null) {    // 已点赞
                        // "取消点赞"
                        $("#form_enjoyDel_btn").attr("onclick", "enjoyDel('" + fid + "')");
                        // "点赞"
                        $("#form_enjoyAdd_btn").attr("onclick", "enjoyAdd('" + fid + "')");
                        // 显示“取消点赞”
                        $(".form_enjoyDel_" + fid).show();
                    } else {    // 未点赞
                        // "取消点赞"
                        $("#form_enjoyDel_btn").attr("onclick", "enjoyDel('" + fid + "')");
                        // "点赞"
                        $("#form_enjoyAdd_btn").attr("onclick", "enjoyAdd('" + fid + "')");
                        // 显示“点赞”
                        $(".form_enjoyAdd_" + fid).show();
                    }
                }
                // 用户未登录才显示文字点赞
                if (userid == "") {
                    $("#enjoy_userid_null").html("登录点赞");
                }
                /*--------------------------------------------------- 点赞-end ---------------------------------------------------*/

                /*--------------------------------------------------- 分享 ---------------------------------------------------*/
                // 分享
                var share_title = article.titles;
                var share_url = window.location.href;
                // 访问地址是"localhost"不显示配图，可用127.0.0.1替代localhost看效果
                var share_pics = "";
                if (article.photo == ""){ //没有配图
                    share_pics = window.location.protocol + '//' + window.location.host + APP_PATH + '/static/img/beijing.jpg';
                } else {
                    share_pics = article.photo;
                }
                $("#share").attr("onclick", "shareToQQ('" + share_title + "','" + share_url + "','" + share_pics + "')");
                // 等所有数据配置完再显示
                $("#articles_all").show();
                /*--------------------------------------------------- 分享-分享 ---------------------------------------------------*/

                /*--------------------------------------------------- 评论 ---------------------------------------------------*/
                // 用户登录后才显示评论框
                if (userid != "") {
                    $(".form_commentAdd").show();
                    $("#form_commentAdd_btn").attr("onclick", "commentAdd('" + fid + "','" + fuserid + "')");
                }
                // 评论展示
                var comments = data.listComment;
                if (comments != null){  // 有评论
                    // 评论展示
                    getComment(comments, fuserid);
                }
                /*--------------------------------------------------- 评论-end ---------------------------------------------------*/

                /*----------------- 把MD语法文档，转换为HTML语法 - js---------------------------*/
                var testEditor;
                $(function () {
                    testEditor = editormd.markdownToHTML("artice-doc-content", {//注意：这里是上面DIV的id
                        htmlDecode: "style,script,iframe",
                        emoji: true,
                        taskList: true,
                        tex: true, // 默认不解析
                        flowChart: true, // 默认不解析
                        sequenceDiagram: true, // 默认不解析
                        codeFold: true,
                    });
                });
                /*--------------------------------- end ------------------------------------*/
            } else if (code == 500) {
                layer.msg(msg, {icon: 5});
            }
            // 板块展示
            getPlate(data.plate);
            // 热门文章
            getHotArticle(data.listHotArticle);
            // 最新评论
            getNewComment(data.listNewComment);
            // 显示扇形图
            showCountrysProvinces(data);
        },
        error: function () {
            layer.msg("出错！", {icon: 5});
        }
    });
});

//根据参数名获取对应的url参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

/*跳转到文章详情（新开一个tab）*/
function skipArticle(fid) {
    var url = APP_PATH + '/article.jsp?fid=' + fid;
    window.open(url,"_blank");
}

/*跳转到修改文章（新开一个tab）*/
function skipUpdateArticle(fid) {
    var url = APP_PATH + '/update.jsp?fid=' + fid + "&source=contentArticle";
    window.location.href = url;
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