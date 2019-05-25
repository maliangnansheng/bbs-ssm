/*帖子审核*/
function articleCheck(fid, status) {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var adminList = document.getElementById("adminList").value;
    $.ajax({
        url: APP_PATH + "/articleController/articleStatus",
        type: "post",
        dataType: "json",
        data: $('#form_listArticle_' + fid).serialize(),
        success: function (result) {
            if (result.resultCode == 200){
                //审核状态
                var listArticle_status = "";
                if (status == 0){     //待审核
                    listArticle_status =
                        '<button type="button" class="btn btn-warning btn-sm" disabled="disabled">待审核。。</button>';
                } else if (status == 1){   //审核通过
                    listArticle_status =
                        '<button type="button" class="btn btn-info btn-sm" disabled="disabled">审核通过</button>';
                } else if (status == 2){   //审核未通过
                    listArticle_status =
                        '<button type="button" class="btn btn-danger btn-sm" disabled="disabled">审核未通过</button>';
                }

                //操作
                var listArticle_caozuo = "";
                if (status == 0){     //待审核
                    listArticle_caozuo =
                        '<form method="post" id="form_listArticle_'+fid+'">' +
                        '<input type="hidden" name="fid" value="'+fid+'">' +
                        '<input type="hidden" name="status" value="1">' +
                        '<input type="button" class="btn btn-info btn-sm" value="通过" onclick="articleCheck('+fid+",1"+')"/>' +
                        '</form>' +
                        '<form method="post" id="form_listArticle_'+fid+'">' +
                        '<input type="hidden" name="fid" value="'+fid+'">' +
                        '<input type="hidden" name="status" value="2">' +
                        '<input type="button" class="btn btn-danger btn-sm" value="拒绝" onclick="articleCheck('+fid+",2"+')"/>' +
                        '</form>';
                } else if (status == 1){   //审核通过
                    listArticle_caozuo =
                        '<form method="post" id="form_listArticle_'+fid+'">' +
                        '<input type="hidden" name="fid" value="'+fid+'">' +
                        '<input type="hidden" name="status" value="2">' +
                        '<input type="button" class="btn btn-danger btn-sm" value="拒绝"  onclick="articleCheck('+fid+",2"+')"/>' +
                        '</form>';
                } else if (status == 2){   //审核未通过
                    listArticle_caozuo =
                        '<form method="post" id="form_listArticle_'+fid+'">' +
                        '<input type="hidden" name="fid" value="'+fid+'">' +
                        '<input type="hidden" name="status" value="1">' +
                        '<input type="button" class="btn btn-info btn-sm" value="通过"  onclick="articleCheck('+fid+",1"+')"/>' +
                        '</form>';
                }
                $("#listArticle_status_"+fid).html(listArticle_status);
                $("#listArticle_caozuo_"+fid).html(listArticle_caozuo);
                layer.msg("成功");
            } else {
                layer.msg("失败",{icon: 7});
            }

        },
        error : function() {
            layer.msg("异常！",{icon: 5});
        }
    });
}

/*分页操作*/
function articlePage(pageStart) {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var adminList = document.getElementById("adminList").value;
    $.ajax({
        url: APP_PATH + "/articleController/getArticleManagement?pageStart="+pageStart,
        type: "post",
        dataType: "json",
        success: function (data) {
            /*########################################### 帖子管理 ############################################################*/
            var listArticle_all = "";
            var listArticles = data["listArticle"];
            var article_num = (data["article_pageStart"] - 1)*data["article_pageSize"];   //计数
            for (var i=0;i<listArticles.length;i++){
                article_num++;
                var listArticle = listArticles[i];
                var listArticle_photo = "";
                if (listArticle["photo"] != "photo"){   //有配图
                    var listArticle_photo_type = "";
                    if (listArticle["photo"].endsWith(".mp4") || listArticle["photo"].endsWith(".avi")){    //视频
                        listArticle_photo_type =
                            '<video controls="controls" src="'+APP_PATH+'/static/upload/article/'+listArticle["photo"]+'"' +
                            'style="position: relative; width: 100%; height: 100%;"></video>';
                    } else {
                        listArticle_photo_type =
                            '<img src="'+APP_PATH+'/static/upload/article/'+listArticle["photo"]+'"' +
                            'style="position: relative; width: 100%; height: 100%;">';
                    }
                    listArticle_photo =
                        '<a href="'+APP_PATH+'/static/upload/article/'+listArticle["photo"]+'" target="_brank" id="listArticle_photo_type">'+listArticle_photo_type+'</a>';
                }

                //审核状态
                var listArticle_status = "";
                if (listArticle["status"] == 0){     //待审核
                    listArticle_status =
                        '<button type="button" class="btn btn-warning btn-sm" disabled="disabled">待审核。。</button>';
                } else if (listArticle["status"] == 1){   //审核通过
                    listArticle_status =
                        '<button type="button" class="btn btn-info btn-sm" disabled="disabled">审核通过</button>';
                } else if (listArticle["status"] == 2){   //审核未通过
                    listArticle_status =
                        '<button type="button" class="btn btn-danger btn-sm" disabled="disabled">审核未通过</button>';
                }

                //操作
                var listArticle_caozuo = "";
                if (adminList == "" || adminList == null){  //未登录
                    listArticle_caozuo =
                        '<span class="glyphicon glyphicon-ban-circle"></span>';
                } else {
                    if (listArticle["status"] == 0){     //待审核
                        listArticle_caozuo =
                            '<form method="post" id="form_listArticle_'+listArticle["fid"]+'">' +
                            '<input type="hidden" name="fid" value="'+listArticle["fid"]+'">' +
                            '<input type="hidden" name="status" value="1">' +
                            '<input type="button" class="btn btn-info btn-sm" value="通过" onclick="articleCheck('+listArticle["fid"]+",1"+')"/>' +
                            '</form>' +
                            '<form method="post" id="form_listArticle_'+listArticle["fid"]+'">' +
                            '<input type="hidden" name="fid" value="'+listArticle["fid"]+'">' +
                            '<input type="hidden" name="status" value="2">' +
                            '<input type="button" class="btn btn-danger btn-sm" value="拒绝" onclick="articleCheck('+listArticle["fid"]+",2"+')"/>' +
                            '</form>';
                    } else if (listArticle["status"] == 1){   //审核通过
                        listArticle_caozuo =
                            '<form method="post" id="form_listArticle_'+listArticle["fid"]+'">' +
                            '<input type="hidden" name="fid" value="'+listArticle["fid"]+'">' +
                            '<input type="hidden" name="status" value="2">' +
                            '<input type="button" class="btn btn-danger btn-sm" value="拒绝"  onclick="articleCheck('+listArticle["fid"]+",2"+')"/>' +
                            '</form>';
                    } else if (listArticle["status"] == 2){   //审核未通过
                        listArticle_caozuo =
                            '<form method="post" id="form_listArticle_'+listArticle["fid"]+'">' +
                            '<input type="hidden" name="fid" value="'+listArticle["fid"]+'">' +
                            '<input type="hidden" name="status" value="1">' +
                            '<input type="button" class="btn btn-info btn-sm" value="通过"  onclick="articleCheck('+listArticle["fid"]+",1"+')"/>' +
                            '</form>';
                    }
                }
                listArticle_all = listArticle_all +
                    '<tr>' +
                    '<td>' +
                    '<div style="width:10px;word-wrap:break-word;">'+article_num+'</div>' +
                    '</td>' +
                    '<td>' +
                    '<div style="width:50px;word-wrap:break-word;">'+listArticle["titles"]+'</div>' +
                    '</td>' +
                    '<td>' +
                    '<div style="width:300px;word-wrap:break-word;">'+listArticle["fcontent"]+'</div>' +
                    '</td>' +
                    '<td>' +
                    '<div style="position: relative;width:100px;height:100px;" id="listArticle_photo">'+listArticle_photo+'</div>' +
                    '</td>' +
                    '<td>'+listArticle["username"]+'</td>' +
                    '<td>'+listArticle["bname"]+'</td>' +
                    '<td>'+listArticle["time"]+'</td>' +
                    '<td id="listArticle_status_'+listArticle["fid"]+'">'+listArticle_status+'</td>' +
                    '<!-- 操作 -->' +
                    '<td class=" text-center" id="listArticle_caozuo_'+listArticle["fid"]+'">'+listArticle_caozuo+'</td>' +
                    '</tr>';
            }
            $("#listArticle_all").html(listArticle_all);
            //帖子总数
            $("#article_total").html('（'+data["article_total"]+'条）');

            var article_previous = "";
            var article_next = "";
            //上一页
            if (data["article_pageStart"] == 1){
                article_previous =
                    '<span aria-hidden="true" class="btn" disabled="disabled">&larr;</span>';
            } else {
                var pageStart = data["article_pageStart"]-1;
                article_previous =
                    '<a href="javascript:void(0)" onclick="articlePage('+pageStart+')"><span aria-hidden="true">&larr;</span></a>';
            }
            //下一页
            if ((data["article_pageStart"])*data["article_pageSize"] >= data["article_total"]){
                article_next =
                    '<span aria-hidden="true" class="btn" disabled="disabled">&rarr;</span>';
            } else {
                var pageStart = data["article_pageStart"]+1;
                article_next =
                    '<a href="javascript:void(0)" onclick="articlePage('+pageStart+')"><span aria-hidden="true">&rarr;</span></a>';
            }
            var listArticle_page =
                '<ul class="pagination">' +
                '    <li><a href="javascript:void(0)" onclick="articlePage(1)">首页</a></li>' +
                '    <li id="article_previous">'+article_previous+'</li>' +
                '    <li class="active"><a href="javascript:void(0)">'+data["article_pageStart"]+'</a></li>' +
                '    <li id="article_next">'+article_next+'</li>' +
                '    <li><a href="javascript:void(0)" onclick="articlePage('+data["article_tail"]+')">尾页</a></li>' +
                '  </ul>';
            $("#listArticle_page").html(listArticle_page);
            /*########################################### 帖子管理-end ############################################################*/
        },
        error : function() {
            layer.msg("异常！",{icon: 5});
        }
    });
}
