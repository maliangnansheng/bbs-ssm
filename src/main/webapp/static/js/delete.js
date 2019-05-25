/**
 * 评论删除确认框
 * @returns
 */
function p_del(fid,pid) {
    layer.confirm('您真的确定要删除此条评论吗？删除后不能复原！', {
            btn:["确定","取消"],
            icon:2,
            title: "删除提示"
        }, function(){
    		//点击确后关闭提示框
        	layer.closeAll('dialog');
    		commentDel(fid,pid)
    });
}

/**
 * 评论删除确认框-回复
 * @returns
 */
function p_del_huifu(fid,pid) {
    layer.confirm('您真的确定要删除此条评论吗？删除后不能复原！', {
        btn:["确定","取消"],
        icon:2,
        title: "删除提示"
    }, function(){
        //点击确后关闭提示框
        layer.closeAll('dialog');
        huifuCommentDel(fid,pid)
    });
}

/**
 * 帖子删除确认框
 * @returns
 */
function f_del(fid) {
    layer.confirm('您真的确定要删除此条帖子吗？这将同时删除这条帖子下的所有评论。删除后不能复原！', {
        btn:["确定","取消"],
        icon:2,
        title: "删除提示"
    }, function(){
        //点击确后关闭提示框
        layer.closeAll('dialog');
        articleDel(fid)
    });
}
