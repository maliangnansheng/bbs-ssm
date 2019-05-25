/*分页操作*/
function visitPage(pageStart) {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var adminList = document.getElementById("adminList").value;
    $.ajax({
        url: APP_PATH + "/visitController/getVisit?pageStart="+pageStart,
        type: "post",
        dataType: "json",
        success: function (data) {
            /*########################################### 访问管理 ############################################################*/
            var listVisit_all = "";
            var listVisits = data["listVisits"];   //计数
            var visit_num = (data["visit_pageStart"] - 1)*data["visit_pageSize"];   //计数
            for (var i=0;i<listVisits.length;i++){
                visit_num++;
                var listVisit = listVisits[i];
                listVisit_all = listVisit_all +
                    '<tr>' +
                    '<td>'+visit_num+'</td>' +
                    '<td>***.***.***.***</td>' +
                    '<td>'+listVisit["visitcountry"]+'</td>' +
                    '<td>'+listVisit["visitprovince"]+'</td>' +
                    '<td>'+listVisit["visitcity"]+'</td>' +
                    '<td>'+listVisit["visittime"]+'</td>' +
                    '</tr>';
            }
            $("#listVisit_all").html(listVisit_all);
            //访问总数
            $("#visit_total").html('（'+data["visit_total"]+'条）');

            var visit_previous = "";
            var visit_next = "";
            //上一页
            if (data["visit_pageStart"] == 1){
                visit_previous =
                    '<span aria-hidden="true" class="btn" disabled="disabled">&larr;</span>';
            } else {
                var pageStart = data["visit_pageStart"]-1;
                visit_previous =
                    '<a href="javascript:void(0)" onclick="visitPage('+pageStart+')"><span aria-hidden="true">&larr;</span></a>';
            }
            //下一页
            if ((data["visit_pageStart"])*data["visit_pageSize"] >= data["visit_total"]){
                visit_next =
                    '<span aria-hidden="true" class="btn" disabled="disabled">&rarr;</span>';
            } else {
                var pageStart = data["visit_pageStart"]+1;
                visit_next =
                    '<a href="javascript:void(0)" onclick="visitPage('+pageStart+')"><span aria-hidden="true">&rarr;</span></a>';
            }
            var listVisit_page =
                '<ul class="pagination">' +
                '    <li><a href="javascript:void(0)" onclick="visitPage(1)">首页</a></li>' +
                '    <li id="visit_previous">'+visit_previous+'</li>' +
                '    <li class="active"><a href="javascript:void(0)">'+data["visit_pageStart"]+'</a></li>' +
                '    <li id="visit_next">'+visit_next+'</li>' +
                '    <li><a href="javascript:void(0)" onclick="visitPage('+data["visit_tail"]+')">尾页</a></li>' +
                '  </ul>';
            $("#listVisit_page").html(listVisit_page);
            /*########################################### 访问管理-end ############################################################*/
        },
        error : function() {
            layer.msg("异常！",{icon: 5});
        }
    });
}
