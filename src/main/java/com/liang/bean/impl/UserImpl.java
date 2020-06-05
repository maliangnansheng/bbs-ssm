package com.liang.bean.impl;

import com.liang.bean.User;

import java.util.Date;

/**
 * @author maliang
 * @create 2020-04-08 15:15
 */
public class UserImpl extends User {
    // 头像
    private String photo;
    // 关注id
    private String gid;

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getGid() {
        return gid;
    }

    public void setGid(String gid) {
        this.gid = gid;
    }

    @Override
    public String toString() {
        return "UserImpl{" +
                ", photo='" + photo + '\'' +
                ", gid='" + gid + '\'' +
                '}';
    }
}
