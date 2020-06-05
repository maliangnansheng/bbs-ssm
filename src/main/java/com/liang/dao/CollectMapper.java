package com.liang.dao;

import java.util.List;
import java.util.Map;

import com.liang.bean.Collect;

public interface CollectMapper {

	// 新增收藏信息
	void insert(Collect record);

	// 按sid删除收藏信息
	void deleteByKey(String sid);

	// 按userid和fid删除收藏
	void deleteByUF(Collect collect);

	// 按fid删除收藏信息
	void deleteByFid(String fid);

	// 删除某用户对应的收藏信息
	void deleteByUserid(String userid);

	// 查询所有收藏信息
	List<Collect> selectCollect();

	// 按收藏者id和被收藏文章id进行查询
    Collect selectCollectByUF(Collect collect);
}
