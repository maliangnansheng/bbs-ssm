<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>头部</title>
    <%
        pageContext.setAttribute("APP_PATH", request.getContextPath());
    %>
    <link href="${APP_PATH}/static/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="${APP_PATH}/static/css/css.css" rel="stylesheet">

    <link rel="stylesheet" href="${APP_PATH}/static/editor.md-master/css/editormd.min.css"/>
    <link rel="stylesheet" href="${APP_PATH}/static/editor.md-master/css/editormd.preview.min.css"/>
</head>
<body>
<!--导航条（头）-->
<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed"
                            data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
                            aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span> <span
                            class="icon-bar"></span> <span class="icon-bar"></span> <span
                            class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="${APP_PATH}/index.jsp">
                        <img class="img_logo" alt="Brand" src="${APP_PATH}/static/img/logo-lanse.png">
                    </a>
                </div>
                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse"
                     id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="${APP_PATH}/index.jsp">首页 <span class="sr-only">(current)</span></a>
                        </li>
                    </ul>
                    <form class="navbar-form navbar-left" action="${APP_PATH }/common/getArticleTitle" method="post">
                        <div class="row">
                            <div class="col-xs-9 col-md-8">
                                <input type="text" name="articleTitle" class="form-control" placeholder="输入收索内容..."
                                       required>
                            </div>
                            <div class="col-xs-3 col-md-4">
                                <button type="button" class="btn btn-primary">搜索</button>
                            </div>
                        </div>
                    </form>
                    <ul class="nav navbar-nav navbar-right">
                        <c:if test="${empty username}">
                            <li>
                                <a data-toggle="modal" data-target="#loginModal" href="#" id="loginButton">登录</a>
                            </li>
                        </c:if>
                        <c:if test="${!empty username}">
                            <li>
                                <a href="${APP_PATH}/posted.jsp">写文章</a>
                            </li>
                            <!-- pc -->
                            <li class="dropdown"><a href="#" class="dropdown-toggle"
                                                    data-toggle="dropdown" role="button" aria-haspopup="true"
                                                    aria-expanded="false">${username}<span class="caret"></span></a>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a href="#" onclick="skipMycontent()">
                                            <div class="row">
                                                <div class="col-xs-1 col-md-2 col-md-offset-1">
                                                    <img src="${APP_PATH}/static/img/wodezhuye.png">
                                                </div>
                                                <div class="col-xs-3 col-md-6">我的主页</div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="${APP_PATH}/album.jsp">
                                            <div class="row">
                                                <div class="col-xs-1 col-md-2 col-md-offset-1">
                                                    <img src="${APP_PATH}/static/img/xinagce.png">
                                                </div>
                                                <div class="col-xs-3 col-md-6">我的相册</div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" data-toggle="modal" data-target="#setup">
                                            <div class="row">
                                                <div class="col-xs-1 col-md-2 col-md-offset-1">
                                                    <img src="${APP_PATH}/static/img/shezhi.png">
                                                </div>
                                                <div class="col-xs-6 col-md-6">设置</div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="${APP_PATH}/userController/userExit">
                                            <div class="row">
                                                <div class="col-xs-1 col-md-2 col-md-offset-1">
                                                    <img src="${APP_PATH}/static/img/tuichu.png">
                                                </div>
                                                <div class="col-xs-6 col-md-6">退出</div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </c:if>
                        <li>
                            <a href="javascript:void(0)">
                                <small style="color: rgba(0,0,0,0.4);">版本号v2.6</small>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</nav>

<script src="${APP_PATH }/static/js/phones_pc.js"></script>
<script src="${APP_PATH}/static/js/jquery-3.3.1.min.js"></script>
<script src="${APP_PATH}/static/bootstrap/js/bootstrap.js"></script>
<script src="${APP_PATH }/static/js/layer/layer.js"></script>

<script src="${APP_PATH}/static/editor.md-master/lib/marked.min.js"></script>
<script src="${APP_PATH}/static/editor.md-master/lib/prettify.min.js"></script>
<script src="${APP_PATH}/static/editor.md-master/editormd.min.js"></script>

<script src="${APP_PATH}/static/js/share.js"></script>

<script>
    // 用户名字数限制
    const userNameLength = 20;
    // 用户密码数限制
    const userPasswordLength = 6;
    // 文章标题数限制
    const articleTitleLength = 120;
    // 家庭住址数限制
    const userFamilyLength = 100;
    // 个人简介数限制
    const userIntroLength = 1000;
    // 年龄数限制
    const userAgeSize = 120;
    // 相册名数限制
    const albumNameLength = 20;

    /*跳转到我的主页*/
    function skipMycontent() {
        window.location.href = "${APP_PATH }/myself.jsp";
    }

    /**
     * 中英文统计(一个中文算两个字符)
     */
    function chEnWordCount(str){
        var count = str.replace(/[^\x00-\xff]/g,"**").length;
        return count;
    }

    /**
     * ajax默认设置 包括默认提交方式为POST， 判断后台是否是重定向
     */
    $.ajaxSetup({
        // 设置ajax请求结束后的执行动作
        complete : function(XMLHttpRequest, textStatus) {
            // 通过XMLHttpRequest取得响应头，redirect
            var redirect = XMLHttpRequest.getResponseHeader("redirect");
            if (redirect == "redirect") { // 若HEADER中含有redirect说明后端想重定向
                var win = window;
                while (win != win.top) {
                    win = win.top;
                }
                // 将后端重定向的地址取出来,使用win.location.href去实现重定向的要求
                win.location.href = "${APP_PATH }" + XMLHttpRequest.getResponseHeader("url");
            }
        },
        type : 'POST'
    });
</script>
</body>
</html>
