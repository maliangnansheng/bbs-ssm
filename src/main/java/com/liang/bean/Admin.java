package com.liang.bean;

import java.util.Date;

public class Admin {
	private Integer aid;

	private String aname;

	private String apassword;

	private String atime;

	public Admin() {
		super();
	}

	public Admin(Integer aid, String aname, String apassword, String atime) {
		super();
		this.aid = aid;
		this.aname = aname;
		this.apassword = apassword;
		this.atime = atime;
	}

	public Integer getAid() {
		return aid;
	}

	public void setAid(Integer aid) {
		this.aid = aid;
	}

	public String getAname() {
		return aname;
	}

	public void setAname(String aname) {
		this.aname = aname == null ? null : aname.trim();
	}

	public String getApassword() {
		return apassword;
	}

	public void setApassword(String apassword) {
		this.apassword = apassword == null ? null : apassword.trim();
	}

	public String getAtime() {
		return atime;
	}

	public void setAtime(String atime) {
		this.atime = atime.substring(0,atime.length()-2);
	}

	@Override
	public String toString() {
		return "Admin [aid=" + aid + ", aname=" + aname + ", apassword=" + apassword + ", atime=" + atime + "]";
	}

}