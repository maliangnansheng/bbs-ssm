package com.liang.bean;

import java.util.Date;

public class PhotoPro {
    // 相册id
    private String fid;
    // 用户id
    private String userid;
    // 相册名
    private String name;
    // 相册创建时间
    private Date createTime;
    // 相册更新时间
    private Date updateTime;

    public PhotoPro() {
        super();
    }

    public String getFid() {
        return fid;
    }

    public void setFid(String fid) {
        this.fid = fid;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    @Override
    public String toString() {
        return "PhotoPro{" +
                "fid='" + fid + '\'' +
                ", userid='" + userid + '\'' +
                ", name='" + name + '\'' +
                ", createTime=" + createTime +
                ", updateTime=" + updateTime +
                '}';
    }
}