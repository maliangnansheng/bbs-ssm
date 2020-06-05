// 将用户头像显示到个人中心
function getMePicture(user) {
    //判断头像显示
    if (user.via == null){
        /* 默认头像 */
        $("#myself_userphoto_img").attr("src", APP_PATH +"/static/img/head.png");
    } else {
        /* 自定义头像 */
        $("#myself_userphoto_img").attr("src", user.via.photo);
    }
}

// 将用户信息显示到“个人中心”
function getAboutMe(user) {
    //用户名
    $("#myself_name").html(user.name);
    //居住地
    $("#myself_family").html(user.family);
    //个人简介
    $("#myself_intro").html(user.intro);
    //电子邮箱
    $("#myself_email").html(user.email);
    //性别年龄
    $("#myself_sex_age").html(getSex(user.sex) + " " + getAge(user.age));
}