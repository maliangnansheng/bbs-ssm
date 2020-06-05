package com.liang.dao;

import com.liang.bean.Comment;
import com.liang.bean.impl.CommentImpl;

import java.util.List;

public interface CommentMapper {

    // 新增评论信息
    void insert(Comment record);

    // 按pid删除评论信息
    void deleteByKey(String pid);

    // 删除某用户对应的所有评论信息
    void deleteByUserid(String userid);
    
    // 按文章id（fid）查询评论信息
    List<Comment> selectCommentByFid(String fid);

    // 按文章id（fid）查询评论表信息（包含用户名、用户头像）
    List<CommentImpl> selectCommentImplByFid(String fid);

    // 最新评论
    List<CommentImpl> selectNewComment();
    
    // 按文章id（fid）查询该条文章的评论数
    int selectCountByFid(String fid);
}