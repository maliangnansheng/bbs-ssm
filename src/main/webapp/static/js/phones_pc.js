// 平台、设备和操作系统
var system = {
	win : false,
	mac : false,
	xll : false,
	ipad : false
};
// 检测平台
var p = navigator.platform;
system.win = p.indexOf("Win") === 0;
system.mac = p.indexOf("Mac") === 0;
system.x11 = (p === "X11") || (p.indexOf("Linux") === 0);
system.ipad = (navigator.userAgent.match(/iPad/i) != null);
// 跳转语句，如果是手机访问就自动跳转到wap.baidu.com页面
if (system.win || system.mac || system.xll || system.ipad) {
	$('#content_left').attr("class", "col-md-7 bottom_left");
	$('#content_right').attr("class", "col-md-3 bottom_right");
	$(".admin_pc").show();
} else {
	$('#content_left').attr("class", "col-xs-12 bottom_left_phones");
	$('#content_right').attr("class", "col-xs-12");
	$(".admin_mobile").show();
	$(".version-popover-options").remove();
	$(".version-popover-options-photo").show();
}