package com.liang.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.liang.bean.Visit;
import com.liang.dao.VisitMapper;

@Service
public class VisitService {
	
	@Autowired
	VisitMapper visitMapper;
	
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
		map.put("offset",(pageStart-1)*pageSize);
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
}
