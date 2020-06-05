<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>右边板块-隐藏</title>
    <%
        pageContext.setAttribute("APP_PATH", request.getContextPath());
    %>
</head>
<body>
<!--右边板块-隐藏-->
<div id="content_right" style="display: none;">
    <div class="row">
        <div class="col-md-12" style="position: relative; padding-top: 10px;">
            <b>所有板块</b>
            <hr>
        </div>
    </div>
    <!-- 板块展示-模板 -->
    <div class="row" id="plates_all_hide" style="display: none">
        <div class="col-xs-4 col-md-4 text-center">
            <a id="plates_all_a" href="#">
                <img class="img_right_logo_bankuai" src="${APP_PATH}/static/img/houtai.png">
                <p id="plates_all_bname"></p>
            </a>
        </div>
    </div>
    <!-- 板块展示-实际数据 -->
    <div class="row" id="plates_all"></div>
    <div class="row" style="position: relative; background-color: #f6f6f6; height: 10px;"></div>

    <div class="row">
        <div class="col-md-12" style="position: relative; padding-top: 10px;">
            <b>热门文章</b>
            <hr>
        </div>
    </div>
    <!-- 热门文章展示-模板 -->
    <div id="hotArticle_all_hide" style="display: none">
        <div class="row">
            <div class="col-md-12">
                <a href="javascript:void(0)" id="hotArticle_all_a"></a>
            </div>
            <div class="col-md-12"><br></div>
        </div>
    </div>
    <!-- 热门文章展示-实际数据 -->
    <div id="hotArticle_all"></div>
    <div class="row" style="position: relative; background-color: #f6f6f6; height: 10px;"></div>

    <div class="row">
        <div class="col-md-12" style="position: relative; padding-top: 10px;">
            <b>最新评论</b>
            <hr>
        </div>
    </div>
    <!-- 最新评论展示-模板 -->
    <div id="newComment_all_hide" style="display: none">
        <div class="row">
            <div class="col-md-12">
                <a href="javascript:void(0)" id="newComment_all_a"></a>
            </div>
            <div class="col-md-12"><br></div>
        </div>
    </div>
    <!-- 最新评论展示-实际数据 -->
    <div id="newComment_all"></div>
    <div class="row" style="position: relative; background-color: #f6f6f6; height: 10px;"></div>

    <div class="row">
        <div class="col-md-12" style="position: relative; padding-top: 10px;">
            <b>访问统计</b>
            <hr>
        </div>
    </div>
    <div style="height:280px; margin: 0px auto;" id="visit_country"></div>
    <hr>
    <div style="height:380px; margin: 0px auto;" id="visit_province"></div>

    <div class="row" style="position: relative; background-color: #f6f6f6; height: 10px;"></div>
</div>
</body>
</html>
