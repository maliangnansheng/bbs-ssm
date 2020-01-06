package com.liang.bean;

/**
 * @author maliang
 * @create 2019-05-25 21:12
 */
public class Enjoy {
    private int eid;

    private int userid;

    private int fid;

    public Enjoy() {
    }

    public Enjoy(int eid, int userid, int fid) {
        this.eid = eid;
        this.userid = userid;
        this.fid = fid;
    }

    public int getEid() {
        return eid;
    }

    public void setEid(int eid) {
        this.eid = eid;
    }

    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    public int getFid() {
        return fid;
    }

    public void setFid(int fid) {
        this.fid = fid;
    }

    @Override
    public String toString() {
        return "Enjoy{" +
                "eid=" + eid +
                ", userid=" + userid +
                ", fid=" + fid +
                '}';
    }
}
