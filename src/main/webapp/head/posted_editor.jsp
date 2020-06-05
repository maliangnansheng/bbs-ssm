<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c"
    uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>写文章</title>
    <%
        pageContext.setAttribute("APP_PATH", request.getContextPath());
    %>
</head>
<body style="background-color: #ffffff">
<div class="container">
    <div class="modal-body" id="posted_all"></div>
    <form method="post" enctype="multipart/form-data">
        <div class="row">
            <div class="col-md-2 col-md-offset-5 col-xs-7 col-xs-offset-2">
                <h4 align="center"><b>写文章</b></h4>
                <span align="center">
                    <small class="text-danger">注意：</small>
                    <small class="text-warning">单个文件不得超过10M</small>
                </span>
            </div>
            <div class="col-md-2 col-md-offset-3 col-xs-3">
                <button type="button" id="issue-submit" class="btn btn-primary" disabled="disabled">发布</button>
            </div>
        </div>
        <br>

        <div class="form-group col-md-10 col-md-offset-1" align="center">
            <%-- 进度条 --%>
            <jsp:include page="/content/progress.jsp"></jsp:include>
            <p id="add_titu" style="display: none;">添加题图↓↓↓</p>
            <div style="background-color: #f6f6f6; border-radius: 2px;">
                <a href="#" onclick="$('#f_previewImg').click();">
                    <div id="f_preview" align="center">
                        <img id="f_imghead" src="${APP_PATH}/static/img/fatiePhotoEditor.png">
                    </div>
                </a>
                <%-- accept="image/*"：接受所有的图像文件、audio/*、video/*、MIME_type --%>
                <input type="file" onchange="f_previewImage(this)" style="display: none;" id="f_previewImg" accept="image/*,video/*">
            </div>
        </div>

        <div class="form-group col-md-10 col-md-offset-1">
            <input type="text" style="height:60px; font-size: 20px; font-weight: bold;" class="form-control" onkeyup="onkeyupArticleTicleAdd()"
                   placeholder="请输入标题..." id="titles">
        </div>

        <div class="form-group col-md-10 col-md-offset-1">
            <!-- 板块 - 模板 -->
            <div id="posted_plate_hide" style="display: none;">
                <option></option>
            </div>
            <!-- 板块-实际数据 -->
            <select id="posted_plate_all" class="form-control" style="cursor:pointer;"></select>
        </div>
        <div id="my-editormd" style="z-index: 2000;">
            <textarea class="editormd-markdown-textarea" id="fcontent"></textarea>
            <%--<textarea class="editormd-html-textarea" name="fcontent"></textarea>--%>
        </div>
    </form>
</div>

<script src="${APP_PATH }/static/js/images.js"></script>
<script src="${APP_PATH }/static/js/head/posted_editor.js"></script>
</body>
</html>
