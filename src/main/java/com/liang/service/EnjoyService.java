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
	 * 添加点赞
	 * @param enjoy
	 */
	public void setEnjoy(Enjoy enjoy) {

		enjoyMapper.insert(enjoy);
	}

	/**
	 * 删除点赞(按eid)
	 * @param eid
	 */
	public void deleteEnjoy(String eid) {

		enjoyMapper.deleteByKey(eid);
	}

	/**
	 * 删除点赞（按userid和fid）
	 * @param enjoy
	 */
	public void deleteEnjoyUseridAndFid(Enjoy enjoy) {

		enjoyMapper.deleteByUF(enjoy);
	}

	/**
	 * 查询点赞信息（无条件）
	 * @return
	 */
	public List<Enjoy> getEnjoy() {
		
		return enjoyMapper.selectEnjoy();
	}

	/**
	 * 按点赞者id和被点赞文章id进行查询
	 * @param enjoy
	 * @return
	 */
    public Enjoy getEnjoyFid(Enjoy enjoy) {
    	return enjoyMapper.selectEnjoyByUF(enjoy);
    }
}
