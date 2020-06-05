package com.liang.bean;

import java.util.Date;

public class TbPhoto {
    // 照片id
    private String xid;
    // 相册id
    private String fid;
    // 照片上传者
    private String userid;
    // 照片名
    private String photo;
    // 照片上传时间
    private Date createTime;

    public TbPhoto() {
        super();
    }

    public TbPhoto(String fid, String userid) {
        super();
        this.fid = fid;
        this.userid = userid;
    }

    public String getXid() {
        return xid;
    }

    public void setXid(String xid) {
        this.xid = xid;
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

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    @Override
    public String toString() {
        return "TbPhoto{" +
                "xid='" + xid + '\'' +
                ", fid='" + fid + '\'' +
                ", userid='" + userid + '\'' +
                ", photo='" + photo + '\'' +
                ", createTime=" + createTime +
                '}';
    }
}