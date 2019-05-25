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
						<img src="${APP_PATH }/static/img/admin/login.png"
							style="position: relative; width: 100%; height: 280px">
					</div>
					<div class="col-xs-6 col-md-6">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
							<div class="text-center">
								<h4 class="modal-title">管理员登录</h4>
							</div>
						</div>
						<div class="modal-body">
							<form action="${APP_PATH}/adminController/getLogin" method="post">
								<div class="form-group">
									<input type="text" class="form-control" name="aname"
										required="required" placeholder="用户名">
								</div>
								<div class="form-group">
									<input type="password" class="form-control" name="apassword"
										required="required" placeholder="密码">
								</div>
								<!-- <p style="font-size: 10px">
									还没有账号？ <a href="#" data-toggle="modal"
										data-target="#SignUpModal" data-dismiss="modal"
										aria-label="Close">立即注册</a>
								</p> -->
								<div class="form-group">
									<div class="row" style="position: relative; top: 10px;">
										<div class="col-md-8">
											<button type="reset" class="btn btn-default">清除</button>
										</div>
										<div class="col-md-4">
											<button type="submit" class="btn btn-primary">登录</button>
										</div>
									</div>
									<div class="text-danger text-center"
										style="position: relative; top: 20px; font-size: 10px;"></div>
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
					<div class="col-md-6">
						<img src="${APP_PATH }/static/img/admin/login.png"
							style="position: relative; width: 100%; height: 380px;">
					</div>
					<div class="col-md-6">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
							<div class="text-center">
								<h4 class="modal-title">管理员注册</h4>
							</div>
						</div>
						<div class="modal-body">
							<form action="${APP_PATH}/adminController/setSignUp" method="post">
								<div class="form-group">
									<input type="text" class="form-control" name="aname"
										required="required" placeholder="用户名">
								</div>
								<div class="form-group">
									<input type="password" class="form-control" name="apassword"
										id="apassword" required="required" placeholder="密码">
								</div>
								<div class="form-group">
									<input type="password" class="form-control" id="arepassword"
										required="required" placeholder="确认密码">
								</div>
								<p style="font-size: 10px">
									已有账号？ <a href="#" data-toggle="modal" data-target="#adminLoginModal"
										data-dismiss="modal" aria-label="Close">登录</a>
								</p>
								<div class="form-group">
									<div class="row" style="position: relative; top: 10px;">
										<div class="col-md-8">
											<button type="reset" class="btn btn-default">清除</button>
										</div>
										<div class="col-md-4">
											<button type="submit" class="btn btn-primary"
												onclick="return confirmPass();">注册</button>
										</div>
									</div>
								</div>
								<div class="text-danger text-center" id="confirmPassExit"
									style="position: relative; top: 10px; font-size: 10px;"></div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<script type="text/javascript">
		//点击提交按钮时，触发confirmPass事件，会进行弹框提醒以防无视错误信息提交
		function confirmPass() {
			var apass = document.getElementById("apassword").value;
			var arepass = document.getElementById("arepassword").value;
			if (apass != arepass) {
				var str = "两次输入的密码不一致！";
				/* 显示提示信息 */
				document.getElementById("confirmPassExit").innerHTML = str;
				/* 清空指定输入框 */
				document.getElementById("apassword").value = "";
				document.getElementById("arepassword").value = "";
				/* 将光标定为到指定文本框 */
				document.getElementById("apassword").focus();
				return false;
			}

			/* 清空指定div */
			document.getElementById("confirmPassExit").innerHTML = "";
		}
	</script>
</body>
</html>