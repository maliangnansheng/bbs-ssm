<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>上传照片</title>
    <%
        pageContext.setAttribute("APP_PATH", request.getContextPath());
    %>
</head>
<body>
<div class="container">
    <div class="modal fade" id="photoAdd" tabindex="-1" role="dialog"
         aria-labelledby="exampleModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content col-md-10 col-md-offset-1">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"
                            aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h3 class="modal-title text-center" id="exampleModalLabel">上传照片到 -【<b class="text-primary" id="photoAdd_albumName"></b>】</h3>
                </div>
                <div class="modal-body">
                    <form id="form_photoAdd" class="form-horizontal" enctype="multipart/form-data" method="post">
                        <input id="photoAdd_albumFid" type="hidden">
                        <div class="form-group col-md-12">
                            <p class="text-muted">在本地选择你的照片：</p>
                            <div class="form-group">
                                <div id="user_preview" class="col-md-offset-1">
                                    <a href="javascript:void(0)">
                                        <img class="img-thumbnail"
                                             style="position: relative; width: 100%; height: 100%;"
                                             id="user_imghead" src="${APP_PATH }/static/img/fatiePhoto.png"
                                             onclick="$('#user_previewImg').click();">
                                    </a>
                                </div>
                                <input type="file" onchange="user_previewImage(this)" style="display: none;" id="user_previewImg" name="photo">
                            </div>
                            <button type="button" class="btn btn-primary col-md-offset-11 col-xs-offset-10" onclick="photoAdd()">上传</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="${APP_PATH }/static/js/images_photo.js"></script>
</body>
</html>