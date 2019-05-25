package com.liang.dao;

import com.liang.bean.Visit;
import java.util.List;
import java.util.Map;

public interface VisitMapper {

	//新增访问信息
    int insert(Visit visit);

    //查询所有访问信息（分页）
    List<Visit> selectByVisit(Map map);

    //统计-国家
    List<Visit> visitCountryStatistic();

    //统计-这个省份
    List<Visit> visitProvinceStatistic();

    //总访问数
    int selectCount();
}