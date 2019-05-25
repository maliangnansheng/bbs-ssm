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
	 * 查询关注信息(无条件)
	 * @return
	 */
	public List<Attention> getAttention() {

		return attentionMapper.selectByAttention();
	}

	/**
	 * 取消关注(首页)
	 * @param attention
	 */
	public void deleteAttention(Attention attention) {

		attentionMapper.deleteByAttention(attention);
	}

	/**
	 * 按userid查询关注信息
	 * @param userid
	 * @return
	 */
	public List<Attention> getAttention(int userid) {
		
		return attentionMapper.selectByUserid(userid);
	}
	
	/**
	 * 按beuserid查询关注信息
	 * @param userid
	 * @return
	 */
	public List<Attention> getAttentionBe(int beuserid) {
		
		return attentionMapper.selectByBeuserid(beuserid);
	}

	/**
	 * 取消关注（个人主页）
	 * @param attention
	 */
	public void deleteAttentionMyself(Attention attention) {
		
		attentionMapper.deleteByAttentionMyself(attention);
	}

	/**
	 * 删除该用户对应的关注和被关注信息
	 * @param userid
	 */
	public void deleteAttentionUseridOrBeuserid(int userid) {
		
		attentionMapper.deleteAttentionUseridOrBeuserid(userid);
	}

	/**
	 * 按关注者id和被关注者id进行查询
	 * @param attention
	 * @return
	 */
    public Attention getAttentionBeuserid(Attention attention) {
    	return attentionMapper.getAttentionBeuserid(attention);
    }
}
