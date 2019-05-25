package com.liang.bean;

import java.util.Date;

public class Visit {
    private Integer visitid;

    private String visiturl;

    private String visitip;

    private String visitcountry;

    private String visitprovince;

    private String visitcity;

    private String visithostname;

    private String visitos;

    private String visittime;

    private int count;

    public Integer getVisitid() {
        return visitid;
    }

    public void setVisitid(Integer visitid) {
        this.visitid = visitid;
    }

    public String getVisiturl() {
        return visiturl;
    }

    public void setVisiturl(String visiturl) {
        this.visiturl = visiturl == null ? null : visiturl.trim();
    }

    public String getVisitip() {
        return visitip;
    }

    public void setVisitip(String visitip) {
        this.visitip = visitip == null ? null : visitip.trim();
    }

    public String getVisitcountry() {
        return visitcountry;
    }

    public void setVisitcountry(String visitcountry) {
        this.visitcountry = visitcountry == null ? null : visitcountry.trim();
    }

    public String getVisitprovince() {
        return visitprovince;
    }

    public void setVisitprovince(String visitprovince) {
        this.visitprovince = visitprovince == null ? null : visitprovince.trim();
    }

    public String getVisitcity() {
        return visitcity;
    }

    public void setVisitcity(String visitcity) {
        this.visitcity = visitcity == null ? null : visitcity.trim();
    }

    public String getVisithostname() {
        return visithostname;
    }

    public void setVisithostname(String visithostname) {
        this.visithostname = visithostname == null ? null : visithostname.trim();
    }

    public String getVisitos() {
        return visitos;
    }

    public void setVisitos(String visitos) {
        this.visitos = visitos == null ? null : visitos.trim();
    }

    public String getVisittime() {
        return visittime;
    }

    public void setVisittime(String visittime) {
    	this.visittime = visittime.substring(0,visittime.length()-2);
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