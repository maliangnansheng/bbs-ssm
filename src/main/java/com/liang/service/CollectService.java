package com.liang.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.liang.bean.Collect;
import com.liang.dao.CollectMapper;

@Service
public class CollectService {

	@Autowired
	CollectMapper collectMapper;

	/**
	 * 添加收藏
	 * @param collect
	 */
	public void setCollect(Collect collect) {

		collectMapper.insert(collect);
	}

	/**
	 * 删除收藏（按userid和fid）
	 * @param collect
	 */
	public void deleteCollectUseridAndFid(Collect collect) {

		collectMapper.deleteByUF(collect);
	}

	/**
	 * 按fid删除收藏信息
	 * @param fid
	 */
	public void deleteCollectFid(String fid) {

		collectMapper.deleteByFid(fid);
	}

	/**
	 * 删除该用户对应的收藏信息(按userid)
	 * @param userid
	 */
	public void deleteCollectUserid(String userid) {

		collectMapper.deleteByUserid(userid);
	}

	/**
	 * 删除收藏(按sid)
	 * @param sid
	 */
	public void deleteCollect(String sid) {

		collectMapper.deleteByKey(sid);
	}

	/**
	 * 查询收藏信息（无条件）
	 * @return
	 */
	public List<Collect> getCollect() {
		
		return collectMapper.selectCollect();
	}

	/**
	 * 按收藏者id和被收藏文章id进行查询
	 * @param collect
	 * @return
	 */
    public Collect getCollectFid(Collect collect) {
    	return collectMapper.selectCollectByUF(collect);
    }
}
