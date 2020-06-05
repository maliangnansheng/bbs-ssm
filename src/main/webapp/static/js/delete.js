/**
 * 评论删除确认框
 * @returns
 */
function p_del(pid) {
    layer.confirm('确定删除该评论？<br>删除后无法恢复！', {
            btn:["确定","取消"],
            icon:2,
            title: "删除提示"
        }, function(){
    		//点击确后关闭提示框
        	layer.closeAll('dialog');
    		commentDel(pid)
    });
}

/**
 * 文章删除确认框
 * @returns
 */
function f_del(fid) {
    layer.confirm('确定删除该文章？<br>这将同时删除与该文章相关的所有信息<br>删除后无法恢复！', {
        btn:["确定","取消"],
        icon:2,
        title: "删除提示"
    }, function(){
        //点击确后关闭提示框
        layer.closeAll('dialog');
        articleDel(fid)
    });
}

/**
 * 相册删除确认框
 * @returns
 */
function deletePhotoPro(fid) {
    layer.confirm('确定删除该相册吗？<br>这将同时删除该相册下的所有照片<br>删除后无法恢复！', {
        btn:["确定","取消"],
        icon:2,
        title: "删除提示"
    }, function(){
        //点击确后关闭提示框
        layer.closeAll('dialog');
        photoProDel(fid);
    });
}

/**
 * 照片删除确认框
 * @returns
 */
function deletePhoto(xid) {
    layer.confirm('确定删除该照片吗？<br>删除后无法恢复！', {
        btn:["确定","取消"],
        icon:2,
        title: "删除提示"
    }, function(){
        //点击确后关闭提示框
        layer.closeAll('dialog');
        tbPhotoDel(xid);
    });
}