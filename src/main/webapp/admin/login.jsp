<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>管理员(登录、注册)</title>
<%
	pageContext.setAttribute("APP_PATH", request.getContextPath());
%>
</head>
<body>
<!--登录模态框-->
<div class="modal fade" id="adminLoginModal" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="row">
				<div class="col-xs-6 col-md-6">
					<img src="${APP_PATH }/static/img/admin/login.png" style="position: relative; width: 100%; height: 280px">
				</div>
				<div class="col-xs-6 col-md-6">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<div class="text-center">
							<h4 class="modal-title">管理员登录</h4>
						</div>
					</div>
					<div class="modal-body">
						<form id="form_adminLogin" method="get">
							<div class="form-group">
								<input type="text" class="form-control" id="admin_name" name="aname" required="required" placeholder="用户名">
							</div>
							<div class="form-group">
								<input type="password" class="form-control" id="admin_password" name="apassword" required="required" placeholder="密码">
							</div>
							<div class="form-group">
								<div class="row" style="position: relative; top: 10px;">
									<div class="col-md-8 col-xs-8">
										<button type="reset" class="btn btn-default">清除</button>
									</div>
									<div class="col-md-4 col-xs-4">
										<button type="button" class="btn btn-primary" onclick="return adminLogin()">登录</button>
									</div>
								</div>
								<div class="text-danger text-center" style="position: relative; top: 20px; font-size: 10px;"></div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script src="${APP_PATH }/static/js/admin/login.js"></script>
</body>
</html>