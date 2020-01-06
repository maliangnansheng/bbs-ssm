package com.liang.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.liang.bean.Visit;
import com.liang.service.VisitService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/visitController")
public class VisitController {

	@Autowired
	VisitService visitService;

	// 管理系统-访问记录追加条数（出第一页外）
	private static final String adminVisitDefaultPageSize = "15";

	/**
	 * 查询访问信息（分页）
	 * @param map
	 * @param pageStart
	 * @param pageSize
	 * @return
	 */
	@RequestMapping("/getVisit")
	@ResponseBody
	public Map getVisit(Map<Object, Object> map, @RequestParam(required=true,defaultValue="1") int pageStart, @RequestParam(required=true,defaultValue=adminVisitDefaultPageSize)int pageSize) {
		Map<Object, Object> map2 = new HashMap<>();
		int tail = 1;
		List<Visit> listVisits=visitService.getVisit(pageStart, pageSize);
		// 总访问数
		int total = visitService.getCount();
		// 月访问量
		int month_Count = visitService.getMonthCount();
		// 周访问量
		int week_Count = visitService.getWeekCount();
		// 日访问量
		int day_Count = visitService.getDayCount();
		map.put("visit_total",total);
		map2.put("visit_total",total);
		map.put("visit_month",month_Count);
		map2.put("visit_month",month_Count);
		map.put("visit_week",week_Count);
		map2.put("visit_week",week_Count);
		map.put("visit_day",day_Count);
		map2.put("visit_day",day_Count);
		map.put("visit_pageStart", pageStart);
		map2.put("visit_pageStart", pageStart);
		map.put("visit_pageSize", pageSize);
		map2.put("visit_pageSize", pageSize);
		map.put("listVisits", listVisits);
		map2.put("listVisits", listVisits);
		if (total % pageSize == 0){
			tail = total / pageSize;
			map.put("visit_tail",tail);
			map2.put("visit_tail",tail);
		} else {
			tail = (total / pageSize) +1;
			map.put("visit_tail",tail);
			map2.put("visit_tail",tail);
		}
		return map2;
	}

}