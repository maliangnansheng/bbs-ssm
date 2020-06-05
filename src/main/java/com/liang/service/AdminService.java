package com.liang.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.liang.bean.Admin;
import com.liang.dao.AdminMapper;

@Service
public class AdminService {

	@Autowired
	AdminMapper adminMapper;

	/**
	 * 管理员登录查询
	 * @param admin
	 * @return
	 */
	public Admin getAdmin(Admin admin) {

		return adminMapper.selectByAdmin(admin);
	}
}
