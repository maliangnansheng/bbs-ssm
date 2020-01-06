<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>他人中心主体内容</title>
<%
	pageContext.setAttribute("APP_PATH", request.getContextPath());
%>
</head>
<body>
	<div class="container">
		<!--上半部分-->
		<div class="row">
			<div class="col-md-10 col-md-offset-1"
				style="background-color: #ffffff; border-radius: 2px;">
				<div class="row">
					<div>
						<img
							style="position: relative; width: 100%; height: 280px; border-top-left-radius: 2px; border-top-right-radius: 2px;"
							src="${APP_PATH }/static/img/beijing3.png">
					</div>
				</div>
				<div class="row">
					<div class="col-md-2">
						<c:if test="${othersListUser.userphoto==null }">
						<img class="img-thumbnail"
							style="position: relative; width: 140px; height: 140px; left: 10px; top: -20px;"
							src="${APP_PATH }/static/img/head.png">
						</c:if>
						<c:if test="${othersListUser.userphoto!=null }">
							<img class="img-thumbnail"
								style="position: relative; width: 140px; height: 140px; left: 10px; top: -20px;"
								src="${APP_PATH }/static/upload/user/${othersListUser.userphoto }">
						</c:if>
					</div>
					<div class="col-md-8">
						<div class="row">
							<div class="col-md-12">
								<!-- 姓名 -->
								<b style="font-size: 22px;">${othersListUser.name }</b> &nbsp;&nbsp;&nbsp; <span>克己复礼</span>
							</div>
						</div>
						<br>
						<div class="row">
							<div class="col-md-12">
								<b>个人简介</b> &nbsp;&nbsp;&nbsp; <span>${othersListUser.intro }</span>
							</div>
						</div>
						<br>
						<div class="row">
							<div class="col-md-12">
								<b>性别年龄</b> &nbsp;&nbsp;&nbsp; <span>${othersListUser.sex }、${othersListUser.age }</span>
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
						<li role="presentation" class="active"><a href="#home"
							aria-controls="home" role="tab" data-toggle="tab">动态</a></li>
					</ul>

					<!-- Tab panes -->
					<div class="tab-content">
						<br>
						<c:if test="${othersListArticles==\"[]\" }">
							<br><br><br><br>
							<div class="text-center">
								<img alt="没发过帖子" src="${APP_PATH }/static/img/article.png">
								<p style="color: #999999">这个人很懒，还没有发过帖子</p>
							</div>
							<br><br><br><br>
						</c:if>
						<!-- 帖子循环-开始 -->
						<c:forEach var="othersListArticle" items="${othersListArticles }">
							<!-- 只显示通过审核的帖子 -->
							<c:if test="${othersListArticle.status==1 }">
								<div role="tabpanel" class="tab-pane active" id="home">
									<div class="row">
										<div class="col-xs-5 col-md-2 col-md-offset-10 col-xs-offset-7"
											style="position: relative;">
											<!-- 时间 -->
											<small>${othersListArticle.time }</small>
										</div>
										<div onclick="skipArticle(${othersListArticle.fid})" class="col-xs-12 col-md-3" style="cursor:pointer;">
											<c:if test="${othersListArticle.photo!=\"photo\" }">
												<c:if test="${othersListArticle.photo.endsWith(\".mp4\")||othersListArticle.photo.endsWith(\".avi\") }">
													<video controls="controls" src="${APP_PATH }/static/upload/article/${othersListArticle.photo }"
														   style="position: relative; width: 100%; height: 100%;border-radius: 3px;"></video>
												</c:if>
												<c:if test="${!othersListArticle.photo.endsWith(\".mp4\")&&!othersListArticle.photo.endsWith(\".avi\") }">
													<img src="${APP_PATH }/static/upload/article/${othersListArticle.photo }"
														 style="position: relative; width: 100%; height: 100%;border-radius: 3px;">
												</c:if>
											</c:if>
										</div>
										<div class="col-xs-12 col-md-9">
											<div onclick="skipArticle(${othersListArticle.fid})" style="overflow: hidden;white-space: nowrap;text-overflow:ellipsis;">
												<!-- 标题 -->
												<a style="color: #000000;">
													<b id="other_article_titles" style="cursor:pointer; font-size:18px;">${othersListArticle.titles }</b>
												</a>
											</div>
											<div onclick="skipArticle(${othersListArticle.fid})" id="other_article_content" style="cursor:pointer;overflow: hidden;text-overflow:ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;">
												<!-- 内容 -->
												<span style="word-break: break-word;line-height: 1.6;">${othersListArticle.fcontent }</span>
											</div>
										</div>
									</div>
								</div>
							<hr style="height:1px;border:none;border-top:1px solid #bbbbbb;">
							</c:if>
						</c:forEach>
						<!-- 帖子循环-结束 -->
					</div>
				</div>
			</div>
		</div>
		<br>
	</div>

    <script>
        /*跳转到帖子详情（新开一个tab）*/
        function skipArticle(fid) {
            var url = '${APP_PATH}/article.jsp?fid=' + fid;
            window.open(url,"_blank");
        }
    </script>
</body>
</html>
