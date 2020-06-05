package com.liang.bean;

import java.util.Date;

public class Attention {
	// 关注id
	private String gid;
	// 关注者id
	private String userid;
	// 被关注者id
	private String beuserid;
	// 关注时间
	private Date createTime;

	public Attention() {
		super();
	}

	public String getGid() {
		return gid;
	}

	public void setGid(String gid) {
		this.gid = gid;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getBeuserid() {
		return beuserid;
	}

	public void setBeuserid(String beuserid) {
		this.beuserid = beuserid;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	@Override
	public String toString() {
		return "Attention{" +
				"gid='" + gid + '\'' +
				", userid='" + userid + '\'' +
				", beuserid='" + beuserid + '\'' +
				", createTime=" + createTime +
				'}';
	}
}
