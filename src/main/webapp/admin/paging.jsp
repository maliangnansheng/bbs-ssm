<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>分页</title>
</head>
<body>
<ul class="pagination">
    <!-- 首页 -->
    <li id="paging_first">
        <a href="javascript:void(0)">首页</a>
    </li>
    <!-- 上一页 -->
    <li id="paging_previous">
        <!-- 当前页是第一页时显示 -->
        <span id="yesFirst" aria-hidden="true" class="btn" disabled="disabled" style="display: none;">&larr;</span>
        <!-- 当前页非第一页时显示 -->
        <span id="noFirst" aria-hidden="true" style="cursor: pointer; display: none;">&larr;</span>
    </li>
    <!-- 当前页 -->
    <li class="active" id="paging_active">
        <a href="javascript:void(0)"></a>
    </li>
    <!-- 下一页 -->
    <li id="paging_next">
        <!-- 当前页是最后一页时显示 -->
        <span id="yesEnd" aria-hidden="true" class="btn" disabled="disabled" style="display: none;">&rarr;</span>
        <!-- 当前页非最后一页时显示 -->
        <span id="noEnd" aria-hidden="true" style="cursor: pointer; display: none;">&rarr;</span>
    </li>
    <!-- 尾页 -->
    <li id="paging_end">
        <a href="javascript:void(0)">尾页</a>
    </li>
</ul>
</body>
</html>
