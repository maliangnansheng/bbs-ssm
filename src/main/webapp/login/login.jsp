<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
<title>登录、注册</title>
<%
	pageContext.setAttribute("APP_PATH", request.getContextPath());
%>
</head>
<body>
<!--登录模态框-->
<div class="modal fade" id="loginModal" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="row">
				<div class="col-xs-6 col-md-6">
					<img src="${APP_PATH }/static/img/login.png"
						style="position: relative; width: 100%; height: 280px">
				</div>
				<div class="col-xs-6 col-md-6">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<div class="text-center">
							<h4 class="modal-title">登录</h4>
						</div>
					</div>
					<div class="modal-body">
						<form>
							<div class="form-group">
								<input type="text" class="form-control" name="name" id="name" placeholder="用户名/邮箱">
							</div>
							<div class="form-group">
								<input type="password" class="form-control" name="password" id="password" placeholder="密码">
							</div>
							<p style="font-size: 10px">
								还没有账号？ <a href="#" data-toggle="modal"
									data-target="#SignUpModal" data-dismiss="modal"
									aria-label="Close" class="text-success">立即注册</a>
							</p>
							<div class="form-group">
								<div class="row" style="position: relative; top: 10px;">
									<div class="col-xs-5 col-md-8">
										<button type="reset" class="btn btn-default">清空</button>
									</div>
									<div class="col-xs-7 col-md-4">
										<button type="button" id="login" class="btn btn-primary">登录</button>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!--注册模态框-->
<div class="modal fade" id="SignUpModal" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="row">
				<div class="col-xs-6 col-md-6">
					<img src="${APP_PATH }/static/img/login.png"
						style="position: relative; width: 100%; height: 380px;">
				</div>
				<div class="col-xs-6 col-md-6">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<div class="text-center">
							<h4 class="modal-title">注册</h4>
						</div>
					</div>
					<div class="modal-body">
						<form>
							<div class="form-group">
								<input type="text" class="form-control" name="name" id="name2" placeholder="用户名" onkeyup="onkeyupUserNameAdd()">
								<div class="text-danger text-center" id="registerName"
									style="position: relative; top: 8px; font-size: 10px;"></div>
							</div>
							<div class="form-group">
								<input type="password" class="form-control" name="password" onkeyup="onkeyupUserPasswordAdd()" id="password2" placeholder="密码">
							</div>
							<div class="form-group">
								<input type="password" class="form-control" id="repassword" placeholder="确认密码">
							</div>
							<div class="form-group">
								<small class="text-danger">支持的邮箱：163.com、qq.com、gmail.com</small>
								<input type="email" class="form-control" name="email" id="email" placeholder="邮箱">
							</div>
							<p style="font-size: 10px">
								已有账号？ <a href="#" data-toggle="modal" data-target="#loginModal"
									data-dismiss="modal" aria-label="Close" class="text-success">登录</a>
							</p>
							<div class="form-group">
								<div class="row" style="position: relative; top: 10px;">
									<div class="col-xs-5 col-md-8">
										<button type="reset" class="btn btn-default">清空</button>
									</div>
									<div class="col-xs-7 col-md-4">
										<button id="register" type="button" class="btn btn-primary">注册</button>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script src="${APP_PATH }/static/js/login/login.js"></script>

</body>
</html>