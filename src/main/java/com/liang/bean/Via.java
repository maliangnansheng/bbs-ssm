package com.liang.bean;

public class Via {
    private Integer userid;

    private String photo;

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

	public Via() {
		super();
	}

	public Via(Integer userid, String photo) {
		super();
		this.userid = userid;
		this.photo = photo;
	}

	@Override
	public String toString() {
		return "Via [userid=" + userid + ", photo=" + photo + "]";
	}
    
}