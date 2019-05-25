package com.liang.dao;

import com.liang.bean.Plate;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface PlateMapper {

    //按bid删除板块信息
    int deleteByPrimaryKey(Integer bid);

    int insert(Plate record);

    int insertSelective(Plate record);

    Plate selectByPrimaryKey(Integer bid);
    
    //查询板块的所有信息
    List<Plate> selectAll();
    
    //按板块名查询
    List<Plate> selectByAdminName(Plate plate);

    int updateByPrimaryKeySelective(Plate record);

    //修改板块
    int updateByPrimaryKey(Plate record);

    //总板块数
    int selectCount();
}