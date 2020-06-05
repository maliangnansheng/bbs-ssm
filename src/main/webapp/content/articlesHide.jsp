<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>文章隐藏模板</title>
    <%
        pageContext.setAttribute("APP_PATH", request.getContextPath());
    %>
</head>
<body>
<div id="articles_all_hide" style="display: none">
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
                                <button type="button" id="form_attentionDel_btn">
                                    <samp class="glyphicon glyphicon-ok-sign"></samp> 已经关注</button>
                            </div>
                        </form>
                        <!-- 未关注 -->
                        <form method="post" class="form_attentionAdd" style="display: none">
                            <button id="form_attentionAdd_btn" type="button" class="btn btn-info btn-sm">
                                <samp class="glyphicon glyphicon-plus-sign"></samp> 关注她他</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="row">
                <p>
                    <!-- 文章配图 -->
                    <div class="col-md-3" id="listArticle_photo" style="cursor:pointer;">
                        <!-- 视频 -->
                        <video id="listArticle_video" class="img_content" controls="controls" style="display: none"></video>
                        <!-- 图片 -->
                        <img id="listArticle_img" class="img_content" style="display: none"/>
                    </div>
                    <div class="col-md-9">
                        <div style="overflow: hidden;white-space: nowrap;text-overflow:ellipsis;">
                            <!-- 文章标题 -->
                            <a style="color: #000000;">
                                <b id="listArticle_titles" style="cursor:pointer; font-size:18px;"></b>
                            </a>
                        </div>
                        <div style="cursor:pointer;overflow: hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;">
                            <!-- 文章内容 -->
                            <span id="listArticle_fcontent" style="word-break: break-word;line-height: 1.6;"></span>
                        </div>
                    </div>
                </p>
            </div>
            <br>
            <div class="row" style="position: relative;top: -10px;">
                <div class="col-xs-12 col-md-7">
                    <div class="col-xs-4 col-md-4">
                        <!-- 评论数 -->
                        <small style="cursor:pointer;" id="listArticle_sum"></small>
                    </div>
                    <div class="col-xs-4 col-md-4">
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
                    <div class="col-xs-4 col-md-4">
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
                </div>
            </div>
            <div class="row">
                <div class="col-md-12" style="position: relative; background-color: #f6f6f6; height: 10px;"></div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
