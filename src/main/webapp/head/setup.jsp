<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>设置</title>
<%
	pageContext.setAttribute("APP_PATH", request.getContextPath());
%>
</head>
<body>
	<div class="modal fade" id="setup" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content col-md-12">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h3 class="modal-title text-center" id="exampleModalLabel">基本信息设置</h3>
                </div>
                <div class="modal-body">
                    <form action="${APP_PATH }/userController/updateUserSetup" method="post" class="form-horizontal">
                        <input type="hidden" class="form-control" id="userid" name="userid" value="${userid }">
                        
                        <div class="form-group">
                        	<div class="row">
	                            <label class="col-sm-2 control-label">用户名</label>
	                            <div class="col-sm-10">
	                                <p class="form-control-static">${username }
	                                	<a href="#" id="setup_username_on" class="text-success"><b>修改</b></a>
	                                </p>
	                            </div>
							</div>
							<div class="row" id="setup_username" style="display: none;">
	                            <div class="col-xs-10 col-sm-5 col-md-offset-2">
	                                <input type="text" id="setup_name_id" name="name" value="${username }" class="form-control" onkeyup="onkeyupUsernameUpdate()" required>
	                            </div>
	                            <div class="col-xs-2 col-sm-2">
	                                <a href="#" id="setup_username_off" style="position:absolute; top: 8px;">
	                                	<span class="glyphicon glyphicon-remove"></span>
	                                </a>	
	                            </div>
							</div>
                        </div>
                        
                        <div class="form-group">
                        	<div class="row">
	                            <label for="password" class="col-sm-2 control-label">密码</label>
	                            <div class="col-sm-10">
	                            	<p class="form-control-static">*********
	                            		<a href="#" id="setup_password_on" class="text-success"><b>修改</b></a>
	                            	</p>
	                            </div>
	                        </div>
	                        <div class="row" id="setup_password" style="display: none;">
	                            <div class="col-xs-10 col-sm-5 col-md-offset-2">
	                                <input type="password" id="setup_password_id" name="password" value="${password }" class="form-control" onkeyup="onkeyupUserpasswordUpdate()" required>
	                            </div>
	                            <div class="col-xs-2 col-sm-2">
	                                <a href="#" id="setup_password_off" style="position:absolute; top: 8px;">
	                                	<span class="glyphicon glyphicon-remove"></span>
	                                </a>	
	                            </div>
							</div>
                        </div>
                        
                        <div class="form-group">
                        	<div class="row">
	                            <label class="col-sm-2 control-label">Email</label>
	                            <div class="col-sm-10">
	                                <p class="form-control-static">${email }
	                                	<a href="#" id="setup_email_on" class="text-success"><b>修改</b></a>
	                                </p>
	                            </div>
	                        </div>
	                        <div class="row" id="setup_email" style="display: none;">
	                            <div class="col-xs-10 col-sm-5 col-md-offset-2">
	                                <input type="email" id="setup_email_id" name="email" value="${email }" class="form-control" required>
	                            </div>
	                            <div class="col-xs-2 col-sm-2">
	                                <a href="#" id="setup_email_off" style="position:absolute; top: 8px;">
	                                	<span class="glyphicon glyphicon-remove"></span>
	                                </a>	
	                            </div>
							</div>
                        </div>

                       <div class="modal-footer">
                            <button type="reset" class="btn btn-default">还原</button>
                            <button type="submit" class="btn btn-primary" onclick="return submitSetup();">保存</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
	
	<script>
	$("#setup_username_on").click(function() {
		$("#setup_username").show();
		$("#setup_username_on").hide();// 隐藏
	});
	$("#setup_username_off").click(function() {
		$("#setup_username_on").show();
		$("#setup_username").hide();// 隐藏
		/* 向指定输入框赋值 */
		document.getElementById("setup_name_id").value = "${username}";
	});
	
	
	$("#setup_password_on").click(function() {
		$("#setup_password").show();
		$("#setup_password_on").hide();// 隐藏
	});
	$("#setup_password_off").click(function() {
		$("#setup_password_on").show();
		$("#setup_password").hide();// 隐藏
		/* 向指定输入框赋值 */
		document.getElementById("setup_password_id").value = "${password}";
	});
	
	$("#setup_email_on").click(function() {
		$("#setup_email").show();
		$("#setup_email_on").hide();// 隐藏
	});
	$("#setup_email_off").click(function() {
		$("#setup_email_on").show();
		$("#setup_email").hide();// 隐藏
		/* 向指定输入框赋值 */
		document.getElementById("setup_email_id").value = "${email}";
	});

    /* 用户名修改预览 */
    function onkeyupUsernameUpdate() {
        var name = $.trim($("#setup_name_id").val());   //去掉前后空格
        var count_num = chEnWordCount(name);
        if (count_num > userNameLength){
            layer.tips('不能超过【'+userNameLength+'】个字符，当前数 - '+count_num, '#setup_name_id', {
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
    /* 用户密码修改预览 */
    function onkeyupUserpasswordUpdate() {
        var password = $.trim($("#setup_password_id").val());   //去掉前后空格
        var count_num = chEnWordCount(password);
        if (count_num < userPasswordLength){
            layer.tips('不能少于【'+userPasswordLength+'】个字符，当前数 - '+count_num, '#setup_password_id', {
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

    /* 提交前验证 */
    function submitSetup() {
		if (onkeyupUsernameUpdate() && onkeyupUserpasswordUpdate()){
            return true;
		} else {
            return false;
		}
    }

	</script>
	
</body>
</html>