package com.liang.bean;

import java.util.Date;

/**
 * @author maliang
 * @create 2019-05-25 21:12
 */
public class Enjoy {
    // 收藏id
    private String eid;
    // 收藏者
    private String userid;
    // 被收藏文章id
    private String fid;
    // 收藏时间
    private Date createTime;

    public Enjoy() {
        super();
    }

    public String getEid() {
        return eid;
    }

    public void setEid(String eid) {
        this.eid = eid;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getFid() {
        return fid;
    }

    public void setFid(String fid) {
        this.fid = fid;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    @Override
    public String toString() {
        return "Enjoy{" +
                "eid='" + eid + '\'' +
                ", userid='" + userid + '\'' +
                ", fid='" + fid + '\'' +
                ", createTime=" + createTime +
                '}';
    }
}
