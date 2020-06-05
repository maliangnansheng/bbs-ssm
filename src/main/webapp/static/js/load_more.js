/**
 * 加载更多
 * @param pageStart 第几页
 * @param bid 板块id
 */
function appendMore(pageStart, bid) {
	var url = "/api/rest/nanshengbbs/v3.0/article/appendMore?pageStart=" + pageStart;
	if (typeof(bid) != "undefined") {
		url = "/api/rest/nanshengbbs/v3.0/article/appendMore?bid=" + bid + "&pageStart=" + pageStart;
	}
	$.ajax({
		url: APP_PATH + url,
		type: "get",
		dataType: "json",
		success: function (data) {
			// 状态码
			var code = data.code;
			// 提示信息
			var msg = data.msg;
			data = data.data;
			if (code == 200) {
				var articles = data.listArticle;
				// 构造首页文章信息
				var articles_all = getArticlesAll(data);

				//追加
				$("#articles_all").append(articles_all);

				//没有更多
				if(articles.length == 0){
					var appendMore = '<small class="text-warning">已加载全部文章...</small>';
					$("#appendMore").html(appendMore);
					$("#appendMore").removeAttr("onClick");
				} else {
					/*加载更多*/
					var pageStart = data.pageStart + 1;
					if (typeof(bid) == "undefined") {	// 没在bid板块下查询（即：查询所有）
						$("#appendMore").attr("onClick", "appendMore('" + pageStart + "')");
					} else {	// 在bid板块下查询
						$("#appendMore").attr("onClick", "appendMore('" + pageStart + "','" + bid + "')");
					}
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
 * 判断“加载更多”是否该显示
 * @param length
 */
function appendMoreShow(length) {
    if (length > 3) {
        return true;
    } else {
    	return false;
	}
}