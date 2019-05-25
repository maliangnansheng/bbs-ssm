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
    <div class="row">
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


        <!--右边板块-->
        <div id="content_right">
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
            <div style="height:530px; margin: 0px auto;" id="visit_province"></div>

            <div class="row" style="position: relative; background-color: #f6f6f6; height: 10px;"></div>
            <div class="row">
                <div class="col-md-12" style="position: relative; padding-top: 10px;">
                    <b>论坛简介</b>
                    <hr>
                </div>
            </div>
            <div>
                <p style="line-height:30px;">该论坛之所以存在是为了方便大家讨论、学习、以及体验GitHub上对应项目的运行效果</p>
            </div>

            <div class="row" style="position: relative; background-color: #f6f6f6; height: 10px;"></div>
            <div class="row">
                <div class="col-md-12" style="position: relative; padding-top: 10px;">
                    <b>更新日志</b>
                    <hr>
                </div>
            </div>
            <div style="line-height:30px;">
                <p><small class="text-warning">2016.12.10</small> 南生论坛所有代码全部完成</p>
                <p><small class="text-warning">2018.08.04</small> 购买服务器，南生论坛上线</p>
                <p><small class="text-warning">2018.10.22</small> 南生论坛新增访问记录功能</p>
                <p><small class="text-warning">2019.02.23</small> 南生论坛新增视频发布功能</p>
                <p><small class="text-warning">2019.04.30</small> 南生论坛改为异步请求实现</p>
                <h4>......</h4>
            </div>

            <div class="row" style="position: relative; background-color: #f6f6f6; height: 10px;"></div>
            <div class="row">
                <div class="col-md-12" style="position: relative; padding-top: 10px;">
                    <b>友情链接</b>
                    <hr>
                </div>
            </div>
            <div style="line-height:30px;">
                <p>
                    <a href="https://github.com/maliangnansheng" target="_blank">
                        <b class="text-primary">GitHub</b> - <small>虽千万人吾往矣、虽千万事吾往矣</small>
                    </a>
                </p>
                <p>
                    <a href="https://maliangnansheng.github.io" target="_blank">
                        <b class="text-primary">Nan's Blog</b> - <small>弱者才言命，强者只言运！</small>
                    </a>
                </p>
                <h4>......</h4>
            </div>

            <div class="row" style="position: relative; background-color: #f6f6f6; height: 10px;"></div>
            <div class="row">
                <div class="col-md-12" style="position: relative; padding-top: 10px;">
                    <b>友情捐赠</b>
                    <hr>
                </div>
            </div>
            <div style="line-height:30px;">
                <p>
                    <small class="text-warning">无论捐赠金额多少都足够表达您这份心意，非常感谢 ：）</small>
                    <br>
                    <small class="text-info">你的捐赠将用于项目后期的维护和更新...</small>
                </p>
                <hr>
                <img src="${APP_PATH}/static/img/donate/zhifubao.jpg" alt="支付宝" style="width: 100%"/>
                <hr>
                <img src="${APP_PATH}/static/img/donate/weixin.jpg" alt="微信" style="width: 100%"/>
                <hr>
                <p><small class="text-info">捐赠后（联系作者QQ：924818949），友情赠送南生论坛40页15000字的设计文档一份</small></p>
                <hr>
                <img src="${APP_PATH}/static/img/donate/wendang.png" alt="南生论坛设计文档" style="width: 100%"/>
                <p></p>
            </div>

            <div class="row" style="position: relative; background-color: #f6f6f6; height: 10px;"></div>
            <div class="row">
                <div class="col-md-12" style="position: relative; padding-top: 10px;">
                    <b>捐赠信息</b>
                    <hr>
                </div>
            </div>
            <div style="line-height:20px;">
                <p><small class="text-primary">2019.05.05 15:55</small> 支付宝用户 <small style="color: #1ee3ef">爱梦筱*</small> 捐赠<small style="color: red;"> 1 </small>元</p>
                <p><small class="text-primary">2019.05.05 16:09</small> 支付宝用户 <small style="color: #1ee3ef">冷烟吹*</small> 捐赠<small style="color: red;"> 20 </small>元</p>
                <p><small class="text-primary">2019.05.05 18:09</small> QQ用户 <small style="color: #1ee3ef">spade**</small> 通过微信捐赠<small style="color: red;"> 10 </small>元</p>
                <p><small class="text-primary">2019.05.05 18:32</small> QQ用户 <small style="color: #1ee3ef">樱草色**</small> 通过微信捐赠<small style="color: red;"> 2 </small>元</p>
                <p><small class="text-primary">2019.05.05 18:56</small> 支付宝用户 <small style="color: #1ee3ef">赵*云</small> 捐赠<small style="color: red;"> 10 </small>元</p>
                <p><small class="text-primary">2019.05.05 19:42</small> 支付宝用户 <small style="color: #1ee3ef">抹茶小蛋糕*</small> <small style="color: #ff15e8">小姐姐</small>捐赠<small style="color: red;"> 5.21 </small>元</p>
                <p><small class="text-primary">2019.05.05 21:55</small> 支付宝用户 <small style="color: #1ee3ef">**飞</small> 捐赠<small style="color: red;"> 10 </small>元</p>
                <p><small class="text-primary">2019.05.06 00:46</small> 支付宝用户 <small style="color: #1ee3ef">那*天</small> 捐赠<small style="color: red;"> 6.66 </small>元</p>
                <p><small class="text-primary">2019.05.06 21:29</small> 支付宝用户 <small style="color: #1ee3ef">**娜</small> 捐赠<small style="color: red;"> 99 </small>元 <b style="color: #05df12">附图感谢👇👇👇</b></p>
                <img src="${APP_PATH}/static/img/donate/shouqian001.png" alt="支付宝用户 **娜 捐赠" style="width: 100%"/>
                <p><small class="text-primary">2019.05.06 22:16</small> QQ用户 <small style="color: #1ee3ef">**大橙子</small> 通过QQ红包捐赠<small style="color: red;"> 10 </small>元</p>
                <p><small class="text-primary">2019.05.11 10:44</small> 支付宝用户 <small style="color: #1ee3ef">**晴</small> 捐赠<small style="color: red;"> 10 </small>元</p>
                <h4>......</h4>
            </div>

        </div>
    </div>
</div>

<jsp:include page="/content/top.jsp"></jsp:include>

<script src="${APP_PATH }/static/js/content/content.js"></script>
<script src="${APP_PATH }/static/js/content/comment.js"></script>
<script src="${APP_PATH }/static/js/content/attention.js"></script>
<script src="${APP_PATH }/static/js/content/collect.js"></script>
<script src="${APP_PATH }/static/js/content/plate.js"></script>
<script src="${APP_PATH }/static/js/content/article.js"></script>


<script src="${APP_PATH }/static/js/phones_pc.js"></script>
<script src="${APP_PATH }/static/js/load_more.js"></script>
<script src="${APP_PATH }/static/js/echars/echarts.min.js"></script>

</body>
</html>
