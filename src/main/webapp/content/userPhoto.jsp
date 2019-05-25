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
					<div class="modal-body" id="userPhotoEdit_all"></div>
				</div>
			</div>
		</div>
	</div>
	
	<script src="${APP_PATH }/static/js/images_photo.js"></script>
</body>
</html>