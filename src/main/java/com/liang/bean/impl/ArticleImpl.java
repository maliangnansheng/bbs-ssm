package com.liang.bean.impl;

import com.liang.bean.Article;

import java.util.Date;

public class ArticleImpl extends Article {
    // 用户名
    private String name;
    // 评论数
    private Integer commentCount;
    // 收藏时间
    private Date collectTime;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCommentCount() {
        return commentCount;
    }

    public void setCommentCount(Integer commentCount) {
        this.commentCount = commentCount;
    }

    public Date getCollectTime() {
        return collectTime;
    }

    public void setCollectTime(Date collectTime) {
        this.collectTime = collectTime;
    }

    @Override
    public String toString() {
        return "ArticleImpl{" +
                "name='" + name + '\'' +
                ", commentCount=" + commentCount +
                ", collectTime=" + collectTime +
                '}';
    }
}
