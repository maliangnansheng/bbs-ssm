<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>个人中心主体内容</title>
<%
	pageContext.setAttribute("APP_PATH", request.getContextPath());
%>
<link href="${APP_PATH}/static/css/css.css" rel="stylesheet">
</head>
<body>
<%-- 方便ajax获取APP_PATH --%>
<input id="APP_PATH" type="hidden" value="${APP_PATH}" >
<%-- 方便ajax获取session中的userid --%>
<input id="session_userid" type="hidden" value="${userid}" >
<div class="container">
	<!--上半部分-->
	<div class="row">
		<div class="col-md-10 col-md-offset-1" style="background-color: #ffffff; border-radius: 2px;">
			<div class="row">
				<div>
					<img style="position: relative; width: 100%; height: 280px; border-top-left-radius: 2px; border-top-right-radius: 2px;"
						src="${APP_PATH }/static/img/beijing.jpg">
				</div>
			</div>
			<div class="row">
				<div class="col-md-2">
					<!-- 用户头像 -->
					<a href="#" data-toggle="modal" data-target="#userPhoto" id="myself_userphoto" onclick="userPhotoShow()"></a>
				</div>
				<div class="col-md-12 col-xs-12">
					<div class="row">
						<div class="col-md-12">
							<!-- 用户名 -->
							<b id="myself_name" style="font-size: 22px;"></b> &nbsp;&nbsp;&nbsp; <span>克己复礼</span>
						</div>
					</div>
					<br>
					<div class="row">
						<div class="col-md-12">
							<!-- 居住地 -->
							<b>居住地</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span id="myself_family"></span>
						</div>
					</div>
					<br>
					<div class="row">
						<div class="col-md-12">
							<!-- 个人简介 -->
							<b>个人简介</b> &nbsp;&nbsp;&nbsp; <span id="myself_intro"></span>
						</div>
					</div>
					<br>
					<div class="row">
						<div class="col-md-12">
							<!-- 电子邮箱 -->
							<b>电子邮箱</b> &nbsp;&nbsp;&nbsp; <span id="myself_email"></span>
						</div>
					</div>
					<br>
					<div class="row">
						<div class="col-md-10 col-xs-7">
							<!-- 性别年龄 -->
							<b>性别年龄</b> &nbsp;&nbsp;&nbsp; <span id="myself_sex_age"></span>
						</div>
						<div class="col-md-2 col-xs-2">
							<button type="button" class="btn btn-info" data-toggle="modal" data-target="#edit" onclick="editUser()">
							编辑个人资料</button>
						</div>
					</div>
					<br>

				</div>
			</div>
		</div>
	</div>

	<!--下半部分-->
	<div class="row" style="position: relative; top: 10px;">
		<div class="col-md-10 col-md-offset-1"
			style="background-color: #ffffff; border-radius: 2px;">
			<div>
				<!-- Nav tabs -->
				<ul class="nav nav-tabs" role="tablist">
					<!-- 动态 -->
					<li role="presentation" class="active">
						<a href="#home" aria-controls="home" role="tab" data-toggle="tab">动态 <samp id="count_Article"></samp></a>
					</li>
					<!-- 回复 -->
					<li role="presentation">
						<a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">回答 <samp id="count_Comment"></samp></a>
					</li>
					<li role="presentation">
						<a href="#attention" aria-controls="attention" role="tab" data-toggle="tab">关注 <samp id="count_Attention"></samp></a>
					</li>
					<!-- 收藏 -->
					<li role="presentation">
						<a href="#collect" aria-controls="collect" role="tab" data-toggle="tab">我的收藏 <samp id="count_Collect"></samp></a>
					</li>
				</ul>

				<!-- Tab panes -->
				<div class="tab-content">
					<br>

                    <!--动态-->
					<!-- 帖子循环-开始（动态） -->
					<div role="tabpanel" class="tab-pane active" id="home">
						<!-- 无动态 -->
						<div id="article_null"></div>
						<!-- 动态展示-循环 -->
						<div id="myself_article_all"></div>
					</div>
					

					<!--回答-->
					<!-- 帖子循环-开始（动态） -->
					<div role="tabpanel" class="tab-pane" id="profile">
						<!-- 无回复 -->
						<div id="article_huifu_null"></div>
						<!-- 回复展示-循环 -->
						<div id="huifu_all"></div>
					</div>


					<!--关注-->
					<div role="tabpanel" class="tab-pane" id="attention">
						<ul class="nav nav-tabs" role="tablist">
							<li role="presentation" class="active">
								<a href="#icare" aria-controls="icare" role="tab" data-toggle="tab">我关注的人 <samp id="attention_count"></samp></a>
							</li>
							<li role="presentation">
								<a href="#careme" aria-controls="careme" role="tab" data-toggle="tab">关注我的人 <samp id="attention_count_be"></samp></a>
							</li>
						</ul>
						<div class="tab-content">
                            <!-- 我关注的 -->
							<div role="tabpanel" class="tab-pane active" id="icare">
                                <!-- 没有关注他人 -->
                                <div id="attention_null"></div>
                                <br>
                                <!-- 关注他人展示-循环 -->
                                <div id="attention_all"></div>
							</div>
                            <!-- 关注我的 -->
							<div role="tabpanel" class="tab-pane" id="careme">
                                <!-- 没有他人关注我 -->
                                <div id="attention_be_null"></div>
                                <br>
                                <!-- 他人关注展示-循环 -->
                                <div id="attention_be_all"></div>
							</div>
						</div>
					</div>


					<!-- 我的收藏 -->
					<div role="tabpanel" class="tab-pane" id="collect">
                        <!-- 没有收藏帖子 -->
                        <div id="collect_null"></div>
                        <br>
                        <!-- 收藏展示-循环 -->
                        <div id="collect_all"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<br>
</div>

<script src="${APP_PATH }/static/js/delete.js"></script>
<script src="${APP_PATH }/static/js/content/mycontent.js"></script>
<script src="${APP_PATH }/static/js/content/comment.js"></script>
<script src="${APP_PATH }/static/js/content/article.js"></script>
<script src="${APP_PATH }/static/js/content/articleEdit.js"></script>
<script src="${APP_PATH }/static/js/content/userEdit.js"></script>
<script src="${APP_PATH }/static/js/content/attention.js"></script>
<script src="${APP_PATH }/static/js/content/collect.js"></script>


</body>
</html>
