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
        <div class="col-md-12 col-xs-12">
            <a href="${APP_PATH }/album.jsp" class="text-primary"><span class="glyphicon glyphicon-menu-left" style="top: 2px;"></span> 我的相册</a>
        </div>
        <div class="col-md-10 col-xs-5">
            <h4>
                <!-- 相册名 -->
                <b id="showPhoto_name" class="text-info"></b>
            </h4>
        </div>
        <div>
            <div class="col-md-1 col-xs-3" style="top: 4px;">
                <button id="albumEdit_button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#albumEdit">
                    <span class="glyphicon glyphicon-pencil"></span> 编辑相册</button>
                </div>
            <div class="col-md-1 col-xs-3" style="top: 4px;">
            <button id="photoAdd_button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#photoAdd">
                <span class="glyphicon glyphicon-arrow-up"></span> 上传照片</button>
            </div>
        </div>
        <br><br><br><br>
    </div>

    <!-- 下部 -->
    <div class="row">
        <!-- 该相册下无照片时显示 -->
        <ul id="photo_null" style="display: none;">
            <div>
                <br><br><br>
                <div class="text-center">
                    <p class="text-danger">生活点滴，不忘记录</p>
                    <button id="photo_null_photoAdd" class="btn btn-primary" data-toggle="modal" data-target="#photoAdd">
                        <span class="glyphicon glyphicon-arrow-up"></span> 上传照片</button>
                    <br>
                    <img alt="该相册下无照片" src="${APP_PATH}/static/img/photo/wuzhaopian.png">
                </div>
            </div>
        </ul>
        <ul id="photo_all" style="display: none;">
            <!-- 照片列表 - 模板 -->
            <div id="showPhoto_hide" style="display: none;">
                <div class="col-md-2 col-xs-6" id="showPhoto_Xid">
                    <li>
                        <div style="position: relative;width: 160px;height:160px;" class="text-center">
                            <a id="showPhoto_a" target="_blank">
                                <img style="position: relative;width: 100%;height:100%;" class="img-rounded">
                            </a>
                        </div>
                        <div>
                            <a id="showPhoto_del" href="javascript:void(0)"
                               style="position: relative;top: -160px;left: 145px; z-index: 9; color: red;" class="glyphicon glyphicon-remove"></a>
                        </div>
                    </li>
                </div>
            </div>
            <!-- 照片列表-实际数据 -->
            <div id="showPhoto_all"></div>
        </ul>
    </div>
</div>

<script src="${APP_PATH }/static/js/photo/showPhoto.js"></script>
<script src="${APP_PATH }/static/js/photo/photo.js"></script>
<script src="${APP_PATH }/static/js/delete.js"></script>
<script src="${APP_PATH }/static/js/photo/photoDel.js"></script>
<script src="${APP_PATH }/static/js/photo/albumEdit.js"></script>
<script src="${APP_PATH }/static/js/photo/photoAdd.js"></script>

</body>
</html>