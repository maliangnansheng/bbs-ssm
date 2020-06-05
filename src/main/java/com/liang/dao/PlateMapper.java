package com.liang.dao;

import com.liang.bean.Plate;
import java.util.List;

public interface PlateMapper {

    // 新增板块
    void insert(Plate record);

    // 按bid删除板块信息
    void deleteByKey(String bid);

    // 修改板块
    void updateByKey(Plate record);

    // 查询板块的所有信息
    List<Plate> selectPlate();
    
    // 按板块名查询
    List<Plate> selectPlateByName(Plate plate);

    // 按板块ID查询板块信息
    Plate selectPlateByKey(String bid);

    // 总板块数
    int selectCount();
}