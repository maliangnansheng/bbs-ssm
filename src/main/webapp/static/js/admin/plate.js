/*新增板块信息*/
function plateAdd(){
    var APP_PATH = document.getElementById("APP_PATH").value;
    var adminList = document.getElementById("adminList").value;

    var bname = $.trim($("#bname_Add").val());   //去掉前后空格
    if (bname == ""){
        layer.tips('请输入板块名', '#bname_Add', {
            tips: [1, '#ff6620'] //还可配置颜色
        });
        return ;
    }
    //调ajax
    $.ajax({
        url:APP_PATH+"/plateController/setPlate",
        data:$('#form_addPlate').serialize(),
        type:"POST",
        dataType:"json",
        success: function(result){
            if (result.resultCode == 200){
                $('#plate_Add').modal('hide');     // 关闭模态框
                $.ajax({
                    url:APP_PATH+"/plateController/getPlate",
                    type:"POST",
                    dataType:"json",
                    success: function(data){
                        /*########################################### 板块管理 ############################################################*/
                        var plate_all = "";
                        if (adminList != "" && adminList != null){  //已登录
                            var plates_add =
                                '<button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#plate_Add">新增</button>';
                            $("#plates_add").html(plates_add);
                        }
                        var plates = data["plate"];
                        var plate_num = 0;   //计数
                        for (var i=0;i<plates.length;i++){
                            plate_num++;
                            var plate = plates[i];
                            var plate_caozuo = "";
                            if (adminList == "" || adminList == null){  //已登录
                                plate_caozuo =
                                    '<span class="glyphicon glyphicon-ban-circle"></span>';
                            } else {
                                plate_caozuo =
                                    '<form method="post">' +
                                    '<input type="hidden" id="form_bname'+plate["bid"]+'" value="'+plate["bname"]+'">' +
                                    '<button type="button" class="btn btn-info btn-xs" data-toggle="modal" data-target="#plate_Update" ' +
                                    'onclick="plateShow('+plate["bid"]+')">修改</button>' +
                                    '</form>' +
                                    '<form id="form_delPlate'+plate["bid"]+'" method="post">' +
                                    '<input type="hidden" name="bid" value="'+plate["bid"]+'">' +
                                    '<button type="button" class="btn btn-danger btn-xs" onclick="b_del('+plate["bid"]+')">删除</button>' +
                                    '</form>';
                            }
                            plate_all = plate_all +
                                '<tr>' +
                                '<td>'+plate_num+'</td>' +
                                '<td>'+plate["bname"]+'</td>' +
                                '<td>'+plate["btime"]+'</td>' +
                                '<!-- 操作 -->' +
                                '<td class=" text-center" id="plate_caozuo">'+plate_caozuo+'</td>' +
                                '</tr>';
                        }
                        $("#plate_all").html(plate_all);
                        //板块总数
                        $("#plate_total").html('（'+data["plate_total"]+'条）');
                        /*########################################### 板块管理-end ############################################################*/
                    },
                    error : function() {
                        layer.msg("异常！",{icon: 5});
                    }
                });
                layer.msg("成功");
            } else if (result.resultCode == 201){
                layer.tips('该板块名已存在！', '#bname_Add', {
                    tips: [1, '#ff6620'] //还可配置颜色
                });
            } else {
                layer.msg("失败",{icon: 7});
            }
        },
        error : function() {
            layer.msg("异常！",{icon: 5});
        }
    });
}

/*删除确认框*/
function b_del(bid) {
    layer.confirm('您真的确定要删除该板块吗？删除后不能复原！', {
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
    var APP_PATH = document.getElementById("APP_PATH").value;
    var adminList = document.getElementById("adminList").value;

    //调ajax
    $.ajax({
        url:APP_PATH+"/plateController/deletePlate/"+bid,
        data:$('#form_delPlate').serialize(),
        type:"POST",
        dataType:"json",
        success: function(result){
            if (result.resultCode == 200){
                $('#plate_Add').modal('hide');     // 关闭模态框
                $.ajax({
                    url:APP_PATH+"/plateController/getPlate",
                    type:"POST",
                    dataType:"json",
                    success: function(data){
                        /*########################################### 板块管理 ############################################################*/
                        var plate_all = "";
                        if (adminList != "" && adminList != null){  //已登录
                            var plates_add =
                                '<button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#plate_Add">新增</button>';
                            $("#plates_add").html(plates_add);
                        }
                        var plates = data["plate"];
                        var plate_num = 0;   //计数
                        for (var i=0;i<plates.length;i++){
                            plate_num++;
                            var plate = plates[i];
                            var plate_caozuo = "";
                            if (adminList == "" || adminList == null){  //已登录
                                plate_caozuo =
                                    '<span class="glyphicon glyphicon-ban-circle"></span>';
                            } else {
                                plate_caozuo =
                                    '<form method="post">' +
                                    '<input type="hidden" id="form_bname'+plate["bid"]+'" value="'+plate["bname"]+'">' +
                                    '<button type="button" class="btn btn-info btn-xs" data-toggle="modal" data-target="#plate_Update" ' +
                                    'onclick="plateShow('+plate["bid"]+')">修改</button>' +
                                    '</form>' +
                                    '<form id="form_delPlate'+plate["bid"]+'" method="post">' +
                                    '<input type="hidden" name="bid" value="'+plate["bid"]+'">' +
                                    '<button type="button" class="btn btn-danger btn-xs" onclick="b_del('+plate["bid"]+')">删除</button>' +
                                    '</form>';
                            }
                            plate_all = plate_all +
                                '<tr>' +
                                '<td>'+plate_num+'</td>' +
                                '<td>'+plate["bname"]+'</td>' +
                                '<td>'+plate["btime"]+'</td>' +
                                '<!-- 操作 -->' +
                                '<td class=" text-center" id="plate_caozuo">'+plate_caozuo+'</td>' +
                                '</tr>';
                        }
                        $("#plate_all").html(plate_all);
                        //板块总数
                        $("#plate_total").html('（'+data["plate_total"]+'条）');
                        /*########################################### 板块管理-end ############################################################*/
                    },
                    error : function() {
                        layer.msg("异常！",{icon: 5});
                    }
                });
                layer.msg("成功");
            } else if (result.resultCode == 201){
                layer.tips('该板块名已存在！', '#bname_Add', {
                    tips: [1, '#ff6620'] //还可配置颜色
                });
            } else {
                layer.msg("失败",{icon: 7});
            }
        },
        error : function() {
            layer.msg("异常！",{icon: 5});
        }
    });
}


/*板块显示-修改*/
function plateShow(bid){
    var APP_PATH = document.getElementById("APP_PATH").value;
    var adminList = document.getElementById("adminList").value;

    var bname = $("#form_bname"+bid).val();
    var plateEdit_Update =
        '<form id="form_updatePlate">' +
            '<p class="text-muted text-center">原板块名：<small class="text-primary">'+bname+'</small></p>' +
            '<p class="text-muted text-warning">准备修改为：</p>' +
            '<div class="form-group">' +
                '<input type="hidden" name="bid" value="'+bid+'">' +
                '<input type="text" class="form-control" value="'+bname+'" placeholder="取一个板块名吧" ' +
                '   id="bname_Update" name="bname" required>' +
            '</div>' +
            '' +
            '<div class="modal-footer">' +
                '<button type="reset" class="btn btn-default">还原</button>' +
                '<button type="button" class="btn btn-primary" onclick="plateUpdate()">确定</button>' +
            '</div>' +
        '</form>';
    $("#plateEdit_Update").html(plateEdit_Update);
}

/*修改板块信息*/
function plateUpdate(){
    var APP_PATH = document.getElementById("APP_PATH").value;
    var adminList = document.getElementById("adminList").value;

    var bname = $.trim($("#bname_Update").val());   //去掉前后空格
    if (bname == ""){
        layer.tips('请输入板块名', '#bname_Update', {
            tips: [1, '#ff6620'] //还可配置颜色
        });
        return ;
    }
    //调ajax
    $.ajax({
        url:APP_PATH+"/plateController/updatePlate",
        data:$('#form_updatePlate').serialize(),
        type:"POST",
        dataType:"json",
        success: function(result){
            if (result.resultCode == 200){
                $('#plate_Update').modal('hide');     // 关闭模态框
                $.ajax({
                    url:APP_PATH+"/plateController/getPlate",
                    type:"POST",
                    dataType:"json",
                    success: function(data){
                        /*########################################### 板块管理 ############################################################*/
                        var plate_all = "";
                        if (adminList != "" && adminList != null){  //已登录
                            var plates_add =
                                '<button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#plate_Add">新增</button>';
                            $("#plates_add").html(plates_add);
                        }
                        var plates = data["plate"];
                        var plate_num = 0;   //计数
                        for (var i=0;i<plates.length;i++){
                            plate_num++;
                            var plate = plates[i];
                            var plate_caozuo = "";
                            if (adminList == "" || adminList == null){  //已登录
                                plate_caozuo =
                                    '<span class="glyphicon glyphicon-ban-circle"></span>';
                            } else {
                                plate_caozuo =
                                    '<form method="post">' +
                                    '<input type="hidden" id="form_bname'+plate["bid"]+'" value="'+plate["bname"]+'">' +
                                    '<button type="button" class="btn btn-info btn-xs" data-toggle="modal" data-target="#plate_Update" ' +
                                    'onclick="plateShow('+plate["bid"]+')">修改</button>' +
                                    '</form>' +
                                    '<form id="form_delPlate'+plate["bid"]+'" method="post">' +
                                    '<input type="hidden" name="bid" value="'+plate["bid"]+'">' +
                                    '<button type="button" class="btn btn-danger btn-xs" onclick="b_del('+plate["bid"]+')">删除</button>' +
                                    '</form>';
                            }
                            plate_all = plate_all +
                                '<tr>' +
                                '<td>'+plate_num+'</td>' +
                                '<td>'+plate["bname"]+'</td>' +
                                '<td>'+plate["btime"]+'</td>' +
                                '<!-- 操作 -->' +
                                '<td class=" text-center" id="plate_caozuo">'+plate_caozuo+'</td>' +
                                '</tr>';
                        }
                        $("#plate_all").html(plate_all);
                        //板块总数
                        $("#plate_total").html('（'+data["plate_total"]+'条）');
                        /*########################################### 板块管理-end ############################################################*/
                    },
                    error : function() {
                        layer.msg("异常！",{icon: 5});
                    }
                });
                layer.msg("成功");
            } else if (result.resultCode == 201){
                layer.tips('该板块名已存在！', '#bname_Update', {
                    tips: [1, '#ff6620'] //还可配置颜色
                });
            } else {
                layer.msg("失败",{icon: 7});
            }
        },
        error : function() {
            layer.msg("异常！",{icon: 5});
        }
    });
}