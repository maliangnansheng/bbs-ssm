package com.liang.dao;

import java.util.List;

import com.liang.bean.Attention;

public interface AttentionMapper {

    //删除关注信息(按gid)
    void deleteByAttention(Attention record);
    
    //删除关注信息（按userid和beuserid）
    void deleteByAttentionMyself(Attention record);

    //插入关注信息
    void insert(Attention record);

    //按userid查询关注信息
    List<Attention> selectByUserid(Integer userid);
    
    //按beuserid查询关注信息
  	List<Attention> selectByBeuserid(int beuserid);

    //查询关注信息(无条件)
	List<Attention> selectByAttention();

	//删除该用户对应的关注和被关注信息
	void deleteAttentionUseridOrBeuserid(int userid);

    //按关注者id和被关注者id进行查询
    Attention getAttentionBeuserid(Attention attention);
}
