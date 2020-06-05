package com.liang.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.liang.utils.PageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.liang.bean.Visit;
import com.liang.dao.VisitMapper;

import javax.annotation.PostConstruct;

@Service
public class VisitService {
	@Autowired
	VisitMapper visitMapper;
	@Autowired
	PageUtil pageUtil;

	// 管理系统-访问记录初始条数（第一页）
	private int adminVisitPageSize;

	@PostConstruct
	private void init(){
		adminVisitPageSize = pageUtil.getAdminVisitPageSize();
	}
	
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
		Map<String, Object> map = new HashMap<>();
		if (pageStart == 1) {
			map.put("offset",(pageStart-1)*pageSize);
		} else {
			map.put("offset",(pageStart-2)*pageSize + adminVisitPageSize);
		}
		map.put("limit",pageSize);
		return visitMapper.selectVisitPaging(map);
	}

	/**
	 * 统计-国家
	 * @return
	 */
	public List<Visit> visitCountryStatistic() {

		return visitMapper.selectVisitCountryStatistic();
	}

	/**
	 * 统计-中国省份
	 * @return
	 */
	public List<Visit> visitProvinceStatistic() {
		List<Visit> visitList = visitMapper.selectVisitProvinceStatistic();
		for (int i=0;i<visitList.size();i++){
			String province = visitList.get(i).getVisitprovince();
			if (province.endsWith("移动") || province.endsWith("联通") || province.endsWith("电信")){
				visitList.remove(i);
			} else if (province.endsWith("省") || province.endsWith("自治区") || province.endsWith("市")) {
				visitList.remove(i);
			}
		}
		return visitList;
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
		return visitMapper.selectMonthCount();
	}

	/**
	 * 周总访量
	 * @return
	 */
	public int getWeekCount() {
		return visitMapper.selectWeekCount();
	}

	/**
	 * 日总访量
	 * @return
	 */
	public int getDayCount() {
		return visitMapper.selectDayCount();
	}

	/**
	 * 获取最近n天的访问数据
	 * @param n 天数
	 * @return
	 */
    public List<Visit> getVisitRecordDay(Integer n) {
		return visitMapper.selectVisitRecordDay(n);
    }
}
