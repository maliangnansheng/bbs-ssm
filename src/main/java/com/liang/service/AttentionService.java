package com.liang.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.liang.bean.Attention;
import com.liang.dao.AttentionMapper;

@Service
public class AttentionService {

	@Autowired
	AttentionMapper attentionMapper;
	
	/**
	 * 添加关注
	 * @param attention
	 */
	public void setAttention(Attention attention) {

		attentionMapper.insert(attention);
	}

	/**
	 * 取消关注（按gid）
	 * @param gid
	 */
	public void deleteAttention(String gid) {

		attentionMapper.deleteByKey(gid);
	}

	/**
	 * 取消关注（按beuserid和userid）
	 * @param attention
	 */
	public void deleteByUserid(Attention attention) {

		attentionMapper.deleteByUB(attention);
	}

	/**
	 * 查询关注信息(无条件)
	 * @return
	 */
	public List<Attention> getAttention() {

		return attentionMapper.selectAttention();
	}

	/**
	 * 获取userid的关注总数
	 * @param userid
	 * @return
	 */
	public int getCountByUserid(String userid) {

		return attentionMapper.selectCountByUserid(userid);
	}
	
	/**
	 * 获取userid的粉丝总数
	 * @param beuserid
	 * @return
	 */
	public int getCountByBeuserid(String beuserid) {

		return attentionMapper.selectCountByBeuserid(beuserid);
	}

	/**
	 * 删除该用户对应的关注和被关注信息
	 * @param userid
	 */
	public void deleteAttentionUseridOrBeuserid(String userid) {
		
		attentionMapper.deleteByUorB(userid);
	}
}
