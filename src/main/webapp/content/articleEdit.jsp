<%@ page language="java" contentType="text/html; charset=UTF-8"
		 pageEncoding="UTF-8"%>
<%@ taglib prefix="c"
		   uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>修改文章</title>
	<%
		pageContext.setAttribute("APP_PATH", request.getContextPath());
	%>
</head>
<body style="background-color: #ffffff">
<div class="container">
	<div class="modal-body" id="posted_all"></div>
	<form method="put" enctype="multipart/form-data">
		<input type="hidden" id="article_Edit_fid" name="fid">
		<div class="row">
			<div class="col-md-2 col-md-offset-5 col-xs-7 col-xs-offset-2">
				<h4 align="center"><b>修改文章</b></h4>
				<span align="center">
					<small class="text-danger">注意：</small>
					<small class="text-warning">单个文件不得超过10M</small>
				</span>
			</div>
			<div class="col-md-2 col-md-offset-3 col-xs-3">
				<button type="button" id="issue-submit" class="btn btn-primary" disabled="disabled" onclick="return onclickIssue()">更新</button>
			</div>
		</div>
		<br>

		<div class="form-group col-md-10 col-md-offset-1" align="center">
			<%-- 进度条 --%>
			<jsp:include page="/content/progress.jsp"></jsp:include>
			<div style="background-color: #f6f6f6; border-radius: 2px;">
				<a href="#" onclick="$('#f_previewImg').click();">
					<div id="f_preview" align="center">
						<!-- 无配图时显示 -->
						<img class="not_picture" src="${APP_PATH}/static/img/fatiePhotoEditor.png" style="display: none;">
						<!-- 有配图时显示-视频 -->
						<video class="picture_video" style="position: relative;width: 100%;height: 100%; display: none;"></video>
						<!-- 有配图时显示-图片 -->
						<img class="picture_img" style="position: relative;width: 100%;height: 100%; display: none;">
					</div>
				</a>
				<%-- accept="image/*"：接受所有的图像文件、audio/*、video/*、MIME_type --%>
				<input type="file" onchange="f_previewImage(this)" style="display: none;" id="f_previewImg" name="picture" accept="image/*,video/*">
			</div>
		</div>

		<div class="form-group col-md-10 col-md-offset-1">
			<input type="text" style="height:60px; font-size: 20px; font-weight: bold;" class="form-control"
				   placeholder="请输入标题..." id="article_Edit_titles" name="titles" onkeyup="onkeyupTitle()">
		</div>

		<div class="form-group col-md-10 col-md-offset-1">
			<!-- 板块 - 模板 -->
			<div id="article_Edit_bid_hide" style="display: none">
				<option></option>
			</div>
			<!-- 板块-实际数据 -->
			<select class="form-control" name="bid" id="article_Edit_bid" onchange="onchangeBid()" style="cursor:pointer;"></select>
		</div>
		<div id="my-editormd" style="z-index: 2000;">
			<textarea class="editormd-markdown-textarea" name="fcontent" id="article_Edit_fcontent"></textarea>
		</div>
	</form>
</div>

<script src="${APP_PATH }/static/js/images.js"></script>
<script src="${APP_PATH }/static/js/content/articleEdit.js"></script>
</body>
</html>