package com.liang.controller;

import com.liang.bean.User;
import com.liang.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.liang.bean.Attention;
import com.liang.service.AttentionService;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/attentionController")
@Controller
public class AttentionController {

	@Autowired
	AttentionService attentionService;
	@Autowired
	UserService userService;
	
	/**
	 * 添加关注
	 * @return
	 */
	@RequestMapping("/setAttention")
	@ResponseBody
	public Map setAttention(Attention attention) {
		Map<Object, Object> map = new HashMap<>();
		try {
			//新增关注
			attentionService.setAttention(attention);
			map.put("resultCode",200);
		}catch (Exception e){
			map.put("resultCode",404);
		}

		return map;
	}
	
	
	/**
	 * 取消关注（首页）
	 * @param attention
	 * @return
	 */
	@RequestMapping("/deleteAttention")
	@ResponseBody
	public Map deleteAttention(Attention attention) {

		Map<Object, Object> map = new HashMap<>();
		try {
			attentionService.deleteAttention(attention);
			map.put("resultCode",200);
		}catch (Exception e){
			map.put("resultCode",404);
		}

		return map;
	}
	
	/**
	 * 取消关注（个人主页）
	 * @param attention
	 * @return
	 */
	@RequestMapping("/deleteAttentionMyself")
	@ResponseBody
	public Map deleteAttentionMyself(Attention attention, HttpSession session) {
		int userid=(int) session.getAttribute("userid");
		Map<Object,Object> map = new HashMap<>();
		try {
			//取消关注
			attentionService.deleteAttentionMyself(attention);

			//按userid查询关注信息（你关注了谁）
			List<Attention> attentions = attentionService.getAttention(userid);
			List<User> myListUserAttention = new ArrayList<User>();
			for(Attention attention2 : attentions) {
				//通过beuserid查询用户信息
				int beuserid=attention2.getBeuserid();
				myListUserAttention.add(userService.getUserKey(beuserid));
			}
			map.put("myListAttentions", myListUserAttention);
			map.put("resultCode",200);
		}catch (Exception e){
			map.put("resultCode",404);
		}

		return map;
	}

	/**
	 * 按关注者id和被关注者id进行查询
	 * @param beuserid 被关注者id
	 * @param session
	 * @return
	 */
	@RequestMapping("/getAttentionBeuserid/{beuserid}")
	@ResponseBody
	public Map getAttentionBeuserid(@PathVariable int beuserid, HttpSession session){
		Map<Object, Object> map = new HashMap<>();
		Attention attention = new Attention();
		attention.setBeuserid(beuserid);
		attention.setUserid((int) session.getAttribute("userid"));
		map.put("attention",attentionService.getAttentionBeuserid(attention));
		return map;
	}
	
}
