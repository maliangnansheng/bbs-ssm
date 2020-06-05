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
<div class="container">
	<!--加载中...-->
	<div id="myHome_loading">
		<div class="text-center">
			<br><br><br><br><br><br><br><br><br><br>
			<img src="${APP_PATH}/static/img/loading.gif" alt="加载中...">
		</div>
	</div>
	<!--上半部分-->
	<div class="row" id="myHome_top" style="display: none;">
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
					<a href="#" data-toggle="modal" data-target="#userPhoto" id="myself_userphoto_a">
						<img id="myself_userphoto_img" class="img-thumbnail" style="position: relative; width: 140px; height: 140px; left: 10px; top: -20px;">
					</a>
				</div>
				<div class="col-md-10 col-xs-12">
					<div class="row">
						<div class="col-md-10">
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
						<div class="col-md-6 col-xs-8">
							<!-- 性别年龄 -->
							<b>性别年龄</b> &nbsp;&nbsp;&nbsp; <span id="myself_sex_age"></span>
						</div>

						<div class="col-md-3 col-xs-7">
							<button type="button" class="btn btn-info" data-toggle="modal" data-target="#edit" onclick="editUser()">
								<span class="glyphicon glyphicon-pencil"></span> 编辑个人资料</button>
						</div>
						<div class="col-md-3 col-xs-5">
							<a href="${APP_PATH}/album.jsp">
								<button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-road"></span> 进入我的相册</button>
							</a>
						</div>
					</div>
					<br>

				</div>
			</div>
		</div>
	</div>

	<!--下半部分 -->
	<div class="row" id="myHome_bottom" style="position: relative; top: 10px; display: none;">
		<div class="col-md-10 col-md-offset-1"
			 style="background-color: #ffffff; border-radius: 2px;">
			<div>
				<!-- Nav tabs -->
				<ul class="nav nav-tabs" role="tablist">
					<!-- 动态 -->
					<li role="presentation" class="active" id="tab_dynamic">
						<a href="#home" aria-controls="home" role="tab" data-toggle="tab">动态 <samp id="count_Article"></samp></a>
					</li>
					<!-- 回复 -->
					<li role="presentation" id="tab_answer">
						<a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">回答 <samp id="count_Comment"></samp></a>
					</li>
					<li role="presentation" id="tab_attention">
						<a href="#attention" aria-controls="attention" role="tab" data-toggle="tab">关注 <samp id="count_Attention"></samp></a>
					</li>
					<!-- 收藏 -->
					<li role="presentation" id="tab_collect">
						<a href="#collect" aria-controls="collect" role="tab" data-toggle="tab">收藏 <samp id="count_Collect"></samp></a>
					</li>
				</ul>

				<!-- Tab panes -->
				<div class="tab-content">
					<br>
					<!--################################################### 动态 ###################################################-->
					<div role="tabpanel" class="tab-pane active" id="home">
						<!-- 无动态 -->
						<div id="article_null" style="display: none;">
							<br><br><br><br>
							<div class="text-center">
								<img alt="没发过文章" src="${APP_PATH}/static/img/article.png">
								<p style="color: #999999">你很懒，还没有写过文章</p>
							</div>
							<br><br><br><br>
						</div>

						<!-- 动态展示-循环 - 模板 -->
						<div id="myself_article_hide" style="display: none">
							<!-- 文章编号 -->
							<div class="myself_article_num">
								<div class="row">
									<div class="col-xs-7 col-md-6">
										<!-- 文章审核状态 -->
										<small>审核状态：</small>
										<!-- 审核状态显示 -->
										<span>
                                        <small id="myself_article_status"></small>
                                    </span>
									</div>
									<div class="col-xs-5 col-md-2 col-md-offset-4" style="position: relative;">
										<!-- 时间 -->
										<small id="myself_article_time"></small>
									</div>
								</div>
								<div class="row">
									<!-- 配图 -->
									<div class="col-xs-12 col-md-3" id="myself_article_photo" style="cursor:pointer;">
										<!-- 视频 -->
										<video id="listArticle_video" controls="controls" style="position: relative; width: 100%; height: 100%;border-radius: 3px;display: none"></video>
										<!-- 图片 -->
										<img id="listArticle_img" style="position: relative; width: 100%; height: 100%;border-radius: 3px;display: none"/>
									</div>
									<div class="col-xs-12 col-md-9">
										<!-- 标题 -->
										<div id="myself_article_titles_div" style="overflow: hidden;white-space: nowrap;text-overflow:ellipsis;color: #000000;">
											<b id="myself_article_titles" style="cursor:pointer; font-size:18px;"></b>
										</div>
										<!-- 内容 -->
										<div id="myself_article_content_div" style="cursor:pointer;overflow: hidden;text-overflow:ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;">
											<span id="myself_article_content" style="word-break: break-word;line-height: 1.6;"></span>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-xs-7 col-md-10"></div>
									<!-- 修改 -->
									<div class="col-xs-2 col-md-1">
										<form class="form_articleUpdate">
											<button id="form_articleUpdate_button" type="button" class="btn btn-info btn-sm">修改</button>
										</form>
									</div>
									<!-- 删除 -->
									<div class="col-xs-2 col-md-1">
										<form>
											<button type="button" id="myself_article_del" class="btn btn-danger btn-sm">删除</button>
										</form>
									</div>
								</div>
								<!-- 动态展示-循环-end -->
								<hr style="height:1px;border:none;border-top:1px solid #bbbbbb;">
							</div>
						</div>
						<!-- 动态展示-实际数据 -->
						<div id="myself_article_all"></div>
					</div>
					<!--################################################### 动态-end ###################################################-->

					<!--################################################### 回答 ###################################################-->
					<div role="tabpanel" class="tab-pane" id="profile">
						<!-- 无回复 -->
						<div id="huifu_article_null" style="display: none;">
							<br><br><br><br>
							<div class="text-center">
								<img alt="没评论过文章" src="${APP_PATH}/static/img/comment.png">
								<p style="color: #999999">你很懒，还没有评论过任何文章</p>
							</div>
							<br><br><br><br>
						</div>

						<!-- 回复展示-循环 - 模板 -->
						<div id="huifu_article_hide" style="display: none">
							<div class="row">
								<div class="col-xs-7 col-md-6">
									<!-- 文章作者 -->
									<small id="huifu_article_username"></small>
								</div>
								<div class="col-xs-5 col-md-2 col-md-offset-4" style="position: relative;">
									<!-- 时间 -->
									<small id="huifu_article_time"></small>
								</div>
							</div>
							<div class="row">
								<div class="col-xs-12 col-md-3" id="huifu_article_photo" style="cursor:pointer;">
									<!-- 视频 -->
									<video id="huifu_article_video" controls="controls" style="position: relative; width: 100%; height: 100%;border-radius: 3px;display: none"></video>
									<!-- 图片 -->
									<img id="huifu_article_img" style="position: relative; width: 100%; height: 100%;border-radius: 3px;display: none"/>
								</div>
								<div class="col-xs-12 col-md-9">
									<!-- 标题 -->
									<div id="huifu_article_titles_div" style="overflow: hidden;white-space: nowrap;text-overflow:ellipsis;color: #000000;">
										<b id="huifu_article_titles" style="cursor:pointer; font-size:18px;"></b>
									</div>
									<!-- 内容 -->
									<div id="huifu_article_content_div" style="cursor:pointer;overflow: hidden;text-overflow:ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;">
										<span id="huifu_article_content"></span>
									</div>
								</div>
							</div>
							<hr style="height:1px;border:none;border-top:1px solid #bbbbbb;">
						</div>
						<!-- 回答展示-实际数据 -->
						<div id="huifu_article_all"></div>
					</div>
					<!--################################################### 回答-end ###################################################-->

					<!--################################################### 关注 ###################################################-->
					<div role="tabpanel" class="tab-pane" id="attention">
						<ul class="nav nav-tabs" role="tablist">
							<li role="presentation" class="active">
								<a href="#icare" aria-controls="icare" role="tab" data-toggle="tab">我的关注 <samp id="attention_count"></samp></a>
							</li>
							<li role="presentation">
								<a href="#careme" aria-controls="careme" role="tab" data-toggle="tab">我的粉丝 <samp id="attention_count_be"></samp></a>
							</li>
						</ul>
						<div class="tab-content">
							<!-- 我关注的 -->
							<div role="tabpanel" class="tab-pane active" id="icare">
								<!-- 没有关注他人 -->
								<div id="attention_null" style="display: none;">
									<br><br><br><br>
									<div class="text-center">
										<img alt="没关注过人" src="${APP_PATH}/static/img/attention.png">
										<p style="color: #999999">可能，你还没遇见感兴趣的人</p>
									</div>
									<br><br><br><br>
								</div>
								<br>
								<!-- 关注他人展示-循环 - 模板 -->
								<div id="attention_hide" style="display: none;">
									<!-- 我关注的编号 -->
									<div class="attention_num">
										<div class="row">
											<div class="col-xs-3 col-md-2">
												<!-- 头像 -->
												<a id="myAttention_userphoto">
													<img class="img-thumbnail" alt="Brand" style="position:relative;width: 70px;height: 70px;">
												</a>
											</div>
											<div class="col-xs-5 col-md-8">
												<a id="myAttention_username" class="a_b">
													<!-- 用户名 -->
													<b style="font-size: 16px;"></b>
												</a>
												<br>
												<!-- 简介 -->
												<samp id="myAttention_intro"></samp>
												<br>
												<samp>有 <b class="text-success" id="myAttention_fans"></b> 粉丝</samp>
											</div>
											<div class="col-xs-4 col-md-2">
												<!-- 关注时间 -->
												<small id="attentionTime"></small>
												<br><br>
												<!-- 已关注 -->
												<form method="delete" class="form_attentionDel">
													<div class="attention_content" style="color: #46b8da;">
														<button type="button" id="form_attentionDel_btn">
															<samp class="glyphicon glyphicon-ok-sign"></samp> 已经关注</button>
													</div>
												</form>
											</div>
										</div>
										<hr>
									</div>
								</div>
								<!-- 关注他人展示-实际数据 -->
								<div id="attention_all"></div>
							</div>

							<!-- 关注我的 -->
							<div role="tabpanel" class="tab-pane" id="careme">
								<!-- 没有他人关注我 -->
								<div id="attention_be_null" style="display: none;">
									<br><br><br><br>
									<div class="text-center">
										<img alt="没人关注你" src="${APP_PATH}/static/img/attention.png">
										<p style="color: #999999">可能，你并不是别人的菜</p>
									</div>
									<br><br><br><br>
								</div>
								<br>
								<!-- 他人关注展示-循环 - 模板 -->
								<div id="attention_be_hide" style="display: none;">
									<div class="row">
										<div class="col-xs-3 col-md-2">
											<!-- 头像 -->
											<a id="myAttention_be_userphoto">
												<img class="img-thumbnail" alt="Brand" style="position:relative;width: 70px;height: 70px;">
											</a>
										</div>
										<div class="col-xs-5 col-md-8">
											<a class="a_b" id="myAttention_be_username">
												<!-- 用户名 -->
												<b style="font-size: 16px;"></b>
											</a>
											<br>
											<!-- 简介 -->
											<samp id="myAttention_be_intro"></samp>
											<br>
											<!-- 粉丝数 -->
											<samp>有 <b class="text-success" id="myAttention_be_fans"></b> 粉丝</samp>
										</div>
										<div class="col-xs-4 col-md-2">
											<!-- 被关注时间 -->
											<small id="attention_be_time"></small>
										</div>
									</div>
									<hr>
								</div>
								<!-- 他人关注展示-实际数据 -->
								<div id="attention_be_all"></div>
							</div>
						</div>
					</div>
					<!--################################################### 关注-end ###################################################-->

					<!--################################################### 收藏 ###################################################-->
					<div role="tabpanel" class="tab-pane" id="collect">
						<!-- 没有收藏文章 -->
						<div id="collect_null" style="display: none;">
							<br><br><br><br>
							<div class="text-center">
								<img alt="没收藏过文章" src="${APP_PATH}/static/img/attention.png">
								<p style="color: #999999">可能，你还没遇见感兴趣的文章</p>
							</div>
							<br><br><br><br>
						</div>
						<br>
						<!-- 收藏展示-循环 - 模板 -->
						<div id="collect_hide" style="display: none;">
							<!-- 我收藏的编号 -->
							<div class="collect_num">
								<div class="row">
									<div class="col-xs-1 col-md-1">
										<!-- 已收藏 -->
										<form method="delete" class="form_collectDel">
											<button id="form_collectDel_btn" type="button" style="border: none;background-color: #ffffff;">
												<samp title="取消收藏" class="glyphicon glyphicon-heart collect_end"></samp>
											</button>
										</form>
									</div>
									<div class="col-xs-8 col-md-8">
										<!-- 标题 -->
										<a href="javascript:void(0)" id="collect_article_titles"></a>
									</div>
									<div class="col-xs-1 col-md-1" id="collect_article_photo" style="cursor:pointer;">
										<!-- 视频 -->
										<video id="collect_article_video" controls="controls" style="position: relative; width: 100%; height: 100%;border-radius: 3px;display: none"></video>
										<!-- 图片 -->
										<img id="collect_article_img" style="position: relative; width: 100%; height: 100%;border-radius: 3px;display: none"/>
									</div>
									<div class="col-md-2">
										<!-- 时间 -->
										<small id="collect_article_time"></small>
									</div>
								</div>
								<hr>
							</div>
						</div>
						<!-- 收藏展示-实际数据 -->
						<div id="collect_all"></div>
					</div>
					<!--################################################### 收藏-end ###################################################-->
				</div>
			</div>
		</div>
	</div>
	<br>
</div>

<script src="${APP_PATH }/static/js/delete.js"></script>
<script src="${APP_PATH }/static/js/content/myHome.js"></script>
<script src="${APP_PATH }/static/js/content/comment.js"></script>
<script src="${APP_PATH }/static/js/content/article.js"></script>
<script src="${APP_PATH }/static/js/content/userEdit.js"></script>
<script src="${APP_PATH }/static/js/content/attention.js"></script>
<script src="${APP_PATH }/static/js/content/collect.js"></script>
<script src="${APP_PATH }/static/js/content/user.js"></script>

</body>
</html>
