var div_left = document.getElementById('content_left');
var div_right = document.getElementById('content_right');
var myself_li_pc = document.getElementById('myself_li_pc');
var myself_li_phones = document.getElementById('myself_li_phones');
// 平台、设备和操作系统
var system = {
	win : false,
	mac : false,
	xll : false,
	ipad : false
};
// 检测平台
var p = navigator.platform;
system.win = p.indexOf("Win") == 0;
system.mac = p.indexOf("Mac") == 0;
system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
system.ipad = (navigator.userAgent.match(/iPad/i) != null) ? true : false;
// 跳转语句，如果是手机访问就自动跳转到wap.baidu.com页面
if (system.win || system.mac || system.xll || system.ipad) {

	div_left.className = 'col-xs-7 col-md-7 bottom_left';
	div_right.className = 'col-xs-3 col-md-3 bottom_right';
	myself_li_pc.style.display='';
	myself_li_phones.style.display='none';
	
} else {

	div_left.className = 'col-xs-12 col-md-7 bottom_left_phones';
	div_right.className = 'col-xs-12 col-md-3';
	myself_li_pc.style.display='none';
	myself_li_phones.style.display='';
	
}