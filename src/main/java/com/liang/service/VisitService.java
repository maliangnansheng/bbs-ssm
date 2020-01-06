package com.liang.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.liang.utils.PageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.liang.bean.Visit;
import com.liang.dao.VisitMapper;

@Service
public class VisitService {
	
	@Autowired
	VisitMapper visitMapper;

	// 管理系统-访问记录初始条数（第一页）
	private static final int adminVisitPageSize = PageUtil.getAdminVisitPageSize();
	
	public void setVisit(Visit visit) {

		visitMapper.insert(visit);
	}

	/**
	 * 查询访问信息（分页）
	 * @param pageStart
	 * @param pageSize
	 * @return
	 */
	public List<Visit> getVisit(int pageStart, int pageSize) {
		Map<Object,Object> map = new HashMap<>();
		if (pageStart == 1) {
			map.put("offset",(pageStart-1)*pageSize);
		} else {
			map.put("offset",(pageStart-2)*pageSize + adminVisitPageSize);
		}
		map.put("limit",pageSize);
		return visitMapper.selectByVisit(map);
	}

	/**
	 * 统计-国家
	 * @param map
	 * @return
	 */
	public Map visitCountryStatistic(Map map) {
		List<Visit> listVisits = visitMapper.visitCountryStatistic();
		map.put("visitCountryCount",listVisits);
		return map;
	}

	/**
	 * 统计-中国省份
	 * @param map
	 * @return
	 */
	public Map visitProvinceStatistic(Map map) {
		List<Visit> listVisits = visitMapper.visitProvinceStatistic();
		for (int i=0;i<listVisits.size();i++){
			String province = listVisits.get(i).getVisitprovince();
			if (province.endsWith("移动") || province.endsWith("联通") || province.endsWith("电信")){
				listVisits.remove(i);
			} else if (province.endsWith("省") || province.endsWith("自治区") || province.endsWith("市")) {
				listVisits.remove(i);
			}
		}
		map.put("visitProvinceCount",listVisits);
		return map;
	}

	/**
	 * 总访问数
	 * @return
	 */
    public int getCount() {
		return visitMapper.selectCount();
    }


	/**
	 * 月总访量
	 * @return
	 */
	public int getMonthCount() {
		return visitMapper.getMonthCount();
	}

	/**
	 * 周总访量
	 * @return
	 */
	public int getWeekCount() {
		return visitMapper.getWeekCount();
	}

	/**
	 * 日总访量
	 * @return
	 */
	public int getDayCount() {
		return visitMapper.getDayCount();
	}
}
