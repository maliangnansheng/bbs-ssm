package com.liang.bean;

import java.util.Date;

public class PhotoPro {
    private Integer fid;

    private Integer userid;

    private String name;

    private Date time;
    
    private String photo;

    public Integer getFid() {
        return fid;
    }

    public void setFid(Integer fid) {
        this.fid = fid;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	@Override
	public String toString() {
		return "PhotoPro [fid=" + fid + ", userid=" + userid + ", name=" + name + ", time=" + time + ", photo=" + photo
				+ "]";
	}
}