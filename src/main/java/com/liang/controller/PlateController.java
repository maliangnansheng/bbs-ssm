package com.liang.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.liang.bean.Plate;
import com.liang.service.PlateService;

@Controller
@RequestMapping("/plateController")
/*
 * 通过给Controller类添加@SessionAttributes注解，该注解的name和value属性值都是Model的key值，
 * 意思是指Model中这些key对应的数据也会存到HttpSession，不仅仅存到HttpServletRequest对象中！
 * 这样页面可以共享HttpSession中存的数据了！
 */
@SessionAttributes(value={"plate","plateEdit"}, types={String.class})
public class PlateController {

	@Autowired
	PlateService plateService;
	
	/**
	 * 查询板块信息（无条件）
	 * @param map
	 */
	@RequestMapping("/getPlate")
	@ResponseBody
	public Map getPlate(Map<Object, Object> map) {
		Map<Object, Object> map2 = new HashMap<>();
		List<Plate> plate=plateService.getPlate();
		// 总板块数
		int total = plateService.getCount();
		map.put("plate", plate);
		map2.put("plate", plate);
		map.put("plate_total", total);
		map2.put("plate_total", total);

		return map2;
	}

	/**
	 * 查询板块信息（无条件）
	 */
	@RequestMapping("/getPlate2")
	@ResponseBody
	public Map getPlate() {
		Map<Object,Object> map = new HashMap<>();
		try {
			map.put("resultCode",200);
			List<Plate> plate=plateService.getPlate();
			map.put("plate",plate);
		} catch (Exception e){
			map.put("resultCode",404);
		}

		return map;
	}

	/**
	 * 添加板块信息
	 * @param request
	 * @return
	 */
	@RequestMapping("/setPlate")
	@ResponseBody
	public Map setPlate(HttpServletRequest request) {
		Map<Object, Object> map = new HashMap<>();
		try {
			Plate plate_add=new Plate();
			//不知为何，Plate plate_add获取的值永远不是提交过来的结果，所以使用request.getParameter("bname")来获取
			plate_add.setBname(request.getParameter("bname"));
			if(plateService.getPlateName(plate_add).toString().equals("[]")) {
				plateService.setPlate(plate_add);
				System.out.println("添加板块成功");
				map.put("resultCode",200);
			}else {
				System.err.println("添加板块失败");
				map.put("resultCode",201);
			}
		} catch (Exception e){
			map.put("resultCode",404);
		}
		return map;
	}
	
//	/**
//	 * 获取content.jsp页面传来的数据，并将其保存在map("plateEdit")中，以便plateEdit.jsp页面使用
//	 * @param request
//	 * @param map
//	 * @return
//	 */
//	@RequestMapping("/getUpdatePlate")
//	public String getUpdatePlate(HttpServletRequest request,Map<Object, Object> map) {
//
//		Plate plate=new Plate();
//		plate.setBid(Integer.parseInt(request.getParameter("bid")));
//		plate.setBname(request.getParameter("bname"));
//		map.put("plateEdit", plate);
//		return "redirect:/admin/plateEdit.jsp";
//	}

	/**
	 * 修改板块
	 * @param request
	 * @return
	 */
	@RequestMapping("/updatePlate")
	@ResponseBody
	public Map updatePlate(HttpServletRequest request) {
		Map<Object,Object> map = new HashMap<>();
		try {
			Plate plate=new Plate();
			plate.setBid(Integer.parseInt(request.getParameter("bid")));
			plate.setBname(request.getParameter("bname"));
			if(plateService.getPlateName(plate).toString().equals("[]")) {
				plateService.updatePlate(plate);
				map.put("resultCode",200);
			}else {
				map.put("resultCode",201);
			}
		} catch (Exception e){
			map.put("resultCode",404);
		}

		return map;
	}


	/**
	 * 按bid删除板块信息
	 * @param bid
	 * @return
	 */
	@RequestMapping("/deletePlate/{bid}")
	@ResponseBody
	public Map deletePlate(@PathVariable int bid) {
		Map<Object,Object> map = new HashMap<>();
		try {
			Plate plate_delete=new Plate();
			plate_delete.setBid(bid);
			plateService.deletePlate(plate_delete);
			map.put("resultCode",200);
		} catch (Exception e){
			map.put("resultCode",404);
		}
		
		return map;
	}
	
	
	
}
