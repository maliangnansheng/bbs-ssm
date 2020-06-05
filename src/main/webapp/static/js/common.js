var APP_PATH = document.getElementById("APP_PATH").value;
var userid = document.getElementById("session_userid").value;
var username = document.getElementById("session_username").value;
var email = document.getElementById("session_email").value;
var userPhoto = document.getElementById("session_userPhoto").value;
var aname = document.getElementById("session_aname").value;
var acreateTime = document.getElementById("session_acreateTime").value;

// 设定上传源文件允许的最大值（1024*1024*10=10M）
const sourceFileSize = 10485760;
// 用户名字数限制（max）
const userNameLength = 20;
// 用户密码数限制（min）
const userPasswordLength = 6;
// 文章标题数限制（max）
const articleTitleLength = 120;
// 家庭住址数限制（max）
const userFamilyLength = 100;
// 个人简介数限制（max）
const userIntroLength = 1000;
// 年龄数限制（max）
const userAgeSize = 120;
// 相册名数限制（max）
const albumNameLength = 20;
// 板块名字数限制（max）
const plateNameLength = 8;

/**
 * ajax默认设置 包括默认提交方式为POST， 判断后台是否是重定向
 */
$.ajaxSetup({
    // 设置ajax请求结束后的执行动作
    complete : function(XMLHttpRequest, textStatus) {
        // 通过XMLHttpRequest取得响应头，redirect
        var redirect = XMLHttpRequest.getResponseHeader("redirect");
        if (redirect == "redirect") { // 若HEADER中含有redirect说明后端想重定向
            var win = window;
            while (win != win.top) {
                win = win.top;
            }
            layer.msg("请先登录！",{icon: 4});
            // 弹出登录模态框
            $("#loginModal").modal();
        }
    },
    type : 'POST'
});

/**
 * 获取地址栏参数
 * @param name 参数名
 * @returns {string|null}
 */
function getAddressArgs(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r != null) {
        return unescape(r[2]);
    } else {
        return null;
    }
}

/**
 * 中英文统计(一个中文算两个字符)
 */
function chEnWordCount(str){
    var count = str.replace(/[^\x00-\xff]/g,"**").length;
    return count;
}

/**
 *  补0
 * @param m
 * @returns {*}
 */
function add0(m){
    return m < 10 ? '0' + m : m
}
/**
 * 时间戳格式化(yyyy-MM-dd HH:mm:ss)
 * @param date
 * @returns {string}
 * @constructor
 */
function dateTimeFormat(date) {
    // date是整数，否则要parseInt转换
    var time = new Date(date);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var day = time.getDate();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    return year + '-' + add0(month) + '-' + add0(day) + ' ' + add0(hours) + ':' + add0(minutes) + ':' + add0(seconds);
}
/**
 * 时间戳格式化(yyyy-MM-dd)
 * @param date
 * @returns {string}
 * @constructor
 */
function dateFormat(date) {
    // date是整数，否则要parseInt转换
    var time = new Date(date);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var day = time.getDate();
    return year + '-' + add0(month) + '-' + add0(day);
}

/**
 * 时间戳格式化(yyyy-MM)
 * @param date
 * @returns {string}
 * @constructor
 */
function dateFormatYM(date) {
    // date是整数，否则要parseInt转换
    var time = new Date(date);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    return year + '-' + add0(month);
}
/**
 * 时间戳格式化(yyyy年MM月)
 * @param date
 * @returns {string}
 * @constructor
 */
function dateFormatYM_zh(date) {
    // date是整数，否则要parseInt转换
    var time = new Date(date);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    return year + '年' + add0(month) + '月';
}

/**
 * 时间戳格式化(yyyy)
 * @param date
 * @returns {string}
 * @constructor
 */
function dateFormatY(date) {
    // date是整数，否则要parseInt转换
    var time = new Date(date);
    var year = time.getFullYear();
    return year;
}
/**
 * 时间戳格式化(yyyy年)
 * @param date
 * @returns {string}
 * @constructor
 */
function dateFormatY_zh(date) {
    // date是整数，否则要parseInt转换
    var time = new Date(date);
    var year = time.getFullYear();
    return year + '年';
}

/**
 * 时间戳格式化(MM-dd)
 * @param date
 * @returns {string}
 * @constructor
 */
function dateFormatMD(date) {
    // date是整数，否则要parseInt转换
    var time = new Date(date);
    var month = time.getMonth() + 1;
    var day = time.getDate();
    return add0(month) + '-' + add0(day);
}
/**
 * 时间戳格式化(MM月dd日)
 * @param date
 * @returns {string}
 * @constructor
 */
function dateFormatMD_zh(date) {
    // date是整数，否则要parseInt转换
    var time = new Date(date);
    var month = time.getMonth() + 1;
    var day = time.getDate();
    return add0(month) + '月' + add0(day) + '日';
}

// 刷新当前页面
function reload(){
    window.location.reload();
}

// 自定义跳转
function goCustom(url){
    window.location.href = APP_PATH + url;
}

// 自定义跳转
function goCustom_brank(url){
    window.open(APP_PATH + url, "_brank");
}

//页面的跳转-用户系统首页
function go(){
    window.location.href = APP_PATH + "/index.jsp";
}

//页面的跳转-个人主页
function goMyHome(){
    window.location.href = APP_PATH + "/myself.jsp?userid=" + userid;
}

//页面的跳转-管理系统首页
function goAdmin(){
    window.location.href = APP_PATH + "/admin/index.jsp";
}

// 邮箱格式验证
function emialVerify(email) {
    // email正则表达式（为了使邮箱有意义暂时只支持163.com|qq.com|gmail.com结尾的邮箱地址）
    // 使邮箱验证及帐户激活这种机制有意义（因为临时邮箱会使这种机制失去意义）
    var pattern = /^([A-Za-z0-9_\-\.])+\@(163.com|qq.com|gmail.com)$/;
    return pattern.test(email);
}

// 获取他（本）人信息
function getOther(userid, open) {
    $.ajax({
        //几个参数需要注意一下
        type: "get",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/user/getOther/" + userid ,
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                if (typeof(open) == "undefined") {  // open不存在
                    goCustom(data.data.url + "?userid=" + userid);
                } else {
                    goCustom_brank(data.data.url + "?userid=" + userid, open);
                }
            } else if (code == 500) {
                layer.msg(msg,{icon: 5});
            }
        },
        error : function() {
            layer.msg("出错！",{icon: 5});
        }
    });
}

/**
 * 处理年龄
 * @param ageStr
 */
function getAge(ageStr) {
    if (ageStr === null) {
        ageStr = '';
    }
    return ageStr;
}

/**
 * 处理性别
 * @param sexStr
 */
function getSex(sexStr) {
    if (sexStr === 0) {
        sexStr = '男';
    } else if (sexStr === 1) {
        sexStr = '女';
    } else {
        sexStr = '';
    }
    return sexStr;
}

/**
 * 功能：动态设置单位大小（存储单位）
 * @param byte
 * @returns {String}
 */
function dynamicStorageUnit(importData) {
    var divisor = 1024; //公共除数
    var num = 0;
    var outputData;
    while (importData >= 1024) {
        if (num == 0) {
            outputData = toDecimal(importData) + "B";
        } else if (num == 1) {
            importData = importData / divisor;
            outputData = toDecimal(importData) + "KB";
        } else if (num == 2) {
            importData = importData / divisor;
            outputData = toDecimal(importData) + "MB";
        } else if (num == 3) {
            importData = importData / divisor;
            outputData = toDecimal(importData) + "GB";
        } else if (num == 4) {
            importData = importData / divisor;
            outputData = toDecimal(importData) + "TB";
        } else if (num == 5) {
            importData = importData / divisor;
            outputData = toDecimal(importData) + "PB";
        }
        num++;
    }
    return outputData;
}

/**
 * 功能：将浮点数四舍五入，取小数点后2位（强制）
 * @param x
 * @returns
 */
function toDecimal(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return false;
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
}