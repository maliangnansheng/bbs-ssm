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
    <title>论坛简介、更新日志、友情链接、友情捐赠</title>
    <%
        pageContext.setAttribute("APP_PATH", request.getContextPath());
    %>
</head>
<body>
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
        <p><small class="text-warning">2019.06.05</small> 南生论坛增加相册照片功能</p>
        <p><small class="text-warning">2019.11.19</small> 南生论坛支持Markdown功能</p>
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
            <a href="http://blog.nanshengbbs.top:8080" target="_blank">
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
        <div>
            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist">
                <!-- 10元 -->
                <li role="presentation" class="active">
                    <a href="#rmb-10" aria-controls="rmb-10" role="tab" data-toggle="tab">10 元</a>
                </li>
                <!-- 20元 -->
                <li role="presentation">
                    <a href="#rmb-20" aria-controls="rmb-20" role="tab" data-toggle="tab">20 元</a>
                </li>
                <!-- 我是土豪 -->
                <li role="presentation">
                    <a href="#rmb-99" aria-controls="rmb-99" role="tab" data-toggle="tab">我是土豪😏</a>
                </li>
            </ul>
        </div>
        <!-- Tab panes -->
        <div class="tab-content">
            <!--10元-->
            <div role="tabpanel" class="tab-pane active" id="rmb-10">
                <img src="${APP_PATH}/static/img/donate/zhifubao-10.jpg" alt="支付宝" style="width: 100%"/>
                <hr>
                <img src="${APP_PATH}/static/img/donate/weixin-10.png" alt="微信" style="width: 100%"/>
            </div>

            <!--20元-->
            <div role="tabpanel" class="tab-pane" id="rmb-20">
                <img src="${APP_PATH}/static/img/donate/zhifubao-20.jpg" alt="支付宝" style="width: 100%"/>
                <hr>
                <img src="${APP_PATH}/static/img/donate/weixin-20.png" alt="微信" style="width: 100%"/>
            </div>

            <!--我是土豪-->
            <div role="tabpanel" class="tab-pane" id="rmb-99">
                <img src="${APP_PATH}/static/img/donate/zhifubao-99.jpg" alt="支付宝" style="width: 100%"/>
                <hr>
                <img src="${APP_PATH}/static/img/donate/weixin-99.png" alt="微信" style="width: 100%"/>
            </div>
        </div>

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
        <p>
            <a href="javascript:void(0)" onclick="skipDonate()">查看捐赠信息</a>
        </p>
        <br>
    </div>
    <br>
</body>
</html>