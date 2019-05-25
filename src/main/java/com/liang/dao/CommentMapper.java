package com.liang.dao;

import com.liang.bean.Comment;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface CommentMapper {

    //按pid删除评论表
    int deleteByPrimaryKey(Integer pid);

    //删除该用户对应的所有评论信息(按userid)
    int deleteByUserid(int userid);
    
    //添加评论
    int insert(Comment record);

    int insertSelective(Comment record);
    
    //按帖子id（fid）查询评论表信息
    List<Comment> selectByCommentFid(int fid);
    
    //按用户id（userid）查询评论表的fid信息
    List<Comment> selectByCommentUserid(int userid);

    Comment selectByPrimaryKey(Integer pid);

    int updateByPrimaryKeySelective(Comment record);

    int updateByPrimaryKey(Comment record);

    //按帖子id（fid）查询该条帖子的评论数
    int selectByCountFid(int fid);
}