<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c"
    uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>写文章</title>
    <%
        pageContext.setAttribute("APP_PATH", request.getContextPath());
    %>
</head>
<body style="background-color: #ffffff">
	<div class="container">
        <div class="modal-body" id="posted_all"></div>
        <form action="${APP_PATH}/articleController/setArticle" method="post" enctype="multipart/form-data">
            <div class="row">
                <div class="col-md-2 col-md-offset-5 col-xs-6 col-xs-offset-3">
                    <h4 align="center"><b>写文章</b></h4>
                </div>
                <div class="col-md-2 col-md-offset-3 col-xs-3">
                    <button type="submit" id="issue-submit" class="btn btn-primary" disabled="disabled" onclick="return onclickIssue()">发布</button>
                </div>
            </div>
            <br>

            <div class="form-group col-md-10 col-md-offset-1" align="center">
                <p id="add_titu" style="display: none;">添加题图↓↓↓</p>
                <div style="background-color: #f6f6f6; border-radius: 6px;" onmouseover="tituShow()" onmouseout="tituHide()">
                    <a href="#" onclick="$('#f_previewImg').click();">
                        <div id="f_preview" align="center">
                            <img id="f_imghead" src="${APP_PATH}/static/img/fatiePhotoEditor.png">
                        </div>
                    </a>
                    <input type="file" onchange="f_previewImage(this)" style="display: none;" id="f_previewImg" name="photo">
                </div>
            </div>

            <div class="form-group col-md-10 col-md-offset-1">
                <input type="text" style="height:60px; font-size: 20px; font-weight: bold;" class="form-control" onkeyup="onkeyupArticleTicleAdd()"
                       placeholder="请输入标题..." id="titles" name="titles">
            </div>

            <div class="form-group col-md-10 col-md-offset-1">
                <select class="form-control" name="bid" id="posted_plate" style="cursor:pointer;"></select>
            </div>
            <div id="my-editormd" style="z-index: 2000;">
                <textarea class="editormd-markdown-textarea" name="fcontent" id="fcontent"></textarea>
                <%--<textarea class="editormd-html-textarea" name="fcontent"></textarea>--%>
            </div>
        </form>
	</div>

    <script type="text/javascript">
        $(function() {
            var myEditor = editormd("my-editormd", {
                width   : "82%",
                height  : 640,
                syncScrolling : "single",
                //你的lib目录的路径
                path    : "${APP_PATH}/static/editor.md-master/lib/",

                /**上传图片相关配置如下*/
                imageUpload : true,
                imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
                imageUploadURL : "${APP_PATH}/articleController/uploadPicture",

                onload: function() {
                    // 引入插件 执行监听方法
                    editormd.loadPlugin("${APP_PATH}/static/editor.md-master/plugins/image-handle-paste/image-handle-paste", function(){
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

        function onclickIssue() {
            var titles = $.trim($("#titles").val());   //去掉前后空格
            if (titles == "") {
                layer.tips('文章标题不能为空!', '#titles', {
                    tips: [1, '#ff6620'] //还可配置颜色
                });
                return false;
            }
            if (!onkeyupArticleTicleAdd()){
                return false;
            }
            if (${userid == ""}) {
                layer.msg("请登录！",{icon: 4});
                return false;
            }
        }

        function tituShow() {
            $("#add_titu").removeAttr("style");
        }

        function tituHide() {
            $("#add_titu").attr("style", "display: none;");
        }
    </script>

    <script src="${APP_PATH }/static/js/images.js"></script>
    <script src="${APP_PATH }/static/js/head/posted_editor.js"></script>
</body>
</html>
