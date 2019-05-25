package com.liang.bean;

import java.util.Date;

public class Article {
    private Integer fid;

    private String titles;

    private String fcontent;

    private String photo;

    private String bname;

    private String time;

    private Integer userid;

    private String username;

    private Integer status;
    
    private String sum;
    
    private String userphoto;

    public Article() {
		super();
	}
    
    public Article(Article2 article2,String photo) {
		super();
		this.fid = article2.getFid();
		this.titles = article2.getTitles();
		this.fcontent = article2.getFcontent();
		this.bname = article2.getBname();
		this.time = article2.getTime();
		this.userid = article2.getUserid();
		this.username = article2.getUsername();
		this.status = article2.getStatus();
		this.photo = photo;
	}

	public Article(Integer fid, String titles, String fcontent, String photo, String bname, String time, Integer userid,
			String username, Integer status) {
		super();
		this.fid = fid;
		this.titles = titles;
		this.fcontent = fcontent;
		this.photo = photo;
		this.bname = bname;
		this.time = time;
		this.userid = userid;
		this.username = username;
		this.status = status;
	}

	public Integer getFid() {
        return fid;
    }

    public void setFid(Integer fid) {
        this.fid = fid;
    }

    public String getTitles() {
        return titles;
    }

    public void setTitles(String titles) {
        this.titles = titles == null ? null : titles.trim();
    }

    public String getFcontent() {
        return fcontent;
    }

    public void setFcontent(String fcontent) {
        this.fcontent = fcontent == null ? null : fcontent.trim();
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo == null ? null : photo.trim();
    }

    public String getBname() {
        return bname;
    }

    public void setBname(String bname) {
        this.bname = bname == null ? null : bname.trim();
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time.substring(0,time.length()-2);
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

	public String getSum() {
		return sum;
	}

	public void setSum(String sum) {
		this.sum = sum;
	}

	public String getUserphoto() {
		return userphoto;
	}

	public void setUserphoto(String userphoto) {
		this.userphoto = userphoto;
	}

	@Override
	public String toString() {
		return "Article [fid=" + fid + ", titles=" + titles + ", fcontent=" + fcontent + ", photo=" + photo + ", bname="
				+ bname + ", time=" + time + ", userid=" + userid + ", username=" + username + ", status=" + status
				+ ", sum=" + sum + ", userphoto=" + userphoto + "]";
	}
    
}