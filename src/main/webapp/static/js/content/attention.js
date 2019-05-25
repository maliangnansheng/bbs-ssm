// 添加关注
function attentionAdd(fid,fuserid,userid) {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var userid = document.getElementById("session_userid").value;
    $.ajax({
        //几个参数需要注意一下
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "attentionController/setAttention" ,//url
        data: $('#form_attentionAdd_'+fid).serialize(),
        success: function (result) {
            if (result.resultCode == 200) {
                //获取最新评论信息
                $.ajax({
                    type: "post",//方法类型
                    dataType: "json",//预期服务器返回的数据类型
                    url: "attentionController/getAttentionBeuserid/"+fuserid ,//url
                    success: function (data) {
                        var attention = data["attention"];
                        var form_attention =
                            '<form id="form_attentionDel_'+fid+'" method="post">' +
                                '<input type="hidden" name="gid" value=' + attention["gid"] + '>' +
                                '<div class="attention_content">' +
                                    '<a href="javascript:void(0)">' +
                                        '<button type="button" onclick="attentionDel('+fid+","+fuserid+","+userid+')" class="btn button2" style="width:80px;">取消关注</button>' +
                                        '<button type="button" onclick="attentionDel('+fid+","+fuserid+","+userid+')" class="btn" style="width:80px;">已关注</button>' +
                                    '</a>' +
                                '</div>' +
                            '</form>';
                        $("#form_attention"+fid).html(form_attention);
                    },
                    error : function() {
                        layer.msg("异常！",{icon: 5});
                    }
                });
                layer.msg("成功");
            }else {
                layer.msg("失败",{icon: 7});
            }
        },
        error : function() {
            layer.msg("异常！",{icon: 5});
        }
    });
}

// 取消关注
function attentionDel(fid,fuserid,userid) {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var userid = document.getElementById("session_userid").value;
    $.ajax({
        //几个参数需要注意一下
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "attentionController/deleteAttention" ,//url
        data: $('#form_attentionDel_'+fid).serialize(),
        success: function (result) {
            if (result.resultCode == 200) {
                //获取最新评论信息
                $.ajax({
                    type: "post",//方法类型
                    dataType: "json",//预期服务器返回的数据类型
                    url: "attentionController/getAttentionBeuserid/"+fuserid ,//url
                    success: function (data) {
                        var form_attention =
                            '<form id="form_attentionAdd_'+fid+'" method="post">' +
                                '<input type="hidden" name="userid" value="' + userid + '">' +
                                '<input type="hidden" name="beuserid" value="' + fuserid + '">' +
                                '<button type="button" onclick="attentionAdd('+fid+","+fuserid+","+userid+')" class="btn btn-info btn-sm">' +
                                    '<samp class="glyphicon glyphicon-plus"></samp> 关注她' +
                                '</button>' +
                            '</form>';
                        $("#form_attention"+fid).html(form_attention);
                    },
                    error : function() {
                        layer.msg("异常！",{icon: 5});
                    }
                });
                layer.msg("成功");
            }else {
                layer.msg("失败",{icon: 7});
            }
        },
        error : function() {
            layer.msg("异常！",{icon: 5});
        }
    });
}

// 取消关注-个人主页
function attentionDel_Myself(beuserid) {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var userid = document.getElementById("session_userid").value;
    $.ajax({
        //几个参数需要注意一下
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "attentionController/deleteAttentionMyself" ,//url
        data: $('#form_attentionDel_'+beuserid).serialize(),
        success: function (data) {
            if (data.resultCode == 200) {
                var myAttentions = data["myListAttentions"];
                //总关注=我关注的用户数+关注我的的用户数
                $("#count_Attention").html($("#count_Attention").text()-1);
                //我关注的用户数
                var attention_count = myAttentions.length;
                $("#attention_count").html(attention_count);

                var attention_all = "";
                if (myAttentions == ""){    //判断是否有关注他人
                    var attention_null =
                        '<br><br><br><br>' +
                        '<div class="text-center">' +
                        '<img alt="没关注过人" src="'+APP_PATH+'/static/img/attention.png">' +
                        '<p style="color: #999999">可能，你还没遇见感兴趣的人</p>' +
                        '</div>' +
                        '<br><br><br><br>';
                    $("#attention_null").html(attention_null);
                } else {
                    for (var i=0;i<myAttentions.length;i++){
                        var myAttention = myAttentions[i];
                        var myAttention_userphoto = "";
                        if (myAttention["userphoto"] != null){  //该用户有修改头像
                            myAttention_userphoto =
                                '<img class="img-thumbnail" alt="Brand" style="position:relative;width: 70px;height: 70px;" ' +
                                'src="'+APP_PATH+'/static/upload/user/'+myAttention["userphoto"]+'">';
                        } else {    //该用户没有修改头像，只有默认头像
                            myAttention_userphoto =
                                '<img class="img-thumbnail" alt="Brand" style="position:relative;width: 70px;height: 70px;"' +
                                'src="'+APP_PATH+'/static/img/head.png">';
                        }
                        attention_all = attention_all +
                            '<div class="row">' +
                            '<div class="col-xs-3 col-md-2">' +
                            '<a href="'+APP_PATH+'/userController/getOthers?userid='+myAttention["userid"]+'">'+myAttention_userphoto+'</a>' +
                            '</div>' +
                            '<div class="col-xs-5 col-md-8">' +
                            '<a class="a_b" href="'+APP_PATH+'/userController/getOthers?userid='+myAttention["userid"]+'">' +
                            '<!-- 发帖人名字 -->' +
                            '<b style="font-size: 16px;">'+myAttention["name"]+'</b>' +
                            '</a>' +
                            '<br>' +
                            '<samp>'+myAttention["intro"]+'</samp>' +
                            '<br>' +
                            '<samp>有<b class="text-success">'+myAttention["attcount"]+'</b>人关注</samp>' +
                            '</div>' +
                            '<div class="col-xs-4 col-md-2 attention">' +
                            '<form id="form_attentionDel_'+myAttention["userid"]+'">' +
                            '<a href="javascript:void(0)">' +
                            '<input type="hidden" name="userid" value="'+userid+'">' +
                            '<input type="hidden" name="beuserid" value="'+myAttention["userid"]+'">' +
                            '<button type="button" class="btn button2" style="width:80px;" onclick="attentionDel_Myself('+myAttention["userid"]+')">取消关注</button>' +
                            '<button type="button" class="btn" style="width:80px;" onclick="attentionDel_Myself('+myAttention["userid"]+')">已关注</button>' +
                            '</a>' +
                            '</form>' +
                            '</div>' +
                            '</div>' +
                            '<hr>';
                    }
                }
                $("#attention_all").html(attention_all);
                layer.msg("成功");
            }else {
                layer.msg("失败",{icon: 7});
            }
        },
        error : function() {
            layer.msg("异常！",{icon: 5});
        }
    });
}
