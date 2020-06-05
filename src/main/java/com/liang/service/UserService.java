package com.liang.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.liang.bean.impl.UserImpl;
import com.liang.utils.PageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.liang.bean.User;
import com.liang.dao.UserMapper;

import javax.annotation.PostConstruct;

@Service
public class UserService {

	@Autowired
	UserMapper userMapper;
	@Autowired
	PageUtil pageUtil;

	// 管理系统-用户初始条数（第一页）
	private int adminUserPageSize;

	@PostConstruct
	private void init(){
		adminUserPageSize = pageUtil.getAdminUserPageSize();
	}

	/**
	 * 插入用户信息
	 * @param user
	 */
	public void setUser(User user) {

		userMapper.insert(user);
	}

	/**
	 * 删除用户
	 * @param userid
	 */
	public void deleteUser(String userid) {

		userMapper.deleteByKey(userid);
	}

	/**
	 * 编辑个人资料（修改user表）
	 * @param user
	 */
	public void updateUser(User user) {

		userMapper.updateByKey(user);
	}

	/**
	 * 修改用户名
	 * @param user
	 */
	public void updateUsername(User user) {

		userMapper.updateNameByKey(user);
	}

	/**
	 * 修改密码
	 * @param user
	 */
	public void updatePassword(User user) {

		userMapper.updatePasswordByKey(user);
	}

	/**
	 * 修改Email
	 * @param user
	 */
	public void updateEmail(User user) {

		userMapper.updateEmailByKey(user);
	}

	/**
	 * 按姓名和密码或者Email和密码查询用户信息
	 * @param user
	 * @return
	 */
	public UserImpl getNameEmailPass(User user) {

		return userMapper.selectUserImplByNEP(user);
	}

	/**
	 * 按用户id和密码查询
	 * @param user
	 * @return
	 */
	public User getIdPass(User user) {

		return userMapper.selectUserByUP(user);
	}

	/**
	 * 按用户名查询
	 * @param name
	 * @return
	 */
	public User getUserName(String name) {

		return userMapper.selectUserByName(name);
	}

	/**
	 * 按Email查询
	 * @param email
	 * @return
	 */
	public User getEmail(String email) {

		return userMapper.selectUserByEmail(email);
	}

	/**
	 * 查询用户信息（分页）
	 * @param pageStart
	 * @param pageSize
	 * @return
	 */
	public List<UserImpl> getUserImplPaging(int pageStart, int pageSize) {
		Map<String, Object> map = new HashMap<>();
		if (pageStart == 1) {
			map.put("offset",(pageStart-1)*pageSize);
		} else {
			map.put("offset",(pageStart-2)*pageSize + adminUserPageSize);
		}
		map.put("limit",pageSize);
		return userMapper.selectUserImplPaging(map);
	}

	/**
	 * 查询用户总数
	 * @return
	 */
	public int getCount() {
		return userMapper.selectCount();
	}

	/**
	 * 按userid查询用户信息
	 * @param userid
	 * @return
	 */
	public User getUserKey(String userid) {
		
		return userMapper.selectUserByKey(userid);
	}

	/**
	 * 获取用户排名（按文章数）
	 * @return
	 */
    public List<UserImpl> getUserRankByArticleSum() {

    	return userMapper.selectUserImplRankByArticleSum();
    }

	/**
	 * 获取新注册用户
	 * @return
	 */
	public List<UserImpl> getNewUser() {

		return userMapper.selectNewUserImpl();
    }

	/**
	 * 按userid查询关注信息
	 * @param userid
	 * @param b （true:你关注了谁/false:谁关注了你）
	 * @return
	 */
    public List<UserImpl> getUserImpl(String userid, boolean b) {
    	Map<String, Object> map = new HashMap<>();
    	map.put("userid", userid);
    	map.put("b", b);
    	return userMapper.selectUserImplByKey(map);
    }
}
