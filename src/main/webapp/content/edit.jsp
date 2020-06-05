<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>编辑个人资料</title>
<%
	pageContext.setAttribute("APP_PATH", request.getContextPath());
%>
</head>
<body>
<div class="container">
    <!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#edit">按钮</button> -->

    <div class="modal fade" id="edit" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content col-md-12">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h3 class="modal-title text-center" id="exampleModalLabel">编辑个人资料</h3>
                </div>
                <div class="modal-body" id="user_Edit_all">
                    <form id="form_userUpdate" method="put" class="form-horizontal">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">用户名</label>
                            <div class="col-sm-10">
                                <!-- 用户名 -->
                                <p class="form-control-static" id="edit_user_name"></p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="age" class="col-sm-2 control-label">年龄</label>
                            <div class="col-sm-10" id="edit_user_age">
                                <!-- 年龄 -->
                                <input type="number" class="form-control" id="age" name="age" onkeyup="onkeyupUserageUpdate()">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">性别</label>
                            <!-- 性别 -->
                            <div class="col-sm-10">
                                <label class="radio-inline" id="user_sex">
                                    <input type="radio" name="sex">
                                    <span></span>
                                </label>
                                <label class="radio-inline" id="user_sexVersa">
                                    <input type="radio" name="sex">
                                    <span></span>
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Email</label>
                            <div class="col-sm-10">
                                <!-- 邮箱 -->
                                <p class="form-control-static" id="edit_user_email"></p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="family" class="col-sm-2 control-label">家庭住址</label>
                            <!-- 家庭住址 -->
                            <div class="col-sm-10" id="edit_user_family">
                                <input type="text" class="form-control" id="family" name="family" onkeyup="onkeyupUserfamilyUpdate()">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="intro" class="col-sm-2 control-label">个人简介</label>
                            <!-- 个人简介 -->
                            <div class="col-sm-10" id="edit_user_intro">
                                <textarea class="form-control" id="intro" name="intro" style="position: relative;height: 150px;" onkeyup="onkeyupUserintroUpdate()"></textarea>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="reset" class="btn btn-default">还原</button>
                            <button type="button" class="btn btn-primary" onclick="updateUser()">保存</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>