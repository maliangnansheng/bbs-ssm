package com.liang.bean;

public class TbPhoto {
    private Integer xid;

    private Integer fid;

    private Integer userid;

    private String photo;

    private String time;
    
    private String name;

    public TbPhoto() {
		super();
	}

	public TbPhoto(Integer fid, Integer userid) {
		super();
		this.fid = fid;
		this.userid = userid;
	}

	public Integer getXid() {
        return xid;
    }

    public void setXid(Integer xid) {
        this.xid = xid;
    }

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

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo == null ? null : photo.trim();
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time.substring(0, time.length()-2);
    }

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "TbPhoto [xid=" + xid + ", fid=" + fid + ", userid=" + userid + ", photo=" + photo + ", time=" + time
				+ ", name=" + name + "]";
	}
}