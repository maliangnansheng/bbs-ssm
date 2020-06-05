package com.liang.bean;

import java.util.Date;

public class Plate {
    // 板块id
    private String bid;
    // 板块名
    private String bname;
    // 板块创建时间
    private Date createTime;
    // 板块更新时间
    private Date updateTime;

    public Plate() {
		super();
	}

    public String getBid() {
        return bid;
    }

    public void setBid(String bid) {
        this.bid = bid;
    }

    public String getBname() {
        return bname;
    }

    public void setBname(String bname) {
        this.bname = bname;
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
        return "Plate{" +
                "bid='" + bid + '\'' +
                ", bname='" + bname + '\'' +
                ", createTime=" + createTime +
                ", updateTime=" + updateTime +
                '}';
    }
}