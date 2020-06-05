package com.liang.bean;

import java.util.Date;

public class Visit {
    // 访问记录编号
    private String visitid;
    // 访问者地址
    private String visiturl;
    // 访问者ip
    private String visitip;
    // 访问者所在国家
    private String visitcountry;
    // 访问者省份
    private String visitprovince;
    // 访问者城市
    private String visitcity;
    // 主机名
    private String visithostname;
    // 访问者操作系统
    private String visitos;
    // 访问时间
    private Date visittime;
    // 访问数量
    private int count;

    public String getVisitid() {
        return visitid;
    }

    public void setVisitid(String visitid) {
        this.visitid = visitid;
    }

    public String getVisiturl() {
        return visiturl;
    }

    public void setVisiturl(String visiturl) {
        this.visiturl = visiturl;
    }

    public String getVisitip() {
        return visitip;
    }

    public void setVisitip(String visitip) {
        this.visitip = visitip;
    }

    public String getVisitcountry() {
        return visitcountry;
    }

    public void setVisitcountry(String visitcountry) {
        this.visitcountry = visitcountry;
    }

    public String getVisitprovince() {
        return visitprovince;
    }

    public void setVisitprovince(String visitprovince) {
        this.visitprovince = visitprovince;
    }

    public String getVisitcity() {
        return visitcity;
    }

    public void setVisitcity(String visitcity) {
        this.visitcity = visitcity;
    }

    public String getVisithostname() {
        return visithostname;
    }

    public void setVisithostname(String visithostname) {
        this.visithostname = visithostname;
    }

    public String getVisitos() {
        return visitos;
    }

    public void setVisitos(String visitos) {
        this.visitos = visitos;
    }

    public Date getVisittime() {
        return visittime;
    }

    public void setVisittime(Date visittime) {
    	this.visittime = visittime;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    @Override
    public String toString() {
        return "Visit{" +
                "visitid=" + visitid +
                ", visiturl='" + visiturl + '\'' +
                ", visitip='" + visitip + '\'' +
                ", visitcountry='" + visitcountry + '\'' +
                ", visitprovince='" + visitprovince + '\'' +
                ", visitcity='" + visitcity + '\'' +
                ", visithostname='" + visithostname + '\'' +
                ", visitos='" + visitos + '\'' +
                ", visittime='" + visittime + '\'' +
                ", count=" + count +
                '}';
    }
}