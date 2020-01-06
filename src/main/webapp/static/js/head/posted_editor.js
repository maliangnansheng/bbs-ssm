//写文章-展示
$(function () {
    $.ajax({
        //几个参数需要注意一下
        url: "plateController/getPlate2",//url
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        success: function (data) {
            if (data.resultCode == 200) {
                var plates = data["plate"];
                var posted_plate = "";
                for (var i=0;i<plates.length;i++){
                    var plate = plates[i];
                    posted_plate = posted_plate +
                        '<option value="'+ plate["bid"] +'">'+plate["bname"]+'</option>';
                }
                $("#posted_plate").html(posted_plate);
            } else {
                layer.msg("失败",{icon: 7});
            }
        },
        error : function() {
            layer.msg("异常！",{icon: 5});
        }
    });
});