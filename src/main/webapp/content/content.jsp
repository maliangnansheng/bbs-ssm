<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>主体内容</title>
    <%
        pageContext.setAttribute("APP_PATH", request.getContextPath());
    %>

    <link href="${APP_PATH}/static/css/css.css" rel="stylesheet">
</head>
<body>
<%-- 方便ajax获取APP_PATH --%>
<input id="APP_PATH" type="hidden" value="${APP_PATH}" >
<%-- 方便ajax获取session中的userid --%>
<input id="session_userid" type="hidden" value="${userid}" >
<!--主体（下）-->
<div class="container">
    <!--加载中...-->
    <div id="content_loading"></div>

    <div class="row">
        <!--加载中...-->
        <div id="content_left_loading"></div>
        <!--左边板块-->
        <div id="content_left">
            <!--代码部分begin-->
            <div class="jq22">
                <!-- 帖子展示-循环 -->
                <div id="articles_all"></div>
                <div class="text-center more" id="appendMore"></div>
            </div>
            <div class="row">
                <div class="col-md-12"
                     style="position: relative; background-color: #f6f6f6; height: 30px;"></div>
            </div>
        </div>


        <!--右边板块-隐藏-->
        <div id="content_right" style="display: none;">
            <div class="row">
                <div class="col-md-12" style="position: relative; padding-top: 10px;">
                    <b>所有板块</b>
                    <hr>
                </div>
            </div>
            <!-- 板块展示-循环 -->
            <div class="row" id="plates_all"></div>
            <div class="row">
                <div class="col-md-12" style="position: relative; background-color: #f6f6f6; height: 10px;"></div>
            </div>

            <div class="row">
                <div class="col-md-12"
                     style="position: relative; padding-top: 10px;">
                    <b>热门文章</b>
                    <hr>
                </div>
            </div>
            <!-- 热门帖子展示-循环 -->
            <div id="hotArticle_all"></div>

            <div class="row" style="position: relative; background-color: #f6f6f6; height: 10px;"></div>
            <div class="row">
                <div class="col-md-12" style="position: relative; padding-top: 10px;">
                    <b>访问统计</b>
                    <hr>
                </div>
            </div>
            <div style="height:400px; margin: 0px auto;" id="visit_country"></div>
            <hr>
            <div style="height:300px; margin: 0px auto;" id="visit_province"></div>

            <div class="row" style="position: relative; background-color: #f6f6f6; height: 10px;"></div>
            <!-- 论坛简介、更新日志、友情链接、友情捐赠 -->
            <jsp:include page="/content/util.jsp"></jsp:include>
            </div>
        </div>
    </div>
    <br>
</div>

<jsp:include page="/content/top.jsp"></jsp:include>

<script src="${APP_PATH }/static/js/content/content.js"></script>
<script src="${APP_PATH }/static/js/content/comment.js"></script>
<script src="${APP_PATH }/static/js/content/attention.js"></script>
<script src="${APP_PATH }/static/js/content/collect.js"></script>
<script src="${APP_PATH }/static/js/content/enjoy.js"></script>
<script src="${APP_PATH }/static/js/content/plate.js"></script>
<script src="${APP_PATH }/static/js/content/article.js"></script>


<script src="${APP_PATH }/static/js/phones_pc.js"></script>
<script src="${APP_PATH }/static/js/load_more.js"></script>
<script src="${APP_PATH }/static/js/echars/echarts.min.js"></script>

</body>
</html>