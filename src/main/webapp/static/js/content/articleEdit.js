// 原始文章配图
var original_photo = "";
// 原始文章标题
var original_title = "";
// 原始文章内容
var original_content = "";
// 原始文章板块
var original_bid = "";

$(function() {
    // 获取地址栏中的fid参数
    var fid = getQueryString("fid");

    $.ajax({
        //几个参数需要注意一下
        type: "get",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/article/getUpdateArticle/" + fid,
        success: function (data) {
            //文章所属板块
            var article_Edit_bid = "";
            var article = data.data.article;
            var plates = data.data.plate;
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                for (var i=0;i<plates.length;i++){
                    var plate = plates[i];
                    if (plate.bid == article.bid){
                        $("#article_Edit_bid_hide option").attr("value", article.bid);
                        $("#article_Edit_bid_hide option").attr("selected", true);
                        $("#article_Edit_bid_hide option").html(article.currentPlate.bname);
                    } else {
                        $("#article_Edit_bid_hide option").removeAttr("selected");
                        $("#article_Edit_bid_hide option").attr("value", plate.bid);
                        $("#article_Edit_bid_hide option").html(plate.bname);
                    }

                    article_Edit_bid = article_Edit_bid + $("#article_Edit_bid_hide").html();
                }
                $("#article_Edit_bid").html(article_Edit_bid);

                //文章配图
                if (article.photo == "") {  // 无配图
                    $(".not_picture").show();
                    $(".picture_video").hide();
                    $(".picture_img").hide();
                    $(".not_picture").attr("id", "f_imghead");
                } else {
                    $(".not_picture").hide();
                    if (article.photo.endsWith(".mp4") || article.photo.endsWith(".avi")){  // 视频
                        $(".picture_video").show();
                        $(".picture_img").hide();
                        $(".picture_video").attr("id", "f_imghead");
                    } else {    // 非视频（图片）
                        $(".picture_video").hide();
                        $(".picture_img").show();
                        $(".picture_img").attr("id", "f_imghead");
                    }
                    $("#f_imghead").attr("src", article.photo);
                }

                // 标题
                $("#article_Edit_titles").val(article.titles);
                // 内容
                $("#article_Edit_fcontent").val(article.fcontent);
                // fid
                $("#article_Edit_fid").val(fid);

                original_title = article.titles;
                original_content = article.fcontent;
                original_bid = article.bid;
                original_photo = article.photo;
            } else if (code == 500) {
                layer.msg(msg,{icon: 5});
            }
        },
        error: function () {
            layer.msg("出错！",{icon: 5});
        }
    });

    var myEditor = editormd("my-editormd", {
        width   : "82%",
        height  : 640,
        syncScrolling : "single",
        //你的lib目录的路径
        path    : APP_PATH + "/static/editor.md-master/lib/",

        /**上传图片相关配置如下*/
        imageUpload : true,
        imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
        imageUploadURL : APP_PATH + "/api/rest/nanshengbbs/v3.0/article/uploadPicture",

        onload: function() {
            // 引入插件 执行监听方法
            editormd.loadPlugin(APP_PATH + "/static/editor.md-master/plugins/image-handle-paste/image-handle-paste", function(){
                myEditor.imagePaste();
            });
        },

        //这个配置，方便post提交表单
        saveHTMLToTextarea : true,

        emoji: true,//emoji表情，默认关闭
        taskList: true,
        tocm: true, // Using [TOCM]
        tex: true,// 开启科学公式TeX语言支持，默认关闭

        flowChart: true,//开启流程图支持，默认关闭
        sequenceDiagram: true,//开启时序/序列图支持，默认关闭,

        dialogLockScreen : false,//设置弹出层对话框不锁屏，全局通用，默认为true
        dialogShowMask : false,//设置弹出层对话框显示透明遮罩层，全局通用，默认为true
        dialogDraggable : false,//设置弹出层对话框不可拖动，全局通用，默认为true
        dialogMaskOpacity : 0.4, //设置透明遮罩层的透明度，全局通用，默认值为0.1
        dialogMaskBgColor : "#000",//设置透明遮罩层的背景颜色，全局通用，默认为#fff

        onchange : function onchangeContent() {
            if(this.htmlTextarea[0].defaultValue != ""){
                $("#issue-submit").removeAttr("disabled");
            } else {
                layer.tips('文章内容不能为空!', '#my-editormd', {
                    tips: [1, '#ff6620'] //还可配置颜色
                });
                $("#issue-submit").attr("disabled", "disabled");
            }
        }
    });

    //editor.md期望得到一个json格式的上传后的返回值，格式是这样的：
    /*
    {
        success : 0 | 1,           // 0 表示上传失败，1 表示上传成功（注意：0/1一定要是数字不能是字符）
        message : "提示的信息，上传成功或上传失败及错误信息等。",
        url     : "图片地址"        // 上传成功时才返回
    }
    */
});

/**
 * 更新验证
 */
function onclickIssue() {
    var photo = $("#f_previewImg")[0].files[0];
    var titles = $.trim($("#article_Edit_titles").val());   //去掉前后空格
    var bid = $("#article_Edit_bid").val();
    var fcontent = $.trim($("#article_Edit_fcontent").val());   //去掉前后空格

    if (userid == "") {
        layer.msg("请登录！",{icon: 4});
        return false;
    } else if (!onkeyupTitle()){
        return false;
    } else if (fcontent == "") {
        layer.tips('文章内容不能为空!', '#my-editormd', {
            tips: [1, '#ff6620'] //还可配置颜色
        });
        return false;
    } else if (typeof(photo) == "undefined" && titles == original_title && bid == original_bid && fcontent == original_content) {	// 没有修改任何内容
        layer.tips('没有修改任何内容，不能更新!', '#issue-submit', {
            tips: [1, '#ff6620'] //还可配置颜色
        });
        return false;
    } else {
        // 调用实际更新方法
        updateArticle(original_photo);
        return true;
    }
}

/**
 * 键盘按键松开触发
 */
function onkeyupTitle() {
    var titles = $.trim($("#article_Edit_titles").val());   //去掉前后空格
    var count_num = chEnWordCount(titles);
    if (titles == "") {
        layer.tips('文章标题不能为空!', '#article_Edit_titles', {
            tips: [1, '#ff6620'] //还可配置颜色
        });
        $("#issue-submit").attr("disabled", "disabled");
        return false;
    } else if (count_num > articleTitleLength){
        layer.tips('不能超过【'+articleTitleLength+'】个字符，当前数 - '+count_num, '#article_Edit_titles', {
            tips: [1, '#ff6620'] //还可配置颜色
        });
        $("#issue-submit").attr("disabled", "disabled");
        return false;
    } else {
        var index = layer.tips("满足");
        // 立即关闭
        layer.close(index);

        $("#issue-submit").removeAttr("disabled");
        return true;
    }
}

/**
 * 值改变触发
 */
function onchangeBid() {
    $("#issue-submit").removeAttr("disabled");
}

//根据参数名获取对应的url参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

//文章-修改
function updateArticle(original_photo) {    // original_photo：原始文章配图
    var formData = new FormData();
    var fid = $('#article_Edit_fid').val(); // fid
    var titles = $.trim($("#article_Edit_titles").val());   //去掉前后空格
    var fcontent = $.trim($("#article_Edit_fcontent").val());   //去掉前后空格
    var bid = $('#article_Edit_bid').val();

    formData.append("fid",fid);
    formData.append("titles",titles);
    formData.append("fcontent",fcontent);
    formData.append("bid",bid);

    var picture = $("#f_previewImg")[0].files[0];
    if (typeof(picture) != "undefined"){  // 配图更改
        if (picture.size > sourceFileSize) {    // 超过上传源文件允许的最大值
            layer.msg("请上传不超过 " + sourceFileSize/(1024*1024) + "M 的图片!",{icon: 5});
            return false;
        }
        formData.append("picture", picture);
        /**
         * 修改文章表（更改题图）
         */
        $.ajax({
            //几个参数需要注意一下
            type: "put",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            url: APP_PATH + "/api/rest/nanshengbbs/v3.0/article/updateArticle" ,
            data: formData ,
            // 告诉jQuery不要去处理发送的数据
            processData : false,
            // 告诉jQuery不要去设置Content-Type请求头
            contentType : false,
            xhr: function(){
                $(".picture-progress").show();
                myXhr = $.ajaxSettings.xhr();
                if(myXhr.upload){
                    myXhr.upload.addEventListener('progress',function(e) {
                        if (e.lengthComputable) {
                            var percent = Math.floor(e.loaded/e.total*100);
                            if (percent <= 100) {
                                var ratio = dynamicStorageUnit(e.loaded) + '/' + dynamicStorageUnit(e.total) + ' ' + percent + '%';
                            }
                            if (percent >= 100) {
                                var ratio = '<small>压缩上传中...</small>';
                            }
                            $(".picture-progress .progress-bar").attr("style", "width:" + percent + '%');
                            $(".picture-progress .progress-bar").html(ratio);
                        }
                    }, false);
                }
                return myXhr;
            },
            success: function (data) {
                // 隐藏进度条
                $(".picture-progress").hide();
                // 状态码
                var code = data.code;
                // 提示信息
                var msg = data.msg;
                if (code == 200) {
                    // 清空选择的文件
                    $("#f_previewImg").val("");
                    layer.msg(msg);
                    if (getQueryString("source") == "contentArticle"){  //文章详情处进入修改页面
                        // 返回文章详情页面
                        setTimeout(skipArticle(fid), 500);   // 0.5秒后页面跳转
                    } else if (getQueryString("source") == "myself"){   //个人主页处进入修改页面
                        // 返回个人主页
                        setTimeout(goMyHome(), 500);   // 0.5秒后页面跳转
                    }
                } else if (code == 500) {
                    $(".picture-progress").hide();
                    layer.msg(msg,{icon: 5});
                }
            },
            error : function() {
                $(".picture-progress").hide();
                layer.msg("文件大小超过限制或者其他错误！",{icon: 5});
            }
        });
    } else {    // 配图未更改
        formData.append("photo", original_photo);
        /**
         * 修改文章表（题图未更改）
         */
        $.ajax({
            //几个参数需要注意一下
            type: "put",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            url: APP_PATH + "/api/rest/nanshengbbs/v3.0/article/updateArticleNotPhoto" ,
            data: formData ,
            // 告诉jQuery不要去处理发送的数据
            processData : false,
            // 告诉jQuery不要去设置Content-Type请求头
            contentType : false,
            success: function (data) {
                // 状态码
                var code = data.code;
                // 提示信息
                var msg = data.msg;
                if (code == 200) {
                    layer.msg(msg);
                    if (getQueryString("source") == "contentArticle"){  //文章详情处进入修改页面
                        // 返回文章详情页面
                        setTimeout(skipArticle(fid), 500);   // 0.5秒后页面跳转
                    } else if (getQueryString("source") == "myself"){   //个人主页处进入修改页面
                        // 返回个人主页
                        setTimeout(goMyHome(), 500);   // 0.5秒后页面跳转
                    }
                } else if (code == 500) {
                    layer.msg(msg,{icon: 5});
                }
            },
            error : function() {
                layer.msg("出错！",{icon: 5});
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

/*跳转到文章详情（不新开一个tab）*/
function skipArticle(fid) {
    var url = APP_PATH + '/article.jsp?fid=' + fid;
    window.location.href = url;
}