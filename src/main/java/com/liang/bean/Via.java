package com.liang.bean;

import java.util.Date;

public class Via {
    // 用户id
    private String userid;
    // 用户头像名
    private String photo;
    // 用户头像更新时间
    private Date updateTime;

	public Via() {
		super();
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

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    @Override
    public String toString() {
        return "Via{" +
                "userid='" + userid + '\'' +
                ", photo='" + photo + '\'' +
                ", updateTime=" + updateTime +
                '}';
    }
}