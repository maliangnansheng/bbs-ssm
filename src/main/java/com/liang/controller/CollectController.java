package com.liang.controller;

import com.liang.bean.Article;
import com.liang.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.liang.bean.Collect;
import com.liang.service.CollectService;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/collectController")
@Controller
public class CollectController {

	@Autowired
	CollectService collectService;
	@Autowired
	ArticleService articleService;
	
	
	/**
	 * 删除收藏（按sid）
	 * @param collect
	 * @return
	 */
	@RequestMapping("/deleteCollect")
	@ResponseBody
	public Map deleteCollect(Collect collect) {
		Map<Object, Object> map = new HashMap<>();
		try {
			collectService.deleteCollect(collect);
			map.put("resultCode",200);
		}catch (Exception e){
			map.put("resultCode",404);
		}

		return map;
	}
	
	/**
	 * 删除收藏（按userid和fid）
	 * @param collect
	 * @return
	 */
	@RequestMapping("/deleteCollectUseridAndFid")
	@ResponseBody
	public Map deleteCollectUseridAndFid(Collect collect, HttpSession session) {
		int userid=(int) session.getAttribute("userid");
		Map<Object,Object> map = new HashMap<>();
		try {
			//取消收藏
			collectService.deleteCollectUseridAndFid(collect);

			//按userid查询收藏信息（收藏了哪些帖子）
			List<Collect> collects = collectService.getCollect(userid);
			List<Article> myListArticleCollect = new ArrayList<Article>();
			for(Collect collect2 : collects) {
				//通过fid查询帖子信息
				int fid=collect2.getFid();
				myListArticleCollect.add(articleService.getArticleKey(fid));
			}
			map.put("myListCollects", myListArticleCollect);
			map.put("resultCode",200);
		} catch (Exception e){
			map.put("resultCode",404);
		}

		return map;
	}
	
	/**
	 * 添加收藏
	 * @param collect
	 * @return
	 */
	@RequestMapping("/setCollect")
	@ResponseBody
	public Map setCollect(Collect collect) {
		Map<Object, Object> map = new HashMap<>();
		try {
			collectService.setCollect(collect);
			map.put("resultCode",200);
		}catch (Exception e){
			map.put("resultCode",404);
		}

		return map;
	}

	/**
	 * 按收藏者id和被收藏帖子id进行查询
	 * @param fid
	 * @param session
	 * @return
	 */
	@RequestMapping("/getCollectFid/{fid}")
	@ResponseBody
	public Map getCollectFid(@PathVariable int fid, HttpSession session){
		Map<Object, Object> map = new HashMap<>();
		Collect collect = new Collect();
		collect.setFid(fid);
		collect.setUserid((int) session.getAttribute("userid"));
		map.put("collect",collectService.getCollectFid(collect));
		return map;
	}
}
