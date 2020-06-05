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
<div class="container">
    <!-- 上部 -->
    <div class="row">
        <div class="col-md-4 col-xs-6">
            <a href="javascript:void(0)" class="text-primary myself_page"><span class="glyphicon glyphicon-menu-left" style="  top: 2px;"></span> 我的主页</a>
        </div>
        <br><br>
    </div>

    <!-- 下部 -->
    <div class="row">
        <!-- 新建相册按钮 -->
        <div class="col-md-2 col-xs-6">
            <a href="#" data-toggle="modal" data-target="#photoProAdd">
                <div style="position: relative;width: 160px;height:160px; background-color: #ffffff;" class="text-center img-thumbnail">
                    <br><br>
                    <span class="col-md-12 col-xs-12 glyphicon glyphicon-plus text-primary" style="font-size: 30px;"></span>
                    <span class="col-md-12 col-xs-12 text-primary" style="top: 10px;">新建相册</span>
                </div>
            </a>
        </div>

        <!-- 相册展示 - 模板 -->
        <div id="showPhoto_hide" style="display: none;">
            <div class="col-md-2 col-xs-6" id="showPhoto_Fid">
                <div style="position: relative;width: 160px;height:160px;" class="text-center">
                    <a id="showPhoto_a">
                        <!-- 相片 -->
                        <img style="position: relative;width: 100%;height:100%; border-radius: 2px 2px 0px 0px; border-bottom: 1px dashed rgba(0,0,0,0.11);"
                             id="showPhoto_img" class="img-thumbnail">
                        <!-- 按钮 -->
                        <button class="btn btn-default btn-sm" style="width: 100%; border-radius: 0px 0px 2px 2px; border-top: none;"
                                id="showPhoto_button"></button>
                    </a>
                    <a id="showPhoto_del" href="javascript:void(0)" class="glyphicon glyphicon-remove"
                       style="color: red; position: relative; top: -185px;left: 70px;"></a>
                </div>
                <br><br>
            </div>
        </div>
        <!-- 相册展示-实际数据 -->
        <div id="showPhoto_all"></div>
    </div>
</div>

<script src="${APP_PATH }/static/js/photo/showAlbum.js"></script>
<script src="${APP_PATH }/static/js/photo/album.js"></script>
<script src="${APP_PATH }/static/js/delete.js"></script>
<script src="${APP_PATH }/static/js/photo/photoDel.js"></script>
<script src="${APP_PATH }/static/js/photo/photoAdd.js"></script>
</body>
</html>