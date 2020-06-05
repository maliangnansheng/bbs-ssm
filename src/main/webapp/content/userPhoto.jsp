<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>用户头像上传</title>
<%
	pageContext.setAttribute("APP_PATH", request.getContextPath());
%>
</head>
<body>
	<div class="container">
		<!-- <button type="button" class="btn btn-primary" data-toggle="modal"
			data-target="#userPhoto">按钮</button> -->

		<div class="modal fade" id="userPhoto" tabindex="-1" role="dialog"
			aria-labelledby="exampleModalLabel">
			<div class="modal-dialog" role="document">
				<div class="modal-content col-md-6 col-md-offset-3">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h3 class="modal-title text-center" id="exampleModalLabel">上传你的头像</h3>
						<p class="text-center">听说，带有个性的头像很有趣</p>
					</div>
					<div class="modal-body" id="userPhotoEdit_all">
						<form method="put" enctype="multipart/form-data">
							<%-- 进度条 --%>
							<jsp:include page="/content/progress.jsp"></jsp:include>
							<p class="text-muted">在本地选择你的头像：</p>
							<div class="form-group">
								<div id="user_preview">
									<a href="javascript:void(0)">
										<img class="img-thumbnail" style="position: relative; width: 100%; height: 100%;" id="user_imghead"
											src="${APP_PATH}/static/img/fatiePhoto.png" onclick='$("#user_previewImg").click();'>
									</a>
								</div>
								<%-- accept="image/*"：接受所有的图像文件、audio/*、video/*、MIME_type --%>
								<input type="file" onchange="user_previewImage(this)" style="display: none;" id="user_previewImg" name="photo" accept="image/*">
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-default" data-dismiss="modal">返回</button>
								<button type="button" class="btn btn-primary" onclick="userPhotoUpdate()">保存</button>
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