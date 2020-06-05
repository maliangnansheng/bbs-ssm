package com.liang.bean.impl;

import com.liang.bean.Comment;

public class CommentImpl extends Comment {
    // 用户名
    private String name;
    // 用头像
    private String userPhoto;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUserPhoto() {
        return userPhoto;
    }

    public void setUserPhoto(String userPhoto) {
        this.userPhoto = userPhoto;
    }

    @Override
    public String toString() {
        return "CommentImpl{" +
                "name='" + name + '\'' +
                ", userPhoto='" + userPhoto + '\'' +
                '}';
    }
}
