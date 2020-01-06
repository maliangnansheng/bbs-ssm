package com.liang.controller;

import com.liang.bean.Article;
import com.liang.bean.Enjoy;
import com.liang.service.ArticleService;
import com.liang.service.EnjoyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/enjoyController")
@Controller
public class EnjoyController {

	@Autowired
	EnjoyService enjoyService;
	@Autowired
	ArticleService articleService;
	
	
	/**
	 * 删除点赞（按eid）
	 * @param enjoy
	 * @return
	 */
	@RequestMapping("/deleteEnjoy")
	@ResponseBody
	public Map deleteEnjoy(Enjoy enjoy) {
		Map<Object, Object> map = new HashMap<>();
		try {
			enjoyService.deleteEnjoy(enjoy);
			map.put("resultCode",200);
		}catch (Exception e){
			map.put("resultCode",404);
		}

		return map;
	}
	
	/**
	 * 删除点赞（按userid和fid）
	 * @param enjoy
	 * @return
	 */
	@RequestMapping("/deleteEnjoyUseridAndFid")
	@ResponseBody
	public Map deleteEnjoyUseridAndFid(Enjoy enjoy, HttpSession session) {
		int userid=(int) session.getAttribute("userid");
		Map<Object,Object> map = new HashMap<>();
		try {
			//取消点赞
			enjoyService.deleteEnjoyUseridAndFid(enjoy);

			//按userid查询点赞信息（点赞了哪些帖子）
			List<Enjoy> enjoys = enjoyService.getEnjoy(userid);
			List<Article> myListArticleEnjoy = new ArrayList<Article>();
			for(Enjoy enjoy2 : enjoys) {
				//通过fid查询帖子信息
				int fid=enjoy2.getFid();
				myListArticleEnjoy.add(articleService.getArticleKey(fid));
			}
			map.put("myListEnjoys", myListArticleEnjoy);
			map.put("resultCode",200);
		} catch (Exception e){
			map.put("resultCode",404);
		}

		return map;
	}
	
	/**
	 * 添加点赞
	 * @param enjoy
	 * @return
	 */
	@RequestMapping("/setEnjoy")
	@ResponseBody
	public Map setEnjoy(Enjoy enjoy) {
		Map<Object, Object> map = new HashMap<>();
		try {
			enjoyService.setEnjoy(enjoy);
			map.put("resultCode",200);
		}catch (Exception e){
			map.put("resultCode",404);
		}

		return map;
	}

	/**
	 * 按点赞者id和被点赞帖子id进行查询
	 * @param fid
	 * @param session
	 * @return
	 */
	@RequestMapping("/getEnjoyFid/{fid}")
	@ResponseBody
	public Map getEnjoyFid(@PathVariable int fid, HttpSession session){
		Map<Object, Object> map = new HashMap<>();
		Enjoy enjoy = new Enjoy();
		enjoy.setFid(fid);
		enjoy.setUserid((int) session.getAttribute("userid"));
		map.put("enjoy",enjoyService.getEnjoyFid(enjoy));
		return map;
	}
}
