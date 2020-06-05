if (aname == "") {   // 未登录
    $(".admin_head_logout").show();
    $(".admin_head_login").hide();
    $(".admin_head_login").hide();
} else {    // 已登录
    $(".admin_head_logout").hide();
    $(".admin_head_login").show();
    $(".admin_head_login").show();

    // 管理员名称
    $(".admin_name").html(aname);
    // 管理员创建时间
    $(".admin_createtime").html(dateTimeFormat(Number(acreateTime)));
}