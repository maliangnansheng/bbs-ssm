/*########################################### 排行版 ############################################################*/
// 构造用户列表信息
function getUserRankList(data) {
    var listUserRank_all = "";
    var num = 1;   //计数
    for (var i=0; i<data.length; i++){
        var rank_User = data[i];
        // 序号
        $("#rank_userNum").html(num++);
        // 用户名
        $("#rank_userName").attr("href", "javascript:void(0)");
        $("#rank_userName").attr("onclick", 'getOther("' + rank_User.userid + '","_brank")');
        $("#rank_userName").html(rank_User.name);
        // 文章数
        $("#rank_articleSum").html(rank_User.articleSum);
        // 邮箱
        $("#rank_email").html(rank_User.email);
        // 更新时间
        $("#rank_userUpdateTime").html(dateTimeFormat(rank_User.updateTime));

        listUserRank_all = listUserRank_all + $("#rank_listUser_hide").html();
    }

    return listUserRank_all;
}
/*########################################### 排行版-end ############################################################*/

/*########################################### 新增用户 ############################################################*/
// 构造用户列表信息
function getNewUserList(data) {
    var listNewUser_all = "";
    for (var i=0; i<data.length; i++){
        var new_User = data[i];
        // 头像
        if (new_User.photo == null) { // 有自定义头像
            $("#new_listUser_hide li img").attr("src", APP_PATH + "/static/img/head.png");
        } else {
            $("#new_listUser_hide li img").attr("src", new_User.photo);
        }
        // 用户名
        $(".users-list-name").html(new_User.name);
        $(".users-list-name").attr("href", "javascript:void(0)");
        $(".users-list-name").attr("onclick", 'getOther("' + new_User.userid + '","_brank")');
        // 日期
        $(".users-list-date").html(dateFormatMD_zh(new_User.createTime));

        listNewUser_all = listNewUser_all + $("#new_listUser_hide").html();
    }

    return listNewUser_all;
}
/*########################################### 新增用户-end ############################################################*/

/*########################################### 用户管理 ############################################################*/
// 构造用户列表信息
function getUserList(data) {
    var listUser_all = "";
    var listUsers = data.listUser;
    var user_num = (data.pageStart - 1)*data.pageSize;   //计数
    for (var i=0;i<listUsers.length;i++){
        user_num ++;
        var listUser = listUsers[i];
        // 序号
        $("#userNum").html(user_num);
        // 用户名
        $("#userName").attr("href", "javascript:void(0)");
        $("#userName").attr("onclick", 'getOther("' + listUser.userid + '","_brank")');
        $("#userName").html(listUser.name);
        // 年龄
        $("#userAge").html(getAge(listUser.age));
        // 性别
        $("#userSex").html(getSex(listUser.sex));
        // 邮箱
        $("#userEmail").html(listUser.email);
        // 住址
        $("#userFamily").html(listUser.family);
        // 简介
        $("#userIntro").html(listUser.intro);
        // 创建时间
        $("#userCreateTime").html(dateTimeFormat(listUser.createTime));
        // 更新时间
        $("#userUpdateTime").html(dateTimeFormat(listUser.updateTime));
        // 头像
        if(listUser.photo == null){  //默认头像
            $("#listUser_userphoto a").attr("href", APP_PATH + "/static/img/head.png");
            $("#listUser_userphoto a img").attr("src", APP_PATH + "/static/img/head.png");
        } else {
            $("#listUser_userphoto a").attr("href", listUser.photo);
            $("#listUser_userphoto a img").attr("src", listUser.photo);
        }
        //操作
        if (aname == "") { // 未登录
            $("#user_caozuo span").show();
            $("#user_caozuo form").hide();
        } else {
            $("#user_caozuo span").hide();
            $("#user_caozuo form").show();
            $("#user_caozuo form button").attr("onclick", "user_del('" + listUser.userid + "','" + data.pageStart + "')");
        }

        listUser_all = listUser_all + $("#listUser_hide").html();
    }

    return listUser_all;
}
/*########################################### 用户管理-end ############################################################*/

/*########################################### 文章管理 ############################################################*/
// 构造文章列表信息
function getArticleList(data) {
    var listArticle_all = "";
    var listArticles = data.listArticle;
    var article_num = (data.pageStart - 1) * data.pageSize;   //计数
    for (var i=0;i<listArticles.length;i++){
        article_num++;
        var listArticle = listArticles[i];

        // 序号
        $("#articleNum div").html(article_num);
        // 标题
        $("#articleTitles div a").attr("onclick", "skipArticle('" + listArticle.fid + "')");
        $("#articleTitles div a").html(listArticle.titles);
        // 发布者
        $("#articleUsername").html(listArticle.name);
        // 所属板块
        $("#articleBname").html(listArticle.bname);
        // 创建时间
        $("#articleCreateTime").html(dateTimeFormat(listArticle.createTime));
        // 更新时间
        $("#articleUpdateTime").html(dateTimeFormat(listArticle.updateTime));
        // 审核状态
        var listArticle_status_id = "listArticle_status_" + listArticle.fid;
        $("#listArticle_status").attr("id", listArticle_status_id);
        if (listArticle.status == 0){     //待审核
            $("#" + listArticle_status_id + " button").attr("class", "btn btn-warning btn-sm");
            $("#" + listArticle_status_id + " button").html("等待审核");
        } else if (listArticle.status == 1){   //审核通过
            $("#" + listArticle_status_id + " button").attr("class", "btn btn-info btn-sm");
            $("#" + listArticle_status_id + " button").html("审核通过");
        } else if (listArticle.status == 2){   //审核未通过
            $("#" + listArticle_status_id + " button").attr("class", "btn btn-danger btn-sm");
            $("#" + listArticle_status_id + " button").html("审核拒绝");
        }
        // 操作
        $("#listArticle_caozuo").attr("id", "listArticle_caozuo_" + listArticle.fid);
        // 通过
        var form_listArticle_pass_id = "form_listArticle_pass_" + listArticle.fid;
        $("#form_listArticle_pass input").attr("onclick", "articleCheck('" + listArticle.fid + "', 1)");
        $("#form_listArticle_pass").attr("id", form_listArticle_pass_id);
        // 拒绝
        var form_listArticle_refuse_id = "form_listArticle_refuse_" + listArticle.fid;
        $("#form_listArticle_refuse input").attr("onclick", "articleCheck('" + listArticle.fid + "', 2)");
        $("#form_listArticle_refuse").attr("id", form_listArticle_refuse_id);
        if (aname == ""){  //未登录
            $("#form_listArticle_notlogin").show();
            $("#" + form_listArticle_pass_id).hide();
            $("#" + form_listArticle_refuse_id).hide();
        } else {
            if (listArticle.status == 0){     //待审核
                $("#form_listArticle_notlogin").hide();
                $("#" + form_listArticle_pass_id).show();
                $("#" + form_listArticle_refuse_id).show();
            } else if (listArticle.status == 1){   //审核通过
                $("#form_listArticle_notlogin").hide();
                $("#" + form_listArticle_pass_id).hide();
                $("#" + form_listArticle_refuse_id).show();
            } else if (listArticle.status == 2){   //审核未通过
                $("#form_listArticle_notlogin").hide();
                $("#" + form_listArticle_pass_id).show();
                $("#" + form_listArticle_refuse_id).hide();
            }
        }

        listArticle_all = listArticle_all + $("#listArticle_hide").html();

        // 审核状态-复原
        $("#" + listArticle_status_id).attr("id", "listArticle_status");
        // 操作-复原
        $("#listArticle_caozuo_" + listArticle.fid).attr("id", "listArticle_caozuo");
        // 通过-复原
        $("#" + form_listArticle_pass_id).attr("id", "form_listArticle_pass");
        // 拒绝-复原
        $("#" + form_listArticle_refuse_id).attr("id", "form_listArticle_refuse");
    }

    return listArticle_all;
}
/*########################################### 文章管理-end ############################################################*/

/*########################################### 板块管理 ############################################################*/
// 构造板块列表信息
function getPlateList(data) {
    var plate_all = "";
    // 新增按钮
    if (aname != ""){  // 已登录
        $("#plates_add").show();
    }
    var plates = data.plate;
    var plate_num = 0;   //计数
    for (var i=0;i<plates.length;i++){
        plate_num++;
        var plate = plates[i];

        // 序号
        $("#plateNum").html(plate_num);
        // 版块名
        $("#plateName").html(plate.bname);
        // 创建时间
        $("#plateCreateTime").html(dateTimeFormat(plate.createTime));
        // 更新时间
        $("#plateUpdateTime").html(dateTimeFormat(plate.updateTime));
        // 操作
        var form_delPlate_id = "form_delPlate" + plate.bid;
        $("#form_delPlate").attr("id", form_delPlate_id);
        // 修改
        $("#form_updatePlate button").attr("onclick", "plateShow('" + plate.bid + "','" + plate.bname + "')");
        // 删除
        $("#" + form_delPlate_id + " button").attr("onclick", "b_del('" + plate.bid + "')");
        if (aname == ""){  // 未登录
            $("#form_plate_notlogin").show();
            $("#form_updatePlate").hide();
            $("#" + form_delPlate_id).hide();
        } else {
            $("#form_plate_notlogin").hide();
            $("#form_updatePlate").show();
            $("#" + form_delPlate_id).show();
        }

        plate_all = plate_all + $("#plate_hide").html();

        // 删除-复原
        $("#" + form_delPlate_id).attr("id", "form_delPlate");
    }

    return plate_all;
}
/*########################################### 板块管理-end ############################################################*/

/*########################################### 访问管理 ############################################################*/
// 构造板块列表信息
function getVisitList(data) {
    var listVisit_all = "";
    var listVisits = data.listVisit;   //计数
    var visit_num = (data.pageStart - 1) * data.pageSize;   //计数
    for (var i=0;i<listVisits.length;i++){
        visit_num++;
        var listVisit = listVisits[i];

        // 序号
        $("#visitNum").html(visit_num);
        // ip
        $("#visitIp").html(listVisit.visitip);
        // 国家
        $("#visitCountry").html(listVisit.visitcountry);
        // 省份
        $("#visitProvince").html(listVisit.visitprovince);
        // 城市
        $("#visitCity").html(listVisit.visitcity);
        // 操作系统
        $("#visitOS").html(listVisit.visitos);
        // 时间
        $("#visitTime").html(dateTimeFormat(listVisit.visittime));

        listVisit_all = listVisit_all + $("#listVisit_hide").html();
    }

    return listVisit_all;
}
/*########################################### 访问管理-end ############################################################*/

/**
 * 构造页信息
 * @param data 分页相关数据
 * @param type 管理类型（用户、文章、访问）
 */
function getPaging(data, type) {
    // 构造前缀(不同管理类型传不同id属性值-例如：listUser_page表示用户管理分页)
    var pagingTypeId = "#listUser_page";
    // 分页点击事件名
    var onclick = "userPage";
    if (type == "user") {   // 用户
        // 以上初始值就对应用户
    } else if (type == "article") {  // 文章
        pagingTypeId = "#listArticle_page";
        onclick = "articlePage";
    } else if (type == "visit") {  // 访问
        pagingTypeId = "#listVisit_page";
        onclick = "visitPage";
    }

    // 首页
    $(pagingTypeId + " #paging_first a").attr("onclick", onclick + "(1)");
    // 上一页
    if (data.pageStart == 1){   // 当前页是第一页时
        $(pagingTypeId + " #paging_previous #yesFirst").show();
        $(pagingTypeId + " #paging_previous #noFirst").hide();
    } else {    // 当前页非第一页时
        var pageStart = data.pageStart - 1;
        $(pagingTypeId + " #paging_previous #yesFirst").hide();
        $(pagingTypeId + " #paging_previous #noFirst").show();
        $(pagingTypeId + " #paging_previous #noFirst").attr("onclick", onclick + "('" + pageStart + "')");
    }
    // 当前页
    $(pagingTypeId + " #paging_active a").html(data.pageStart);
    // 下一页
    if (data.pageStart * data.pageSize >= data.total){  // 当前页是最后一页时
        $(pagingTypeId + " #paging_next #yesEnd").show();
        $(pagingTypeId + " #paging_next #noEnd").hide();
    } else {    // 当前页非最后一页时
        var pageStart = data.pageStart + 1;
        $(pagingTypeId + " #paging_next #yesEnd").hide();
        $(pagingTypeId + " #paging_next #noEnd").show();
        $(pagingTypeId + " #paging_next #noEnd").attr("onclick", onclick + "('" + pageStart + "')");
    }
    // 尾页
    $(pagingTypeId + " #paging_end a").attr("onclick", onclick + "('" + data.tail + "')");
}