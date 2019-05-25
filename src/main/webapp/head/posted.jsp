<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 
    uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>发帖</title>
<%
	pageContext.setAttribute("APP_PATH", request.getContextPath());
%>
</head>
<body>
	<div class="container">
		<!-- <button type="button" class="btn btn-primary" data-toggle="modal"
			data-target="#faTie">按钮</button> -->

		<div class="modal fade" id="faTie" tabindex="-1" role="dialog"
			aria-labelledby="exampleModalLabel">
			<div class="modal-dialog" role="document">
				<div class="modal-content col-md-11">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h3 class="modal-title text-center" id="exampleModalLabel">写下你的帖子</h3>
						<p class="text-center">具有创新的帖子更易得到关注和评论</p>
						<p class="text-center text-danger">需知：你所发布的帖子需要通过管理员审核通过后才能在首页展示</p>
					</div>
					<div class="modal-body" id="posted_all"></div>
				</div>
			</div>
		</div>
	</div>
	
	<script src="${APP_PATH }/static/js/images.js"></script>
</body>
</html>
