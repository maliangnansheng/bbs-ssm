package com.liang.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.liang.bean.Admin;
import com.liang.service.AdminService;

@Controller
@RequestMapping("adminController")
@SessionAttributes(value="adminList")
public class AdminController {

	@Autowired
	AdminService adminService;
	@Autowired
	PlateController plateController;
	@Autowired
	UserController userController;
	
	List<Admin> list=new ArrayList<>();
	
	/**
	 * 管理员登录判断
	 * @param admin
	 * @param map
	 * @return
	 */
	@RequestMapping("getLogin")
	public String getLogin(Admin admin, Map<Object, Object> map) {

		//调用管理员查询方法
		list=adminService.getAdmin(admin);
		String str=list.toString();
		
		if (!str.equals("[]")) {
			map.put("adminList", list.get(0));
			return "redirect:/admin/index.jsp";//重定向 
		} else {

			return "redirect:/admin/index.jsp";//重定向 
		}
	}
	
	/**
	 * 管理员注册
	 * @param admin
	 * @param map
	 * @return
	 */
	@RequestMapping("/setSignUp")
	public String setSignUp(Admin admin, Map<Object, Object> map) {
		
		if(adminService.getAdminName(admin).toString().equals("[]")) {
			
			//调用管理员插入方法
			adminService.setAdmin(admin);
			
			//调用管理员查询方法（获取刚刚注册的管理员信息）
			list=adminService.getAdmin(admin);
			
			map.put("adminList", list.get(0));
			
			System.out.println("管理员注册成功");
			
			return "admin";
		}else {
			
			System.err.println("管理员注册失败");
			return "redirect:/admin/index.jsp";//重定向 
		}
			
	}
	
	/**
	 * 退出管理员登录
	 * 
	 * @param map
	 * @return
	 */
	@RequestMapping("/adminExit")
	public String adminExit(Map<Object, Object> map) {

		map.put("adminList", "");
		return "redirect:/admin/index.jsp";// 重定向
	}
	
	
	
	
}
