<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
<title>头部</title>
<%
	pageContext.setAttribute("APP_PATH", request.getContextPath());
%>
<link href="${APP_PATH}/static/bootstrap/css/bootstrap.css" rel="stylesheet">
<link href="${APP_PATH}/static/css/css.css" rel="stylesheet">
</head>
<body>
	<!--导航条（头）-->
	<nav class="navbar navbar-default navbar-fixed-top">
	<div class="container">
		<div class="row">
			<div class="col-md-10 col-md-offset-1">
				<!-- Brand and toggle get grouped for better mobile display -->
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed"
						data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
						aria-expanded="false">
						<span class="sr-only">Toggle navigation</span> <span
							class="icon-bar"></span> <span class="icon-bar"></span> <span
							class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="${APP_PATH}/index.jsp">
						<img class="img_logo" alt="Brand" src="${APP_PATH}/static/img/logo-lanse.png">
					</a>
				</div>
				<!-- Collect the nav links, forms, and other content for toggling -->
				<div class="collapse navbar-collapse"
					id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav">
						<li class="active"><a href="${APP_PATH}/index.jsp">首页 <span class="sr-only">(current)</span></a></li>
					</ul>
					<form class="navbar-form navbar-left" action="${APP_PATH }/common/getArticleTitle" method="post">
						<div class="row">
							<div class="col-xs-9 col-md-8">
								<input type="text" name="articleTitle" class="form-control" placeholder="输入收索内容..." required>
							</div>
							<div class="col-xs-3 col-md-4">
								<button type="submit" class="btn btn-primary">搜索</button>
							</div>
						</div>
					</form>
					<ul class="nav navbar-nav navbar-right">
						<%-- <c:set var="username" value="${username }" scope="session"></c:set> --%>
						<c:if test="${empty username}">
							<%--http://182.61.136.218:8080/BBS_SSM--%>
							<li>
								<a data-toggle="modal" data-target="#loginModal" href="#">登录</a>
							</li>
						</c:if>
						<c:if test="${!empty username}">
							<li>
								<a href="Javascript:void(0)" data-toggle="modal" data-target="#faTie" onclick="postedShow()">发帖</a>
							</li>
							<!-- pc -->
							<li class="dropdown"><a href="#" class="dropdown-toggle"
								data-toggle="dropdown" role="button" aria-haspopup="true"
								aria-expanded="false">${username}<span class="caret"></span></a>
								<ul class="dropdown-menu">
									<li>
										<div class="row">
											<div class="col-xs-3 col-md-6 myself_img">
												<a href="#" onclick="skipMycontent()">
													<img class="img_right_logo"
														src="${APP_PATH}/static/img/wodezhuye.png">
												</a>
											</div>
											<div class="col-xs-3 col-md-6  myself_text">
												<a href="#" onclick="skipMycontent()">我的主页</a>
											</div>
										</div>
									</li>
									<li>
										<div class="row">
											<div class="col-xs-3 col-md-6 myself_img">
												<a href="#" data-toggle="modal" data-target="#setup">
													<img class="img_right_logo"
														src="${APP_PATH}/static/img/shezhi.png">
												</a>
											</div>
											<div class="col-xs-6 col-md-6 myself_text">
												<a href="#" data-toggle="modal" data-target="#setup">设置</a>
											</div>
										</div>
									</li>
									<li>
										<div class="row">
											<div class="col-xs-3 col-md-6 myself_img">
												<a href="${APP_PATH}/userController/userExit">
													<img class="img_right_logo"
														src="${APP_PATH}/static/img/tuichu.png">
												</a>
											</div>
											<div class="col-xs-6 col-md-6 myself_text">
												<a href="${APP_PATH}/userController/userExit">退出</a>
											</div>
										</div>
									</li>
								</ul>
							</li>
						</c:if>
						<li>
							<a href="javascript:void(0)">
								<small style="color: rgba(0,0,0,0.4);">版本号v2.0</small>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	</nav>
	
	<script src="${APP_PATH }/static/js/phones_pc.js"></script>
	<script src="${APP_PATH}/static/js/jquery-3.3.1.min.js"></script>
	<script src="${APP_PATH}/static/bootstrap/js/bootstrap.js"></script>
	<script src="${APP_PATH }/static/js/layer/layer.js"></script>
	<script src="${APP_PATH }/static/js/head/posted.js"></script>

	<script>
		/*跳转到我的主页*/
		function skipMycontent() {
            window.location.href="${APP_PATH }/myself.jsp";
        }
	</script>
</body>
</html>
