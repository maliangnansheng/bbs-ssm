//帖子-修改(回显)
function setArticleEdit(fid) {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var userid = document.getElementById("session_userid").value;
    $.ajax({
        //几个参数需要注意一下
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "articleController/getUpdateArticle",//url
        data: $('#form_articleUpdate_' + fid).serialize(),
        success: function (data) {
            var article_Edit_all = "";
            var article = data["article_Edit"];
            //帖子所属板块
            var article_Edit_bname = "";
            var plates = data["plate"];
            for (var i=0;i<plates.length;i++){
                var plate = plates[i];
                if (plate["bname"] == article["bname"]){
                    article_Edit_bname = article_Edit_bname +
                        '<option selected="selected">'+article["bname"]+'</option>';
                } else {
                    article_Edit_bname = article_Edit_bname +
                        '<option>'+plate["bname"]+'</option>';
                }
            }
            //帖子配图
            var article_Edit_photo = "";
            if (article["photo"] == "photo") {  //无配图
                article_Edit_photo =
                    '<img style="position: relative; width: 50%; height: 50%;" id="f_imghead_up"' +
                    'src="'+ APP_PATH +'/static/img/fatiePhoto.png" onclick="$(\'#f_previewImg_up\').click();">';
            } else {
                if (article["photo"].endsWith(".mp4") |article["photo"].endsWith(".avi")){
                    article_Edit_photo =
                        '<video style="position: relative; width: 50%; height: 50%;" id="f_imghead_up"' +
                        'src="'+ APP_PATH +'/static/upload/article/'+article["photo"]+'" onclick="$(\'#f_previewImg_up\').click();"></video>';
                } else {
                    article_Edit_photo =
                        '<img style="position: relative; width: 50%; height: 50%;" id="f_imghead_up"' +
                        'src="'+ APP_PATH +'/static/upload/article/'+article["photo"]+'" onclick="$(\'#f_previewImg_up\').click();">';
                }
            }

            article_Edit_all =
                '<form id="form_article_Edit" method="post" enctype="multipart/form-data">' +
                    '<input id="article_Edit_fid" type="hidden" name="fid" value="'+fid+'">' +
                    '' +
                    '<p class="text-muted">修改你的标题：</p>' +
                        '<div class="form-group">' +
                        '<input type="text" class="form-control" placeholder="标题" id="article_Edit_titles" name="titles" value="'+article["titles"]+'" required>' +
                    '</div>' +
                    '' +
                    '<p class="text-muted">修改所属板块：</p>' +
                    '<div class="form-group">' +
                        '<select id="article_Edit_bname" class="form-control" name="bname">'+article_Edit_bname+'</select>' +
                    '</div>' +
                    '' +
                    '<p class="text-muted">修改你的内容：</p>' +
                    '<div class="form-group">' +
                        '<textarea class="form-control" placeholder="内容" id="article_Edit_fcontent" name="fcontent"' +
                        'style="position: relative; height: 200px;" required>'+article["fcontent"]+'</textarea>' +
                    '</div>' +
                    '' +
                    '<p class="text-muted">在本地选择你的配图<small style="color: #ff7a19">(需重新从本地选择配图)</small>：</p>' +
                    '<div class="form-group">' +
                        '<div id="f_preview_up">' +
                            '<a href="javascript:void(0)" id="article_Edit_photo">'+article_Edit_photo+'</a>' +
                        '</div>' +
                        '<input type="file" onchange="f_previewImage_up(this)" style="display: none;" id="f_previewImg_up" name="photo">' +
                    '</div>' +
                    '' +
                    '<div class="modal-footer">' +
                        '<button type="reset" class="btn btn-default">还原</button>' +
                        '<button type="button" class="btn btn-primary" onclick="updateArticle()">保存</button>' +
                    '</div>' +
                '</form>';
            $("#article_Edit_all").html(article_Edit_all);
        },
        error: function () {
            layer.msg("异常！",{icon: 5});
        }
    });
}

//帖子-修改
function updateArticle() {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var userid = document.getElementById("session_userid").value;

    var formData = new FormData();
    var fid = $('#article_Edit_fid').val();
    var titles = $.trim($("#article_Edit_titles").val());   //去掉前后空格
    var fcontent = $.trim($("#article_Edit_fcontent").val());   //去掉前后空格
    var bname = $('#article_Edit_bname').val();
    formData.append("fid",fid);
    formData.append("titles",titles);
    formData.append("fcontent",fcontent);
    formData.append("bname",bname);
    if (titles == ""){
        layer.tips('请输入帖子标题!', '#article_Edit_titles', {
            tips: [1, '#ff6620'] //还可配置颜色
        });
        return;
    } else if (fcontent == ""){
        layer.tips('请输入帖子内容!', '#article_Edit_fcontent', {
            tips: [1, '#ff6620'] //还可配置颜色
        });
        return;
    } else if ($("#f_previewImg_up")[0].files[0] == null){  //未配图
        layer.tips('修改帖子[必须]重新在本地选择配图!', '#article_Edit_photo', {
            tips: [1, '#ff6620'] //还可配置颜色
        });
        return;
    }
    formData.append("photo",$("#f_previewImg_up")[0].files[0]);
    $.ajax({
        //几个参数需要注意一下
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "articleController/updateArticle" ,//url
        data: formData ,
        // 告诉jQuery不要去处理发送的数据
        processData : false,
        // 告诉jQuery不要去设置Content-Type请求头
        contentType : false,
        success: function (result) {
            if (result.resultCode == 200) {
                $('#articleEdit').modal('hide');     // 关闭模态框
                //获取最新本人帖子信息
                $.ajax({
                    type: "post",//方法类型
                    dataType: "json",//预期服务器返回的数据类型
                    url: "userController/getMyselfArticle" ,//url
                    success: function (data) {
                        /*下半部分*/
                        var myself_article_all ="";
                        //动态
                        var articles = data["myListArticles"];
                        var count_Article = articles.length;        //动态数
                        $("#count_Article").html(count_Article);

                        /*帖子循环-开始（动态）*/
                        if (articles == "") { //判断是否有动态
                            var article_null =
                                '<br><br><br><br>' +
                                '<div class="text-center">' +
                                '<img alt="没发过帖子" src="'+ APP_PATH +'/static/img/article.png">' +
                                '<p style="color: #999999">你很懒，还没有发过帖子</p>' +
                                '</div>' +
                                '<br><br><br><br>';
                            $("#article_null").html(article_null);
                        }
                        for (var i=0;i<count_Article;i++){
                            var article = articles[i];
                            var myself_article_status = "";
                            var myself_article_time = "";
                            var myself_article_titles = "";
                            var myself_article_fcontent = "";
                            var myself_article_photo = "";
                            var myself_article_update = "";
                            var myself_article_del = "";

                            /*审核状态*/
                            if (article["status"] == 0){ //待审核状态
                                myself_article_status = '<small class="btn-warning">待审核。。。</small>';
                            } else if (article["status"] == 1){ //审核通过状态
                                myself_article_status = '<small class="text-success"><b>审核通过</b></small>';
                            } else if (article["status"] == 2){ //审核未通过状态
                                myself_article_status = '<small class="btn-danger">审核未通过</small>';
                            }

                            /*发帖时间*/
                            myself_article_time = article["time"];

                            /*帖子标题*/
                            myself_article_titles = article["titles"];

                            /*帖子内容*/
                            myself_article_fcontent = article["fcontent"];

                            /*帖子配图*/
                            if (article["photo"] != "photo"){   //无配图
                                var img_video;
                                if (article["photo"].endsWith(".mp4")||article["photo"].endsWith(".avi")){  //视频
                                    img_video = '<video controls="controls" src="'+ APP_PATH +'/static/upload/article/'+article["photo"]+'" ' +
                                        'style="position: relative; width: 30%; height: 30%;"></video>';
                                }else {     //图片
                                    img_video = '<img src="'+ APP_PATH +'/static/upload/article/'+article["photo"]+'"' +
                                        'style="position: relative; width: 30%; height: 30%;">';
                                }
                                myself_article_photo = '<a href="'+ APP_PATH +'/static/upload/article/'+article["photo"]+'" target="_blank">'+img_video+'</a>';
                            }

                            /*修改*/
                            myself_article_update =
                                '<form id="form_articleUpdate_'+article["fid"]+'">' +
                                '<input type="hidden" name="titles" value="'+article["titles"]+'">' +
                                '<input type="hidden" name="bname" value="'+article["bname"]+'">' +
                                '<input type="hidden" name="fcontent" value="'+article["fcontent"]+'">' +
                                '<input type="hidden" name="photo" value="'+article["photo"]+'">' +
                                '<button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#articleEdit" onclick="setArticleEdit('+article["fid"]+')">修改</button>' +
                                '</form>';

                            /*删除*/
                            myself_article_del =
                                '<form>' +
                                '<button type="button" class="btn btn-danger btn-sm" onclick="f_del('+article["fid"]+')">删除</button>' +
                                '</form>';

                            /*评论*/
                            var myself_article_comment = "";
                            var myListComment_Fid = "myListComment_"+article["fid"];
                            var comments = data[myListComment_Fid];
                            for (var j=0;j<comments.length;j++){
                                var comment = comments[j];
                                myself_article_comment = myself_article_comment +
                                    '<hr style="position: relative; margin-top: 2px;height:1px;border:none;border-top:1px dashed #dddddd;">' +
                                    '<div class="row" style="position: relative; margin-top: -10px;">' +
                                    '<div class="col-xs-9 col-md-11">' +
                                    '<a href="'+ APP_PATH +'/userController/getOthers?userid='+comment["userid"]+'" class="a_p">' +
                                    '<!-- 评论者姓名 -->' +
                                    '<b>'+comment["name"]+'</b>' +
                                    '</a>' +
                                    '&nbsp;&nbsp;&nbsp;' +
                                    '<small>'+comment["time"]+'</small>' +
                                    '<!-- 评论者内容 -->' +
                                    '<p>'+comment["pcontent"]+'</p>' +
                                    '</div>' +
                                    '<div class="col-xs-3 col-md-1">' +
                                    '<form>' +
                                    '<button type="button" class="btn btn-danger btn-sm" onclick="p_del('+article["fid"]+","+comment["pid"]+')">删除</button>' +
                                    '</form>' +
                                    '</div>' +
                                    '</div>';
                            }

                            myself_article_all = myself_article_all +
                                '<!--动态-->' +
                                '<div class="row">' +
                                '<div class="col-xs-7 col-md-6">' +
                                '<!-- 帖子审核状态 -->' +
                                '<small>审核状态：</small>' +
                                '<!-- 审核状态显示 -->' +
                                '<span id="myself_article_status">'+myself_article_status+'</span>' +
                                '</div>' +
                                '<div class="col-xs-5 col-md-2 col-md-offset-4" style="position: relative;">' +
                                '<!-- 时间 -->' +
                                '<small id="myself_article_time">'+myself_article_time+'</small>' +
                                '</div>' +
                                '' +
                                '<div class="col-xs-12 col-md-12">' +
                                '<h4>' +
                                '<!-- 标题 -->' +
                                '<b id="myself_article_titles">'+myself_article_titles+'</b>' +
                                '</h4>' +
                                '</div>' +
                                '<div class="col-xs-12 col-md-12">' +
                                '<!-- 内容 -->' +
                                '<p id="myself_article_fcontent">'+myself_article_fcontent+'</p>' +
                                '</div>' +
                                '<!-- 配图 -->' +
                                '<div class="col-xs-12 col-md-12" id="myself_article_photo">'+myself_article_photo+'</div>' +
                                '<div class="col-xs-7 col-md-10"></div>' +
                                '<!-- 修改 -->' +
                                '<div class="col-xs-2 col-md-1" id="myself_article_update">'+myself_article_update+'</div>' +
                                '<!-- 删除 -->' +
                                '<div class="col-xs-3 col-md-1" id="myself_article_del">'+myself_article_del+'</div>' +
                                '</div>' +
                                '' +
                                '<!--评论-循环开始（动态）-->' +
                                '<div id="myself_article_comment'+article["fid"]+'">'+myself_article_comment+'</div>' +
                                '<!--评论-循环结束（动态）-->' +
                                '<hr style="height:1px;border:none;border-top:3px solid #bbbbbb;">';
                        }
                        $("#myself_article_all").html(myself_article_all);
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