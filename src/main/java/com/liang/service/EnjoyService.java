package com.liang.service;

import com.liang.bean.Enjoy;
import com.liang.dao.EnjoyMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnjoyService {

	@Autowired
	EnjoyMapper enjoyMapper;
	
	/**
	 * 查询点赞信息（无条件）
	 * @return
	 */
	public List<Enjoy> getEnjoy() {
		
		return enjoyMapper.selectByEnjoy();
	}

	/**
	 * 删除点赞(按sid)
	 * @param enjoy
	 */
	public void deleteEnjoy(Enjoy enjoy) {

		enjoyMapper.deleteByEnjoy(enjoy);
	}

	/**
	 * 添加点赞
	 * @param enjoy
	 */
	public void setEnjoy(Enjoy enjoy) {

		enjoyMapper.insert(enjoy);
	}

	/**
	 * 按userid查询点赞信息（点赞了哪些帖子）
	 * @param userid
	 * @return
	 */
	public List<Enjoy> getEnjoy(int userid) {

		return enjoyMapper.selectByEnjoyUserid(userid);
	}

	/**
	 * 删除点赞（按userid和fid）
	 * @param enjoy
	 */
	public void deleteEnjoyUseridAndFid(Enjoy enjoy) {

		enjoyMapper.deleteEnjoyUseridAndFid(enjoy);
	}

	/**
	 * 按fid删除点赞信息
	 * @param fid
	 */
	public void deleteEnjoyFid(int fid) {

		enjoyMapper.deleteByEnjoyFid(fid);
	}

	/**
	 * 删除该用户对应的点赞信息(按userid)
	 * @param userid
	 */
	public void deleteEnjoyUserid(int userid) {

		enjoyMapper.deleteEnjoyUserid(userid);
	}

	/**
	 * 按点赞者id和被点赞帖子id进行查询
	 * @param enjoy
	 * @return
	 */
    public Enjoy getEnjoyFid(Enjoy enjoy) {
    	return enjoyMapper.getEnjoyFid(enjoy);
    }
}
