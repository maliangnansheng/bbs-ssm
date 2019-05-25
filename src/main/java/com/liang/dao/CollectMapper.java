package com.liang.dao;

import java.util.List;

import com.liang.bean.Collect;

public interface CollectMapper {
	
	//查询收藏信息(无条件)
	List<Collect> selectByCollect();

	//删除收藏信息(按sid)
    void deleteByCollect(Collect record);

    //插入收藏信息
    void insert(Collect record);

    //按userid查询收藏信息（收藏了哪些帖子）
	List<Collect> selectByCollectUserid(int userid);

	//删除收藏（按userid和fid）
	void deleteCollectUseridAndFid(Collect collect);

	//按fid删除收藏信息
	void deleteByCollectFid(int fid);

	//删除该用户对应的收藏信息(按userid)
	void deleteCollectUserid(int userid);

	//按收藏者id和被收藏帖子id进行查询
    Collect getCollectFid(Collect collect);
}
