package com.liang.dao;

import com.liang.bean.User;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface UserMapper {

    //删除用户
    int deleteByPrimaryKey(Integer userid);

    int insert(User record);

    int insertSelective(User record);

    //登录查询（按姓名和密码）
    List<User> selectByUser(User user);
    
    //注册按用户名查询
    List<User> selectByUserName(User user);
    
    //查询用户信息（分页）
    List<User> selectByUserAll(Map map);
    
    //按userid查询用户
    List<User> selectByUserId(int userid);
    
    //按userid查询用户
    User selectByPrimaryKey(Integer userid);

    int updateByPrimaryKeySelective(User record);
    
    //编辑个人资料（修改user表）
    int updateByPrimaryKey(User record);
    
    //基本设置信息的修改（修改user表）
    int updateSetupByPrimaryKey(User record);

    //查询用户总数
    int selectCount();
}