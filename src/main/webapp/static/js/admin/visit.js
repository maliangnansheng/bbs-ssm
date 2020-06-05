/*分页操作*/
function visitPage(pageStart) {
    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/visit/getVisit?pageStart=" + pageStart,
        type: "get",
        dataType: "json",
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                /*########################################### 访问管理 ############################################################*/
                $("#listVisit_all").html(getVisitList(data.data));
                //访问总数
                $("#visit_total").html(data.data.total + '条');
                //月访问量
                $("#visit_month").html(data.data.month + '条');
                //周访问量
                $("#visit_week").html(data.data.week + '条');
                //日访问量
                $("#visit_day").html(data.data.day + '条');

                /*----------------------------------------- 分页（用户管理） ----------------------------------------*/
                getPaging(data.data, "visit");
                /*########################################### 访问管理-end ############################################################*/
            } else if (code == 500) {
                layer.msg(msg,{icon: 5});
            }
        },
        error : function() {
            layer.msg("出错！",{icon: 5});
        }
    });
}
