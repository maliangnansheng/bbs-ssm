package com.liang.dao;

import java.util.List;

import com.liang.bean.Attention;

public interface AttentionMapper {

    // 新增关注信息
    void insert(Attention record);

    // 按gid删除关注信息
    void deleteByKey(String gid);
    
    // 按userid和beuserid删除关注信息
    void deleteByUB(Attention attention);

    // 删除某用户对应的关注和被关注信息
    void deleteByUorB(String userid);

    // 查询所有关注信息
	List<Attention> selectAttention();

    // 获取某用户的关注总数
    int selectCountByUserid(String userid);

    // 获取某用户的粉丝总数
    int selectCountByBeuserid(String beuserid);
}
