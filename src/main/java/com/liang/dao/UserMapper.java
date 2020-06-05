package com.liang.dao;

import com.liang.bean.User;
import com.liang.bean.impl.UserImpl;

import java.util.List;
import java.util.Map;

public interface UserMapper {

    // 新增用户信息
    void insert(User record);

    // 删除用户信息
    void deleteByKey(String userid);

    // 编辑用户信息
    void updateByKey(User record);

    // 修改用户名
    void updateNameByKey(User user);

    // 修改密码
    void updatePasswordByKey(User user);

    // 修改Email
    void updateEmailByKey(User user);

    // 按姓名（Email）和密码查询用户信息
    UserImpl selectUserImplByNEP(User user);

    // 按用户名查询用户信息
    User selectUserByName(String name);

    // 按Email查询用户信息
    User selectUserByEmail(String name);
    
    // 查询用户信息（分页）
    List<UserImpl> selectUserImplPaging(Map<String, Object> map);
    
    // 按userid查询用户信息
    User selectUserByKey(String userid);

    // 按userid和密码查询用户信息
    User selectUserByUP(User user);

    // 按文章数获取用户排名
    List<UserImpl> selectUserImplRankByArticleSum();

    // 获取新注册用户信息
    List<UserImpl> selectNewUserImpl();

    // 按userid查询关注信息
    List<UserImpl> selectUserImplByKey(Map<String, Object> map);

    // 查询用户总数
    int selectCount();
}