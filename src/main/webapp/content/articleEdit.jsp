<%@ page language="java" contentType="text/html; charset=UTF-8"
		 pageEncoding="UTF-8"%>
<%@ taglib prefix="c"
		   uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>修改文章</title>
	<%
		pageContext.setAttribute("APP_PATH", request.getContextPath());
	%>
</head>
<body style="background-color: #ffffff">
<%-- 方便ajax获取APP_PATH --%>
<input id="APP_PATH" type="hidden" value="${APP_PATH}" >
<%-- 方便ajax获取session中的userid --%>
<input id="session_userid" type="hidden" value="${userid}" >
<div class="container">
	<div class="modal-body" id="posted_all"></div>
	<form method="post" enctype="multipart/form-data">
		<input type="hidden" id="article_Edit_fid" name="fid">

		<div class="row">
			<div class="col-md-2 col-md-offset-5 col-xs-7 col-xs-offset-2">
				<h4 align="center"><b>修改文章</b></h4>
			</div>
			<div class="col-md-2 col-md-offset-3 col-xs-3">
				<button type="button" id="issue-submit" class="btn btn-primary" disabled="disabled" onclick="return onclickIssue()">更新</button>
			</div>
		</div>
		<br>

		<div class="form-group col-md-10 col-md-offset-1" align="center">
			<p id="add_titu" style="display: none;">更新题图↓↓↓</p>
			<div style="background-color: #f6f6f6; border-radius: 6px;" onmouseover="tituShow()" onmouseout="tituHide()">
				<a href="#" onclick="$('#f_previewImg').click();">
					<div id="f_preview" align="center"></div>
				</a>
				<input type="file" onchange="f_previewImage(this)" style="display: none;" id="f_previewImg" name="photo">
			</div>
		</div>

		<div class="form-group col-md-10 col-md-offset-1">
			<input type="text" style="height:60px; font-size: 20px; font-weight: bold;" class="form-control"
				   placeholder="请输入标题..." id="article_Edit_titles" name="titles" onkeyup="onkeyupTitle()">
		</div>

		<div class="form-group col-md-10 col-md-offset-1">
			<select class="form-control" name="bid" id="article_Edit_bid" onchange="onchangeBid()" style="cursor:pointer;"></select>
		</div>
		<div id="my-editormd" style="z-index: 2000;">
			<textarea class="editormd-markdown-textarea" name="fcontent" id="article_Edit_fcontent"></textarea>
		</div>
	</form>
</div>

<script type="text/javascript">
    // 原始帖子标题
    var original_photo = "";
	// 原始帖子标题
	var original_title = "";
    // 原始帖子内容
    var original_content = "";
    // 原始帖子板块
    var original_bid = "";

    $(function() {
        // 获取地址栏中的fid参数
        var fid = getQueryString("fid");

        $.ajax({
            //几个参数需要注意一下
            type: "post",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            url: "articleController/getUpdateArticle/"+fid,//url
            success: function (data) {
                var article_Edit_all = "";
                var article = data["article_Edit"];
                //帖子所属板块
                var article_Edit_bid = "";
                var plates = data["plate"];
                for (var i=0;i<plates.length;i++){
                    var plate = plates[i];
                    if (plate["bid"] == article["bid"]){
                        article_Edit_bid = article_Edit_bid +
                            '<option value="'+ article["bid"] +'" selected="selected">'+article["bname"]+'</option>';
                    } else {
                        article_Edit_bid = article_Edit_bid +
                            '<option value="'+ plate["bid"] +'">'+plate["bname"]+'</option>';
                    }
                }
                $("#article_Edit_bid").html(article_Edit_bid);

                //帖子配图
                var article_Edit_photo = "";
                if (article["photo"] == "photo") {  //无配图
                    article_Edit_photo =
                        '<img id="f_imghead" src="${APP_PATH}/static/img/fatiePhotoEditor.png">';
                } else {
                    if (article["photo"].endsWith(".mp4") || article["photo"].endsWith(".avi")){
                        article_Edit_photo =
                            '<video id="f_imghead" style="position: relative;width: 100%;height: 100%" src="${APP_PATH}/static/upload/article/'+article["photo"]+'"></video>';
                    } else {
                        article_Edit_photo =
                            '<img id="f_imghead" style="position: relative;width: 100%;height: 100%" src="${APP_PATH}/static/upload/article/'+article["photo"]+'">';
                    }
                }
                $("#f_preview").html(article_Edit_photo);

                // 标题
                $("#article_Edit_titles").val(article["titles"]);
				// 内容
                $("#article_Edit_fcontent").val(article["fcontent"]);
                // fid
                $("#article_Edit_fid").val(fid);

                original_title = article["titles"]
                original_content = article["fcontent"]
                original_bid = article["bid"]
                original_photo = article["photo"]
            },
            error: function () {
                layer.msg("异常！",{icon: 5});
            }
        });

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

    /**
     * 更新验证
     */
    function onclickIssue() {
        var photo = $("#f_previewImg")[0].files[0];
        var titles = $.trim($("#article_Edit_titles").val());   //去掉前后空格
        var bid = $("#article_Edit_bid").val();
        var fcontent = $.trim($("#article_Edit_fcontent").val());   //去掉前后空格

        if (${userid == ""}) {
            layer.msg("请登录！",{icon: 4});
            return false;
        } else if (!onkeyupTitle()){
            return false;
        }else if (fcontent == "") {
            layer.tips('文章内容不能为空!', '#my-editormd', {
                tips: [1, '#ff6620'] //还可配置颜色
            });
            return false;
        } else if (typeof(photo) == "undefined" && titles == original_title && bid == original_bid && fcontent == original_content) {	// 没有修改任何内容
            layer.tips('没有修改任何内容，不能更新!', '#issue-submit', {
                tips: [1, '#ff6620'] //还可配置颜色
            });
            return false;
        }else {
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

    function tituShow() {
        $("#add_titu").removeAttr("style");
    }

    function tituHide() {
        $("#add_titu").attr("style", "display: none;");
    }

    //根据参数名获取对应的url参数
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
</script>

<script src="${APP_PATH }/static/js/images.js"></script>
<script src="${APP_PATH }/static/js/content/articleEdit.js"></script>
</body>
</html>