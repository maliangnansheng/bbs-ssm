<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>设置</title>
<%
	pageContext.setAttribute("APP_PATH", request.getContextPath());
%>
</head>
<body>
<div class="modal fade" id="setup" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content col-md-12">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
						aria-hidden="true">&times;</span></button>
				<h3 class="modal-title text-center" id="exampleModalLabel">基本信息设置</h3>
			</div>
			<div class="modal-body">
				<form class="form-horizontal">
					<div class="form-group">
						<div class="row">
							<label class="col-md-2 control-label">用户名</label>
							<div class="col-md-10">
								<p class="form-control-static">
									<!-- 旧用户名 -->
									<span id="setup_span_username"></span>
									<a href="#" id="setup_username_on" class="text-success"><b>修改</b></a>
								</p>
							</div>
						</div>
						<div class="row" id="setup_username" style="display: none;">
							<div class="col-xs-8 col-md-6 col-md-offset-2">
								<input type="text" id="setup_name_id" placeholder="输入新用户名" class="form-control" onkeyup="onkeyupUsernameUpdate()">
							</div>
							<div class="col-xs-2 col-md-2">
								<input type="button" id="setup_username_save" class="btn btn-sm btn-primary" value="确定">
							</div>
							<div class="col-xs-2 col-md-2">
								<a href="#" id="setup_username_off" style="position:absolute; top: 8px;">
									<span class="glyphicon glyphicon-remove"></span>
								</a>
							</div>
						</div>
					</div>

					<div class="form-group">
						<div class="row">
							<label class="col-md-2 control-label">密码</label>
							<div class="col-md-10">
								<p class="form-control-static">*********
									<a href="#" id="setup_password_on" class="text-success"><b>修改</b></a>
								</p>
							</div>
						</div>
						<div class="row" id="setup_password" style="display: none;">
							<div class="col-xs-8 col-md-6 col-md-offset-2">
								<input type="password" id="setup_password_old" placeholder="输入原密码" class="form-control">
								<input type="password" id="setup_password_new" placeholder="输入新密码" class="form-control" onkeyup="onkeyupUserpasswordUpdate()"
									style="position: relative; top: 10px;">
							</div>
							<div class="col-xs-2 col-md-2" style="position: relative; top: 48px;">
								<input type="button" id="setup_password_save" class="btn btn-sm btn-primary" value="确定">
							</div>
							<div class="col-xs-2 col-md-2" style="position: relative; top: 48px;">
								<a href="#" id="setup_password_off" style="position:absolute; top: 8px;">
									<span class="glyphicon glyphicon-remove"></span>
								</a>
							</div>
						</div>
					</div>

					<div class="form-group">
						<div class="row">
							<label class="col-md-2 control-label">Email</label>
							<div class="col-md-10">
								<p class="form-control-static">
									<!-- 旧Email -->
									<span id="setup_span_email"></span>
									<a href="#" id="setup_email_on" class="text-success"><b>修改</b></a>
								</p>
							</div>
						</div>
						<div class="row" id="setup_email" style="display: none;">
							<div class="col-xs-8 col-md-6 col-md-offset-2">
								<small class="text-danger">支持的邮箱：163.com、qq.com、gmail.com</small>
								<input type="email" id="setup_email_id" placeholder="输入新Email" class="form-control">
							</div>
							<div class="col-xs-2 col-md-2" style="position: relative; top: 20px;">
								<input type="button" id="setup_email_save" class="btn btn-sm btn-primary" value="确定">
							</div>
							<div class="col-xs-2 col-md-2" style="position: relative; top: 20px;">
								<a href="#" id="setup_email_off" style="position:absolute; top: 8px;">
									<span class="glyphicon glyphicon-remove"></span>
								</a>
							</div>
						</div>
					</div>

					<div class="modal-footer"></div>
				</form>
			</div>
		</div>
	</div>
</div>

<script src="${APP_PATH }/static/js/head/setup.js"></script>

</body>
</html>