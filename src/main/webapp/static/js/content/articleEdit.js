//帖子-修改
function updateArticle(original_photo) {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var userid = document.getElementById("session_userid").value;

    var formData = new FormData();
    var fid = $('#article_Edit_fid').val(); // fid
    var titles = $.trim($("#article_Edit_titles").val());   //去掉前后空格
    var fcontent = $.trim($("#article_Edit_fcontent").val());   //去掉前后空格
    var bid = $('#article_Edit_bid').val();

    formData.append("fid",fid);
    formData.append("titles",titles);
    formData.append("fcontent",fcontent);
    formData.append("bid",bid);

    var photo = $("#f_previewImg")[0].files[0];
    if (typeof(photo) != "undefined"){
        formData.append("photo",$("#f_previewImg")[0].files[0]);
        /**
         * 修改帖子表（更改题图）
         */
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
                    if (getQueryString("source") == "contentArticle"){  //文章详情处进入修改页面
                        // 返回文章详情页面
                        skipArticle(fid);
                    } else if (getQueryString("source") == "myself"){   //个人主页处进入修改页面
                        // 返回个人主页
                        skipMyself();
                    }
                    layer.msg("成功");
                }else {
                    layer.msg("失败",{icon: 7});
                }
            },
            error : function() {
                layer.msg("异常！",{icon: 5});
            }
        });
    } else {
        formData.append("photo",original_photo);
        /**
         * 修改帖子表（题图未更改）
         */
        $.ajax({
            //几个参数需要注意一下
            type: "post",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            url: "articleController/updateArticleNotPhoto" ,//url
            data: formData ,
            // 告诉jQuery不要去处理发送的数据
            processData : false,
            // 告诉jQuery不要去设置Content-Type请求头
            contentType : false,
            success: function (result) {
                if (result.resultCode == 200) {
                    if (getQueryString("source") == "contentArticle"){  //文章详情处进入修改页面
                        // 返回文章详情页面
                        skipArticle(fid);
                    } else if (getQueryString("source") == "myself"){   //个人主页处进入修改页面
                        // 返回个人主页
                        skipMyself();
                    }
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
}

//根据参数名获取对应的url参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

/*跳转到帖子详情（不新开一个tab）*/
function skipArticle(fid) {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var url = APP_PATH+'/article.jsp?fid=' + fid;
    window.location.href = url;
}

/*跳转到个人主页（不新开一个tab）*/
function skipMyself() {
    var APP_PATH = document.getElementById("APP_PATH").value;
    var url = APP_PATH+'/myself.jsp';
    window.location.href = url;
}