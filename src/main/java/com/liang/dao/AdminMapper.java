package com.liang.dao;

import com.liang.bean.Admin;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface AdminMapper {

    int deleteByPrimaryKey(Integer aid);

    //管理员注册按姓名查询
    int insert(Admin record);

    int insertSelective(Admin record);

    //管理员登录查询
    List<Admin> selectByAdmin(Admin admin);
    
    //管理员注册按姓名查询
    List<Admin> selectByAdminName(Admin admin);
    
    Admin selectByPrimaryKey(Integer aid);

    int updateByPrimaryKeySelective(Admin record);

    int updateByPrimaryKey(Admin record);
}