<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>编辑相册</title>
    <%
        pageContext.setAttribute("APP_PATH", request.getContextPath());
    %>
</head>
<body>
<div class="modal fade" id="albumEdit" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
    <div class="modal-dialog" role="document">
        <div class="col-md-10 col-xs-12 col-md-offset-1 col-xs-offset-0">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title text-center" id="gridSystemModalLabel"><b>重命名该相册</b></h4>
                </div>
                <div class="modal-body" id="albumEdit_content">
                    <form class="form-horizontal" id="form_albumEdit">
                        <div class="form-group row">
                            <div class="col-md-3 col-xs-4">
                                <label for="album_name" style="position: relative;top: 7px;left: 15px;">相册名：</label>
                            </div>
                            <div class="col-md-9 col-xs-8">
                                <!-- 相册id -->
                                <input id="album_fid" type="hidden" name="fid">
                                <!-- 相册名 -->
                                <input id="album_name" type="text" class="form-control" name="name" onkeyup="onkeyupAlbumNameUpadate()"
                                    style="position: relative;left: -15px;" required>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="reset" class="btn btn-default">还原</button>
                            <!-- 修改按钮 -->
                            <button id="album_update_submit" type="button" class="btn btn-primary">修改</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>