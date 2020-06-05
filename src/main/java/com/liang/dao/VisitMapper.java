package com.liang.dao;

import com.liang.bean.Visit;
import java.util.List;
import java.util.Map;

public interface VisitMapper {

	// 新增访问信息
    void insert(Visit visit);

    // 查询所有访问信息（分页）
    List<Visit> selectVisitPaging(Map<String, Object> map);

    // 统计-国家
    List<Visit> selectVisitCountryStatistic();

    // 统计-这个省份
    List<Visit> selectVisitProvinceStatistic();

    // 获取最近n天的访问数据
    List<Visit> selectVisitRecordDay(Integer n);

    // 总访问数
    int selectCount();

    // 月总访量
    int selectMonthCount();

    // 周总访量
    int selectWeekCount();

    // 日总访量
    int selectDayCount();
}