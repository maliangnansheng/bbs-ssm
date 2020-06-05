<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>南生论坛-捐赠图表</title>
    <%
        pageContext.setAttribute("APP_PATH", request.getContextPath());
    %>
    <link href="${APP_PATH }/static/img/favicon.ico" rel='icon' type='image/x-icon'/>
</head>
<body>
<!-- 首页-头部 -->
<jsp:include page="/head/head.jsp"></jsp:include>
<!-- 首页-修改文章 -->
<jsp:include page="/donate/donateCharts.jsp"></jsp:include>
<!-- 首页-基本信息设置 -->
<jsp:include page="/head/setup.jsp"></jsp:include>
<!-- 首页-登录、注册 -->
<jsp:include page="/login/login.jsp"></jsp:include>
</body>
</html>
