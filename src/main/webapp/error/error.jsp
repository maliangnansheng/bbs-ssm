<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>哎呀，出错了...</title>
<%
	pageContext.setAttribute("APP_PATH", request.getContextPath());
%>
</head>
<body style="text-align: center;">
	<h1 style="color: red;font-size: 100px;">哎呀，出错了...</h1>
	<h4 style="color: #888888;font-size: 40px;">如果你看到这个页面，请<b style="color: #00aaaa;font-size: 70px;">使用电脑访问</b></h4>
	<b style="color: #999999;font-size: 30px;">我们想，可能在电脑上访问会呈现更好效果，这能给你最好的体验</b>
	<br>
	<b style="color: #aaaaaa;font-size: 30px;">可是我们并没有发现你的电脑</b>
	<br>
	<b style="color: #bbbbbb;font-size: 30px;">我们很伤心也很难过</b>
</body>
</html>