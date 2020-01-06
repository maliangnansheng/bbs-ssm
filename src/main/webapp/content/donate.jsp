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
        <!--加载中...-->
        <div id="content_left_loading"></div>
        <!--左边板块-->
        <div id="content_left">
            <!--代码部分begin-->
            <div class="col-md-6 col-md-offset-3" align="center">
                <!-- 捐赠信息展示 -->
                <p><small class="text-primary">2019.05.05 15:55</small> 支付宝用户 <small style="color: #f95d02">爱梦筱*</small> 捐赠<small style="color: red;"> 1 </small>元</p>
                <p><small class="text-primary">2019.05.05 16:09</small> 支付宝用户 <small style="color: #f95d02">冷烟吹*</small> 捐赠<small style="color: red;"> 20 </small>元</p>
                <p><small class="text-primary">2019.05.05 18:09</small> QQ用户 <small style="color: #f95d02">spade**</small> 通过微信捐赠<small style="color: red;"> 10 </small>元</p>
                <p><small class="text-primary">2019.05.05 18:32</small> QQ用户 <small style="color: #f95d02">樱草色**</small> 通过微信捐赠<small style="color: red;"> 2 </small>元</p>
                <p><small class="text-primary">2019.05.05 18:56</small> 支付宝用户 <small style="color: #f95d02">赵*云</small> 捐赠<small style="color: red;"> 10 </small>元</p>
                <p><small class="text-primary">2019.05.05 19:42</small> 支付宝用户 <small style="color: #f95d02">抹茶小蛋糕*</small> <small style="color: #ff15e8">小姐姐</small>捐赠<small style="color: red;"> 5.21 </small>元</p>
                <p><small class="text-primary">2019.05.05 21:55</small> 支付宝用户 <small style="color: #f95d02">**飞</small> 捐赠<small style="color: red;"> 10 </small>元</p>
                <p><small class="text-primary">2019.05.06 00:46</small> 支付宝用户 <small style="color: #f95d02">那*天</small> 捐赠<small style="color: red;"> 6.66 </small>元</p>
                <p><small class="text-primary">2019.05.06 21:29</small> 支付宝用户 <small style="color: #f95d02">**娜</small> 捐赠<small style="color: red;"> 99 </small>元 <b style="color: #05df12">附图感谢👇👇👇</b></p>
                <img src="${APP_PATH}/static/img/donate/shouqian001.png" alt="支付宝用户 **娜 捐赠" style="width: 100%"/>
                <p><small class="text-primary">2019.05.06 22:16</small> QQ用户 <small style="color: #f95d02">**大橙子</small> 通过QQ红包捐赠<small style="color: red;"> 10 </small>元</p>
                <p><small class="text-primary">2019.05.11 10:44</small> 支付宝用户 <small style="color: #f95d02">**晴</small> 捐赠<small style="color: red;"> 10 </small>元</p>
                <p><small class="text-primary">2019.05.15 08:12</small> QQ用户 <small style="color: #f95d02">**螺</small> 通过微信捐赠<small style="color: red;"> 10 </small>元</p>
                <p><small class="text-primary">2019.05.20 17:53</small> 支付宝用户 <small style="color: #f95d02">**辉</small> 捐赠<small style="color: red;"> 20 </small>元</p>
                <p><small class="text-primary">2019.05.22 15:58</small> 支付宝用户 <small style="color: #f95d02">*华伟</small> 捐赠<small style="color: red;"> 10 </small>元</p>
                <p><small class="text-primary">2019.05.23 14:22</small> 支付宝用户 <small style="color: #f95d02">*海康</small> 捐赠<small style="color: red;"> 10 </small>元</p>
                <p><small class="text-primary">2019.05.23 23:09</small> QQ用户 <small style="color: #f95d02">Surpa*</small> 通过微信捐赠<small style="color: red;"> 100 </small>元 <b style="color: #05df12">附图感谢👇👇👇</b></p>
                <img src="${APP_PATH}/static/img/donate/shouqian002.png" alt="支付宝用户 **娜 捐赠" style="width: 100%"/>
                <p><small class="text-primary">2019.05.25 15:47</small> QQ用户 <small style="color: #f95d02">执*</small> 通过微信捐赠<small style="color: red;"> 6.66 </small>元</p>
                <p><small class="text-primary">2019.06.12 15:22</small> QQ用户 <small style="color: #f95d02">*嘉君</small> 通过支付宝捐赠<small style="color: red;"> 10 </small>元</p>
                <p><small class="text-primary">2019.06.28 10:46</small> 支付宝用户 <small style="color: #f95d02">*迷</small> 捐赠<small style="color: red;"> 50 </small>元</p>
                <p><small class="text-primary">2019.07.02 12:53</small> 支付宝用户 <small style="color: #f95d02">*渭超</small> 捐赠<small style="color: red;"> 30 </small>元</p>
                <p><small class="text-primary">2019.07.06 09:29</small> 支付宝用户 <small style="color: #f95d02">*泓*</small> 捐赠<small style="color: red;"> 35 </small>元</p>
                <p><small class="text-primary">2019.07.12 22:15</small> 支付宝用户 <small style="color: #f95d02">*潇</small> 捐赠<small style="color: red;"> 30 </small>元</p>
                <p><small class="text-primary">2019.07.16 15:15</small> 支付宝用户 <small style="color: #f95d02">*浩</small> 捐赠<small style="color: red;"> 30 </small>元</p>
                <p><small class="text-primary">2019.07.27 09:36</small> 支付宝用户 <small style="color: #f95d02">*建波</small> 捐赠<small style="color: red;"> 30 </small>元</p>
                <p><small class="text-primary">2019.08.05 17:30</small> 支付宝用户 <small style="color: #f95d02">*晏华</small> 捐赠<small style="color: red;"> 30 </small>元</p>
                <p><small class="text-primary">2019.08.08 22:17</small> 支付宝用户 <small style="color: #f95d02">*彦龙</small> 捐赠<small style="color: red;"> 30 </small>元</p>
                <p><small class="text-primary">2019.08.15 18:24</small> 支付宝用户 <small style="color: #f95d02">*嘉越</small> 捐赠<small style="color: red;"> 30 </small>元</p>
                <p><small class="text-primary">2019.09.10 21:52</small> 支付宝用户 <small style="color: #f95d02">*柏甫</small> 捐赠<small style="color: red;"> 10 </small>元</p>
                <p><small class="text-primary">2019.09.18 16:28</small> 支付宝用户 <small style="color: #f95d02">*一博</small> 捐赠<small style="color: red;"> 50 </small>元</p>
                <p><small class="text-primary">2019.09.18 16:49</small> 支付宝用户 <small style="color: #f95d02">*云</small> 捐赠<small style="color: red;"> 30 </small>元</p>
                <p><small class="text-primary">2019.09.27 09:29</small> 微信用户 <small style="color: #f95d02">M*o</small> 捐赠<small style="color: red;"> 50 </small>元</p>
                <p><small class="text-primary">2019.09.28 11:49</small> 支付宝用户 <small style="color: #f95d02">*涵</small> 捐赠<small style="color: red;"> 60 </small>元</p>
                <p><small class="text-primary">2019.09.30 10:29</small> 微信用户 <small style="color: #f95d02">*隆</small> 捐赠<small style="color: red;"> 30 </small>元</p>
                <p><small class="text-primary">2019.10.05 08:55</small> 微信用户 <small style="color: #f95d02">*兄</small> 捐赠<small style="color: red;"> 50 </small>元</p>
                <p><small class="text-primary">2019.10.13 16:15</small> 支付宝用户 <small style="color: #f95d02">*宇晴</small> 捐赠<small style="color: red;"> 83 </small>元</p>
                <p><small class="text-primary">2019.10.19 19:36</small> 支付宝用户 <small style="color: #f95d02">*礼嘉</small> 捐赠<small style="color: red;"> 100 </small>元 <b style="color: #05df12">附图感谢👇👇👇</b></p>
                <img src="${APP_PATH}/static/img/donate/shouqian003.png" alt="支付宝用户 *礼嘉 捐赠" style="width: 100%"/>
                <p><small class="text-primary">2019.10.23 09:30</small> 微信用户 <small style="color: #f95d02">J*s</small> 捐赠<small style="color: red;"> 10 </small>元</p>
                <h4>......</h4>
            </div>
            <div class="row">
                <div class="col-md-12"
                     style="position: relative; background-color: #f6f6f6; height: 30px;"></div>
            </div>
        </div>
    </div>
</div>

<jsp:include page="/content/top.jsp"></jsp:include>

</body>
</html>