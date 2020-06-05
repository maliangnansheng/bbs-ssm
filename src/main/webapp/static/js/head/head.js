$(function () {
    if (username === "") {   // 未登录
        $(".head_logout").show();
        $(".head_login").hide();
        $(".head_login").hide();
    } else {    // 已登录
        $(".head_logout").hide();
        $(".head_login").show();
        $(".head_login").show();
        getUserPhoto();
    }
});

/**
 * 给head上头像赋值
 */
function getUserPhoto() {
    if (userPhoto != null && userPhoto !== "") {    // 有自定义头像
        // 用户头像
        $(".head_userPhoto").attr("src", userPhoto);
    }
}

/**
 * 给head上头像赋值
 * @param UserPhotoFileName 头像图片名
 */
function getUserPhotoArg(UserPhotoFileName) {
    // 用户头像
    $(".head_userPhoto").attr("src", UserPhotoFileName);
}

/* 版本说明 */
$(".version-popover-options").popover({html : true });