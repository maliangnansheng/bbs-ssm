/**
 * QQ分享
 * @param title 标题
 * @param url 地址
 * @param pics 配图 - 访问地址是"localhost"不显示配图，可用127.0.0.1替代localhost看效果
 * @param summary 描述
 */
function shareToQQ(title, url, pics) {
    var qq='http://connect.qq.com/widget/shareqq/index.html?' +
        'url=' + url +
        '&sharesource=qzone' +
        '&title=' + title +
        '&pics=' + pics +
        '&summary=我在《南生论坛》发现了一篇很有意思的文章，分享给你，你看看吧...';
    window.open(qq);
}