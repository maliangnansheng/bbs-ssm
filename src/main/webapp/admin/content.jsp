<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>管理员-主体</title>
<%
	pageContext.setAttribute("APP_PATH", request.getContextPath());
%>
<body>
	<%-- 方便ajax获取APP_PATH --%>
	<input id="APP_PATH" type="hidden" value="${APP_PATH}" >
	<%-- 方便ajax获取session中的userid --%>
	<input id="adminList" type="hidden" value="${adminList}" >
	<div class="container-fluid">
		<div class="row" style="margin-top: 70px">
			<!--左边部分-->
			<div class="  nav-left col-md-2 no-padding" id="nav-list-left" style="z-index: 1">
				<div class="user-panel">
					<img src="${APP_PATH }/static/img/admin/user.jpg" class="img-circle center-block" />
				</div>

				<div class="nav-list">
					<ul>
						<li><a id="yhgl" href="#">用户管理</a></li>
						<li><a id="tzgl" href="#">帖子管理</a></li>
						<li><a id="bkgl" href="#">板块管理</a></li>
						<li><a id="fwjl" href="#">访问记录</a></li>
					</ul>
				</div>
			</div>

			<!--右边部分-->
			<div class="main-right  col-md-10 col-md-offset-2" style="z-index: 9">
				<!--用户管理-->
				<div class="col-md-12 yhgl" >
					<div class="panel panel-default ">
						<div class="panel-heading">用户管理 <small class="text-primary" id="user_total"></small></div>
						<div class="panel-body">
							<table class="table table-bordered tb-hover">
								<thead>
									<tr>
										<td>序号</td>
										<td>名称</td>
										<td>年龄</td>
										<td>性别</td>
										<td>Email</td>
										<td>住址</td>
										<td>简介</td>
										<td>创建时间</td>
										<td>用户头像</td>
										<td class="text-center">操作</td>
									</tr>
								</thead>
								<tbody id="listUser_all"></tbody>
							</table>
                            <nav class="text-center" aria-label="Page navigation" id="listUser_page"></nav>
						</div>
					</div>
				</div>

				<!--帖子管理-->
				<div class="col-md-12 tzgl" style="">
					<div class="panel panel-default ">
						<div class="panel-heading">帖子管理 <small class="text-primary" id="article_total"></small></div>
						<div class="panel-body">
							<table class="table table-bordered tb-hover">
								<thead>
									<tr>
										<td>序号</td>
										<td>标题</td>
										<td>内容</td>
										<td>图片</td>
										<td>发布者</td>
										<td>所属板块</td>
										<td>创建时间</td>
										<td>审核状态</td>
										<td class="text-center">操作</td>
									</tr>
								</thead>
								<tbody id="listArticle_all"></tbody>
							</table>
                            <nav class="text-center" aria-label="Page navigation" id="listArticle_page"></nav>
						</div>
					</div>
				</div>

				<!--板块管理-->
				<div class="col-md-12 bkgl" style="">
					<div class="panel panel-default ">
						<div class="panel-heading">
							<div class="row">
								<div class="col-md-10">板块管理 <small class="text-primary" id="plate_total"></small></div>
                                <!--新增按钮-->
                                <div class="col-md-2" id="plates_add"></div>
							</div>
						</div>
						
						<div class="panel-body">
							<table class="table table-bordered tb-hover">
								<thead>
									<tr>
										<td>序号</td>
										<td>板块名</td>
										<td>创建时间</td>
										<td class="text-center">操作</td>
									</tr>
								</thead>
								<tbody id="plate_all"></tbody>
							</table>
						</div>
					</div>
				</div>
				
				<!--访问记录-->
				<div class="col-md-12 fwjl" style="">
					<div class="panel panel-default ">
						<div class="panel-heading">
							<div class="row">
								<div class="col-md-10">访问记录 <small class="text-primary" id="visit_total"></small></div>
							</div>
						</div>
						
						<div class="panel-body">
							<table class="table table-bordered tb-hover">
								<thead>
									<tr>
										<td>序号</td>
										<td>访问者ip</td>
										<td>访问者所在国家</td>
										<td>访问者所在省份</td>
										<td>访问者所在城市</td>
										<%--<td>主机名</td>
										<td>操作系统</td>--%>
										<td>访问时间</td>
									</tr>
								</thead>
								<tbody id="listVisit_all"></tbody>
							</table>
                            <nav class="text-center" aria-label="Page navigation" id="listVisit_page"></nav>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<script src="${APP_PATH }/static/js/admin.js"></script>
	<script src="${APP_PATH }/static/js/admin/content.js"></script>
	<script src="${APP_PATH }/static/js/admin/user.js"></script>
	<script src="${APP_PATH }/static/js/admin/article.js"></script>
	<script src="${APP_PATH }/static/js/admin/visit.js"></script>
	<script src="${APP_PATH }/static/js/admin/plate.js"></script>

</body>
</html>
