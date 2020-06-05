$(function() {
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

// 写文章-展示
$(function () {
    $.ajax({
        //几个参数需要注意一下
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/plate/getPlate",
        type: "get",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                var plates = data.data.plate;
                var posted_plate_all = "";
                for (var i=0;i<plates.length;i++){
                    var plate = plates[i];
                    $("#posted_plate_hide option").attr("value", plate.bid);
                    $("#posted_plate_hide option").html(plate.bname);

                    posted_plate_all = posted_plate_all + $("#posted_plate_hide").html();
                }
                $("#posted_plate_all").html(posted_plate_all);
            } else if (code == 500) {
                layer.msg(msg,{icon: 5});
            }
        },
        error : function() {
            layer.msg("出错！",{icon: 5});
        }
    });
});

// 发布文章
$("#issue-submit").click(function () {
    var titles = $.trim($("#titles").val());   //去掉前后空格
    if (titles == "") {
        layer.tips('文章标题不能为空!', '#titles', {
            tips: [1, '#ff6620'] //还可配置颜色
        });
        return false;
    } else if (!onkeyupArticleTicleAdd()){
        return false;
    }

    var formData = new FormData();
    formData.append("titles", $.trim($("#titles").val()));
    formData.append("fcontent", $.trim($("#fcontent").val()));
    formData.append("bid", $("#posted_plate_all").val());
    var picture = $("#f_previewImg")[0].files[0];
    if (picture.size > sourceFileSize) {    // 超过上传源文件允许的最大值
        layer.msg("请上传不超过 " + sourceFileSize/(1024*1024) + "M 的图片!",{icon: 5});
        return false;
    }
    if (typeof(picture) != "undefined") {   // 有配图
        formData.append("picture", $("#f_previewImg")[0].files[0]);
    }

    $.ajax({
        //几个参数需要注意一下
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/article/setArticle",
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        data: formData,
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
                setTimeout(go, 500);   // 0.5秒后页面跳转
                goMyHome(userid);
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
});

/* 写文章标题预览 */
function onkeyupArticleTicleAdd() {
    var titles = $.trim($("#titles").val());   //去掉前后空格
    var count_num = chEnWordCount(titles);
    if (count_num > articleTitleLength){
        layer.tips('不能超过【'+articleTitleLength+'】个字符，当前数 - '+count_num, '#titles', {
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