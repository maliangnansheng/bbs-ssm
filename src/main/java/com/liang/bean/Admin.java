package com.liang.bean;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Date;

/**
 * master分支测试 -- 代码贡献测试
 */
public class Admin {
	// 管理员id
	private String aid;
	// 管理员名字
	private String aname;
	// 管理员密码
	@JsonIgnore
	private String apassword;
	// 管理员创建时间
	private Date createTime;
	// 管理员更新时间
	private Date updateTime;

	public Admin() {
		super();
	}

	public String getAid() {
		return aid;
	}

	public void setAid(String aid) {
		this.aid = aid;
	}

	public String getAname() {
		return aname;
	}

	public void setAname(String aname) {
		this.aname = aname;
	}

	public String getApassword() {
		return apassword;
	}

	public void setApassword(String apassword) {
		this.apassword = apassword;
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
		return "Admin{" +
				"aid='" + aid + '\'' +
				", aname='" + aname + '\'' +
				", apassword='" + apassword + '\'' +
				", createTime=" + createTime +
				", updateTime=" + updateTime +
				'}';
	}
}