package com.liang.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.liang.bean.Collect;
import com.liang.dao.CollectMapper;

@Service
public class CollectService {

	@Autowired
	CollectMapper collectMapper;
	
	/**
	 * 查询收藏信息（无条件）
	 * @return
	 */
	public List<Collect> getCollect() {
		
		return collectMapper.selectByCollect();
	}

	/**
	 * 删除收藏(按sid)
	 * @param collect
	 */
	public void deleteCollect(Collect collect) {
		
		collectMapper.deleteByCollect(collect);
	}

	/**
	 * 添加收藏
	 * @param collect
	 */
	public void setCollect(Collect collect) {
		
		collectMapper.insert(collect);
	}

	/**
	 * 按userid查询收藏信息（收藏了哪些帖子）
	 * @param userid
	 * @return
	 */
	public List<Collect> getCollect(int userid) {

		return collectMapper.selectByCollectUserid(userid);
	}

	/**
	 * 删除收藏（按userid和fid）
	 * @param collect
	 */
	public void deleteCollectUseridAndFid(Collect collect) {
		
		collectMapper.deleteCollectUseridAndFid(collect);
	}

	/**
	 * 按fid删除收藏信息
	 * @param fid
	 */
	public void deleteCollectFid(int fid) {
		
		collectMapper.deleteByCollectFid(fid);
	}

	/**
	 * 删除该用户对应的收藏信息(按userid)
	 * @param userid
	 */
	public void deleteCollectUserid(int userid) {
		
		collectMapper.deleteCollectUserid(userid);
	}

	/**
	 * 按收藏者id和被收藏帖子id进行查询
	 * @param collect
	 * @return
	 */
    public Collect getCollectFid(Collect collect) {
    	return collectMapper.getCollectFid(collect);
    }
}
