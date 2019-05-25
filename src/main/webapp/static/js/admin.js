/*
 * 用户管理
 */
$("#yhgl").click(function() {
	$(".yhgl").show();
	$(".tzgl").hide();// 隐藏
	$(".bkgl").hide();// 隐藏
	$(".fwjl").hide();// 隐藏
});

/*
 * 帖子管理
 */
$("#tzgl").click(function() {
	$(".yhgl").hide();// 隐藏
	$(".tzgl").show();
	$(".bkgl").hide();// 隐藏
	$(".fwjl").hide();// 隐藏
});

/*
 * 板块管理
 */
$("#bkgl").click(function() {
	$(".yhgl").hide();// 隐藏
	$(".tzgl").hide();// 隐藏
	$(".bkgl").show();
	$(".fwjl").hide();// 隐藏
});

/*
 * 访问记录
 */
$("#fwjl").click(function() {
	$(".yhgl").hide();// 隐藏
	$(".tzgl").hide();// 隐藏
	$(".bkgl").hide();// 隐藏
	$(".fwjl").show();
});