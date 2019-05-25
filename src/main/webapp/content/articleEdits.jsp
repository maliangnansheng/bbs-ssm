<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>修改帖子</title>
<%
	pageContext.setAttribute("APP_PATH", request.getContextPath());
%>
</head>

<body>
	<div class="container">
		<div class="modal fade" id="articleEdit" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
			<div class="modal-dialog" role="document">
				<div class="modal-content col-md-12">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h3 class="modal-title text-center" id="exampleModalLabel">修改该条帖子</h3>
						<p class="text-center">以下是你将修改帖子的原内容</p>
					</div>
					<div class="modal-body" id="article_Edit_all"></div>
				</div>
			</div>
		</div>
	</div>
	
	<script src="${APP_PATH }/static/js/images_update.js"></script>
</body>
</html>
