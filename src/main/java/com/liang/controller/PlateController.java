package com.liang.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.liang.code.ReturnT;
import com.liang.utils.UUIDUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.liang.bean.Plate;
import com.liang.service.PlateService;

@Controller
@RequestMapping("/api/rest/nanshengbbs/v3.0/plate")
@SessionAttributes(value={"plate","plateEdit"}, types={String.class})
public class PlateController {
	@Autowired
	PlateService plateService;

	/**
	 * 添加板块信息
	 * @param request
	 * @return
	 */
	@PostMapping("/setPlate")
	@ResponseBody
	public ReturnT<?> setPlate(HttpServletRequest request) {
		try {
			Plate plate_add=new Plate();
			//不知为何，Plate plate_add获取的值永远不是提交过来的结果，所以使用request.getParameter("bname")来获取
			plate_add.setBname(request.getParameter("bname"));
			if (plateService.getPlateName(plate_add).size() == 0) {	// 该版块名不存在
				plate_add.setBid(UUIDUtil.getRandomUUID());
				plateService.setPlate(plate_add);
				return ReturnT.success("添加板块成功");
			} else {
				return ReturnT.fail(HttpStatus.NOT_FOUND, "该板块已存在!");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ReturnT.fail("添加板块失败");
		}
	}

	/**
	 * 按bid删除板块信息
	 * @param bid
	 * @return
	 */
	@DeleteMapping("/deletePlate/{bid}")
	@ResponseBody
	public ReturnT<?> deletePlate(@PathVariable String bid) {
		try {
			Plate plate_delete=new Plate();
			plate_delete.setBid(bid);
			plateService.deletePlate(plate_delete);
			return ReturnT.success("删除板块成功");
		} catch (Exception e) {
			e.printStackTrace();
			return ReturnT.fail("删除板块失败");
		}
	}

	/**
	 * 修改板块
	 * @param request
	 * @return
	 */
	@PutMapping("/updatePlate")
	@ResponseBody
	public ReturnT<?> updatePlate(HttpServletRequest request) {
		try {
			Plate plate=new Plate();
			plate.setBid(request.getParameter("bid"));
			plate.setBname(request.getParameter("bname"));
			if(plateService.getPlateName(plate).size() == 0) {	// 该版块名不存在
				plateService.updatePlate(plate);
				return ReturnT.success("修改板块成功");
			}else {
				return ReturnT.fail(HttpStatus.NOT_FOUND, "该板块已存在!");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ReturnT.fail("修改板块失败");
		}
	}

	/**
	 * 查询板块信息（无条件）
	 */
	@GetMapping("/getPlate")
	@ResponseBody
	public ReturnT<?> getPlate() {
		Map<String, Object> map = new HashMap<>();
		try {
			map.put("plate",plateService.getPlate());
			// 总板块数
			map.put("total", plateService.getCount());
			return new ReturnT<>(HttpStatus.OK, "获取板块数据成功", map);
		} catch (Exception e) {
			e.printStackTrace();
			return ReturnT.fail("获取板块数据失败");
		}
	}
}
