<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>个人相册</title>
    <%
        pageContext.setAttribute("APP_PATH", request.getContextPath());
    %>

    <link href="${APP_PATH }/static/css/photo.css" rel="stylesheet">
</head>
<body>
<%-- 方便ajax获取APP_PATH --%>
<input id="APP_PATH" type="hidden" value="${APP_PATH}" >
<%-- 方便ajax获取session中的userid --%>
<input id="session_userid" type="hidden" value="${userid}" >
<div class="container">
    <!-- 上部 -->
    <div class="row">
        <div class="col-md-4 col-xs-6">
            <a href="${APP_PATH }/myself.jsp" class="text-primary"><span class="glyphicon glyphicon-menu-left" style="top: 2px;"></span> 我的主页</a>
        </div>
        <br><br>
    </div>

    <!-- 下部 -->
    <div class="row" id="showPhoto_all"></div>
</div>
<script src="${APP_PATH }/static/js/photo/showAlbum.js"></script>
<script src="${APP_PATH }/static/js/delete.js"></script>
<script src="${APP_PATH }/static/js/photo/photoDel.js"></script>
<script src="${APP_PATH }/static/js/photo/photoAdd.js"></script>


</body>
</html>