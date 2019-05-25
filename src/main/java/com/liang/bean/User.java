package com.liang.bean;

public class User {
    private Integer userid;

    private String name;

    private Integer age;

    private String sex;

    private String password;

    private String email;

    private String family;

    private String intro;

    private String time;
    
    private String userphoto;
    
    private int attcount;
    
    public User() {
		super();
	}

	public User(Integer userid, String name, Integer age, String sex, String password, String email, String family,
			String intro, String time) {
		super();
		this.userid = userid;
		this.name = name;
		this.age = age;
		this.sex = sex;
		this.password = password;
		this.email = email;
		this.family = family;
		this.intro = intro;
		this.time = time;
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

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex == null ? null : sex.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    public String getFamily() {
        return family;
    }

    public void setFamily(String family) {
        this.family = family == null ? null : family.trim();
    }

    public String getIntro() {
        return intro;
    }

    public void setIntro(String intro) {
        this.intro = intro == null ? null : intro.trim();
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time.substring(0,time.length()-2);
    }

	public String getUserphoto() {
		return userphoto;
	}

	public void setUserphoto(String userphoto) {
		this.userphoto = userphoto;
	}

	public int getAttcount() {
		return attcount;
	}

	public void setAttcount(int attcount) {
		this.attcount = attcount;
	}

	@Override
	public String toString() {
		return "User [userid=" + userid + ", name=" + name + ", age=" + age + ", sex=" + sex + ", password=" + password
				+ ", email=" + email + ", family=" + family + ", intro=" + intro + ", time=" + time + ", userphoto="
				+ userphoto + ", attcount=" + attcount + "]";
	}

}