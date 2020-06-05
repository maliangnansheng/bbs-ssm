package com.liang.bean;

import java.util.Date;

public class Comment {
    // 评论id
    private String pid;
    // 评论内容
    private String pcontent;
    // 评论者id
    private String userid;
    // 被评论文章id
    private String fid;
    // 评论创建时间
    private Date createTime;
    // 评论更新时间
    private Date updateTime;

    public Comment() {
		super();
	}

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public String getPcontent() {
        return pcontent;
    }

    public void setPcontent(String pcontent) {
        this.pcontent = pcontent;
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

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    @Override
    public String toString() {
        return "Comment{" +
                "pid='" + pid + '\'' +
                ", pcontent='" + pcontent + '\'' +
                ", userid='" + userid + '\'' +
                ", fid='" + fid + '\'' +
                ", createTime=" + createTime +
                ", updateTime=" + updateTime +
                '}';
    }
}