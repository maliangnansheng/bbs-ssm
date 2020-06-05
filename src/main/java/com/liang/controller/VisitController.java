package com.liang.controller;

import java.util.HashMap;
import java.util.Map;

import com.liang.code.ReturnT;
import com.liang.utils.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;

import com.liang.bean.Visit;
import com.liang.service.VisitService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

@RequestMapping("/api/rest/nanshengbbs/v3.0/visit")
@SessionAttributes(value = "sessionIp")
@Controller
public class VisitController {
	@Autowired
	VisitService visitService;
	@Autowired
	IpUtil ipUtil;
	@Autowired
	PageUtil pageUtil;

	// 管理系统-访问记录追加条数（出第一页外）
	private int adminVisitDefaultPageSize;

	@PostConstruct
	private void init(){
		adminVisitDefaultPageSize = pageUtil.getAdminVisitDefaultPageSize();
	}

	/**
	 * 新增访问信息
	 * @param request
	 */
	@PostMapping("/setVisit")
	@ResponseBody
	public ReturnT<?> setVisit(HttpServletRequest request, Model model) {
		try {
			// 判断一个session内是否已经记录过该ip
			if (!model.containsAttribute("sessionIp")) {
				// 解析ip
				Visit visit = ipUtil.getVisit(ipUtil.getIP(request), ipUtil.getOS(request));
				// 将访问信息添加到数据库
				visit.setVisitid(UUIDUtil.getRandomUUID());
				visitService.setVisit(visit);
				model.addAttribute("sessionIp", "placeholder");
			}
			return ReturnT.success("记录访问信息成功");
		} catch (Exception e) {
			e.printStackTrace();
			return ReturnT.fail("记录访问信息失败");
		}
	}

	/**
	 * 查询访问信息（分页）
	 * @param pageStart
	 * @return
	 */
	@GetMapping("/getVisit")
	@ResponseBody
	public ReturnT<?> getVisit(@RequestParam(required=true,defaultValue="1") int pageStart) {
		Map<String, Object> map = new HashMap<>();
		try {
			// 尾页
			int tail = 1;
			map.put("listVisit", visitService.getVisit(pageStart, adminVisitDefaultPageSize));
			// 总访问数
			int total = visitService.getCount();
			map.put("total", total);
			// 月访问量
			map.put("month", visitService.getMonthCount());
			// 周访问量
			map.put("week", visitService.getWeekCount());
			// 日访问量
			map.put("day", visitService.getDayCount());
			map.put("pageStart", pageStart);
			map.put("pageSize", adminVisitDefaultPageSize);

			if (total % adminVisitDefaultPageSize == 0){
				tail = total / adminVisitDefaultPageSize;
				map.put("tail",tail);
			} else {
				tail = (total / adminVisitDefaultPageSize) +1;
				map.put("tail",tail);
			}
			return new ReturnT<>(HttpStatus.OK, "获取访问数据成功", map);
		} catch (Exception e) {
			e.printStackTrace();
			return ReturnT.fail("获取访问数据失败");
		}
	}

	/**
	 * 统计访问信息
	 * @return
	 */
	@GetMapping("/getStatVisit")
	@ResponseBody
	public ReturnT<?> getStatVisit() {
		Map<String, Object> map = new HashMap<>();
		try {
			// 统计访问信息-国家
			map.put("visitCountryCount",visitService.visitCountryStatistic());
			// 统计访问信息-中国省份
			map.put("visitProvinceCount",visitService.visitProvinceStatistic());
			return new ReturnT<>(HttpStatus.OK, "获取访问统计数据成功", map);
		} catch (Exception e) {
			e.printStackTrace();
			return ReturnT.fail("获取访问统计数据失败");
		}
	}

	/**
	 * 获取最近n天的访问数据
	 * @param n 天数
	 * @return
	 */
	@GetMapping("/getVisitRecordDay/{n}")
	@ResponseBody
	public ReturnT<?> getVisitRecordDay(@PathVariable int n) {
		try {
			return new ReturnT<>(HttpStatus.OK, "获取访问统计数据成功", visitService.getVisitRecordDay(n));
		} catch (Exception e) {
			e.printStackTrace();
			return ReturnT.fail("获取访问统计数据失败");
		}
	}
}