package com.liang.dao;

import com.liang.bean.Enjoy;

import java.util.List;

public interface EnjoyMapper {

	// 新增点赞信息
	void insert(Enjoy record);

	// 按eid删除点赞信息
	void deleteByKey(String eid);

	// 按userid和fid删除点赞
	void deleteByUF(Enjoy enjoy);

	// 查询所有点赞信息
	List<Enjoy> selectEnjoy();

	// 按点赞者id和被点赞文章id进行查询
	Enjoy selectEnjoyByUF(Enjoy enjoy);
}
