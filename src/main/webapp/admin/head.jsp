<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>管理员-头部</title>
<%
	pageContext.setAttribute("APP_PATH", request.getContextPath());
%>
<link href="${APP_PATH }/static/bootstrap/css/bootstrap.css" rel="stylesheet" />
<link href="${APP_PATH }/static/css/base.css" rel="stylesheet" />
</head>
<body>
<%-- 方便ajax获取APP_PATH --%>
<input id="APP_PATH" type="hidden" value="${APP_PATH}" >
<input id="session_userid" type="hidden" value="${userid}" >
<input id="session_username" type="hidden" value="${username}" >
<input id="session_email" type="hidden" value="${email}" >
<input id="session_userPhoto" type="hidden" value="${userPhoto}" >
<input id="session_aname" type="hidden" value="${sessionAname}" >
<input id="session_acreateTime" type="hidden" value="${sessionAcreateTime}" >

<div class="container-fluid">
	<nav class="navbar navbar-default row no-yj  navbar-fixed-top">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed"
					data-toggle="collapse" data-target="#nav-list-left"
					aria-expanded="false">
					<span class="sr-only">切换导航</span> <span
						class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
			</div>

			<%-- 用户端 --%>
			<div>
				<ul class="nav navbar-nav">
					<li>
						<a href="${APP_PATH }/admin/index.jsp" style="height: 50px">
							<span>刷新页面</span>
						</a>
					</li>
					<li>
						<a href="${APP_PATH }/index.jsp" style="height: 50px" target="_blank">
							<span>用户端</span>
						</a>
					</li>
				</ul>
			</div>

			<div class="collapse navbar-collapse pull-right" id="bs-example-navbar-collapse-1">
				<!----------------------------------------- 此为未登录时显示内容 ----------------------------------------->
				<ul class="nav navbar-nav admin_head_logout"  style="display: none;">
					<li>
						<!-- 右上 -->
						<a class="dropdown-toggle" href="#" style="height: 50px"
						   data-toggle="modal" data-target="#adminLoginModal">
							<span class="pull-left nav-username">登录</span>
						</a>
					</li>
				</ul>
				<!----------------------------------------- 此为未登录时显示内容-end ----------------------------------------->

				<!----------------------------------------- 此为登录时显示内容 ----------------------------------------->
				<ul class="nav navbar-nav admin_head_login" style="display: none;">
					<li>
						<!-- 右上 -->
						<a class="dropdown-toggle" data-toggle="dropdown" href="#" style="height: 50px">
							<img class="img-circle pull-left img-responsive nav-user-img" src="${APP_PATH }/static/img/admin/user.jpg" />
							<span class="pull-left nav-username">
								管理员-<span class="admin_name"></span>
							</span>
						</a>

						<!-- 右上（打开） -->
						<ul class="dropdown-menu dropdown-menu-right clearfix" style="padding-top: 0px">
							<li class="user-li-head">
									<span>
										<img class="img-circle nav-user-img-xiala center-block" src="${APP_PATH }/static/img/admin/user.jpg" />
									</span>
								<p></p>
								<p class="text-center">
									<span>
										管理员 - <span class="admin_name"></span>
									</span>
								</p>
								<p class="text-center">
									<!-- 创建时间 -->
									<small>
										<span class="admin_createtime"></span>
									</small>
								</p>
							</li>
						</ul>
					</li>
				</ul>

				<!-- 退出管理员登录 -->
				<ul class="nav navbar-nav admin_head_login"  style="display: none;">
					<li>
						<!-- 右上 -->
						<a class="dropdown-toggle" onclick="adminLogout()" style="height: 50px; cursor: pointer;">
							<span class="pull-left nav-username">退出</span>
						</a>
					</li>
				</ul>
				<!----------------------------------------- 此为登录时显示内容-end ----------------------------------------->
				<ul class="nav navbar-nav">
					<li>
						<a href="javascript:void(0)">
							<small style="color: #e4e4e4;">v2.8.2</small>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</div>

<script src="${APP_PATH }/static/js/jquery-3.3.1.min.js"></script>
<script src="${APP_PATH }/static/bootstrap/js/bootstrap.js"></script>
<script src="${APP_PATH }/static/bootstrap/js/npm.js"></script>
<script src="${APP_PATH }/static/js/layer/layer.js"></script>

<script src="${APP_PATH}/static/js/common.js"></script>
<script src="${APP_PATH}/static/js/admin/head.js"></script>
</body>
</html>