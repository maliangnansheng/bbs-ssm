package com.liang.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.liang.bean.Admin;
import com.liang.bean.User;
import com.liang.dao.AdminMapper;

@Service
public class AdminService {

	@Autowired
	AdminMapper adminMapper;

	/**
	 * 管理员登录查询
	 * 
	 * @param admin
	 * @return
	 */
	public List<Admin> getAdmin(Admin admin) {

		return adminMapper.selectByAdmin(admin);
	}
	
	/**
	 * 管理员注册按姓名查询
	 * 
	 * @param admin
	 * @return
	 */
	public List<Admin> getAdminName(Admin admin) {

		return adminMapper.selectByAdminName(admin);
	}

	/**
	 * 管理员注册插入
	 * @param admin
	 */
	public void setAdmin(Admin admin) {

		adminMapper.insert(admin);
	}

}
