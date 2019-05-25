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
	<div class="container-fluid">
		<nav class="navbar navbar-default row no-yj  navbar-fixed-top">
			<div class="container-fluid">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed"
						data-toggle="collapse" data-target="#nav-list-left"
						aria-expanded="false">
						<span class="sr-only">Toggle navigation</span> <span
							class="icon-bar"></span> <span class="icon-bar"></span> <span
							class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="${APP_PATH }/admin/index.jsp">刷新页面</a>
				</div>
				
				<!-- 判断是否登录，此为未登录时显示内容 -->
				<c:if test="${empty adminList}">
					<div class="collapse navbar-collapse pull-right"
						id="bs-example-navbar-collapse-1">
						<ul class="nav navbar-nav">
							<li>
								<!-- 右上 -->
								<a class="dropdown-toggle" href="#" style="height: 50px"
									data-toggle="modal" data-target="#adminLoginModal">
									<span class="pull-left nav-username">登录</span>
								</a>
							</li>
						</ul>
					</div>
				</c:if>
				<!-- 判断是否登录，此为登录时显示内容 -->
				<c:if test="${!empty adminList}">
					<!-- 退出管理员登录 -->
					<div class="collapse navbar-collapse pull-right"
						id="bs-example-navbar-collapse-1">
						<ul class="nav navbar-nav">
							<li>
								<!-- 右上 -->
								<a class="dropdown-toggle" href="${APP_PATH }/adminController/adminExit" style="height: 50px">
									<span class="pull-left nav-username">退出</span>
								</a>
							</li>
						</ul>
					</div>
					<!-- 登录管理员信息 -->
					<div class="collapse navbar-collapse pull-right"
						id="bs-example-navbar-collapse-1">
						<ul class="nav navbar-nav">
							<li>
								<!-- 右上 -->
								<a class="dropdown-toggle" data-toggle="dropdown" href="#"
									style="height: 50px">
									<img
										class="img-circle pull-left img-responsive nav-user-img"
										src="${APP_PATH }/static/img/admin/user.jpg" />
									<span class="pull-left nav-username">管理员-${adminList.aname }</span>
								</a>
		
								<!-- 右上（打开） -->
								<ul class="dropdown-menu dropdown-menu-right clearfix"
									style="padding-top: 0px">
									<li class="user-li-head"><span> <img
											class="img-circle nav-user-img-xiala center-block"
											src="${APP_PATH }/static/img/admin/user.jpg" /></span>
										<p></p>
										<p class="text-center">
											<span>管理部 - 管理员</span>
										</p>
										<p class="text-center">
											<span>${adminList.aname}</span>
										</p>
										<p class="text-center">
											<small><span>${adminList.atime}</span></small>
										</p>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</c:if>
			</div>
		</nav>
	</div>

	<script src="${APP_PATH }/static/js/jquery-3.3.1.min.js"></script>
	<script src="${APP_PATH }/static/bootstrap/js/bootstrap.js"></script>
	<script src="${APP_PATH }/static/bootstrap/js/npm.js"></script>
	<script src="${APP_PATH }/static/js/layer/layer.js"></script>

</body>
</html>