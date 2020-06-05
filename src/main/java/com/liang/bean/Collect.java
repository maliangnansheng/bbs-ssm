package com.liang.bean;

import java.util.Date;

public class Collect {
	// 收藏id
	private String sid;
	// 收藏者id
	private String userid;
	// 收藏文章id
	private String fid;
	// 收藏时间
	private Date createTime;

	public Collect() {
		super();
	}

	public String getSid() {
		return sid;
	}

	public void setSid(String sid) {
		this.sid = sid;
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
		return "Collect{" +
				"sid='" + sid + '\'' +
				", userid='" + userid + '\'' +
				", fid='" + fid + '\'' +
				", createTime=" + createTime +
				'}';
	}
}
