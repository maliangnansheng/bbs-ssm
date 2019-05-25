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

@Controller
@RequestMapping("/visitController")
public class VisitController {

	@Autowired
	VisitService visitService;

	/**
	 * 查询访问信息（分页）
	 * @param map
	 * @param pageStart
	 * @param pageSize
	 * @return
	 */
	@RequestMapping("/getVisit")
	@ResponseBody
	public Map getVisit(Map<Object, Object> map, @RequestParam(required=true,defaultValue="1") int pageStart, @RequestParam(required=true,defaultValue="15")int pageSize) {
		Map<Object, Object> map2 = new HashMap<>();
		int tail = 1;
		List<Visit> listVisits=visitService.getVisit(pageStart, pageSize);
		// 总访问数
		int total = visitService.getCount();
		map.put("visit_total",total);
		map2.put("visit_total",total);
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
