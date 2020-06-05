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
	<link href="${APP_PATH}/static/css/admin.css" rel="stylesheet">
</head>
<body style="background-color: #ecf0f5;">
<div class="container-fluid">
	<div class="row" style="margin-top: 70px">
		<!--左边部分 -->
		<%-- 非手机 --%>
		<div class="nav-left col-md-2 no-padding admin_pc" id="nav-list-left" style="display: none; z-index: 1">
			<div class="user-panel">
				<img src="${APP_PATH }/static/img/admin/user.jpg" class="img-circle center-block" />
			</div>

			<div class="nav-list">
				<ul>
					<li>
						<a class="cut-ybp" href="#">
							<span class="glyphicon glyphicon-dashboard"></span> 仪表盘
						</a>
					</li>
					<li>
						<a class="cut-yhgl" href="#">
							<span class="glyphicon glyphicon-user"></span> 用户管理
						</a>
					</li>
					<li>
						<a class="cut-tzgl" href="#">
							<span class="glyphicon glyphicon-book"></span> 文章管理
						</a>
					</li>
					<li>
						<a class="cut-bkgl" href="#">
							<span class="glyphicon glyphicon-tag"></span> 板块管理
						</a>
					</li>
					<li>
						<a class="cut-fwjl" href="#">
							<span class="glyphicon glyphicon-globe"></span> 访问记录
						</a>
					</li>
				</ul>
			</div>
		</div>
		<%-- 手机 --%>
		<div class="admin_mobile" style="display: none;">
			<ul class="nav nav-tabs nav-justified">
				<li>
					<a class="cut-ybp" href="#">
						<span class="glyphicon glyphicon-dashboard"></span> 仪表盘
					</a>
				</li>
				<li>
					<a class="cut-yhgl" href="#">
						<span class="glyphicon glyphicon-user"></span> 用户管理
					</a>
				</li>
				<li>
					<a class="cut-tzgl" href="#">
						<span class="glyphicon glyphicon-book"></span> 文章管理
					</a>
				</li>
				<li>
					<a class="cut-bkgl" href="#">
						<span class="glyphicon glyphicon-tag"></span> 板块管理
					</a>
				</li>
				<li>
					<a class="cut-fwjl" href="#">
						<span class="glyphicon glyphicon-globe"></span> 访问记录
					</a>
				</li>
			</ul>
			<br>
		</div>

		<!--右边部分-->
		<div class="col-md-10 col-md-offset-2" style="top: -20px;">
			<!--########################################### 仪表盘 ###########################################-->
            <div class="row ybp admin-h1">
				<h1>仪表盘</h1>
				<div class="row">
					<div class="col-md-3 col-xs-6">
						<div class="ybp-user">
							<div class="inner">
								<h3 id="h3-user"></h3>
								<p>用户</p>
							</div>
							<div class="icon">
								<i class="ion ion-bag"></i>
							</div>
							<a data-pjax="true" href="javascript:void(0);" class="small-box-footer cut-yhgl">
								查看所有 <small class="glyphicon glyphicon-fullscreen"></small>
							</a>
						</div>
					</div>
					<div class="col-md-3 col-xs-6">
						<div class="ybp-user ybp-article">
							<div class="inner">
								<h3 id="h3-article"></h3>
								<p>文章</p>
							</div>
							<div class="icon">
								<i class="ion ion-bag"></i>
							</div>
							<a data-pjax="true" href="javascript:void(0);" class="small-box-footer cut-tzgl">
								查看所有 <small class="glyphicon glyphicon-fullscreen"></small>
							</a>
						</div>
					</div>
					<div class="col-md-3 col-xs-6">
						<div class="ybp-user ybp-plate">
							<div class="inner">
								<h3 id="h3-plate"></h3>
								<p>板块</p>
							</div>
							<div class="icon">
								<i class="ion ion-bag"></i>
							</div>
							<a data-pjax="true" href="javascript:void(0);" class="small-box-footer cut-bkgl">
								查看所有 <small class="glyphicon glyphicon-fullscreen"></small>
							</a>
						</div>
					</div>
					<div class="col-md-3 col-xs-6">
						<div class="ybp-user ybp-visit">
							<div class="inner">
								<h3 id="h3-visit"></h3>
								<p>访问</p>
							</div>
							<div class="icon">
								<i class="ion ion-bag"></i>
							</div>
							<a data-pjax="true" href="javascript:void(0);" class="small-box-footer cut-fwjl">
								查看所有 <small class="glyphicon glyphicon-fullscreen"></small>
							</a>
						</div>
					</div>
				</div>
				<div class="row">
					<%-- 排行榜 --%>
					<div class="col-md-6 col-xs-12">
						<div class="ybp-phb">
							<h4>排行版</h4>
							<div style="border-top: 1px solid rgba(0,0,0,0.07);"></div>
							<table class="table">
								<thead>
								<tr>
									<th>序号</th>
									<th>用户名</th>
									<th>邮箱</th>
									<th>文章数</th>
									<th>最后更新时间</th>
								</tr>
								</thead>
								<!-- 排行版列表 - 模板 -->
								<tbody id="rank_listUser_hide" style="display:none;">
									<tr>
										<!-- 序号 -->
										<td id="rank_userNum"></td>
										<!-- 用户名 -->
										<td>
											<a id="rank_userName"></a>
										</td>
										<!-- 邮箱 -->
										<td id="rank_email"></td>
										<!-- 文章数 -->
										<td>
											<span id="rank_articleSum" class="badge" style="background-color: #00a65a;"></span>
										</td>
										<!-- 最后更新时间 -->
										<td id="rank_userUpdateTime"></td>
									</tr>
								</tbody>
								<!-- 排行版列表 - 实际数据 -->
								<tbody id="rank_listUser_all"></tbody>
							</table>
						</div>
					</div>
					<%-- 新注册用户 --%>
					<div class="col-md-6 col-xs-12">
						<div class="ybp-newuser">
							<h4>新注册用户</h4>
							<div style="border-top: 1px solid rgba(0,0,0,0.07);"></div>
							<div class="box-body no-padding">
								<%-- 模板 --%>
								<ul id="new_listUser_hide" class="users-list clearfix" style="display:none;">
									<li>
										<div style="position: relative; width: 65px; height: 65px; margin:0 auto">
											<img alt="用户头像" style="width: 100%; height: 100%;">
										</div>
										<a class="users-list-name" href="javascript:void(0);"></a>
										<span class="users-list-date"></span>
									</li>
								</ul>
								<%-- 实际数据 --%>
								<ul id="new_listUser_all" class="users-list clearfix"></ul>
							</div>
						</div>
					</div>
				</div>
				<%-- 访问统计（面积图） --%>
				<div class="row">
					<div class="col-md-12">
						<!-- 最近n次的访问信息 -->
						<div id="visitCharts_day" style="height:350px; margin: 0px auto;"></div>
					</div>
				</div>
			</div>
			<!--########################################### 仪表盘-end ###########################################-->

			<!--########################################### 用户管理 ###########################################-->
			<div class="row yhgl admin-h1" style="display: none;">
				<h1>用户信息<span class="text-primary" id="user_total"></span></h1>
				<div class="col-md-12" style="background-color: #fff; border-top: 3px solid #00c0ef; top: 8px;">
					<table class="table">
						<thead>
							<tr>
								<th>序号</th>
								<th>名称</th>
								<th>年龄</th>
								<th>性别</th>
								<th>Email</th>
								<th>住址</th>
								<th>简介</th>
								<th>创建时间</th>
								<th>更新时间</th>
								<th>用户头像</th>
								<th class="text-center">操作</th>
							</tr>
						</thead>
						<!-- 用户列表 - 模板 -->
						<tbody id="listUser_hide" style="display:none;">
							<tr>
								<!-- 序号 -->
								<td id="userNum"></td>
								<!-- 用户名 -->
								<td>
									<a id="userName"></a>
								</td>
								<!-- 年龄 -->
								<td id="userAge"></td>
								<!-- 性别 -->
								<td id="userSex"></td>
								<!-- 邮箱 -->
								<td id="userEmail"></td>
								<!-- 住址 -->
								<td id="userFamily"></td>
								<!-- 简介 -->
								<td id="userIntro"></td>
								<!-- 创建时间 -->
								<td id="userCreateTime"></td>
								<!-- 更新时间 -->
								<td id="userUpdateTime"></td>
								<!-- 头像 -->
								<td id="listUser_userphoto">
									<a target="_brank">
										<img style="position: relative; width: 35px; height: 35px; border-radius: 2px;">
									</a>
								</td>
								<!-- 操作 -->
								<td class="text-center" id="user_caozuo">
									<!-- 未登录时显示 -->
									<span class="glyphicon glyphicon-ban-circle" style="display: none;"></span>
									<!-- 登录时显示 -->
									<form method="delete" style="display: none;">
										<button class="btn btn-danger btn-sm">删除</button>
									</form>
								</td>
							</tr>
						</tbody>
						<!-- 用户列表 - 实际数据 -->
						<tbody id="listUser_all"></tbody>
					</table>
				</div>
				<!------------------------------------------------- 分页（用户管理） ------------------------------------------------->
				<nav class="text-center" aria-label="Page navigation" id="listUser_page">
					<jsp:include page="/admin/paging.jsp"></jsp:include>
				</nav>
			</div>
			<!--########################################### 用户管理-end ###########################################-->

			<!--########################################### 文章管理 ###########################################-->
			<div class="row tzgl admin-h1" style="display: none;">
				<h1>文章信息<span class="text-primary" id="article_total"></span></h1>
				<div class="col-md-12" style="background-color: #fff; border-top: 3px solid #00a65a; top: 8px;">
					<table class="table">
						<thead>
						<tr>
							<th>序号</th>
							<th>标题</th>
							<th>发布者</th>
							<th>所属板块</th>
							<th>创建时间</th>
							<th>更新时间</th>
							<th>审核状态</th>
							<th>操作</th>
						</tr>
						</thead>
						<!-- 用户列表 - 模板 -->
						<tbody id="listArticle_hide" style="display: none;">
						<tr>
							<!-- 序号 -->
							<td width="50px" id="articleNum">
								<div style="width:50px;word-wrap:break-word;"></div>
							</td>
							<!-- 标题 -->
							<td width="300px" id="articleTitles">
								<div style="width:300px;word-wrap:break-word;">
									<a href="javascript:void(0);"></a>
								</div>
							</td>
							<!-- 发布者 -->
							<td id="articleUsername"></td>
							<!-- 板块 -->
							<td id="articleBname"></td>
							<!-- 创建时间 -->
							<td id="articleCreateTime"></td>
							<!-- 更新时间 -->
							<td id="articleUpdateTime"></td>
							<!-- 状态 -->
							<td id="listArticle_status">
								<button type="button" disabled="disabled"></button>
							</td>
							<!-- 操作 -->
							<td id="listArticle_caozuo">
								<!-- 未登录 -->
								<span id="form_listArticle_notlogin" class="glyphicon glyphicon-ban-circle" style="display: none;"></span>
								<!-- 通过 -->
								<form method="put" id="form_listArticle_pass" style="display: inline">
									<input type="button" class="btn btn-info btn-sm" value="通过"/>
								</form>
								<!-- 拒绝 -->
								<form method="put" id="form_listArticle_refuse" style="display: inline">
									<input type="button" class="btn btn-danger btn-sm" value="拒绝"/>
								</form>
							</td>
						</tr>
						</tbody>
						<!-- 用户列表-实际数据 -->
						<tbody id="listArticle_all"></tbody>
					</table>
				</div>
				<!------------------------------------------------- 分页（文章管理） ------------------------------------------------->
				<nav class="text-center" aria-label="Page navigation" id="listArticle_page">
					<jsp:include page="/admin/paging.jsp"></jsp:include>
				</nav>
			</div>
			<!--########################################### 文章管理-end ###########################################-->

			<!--########################################### 板块管理 ###########################################-->
			<div class="row bkgl admin-h1" style="display: none;">
				<h1>
					板块信息<span class="text-primary" id="plate_total"></span>
					<!--新增按钮-->
					<button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#plate_Add" id="plates_add" style="display: none;">新增</button>
				</h1>
				<div class="col-md-12 " style="background-color: #fff; border-top: 3px solid #f39c12; top: 8px;">
					<table class="table">
						<thead>
						<tr>
							<th>序号</th>
							<th>板块名</th>
							<th>创建时间</th>
							<th>更新时间</th>
							<th class="text-center">操作</th>
						</tr>
						</thead>
						<!-- 板块列表 - 模板 -->
						<tbody id="plate_hide" style="display: none;">
						<tr>
							<!-- 序号 -->
							<td id="plateNum"></td>
							<!-- 版块名 -->
							<td id="plateName"></td>
							<!-- 创建时间 -->
							<td id="plateCreateTime"></td>
							<!-- 更新时间 -->
							<td id="plateUpdateTime"></td>
							<!-- 操作 -->
							<td class=" text-center" id="plate_caozuo">
								<!-- 未登录 -->
								<span id="form_plate_notlogin" class="glyphicon glyphicon-ban-circle" style="display: none;"></span>
								<!-- 修改 -->
								<form id="form_updatePlate" method="put" style="display: inline;">
									<button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#plate_Update">修改</button>
								</form>
								<!-- 删除 -->
								<form id="form_delPlate" method="delete" style="display: inline;">
									<button type="button" class="btn btn-danger btn-sm">删除</button>
								</form>
							</td>
						</tr>
						</tbody>
						<!-- 板块列表-实际数据 -->
						<tbody id="plate_all"></tbody>
					</table>
				</div>
			</div>
			<!--########################################### 板块管理-end ###########################################-->

			<!--########################################### 访问记录 ###########################################-->
			<div class="row fwjl admin-h1" style="display: none;">
				<h1>
					访问信息<span class="text-primary">（</span><span class="text-primary" id="visit_total"></span>
					<span class="text-primary" id="visit_month"></span>
					<span class="text-primary" id="visit_week"></span>
					<span class="text-primary" id="visit_day"></span><span class="text-primary">）</span>
				</h1>
				<div class="col-md-12" style="background-color: #fff; border-top: 3px solid #dd4b39; top: 8px;">
					<table class="table">
						<thead>
						<tr>
							<th>序号</th>
							<th>访问ip</th>
							<th>访问国家</th>
							<th>访问省份</th>
							<th>访问城市</th>
							<%--<th>主机名</th>--%>
							<th>操作系统</th>
							<th>访问时间</th>
						</tr>
						</thead>
						<!-- 访问列表 - 模板 -->
						<tbody id="listVisit_hide" style="display: none">
						<tr>
							<!-- 序号 -->
							<td id="visitNum"></td>
							<!-- ip -->
							<td>
								<span id="visitIp" class="badge" style="background-color: #00a65a;"></span>
							</td>
							<!-- 国家 -->
							<td id="visitCountry"></td>
							<!-- 省份 -->
							<td id="visitProvince"></td>
							<!-- 城市 -->
							<td id="visitCity"></td>
							<!-- 操作系统 -->
							<td>
								<span id="visitOS" class="badge" style="background-color: #1ebbff;"></span>
							</td>
							<!-- 时间 -->
							<td id="visitTime"></td>
						</tr>
						</tbody>
						<!-- 访问列表-实际数据 -->
						<tbody id="listVisit_all"></tbody>
					</table>
				</div>
				<nav class="text-center" aria-label="Page navigation" id="listVisit_page">
					<jsp:include page="/admin/paging.jsp"></jsp:include>
				</nav>
			</div>
			<!--########################################### 访问记录-end ###########################################-->
		</div>
	</div>
</div>
<script src="${APP_PATH }/static/js/echars/echarts.min.js"></script>

<script src="${APP_PATH }/static/js/admin.js"></script>
<script src="${APP_PATH }/static/js/admin/content.js"></script>
<script src="${APP_PATH }/static/js/admin/common.js"></script>
<script src="${APP_PATH }/static/js/admin/user.js"></script>
<script src="${APP_PATH }/static/js/admin/article.js"></script>
<script src="${APP_PATH }/static/js/admin/visit.js"></script>
<script src="${APP_PATH }/static/js/admin/plate.js"></script>
<script src="${APP_PATH }/static/js/visit/visitCharts.js"></script>
<script src="${APP_PATH }/static/js/phones_pc.js"></script>

</body>
</html>
