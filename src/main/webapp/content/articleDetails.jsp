<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>文章详情</title>
    <%
        pageContext.setAttribute("APP_PATH", request.getContextPath());
    %>
</head>
<body>
<!-- 文章展示 -->
<div id="articles_all" style="display: none">
    <div class="row show_article">
        <div class="col-md-12 show_article_go">
            <div class="row">
                <div class="col-xs-7 col-md-9" style="position: relative; padding-top: 10px;">
                    <small>热门内容，来自：
                        <small><a href="#" id="listArticle_bname"></a></small>
                    </small>
                </div>
                <div class="col-xs-5 col-md-3" style="position: relative; padding-top: 10px;">
                    <!-- 时间 -->
                    <small id="listArticle_time"></small>
                </div>
            </div>
            <div class="row">
                <!-- 头像 -->
                <div class="col-xs-2 col-md-1">
                    <a id="listArticle_userphoto_a">
                        <img id="listArticle_userphoto_img" class="img_head" alt="头像" src="${APP_PATH}/static/img/head.png">
                    </a>
                </div>
                <!-- 发帖人名字 -->
                <div class="col-xs-6 col-md-8">
                    <a id="listArticle_username_href" class="a_b">
                        <h5 class="bottom_left_name">
                            <b id="listArticle_username"></b>
                        </h5>
                    </a>
                </div>
                <div class="col-xs-4 col-md-3">
                    <!-- 关注按钮 -->
                    <div>
                        <!-- 已关注 -->
                        <form method="delete" class="form_attentionDel" style="display: none">
                            <div class="attention_content" style="color: #46b8da;">
                                <button type="button" class="btn" id="form_attentionDel_btn">
                                    <samp class="glyphicon glyphicon-ok-sign"></samp> 已经关注</button>
                                </button>
                            </div>
                        </form>
                        <!-- 未关注 -->
                        <form method="post" class="form_attentionAdd" style="display: none">
                            <button id="form_attentionAdd_btn" type="button" class="btn btn-info btn-sm">
                                <samp class="glyphicon glyphicon-plus-sign"></samp> 关注她他</button>
                        </form>
                        <!-- 修改文章 -->
                        <form class="form_articleUpdate" style="display: none">
                            <button id="form_articleUpdate_btn" type="button" class="btn btn-info btn-sm">修改文章</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <h4>
                        <!-- 标题 -->
                        <b id="listArticle_title"></b>
                    </h4>
                </div>
                <!-- 文章配图 -->
                <div class="col-md-12" id="listArticle_photo">
                    <!-- 视频 -->
                    <video id="listArticle_video" class="img_content" controls="controls" style="display: none"></video>
                    <!-- 图片 -->
                    <img id="listArticle_img" class="img_content" controls="controls" style="display: none"/>
                </div>
                <div class="col-md-12">
                    <div id="artice-doc-content">
                        <!-- 文章内容 -->
                        <textarea id="listArticle_fcontent" style="display:none;"></textarea>
                    </div>
                </div>
            </div>
            <br>
            <div class="row" style="position: relative;top: -10px;">
                <div class="col-xs-12 col-md-7">
                    <div class="col-xs-3 col-md-3">
                        <!-- 评论数 -->
                        <small id="listArticle2_sum"></small>
                    </div>
                    <div class="col-xs-3 col-md-3">
                        <!-- 收藏按钮 -->
                        <div>
                            <!-- 已收藏 -->
                            <form method="delete" class="form_collectDel" style="display: none">
                                <button id="form_collectDel_btn" type="button" style="border: none;background-color: #ffffff;">
                                    <samp title="取消收藏" class="glyphicon glyphicon-heart collect_end"></samp>
                                </button>
                            </form>
                            <!-- 未收藏 -->
                            <form method="post" class="form_collectAdd" style="display: none">
                                <button id="form_collectAdd_btn" type="button" style="border: none;background-color: #ffffff;">
                                    <samp title="收藏该文章" class="glyphicon glyphicon-heart collect_start"></samp>
                                </button>
                            </form>
                        </div>
                        <small id="collect_userid_null"></small>
                    </div>
                    <div class="col-xs-3 col-md-3">
                        <!-- 点赞按钮 -->
                        <div>
                            <!-- 已点赞 -->
                            <form method="delete" class="form_enjoyDel" style="display: none">
                                <button id="form_enjoyDel_btn" type="button" style="border: none;background-color: #ffffff;">
                                    <samp title="取消点赞" class="glyphicon glyphicon-thumbs-up enjoy_end"></samp>
                                </button>
                            </form>
                            <!-- 未点赞 -->
                            <form method="post" class="form_enjoyAdd" style="display: none">
                                <button id="form_enjoyAdd_btn" type="button" style="border: none;background-color: #ffffff;">
                                    <samp title="点赞该文章" class="glyphicon glyphicon-thumbs-up enjoy_start"></samp>
                                </button>
                            </form>
                        </div>
                        <small id="enjoy_userid_null"></small>
                    </div>
                    <div class="col-xs-3 col-md-3">
                        <!-- 分享 -->
                        <div title="分享到QQ好友">
                            <img id="share" src="${APP_PATH}/static/img/share/QQ.png" style="cursor:pointer;">
                        </div>
                    </div>
                </div>
            </div>
            <!--评论框-->
            <div class="row" style="position: relative; margin-top: 10px;">
                <div class="col-xs-12 col-md-12">
                    <form class="form_commentAdd" style="display: none">
                        <div class="col-xs-10 col-md-11">
                            <input type="text" class="form-control" id="pcontent" name="pcontent" placeholder="写下你的评论..." required>
                        </div>
                        <div class="col-xs-2 col-md-1">
                            <button id="form_commentAdd_btn" type="button" class="btn btn-primary" style="position: relative; left: -25px;">评论</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row" style="position: relative;">
                <!--评论展示-模板 -->
                <div class="col-md-12" id="comment_all_hide" style="display:none;">
                    <div class="comment_pid">
                        <hr style="position: relative; margin-top: 2px;">
                        <div class="row" style="position: relative; top: -18px;">
                            <div class="col-md-1 col-xs-2">
                                <a id="comment_photo_a" class="a_p">
                                    <!-- 评论者头像 -->
                                    <img style="border-radius: 2px;" id="comment_photo_img" class="img_head" alt="头像" src="${APP_PATH}/static/img/head.png">
                                </a>
                            </div>
                            <div class="col-md-8 col-xs-5" style="position:relative; top: 9px;">
                                <a id="comment_a" class="a_p">
                                    <!-- 评论者姓名 -->
                                    <b id="comment_name"></b>
                                </a>
                            </div>
                            <div class="col-md-3 col-xs-5" style="position:relative; top: 9px;">
                                <!-- 时间 -->
                                <small id="comment_time"></small>
                            </div>
                        </div>
                        <div class="row" style="position: relative; top: -18px;">
                            <div class="col-md-11 col-xs-12 col-md-offset-1">
                                <!-- 评论内容 -->
                                <p id="comment_pcontent"></p>
                            </div>
                        </div>
                        <div class="row" style="position: relative; top: -20px;">
                            <div class="col-md-2 col-xs-2 col-md-offset-10">
                                <!-- 如果该评论者是本用户时可以修改自己的评论，否则不能 -->
                                <div>
                                    <form id="form_comment_del" style="display: none">
                                        <button id="form_commentDel_btn" type="button" class="btn btn-danger btn-sm">删除</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--评论展示-实际数据 -->
                <div class="col-md-12" id="comment_all"></div>
            </div>
            <br>
            <div class="row" style="position: relative; background-color: #f6f6f6; height: 10px;"></div>
        </div>
    </div>
</div>
</body>
</html>
