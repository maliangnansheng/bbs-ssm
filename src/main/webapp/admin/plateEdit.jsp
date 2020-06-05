<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>修改板块</title>
<%
	pageContext.setAttribute("APP_PATH", request.getContextPath());
%>
</head>
<body>
	<div class="modal fade" id="plate_Update" tabindex="-1" role="dialog"
		 aria-labelledby="exampleModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content col-md-10 col-md-offset-1">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h3 class="modal-title text-center" id="exampleModalLabel">修改板块</h3>
					<p class="text-center">有意思的板块名可以吸引更多的文章</p>
				</div>
				<div class="modal-body">
					<form id="form_updatePlate">
						<p class="text-muted text-center">原板块名：<small class="text-primary" id="plateEdit_name"></small></p>
						<p class="text-muted text-warning">准备修改为：</p>
						<div class="form-group">
							<input type="text" class="form-control" placeholder="取一个板块名吧" id="plateEdit_new_name" name="bname" required>
						</div>
						<div class="modal-footer">
							<button type="reset" class="btn btn-default">还原</button>
							<button type="button" class="btn btn-primary" id="plateEdit_submit">确定</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</body>
</html>