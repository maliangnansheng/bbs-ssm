package com.liang.bean;

import java.util.Date;

public class Article {
    // 文章id
    private String fid;
    // 文章标题
    private String titles;
    // 文章内容
    private String fcontent;
    // 文章配图（题图）
    private String photo;
    // 文章所属板块id
    private String bid;
    // 文章发布者id
    private String userid;
    // 文章审核状态
    private Integer status;
    // 文章发布时间
    private Date createTime;
    // 文章更新时间
    private Date updateTime;

    public Article() {
        super();
    }

    public String getFid() {
        return fid;
    }

    public void setFid(String fid) {
        this.fid = fid;
    }

    public String getTitles() {
        return titles;
    }

    public void setTitles(String titles) {
        this.titles = titles;
    }

    public String getFcontent() {
        return fcontent;
    }

    public void setFcontent(String fcontent) {
        this.fcontent = fcontent;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getBid() {
        return bid;
    }

    public void setBid(String bid) {
        this.bid = bid;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
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
        return "Article{" +
                "fid='" + fid + '\'' +
                ", titles='" + titles + '\'' +
                ", fcontent='" + fcontent + '\'' +
                ", photo='" + photo + '\'' +
                ", bid='" + bid + '\'' +
                ", userid='" + userid + '\'' +
                ", status=" + status +
                ", createTime=" + createTime +
                ", updateTime=" + updateTime +
                '}';
    }
}