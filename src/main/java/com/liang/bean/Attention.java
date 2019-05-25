package com.liang.bean;

public class Attention {
	int gid;
	
	int userid;

	int beuserid;

	public Attention() {
		super();
	}

	public Attention(int gid, int userid, int beuserid) {
		super();
		this.gid = gid;
		this.userid = userid;
		this.beuserid = beuserid;
	}

	public int getGid() {
		return gid;
	}

	public void setGid(int gid) {
		this.gid = gid;
	}

	public int getUserid() {
		return userid;
	}

	public void setUserid(int userid) {
		this.userid = userid;
	}

	public int getBeuserid() {
		return beuserid;
	}

	public void setBeuserid(int beuserid) {
		this.beuserid = beuserid;
	}

	@Override
	public String toString() {
		return "Attention [gid=" + gid + ", userid=" + userid + ", beuserid=" + beuserid + "]";
	}
}
