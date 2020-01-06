package com.liang.bean;

public class Article2 {
    private Integer fid;

    private String titles;

    private String fcontent;

    private Integer bid;

    private String time;

    private Integer userid;

    private Integer status;

    public Article2() {
		super();
	}

	public Article2(Integer fid, String titles, String fcontent, Integer bid, String time, Integer userid, Integer status) {
		super();
		this.fid = fid;
		this.titles = titles;
		this.fcontent = fcontent;
		this.bid = bid;
		this.time = time;
		this.userid = userid;
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

    public Integer getBid() {
        return bid;
    }

    public void setBid(Integer bid) {
        this.bid = bid;
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

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

	@Override
	public String toString() {
		return "Article [fid=" + fid + ", titles=" + titles + ", fcontent=" + fcontent + ", bid="
				+ bid + ", time=" + time + ", userid=" + userid + ", status=" + status
				+ "]";
	}

}