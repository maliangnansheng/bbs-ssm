package com.liang.dao;

import com.liang.bean.Enjoy;

import java.util.List;

public interface EnjoyMapper {
	
	//查询点赞信息(无条件)
	List<Enjoy> selectByEnjoy();

	//删除点赞信息(按sid)
    void deleteByEnjoy(Enjoy record);

    //插入点赞信息
    void insert(Enjoy record);

    //按userid查询点赞信息（点赞了哪些帖子）
	List<Enjoy> selectByEnjoyUserid(int userid);

	//删除点赞（按userid和fid）
	void deleteEnjoyUseridAndFid(Enjoy enjoy);

	//按fid删除点赞信息
	void deleteByEnjoyFid(int fid);

	//删除该用户对应的点赞信息(按userid)
	void deleteEnjoyUserid(int userid);

	//按点赞者id和被点赞帖子id进行查询
	Enjoy getEnjoyFid(Enjoy enjoy);
}
