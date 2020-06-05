/* 板块新增预览 */
function onkeyupPlateAdd() {
    var bname = $.trim($("#bname_Add").val());   //去掉前后空格
    var count_num = chEnWordCount(bname);
    if (count_num > plateNameLength){
        layer.tips('不能超过【'+plateNameLength+'】个字符，当前数 - '+count_num, '#bname_Add', {
            tips: [1, '#ff6620'] //还可配置颜色
        });
        return false;
    } else {
        var index = layer.tips("满足");
        // 立即关闭
        layer.close(index);
        return true;
    }
}
/*新增板块信息*/
function plateAdd(){
    var bname = $.trim($("#bname_Add").val());   //去掉前后空格
    if (bname == ""){
        layer.tips('请输入板块名', '#bname_Add', {
            tips: [1, '#ff6620'] //还可配置颜色
        });
        return false;
    }
    if (!onkeyupPlateAdd()){
        return false;
    }
    //调ajax
    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/plate/setPlate",
        data: $('#form_addPlate').serialize(),
        type: "POST",
        dataType: "json",
        success: function(data){
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                $('#plate_Add').modal('hide');     // 关闭模态框
                $.ajax({
                    url: APP_PATH + "/api/rest/nanshengbbs/v3.0/plate/getPlate",
                    type: "get",
                    dataType: "json",
                    success: function(data){
                        // 状态码
                        var code = data.code;
                        // 提示信息
                        var msg = data.msg;
                        if (code == 200) {
                            /*########################################### 板块管理 ############################################################*/
                            $("#plate_all").html(getPlateList(data.data));
                            //板块总数
                            $("#plate_total").html('（' + data.data.total + '类）');
                            /*########################################### 板块管理-end ############################################################*/
                        } else if (code == 500) {
                            layer.msg(msg,{icon: 5});
                        }
                    },
                    error : function() {
                        layer.msg("出错！",{icon: 5});
                    }
                });
                layer.msg(msg);
            } else if (code == 404) {
                layer.tips(msg, '#bname_Add', {
                    tips: [1, '#ff6620'] //还可配置颜色
                });
            } else if (code == 500) {
                layer.msg(msg,{icon: 5});
            }
        },
        error : function() {
            layer.msg("出错！",{icon: 5});
        }
    });
}


/* 板块修改预览 */
function onkeyupPlateUpdate() {
    var bname = $.trim($("#plateEdit_new_name").val());   //去掉前后空格
    var count_num = chEnWordCount(bname);
    if (count_num > plateNameLength){
        layer.tips('不能超过【'+plateNameLength+'】个字符，当前数 - '+count_num, '#plateEdit_new_name', {
            tips: [1, '#ff6620'] //还可配置颜色
        });
        return false;
    } else {
        var index = layer.tips("满足");
        // 立即关闭
        layer.close(index);
        return true;
    }
}
/*板块显示-修改*/
function plateShow(bid, bname){
    // 原板块名
    $("#plateEdit_name").html(bname);
    // 新板块输入框
    $("#plateEdit_new_name").attr("onkeyup", "onkeyupPlateUpdate()");
    // 确定修改
    $("#plateEdit_submit").attr("onclick", "plateUpdate('" + bid + "')");
}
/*修改板块信息*/
function plateUpdate(bid){
    var bname = $.trim($("#plateEdit_new_name").val());   //去掉前后空格
    if (bname == ""){
        layer.tips('请输入板块名', '#plateEdit_new_name', {
            tips: [1, '#ff6620'] //还可配置颜色
        });
        return false;
    }
    if (!onkeyupPlateUpdate()){
        return false;
    }
    var data = {
        "bid": bid,
        "bname": bname
    }
    //调ajax
    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/plate/updatePlate",
        data: data,
        type: "put",
        dataType: "json",
        success: function(data){
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                $('#plate_Update').modal('hide');     // 关闭模态框
                $.ajax({
                    url: APP_PATH + "/api/rest/nanshengbbs/v3.0/plate/getPlate",
                    type: "get",
                    dataType: "json",
                    success: function(data){
                        // 状态码
                        var code = data.code;
                        // 提示信息
                        var msg = data.msg;
                        if (code == 200) {
                            /*########################################### 板块管理 ############################################################*/
                            $("#plate_all").html(getPlateList(data.data));
                            //板块总数
                            $("#plate_total").html('（' + data.data.total + '类）');
                            /*########################################### 板块管理-end ############################################################*/
                        } else if (code == 500) {
                            layer.msg(msg,{icon: 5});
                        }
                    },
                    error : function() {
                        layer.msg("出错！",{icon: 5});
                    }
                });
                layer.msg(msg);
            } else if (code == 404) {
                layer.tips(msg, '#plateEdit_new_name', {
                    tips: [1, '#ff6620'] //还可配置颜色
                });
            } else if (code == 500) {
                layer.msg(msg,{icon: 5});
            }
        },
        error : function() {
            layer.msg("出错！",{icon: 5});
        }
    });
}


/*删除确认框*/
function b_del(bid) {
    layer.confirm('确定删除该板块吗？<br>这将同时删除与该板块相关的所有信息<br>删除后无法恢复！', {
        btn:["确定","取消"],
        icon:2,
        title: "删除提示"
    }, function(){
        //点击确后关闭提示框
        layer.closeAll('dialog');
        plateDel(bid);
    });
}
/*删除板块信息*/
function plateDel(bid) {
    //调ajax
    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/plate/deletePlate/"+bid,
        data: $('#form_delPlate').serialize(),
        type: "delete",
        dataType: "json",
        success: function(data){
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                $('#plate_Add').modal('hide');     // 关闭模态框
                $.ajax({
                    url: APP_PATH + "/api/rest/nanshengbbs/v3.0/plate/getPlate",
                    type: "get",
                    dataType: "json",
                    success: function(data){
                        // 状态码
                        var code = data.code;
                        // 提示信息
                        var msg = data.msg;
                        if (code == 200) {
                            /*########################################### 板块管理 ############################################################*/
                            $("#plate_all").html(getPlateList(data.data));
                            //板块总数
                            $("#plate_total").html('（' + data.data.total + '类）');
                            /*########################################### 板块管理-end ############################################################*/
                        } else if (code == 500) {
                            layer.msg(msg,{icon: 5});
                        }
                    },
                    error : function() {
                        layer.msg("出错！",{icon: 5});
                    }
                });
                layer.msg(msg);
            } else if (code == 500) {
                layer.msg(msg,{icon: 5});
            }
        },
        error : function() {
            layer.msg("出错！",{icon: 5});
        }
    });
}