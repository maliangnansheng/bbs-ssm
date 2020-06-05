package com.liang.controller;

import com.liang.code.ReturnT;
import com.liang.service.UserService;
import com.liang.utils.UUIDUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.liang.bean.Attention;
import com.liang.service.AttentionService;

import javax.servlet.http.HttpSession;

@RequestMapping("/api/rest/nanshengbbs/v3.0/attention")
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
	@PostMapping("/setAttention")
	@ResponseBody
	public ReturnT<?> setAttention(Attention attention) {
		try {
			//新增关注
			attention.setGid(UUIDUtil.getRandomUUID());
			attentionService.setAttention(attention);
			return ReturnT.success("关注成功");
		} catch (Exception e) {
			e.printStackTrace();
			return ReturnT.fail("关注失败");
		}
	}

	/**
	 * 取消关注（按gid）
	 * @param gid
	 * @return
	 */
	@DeleteMapping("/deleteAttention/{gid}")
	@ResponseBody
	public ReturnT<?> deleteAttention(@PathVariable String gid) {
		try {
			attentionService.deleteAttention(gid);
			return ReturnT.success("取关成功");
		} catch (Exception e) {
			e.printStackTrace();
			return ReturnT.fail("取关失败");
		}
	}

	/**
	 * 取消关注（按beuserid和userid）
	 * @param beuserid
	 * @return
	 */
	@DeleteMapping("/deleteByUserid/{beuserid}")
	@ResponseBody
	public ReturnT<?> deleteByUserid(@PathVariable String beuserid, HttpSession session) {
		try {
			Attention attention = new Attention();
			attention.setBeuserid(beuserid);
			attention.setUserid((String) session.getAttribute("userid"));
			//取消关注
			attentionService.deleteByUserid(attention);
			return ReturnT.success("取关成功");
		} catch (Exception e) {
			e.printStackTrace();
			return ReturnT.fail("取关失败");
		}
	}
}
