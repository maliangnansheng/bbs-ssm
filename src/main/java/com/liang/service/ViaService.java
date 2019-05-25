package com.liang.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.liang.bean.User;
import com.liang.bean.Via;
import com.liang.dao.ViaMapper;

@Service
public class ViaService {

	@Autowired
	ViaMapper viaMapper;

	/**
	 * 按userid查询用户头像信息（via）
	 * @param userid
	 * @return
	 */
	public Via getVia(int userid) {

		return viaMapper.selectByPrimaryKey(userid);
	}

	/**
	 * 上传用户头像（插入）（via）
	 * 
	 * @param via
	 */
	public void setUserPhoto(Via via) {

		viaMapper.insert(via);
	}

	/**
	 * 按userid修改用户头像信息（via）
	 * @param via
	 */
	public void updateVia(Via via) {
		
		viaMapper.updateByPrimaryKey(via);
	}

	/**
	 * 删除用户对应的头像信息
	 * @param userid
	 */
	public void deleteVia(Integer userid) {
		
		viaMapper.deleteByPrimaryKey(userid);
	}

}
