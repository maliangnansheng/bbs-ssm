package com.liang.controller;

import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.liang.bean.*;
import com.liang.service.*;
import com.liang.utils.PageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.liang.utils.PathUtil;

@RequestMapping("/common")
@SessionAttributes(value = { "plate", "sessionIp" })
@Controller
public class Common {

	@Autowired
	PlateController plateController;
	@Autowired
	UserController userController;
	@Autowired
	ArticleController articleController;
	@Autowired
	ArticleService articleService;
	@Autowired
	CommentController commentController;
	@Autowired
	CommentService commentService;
	@Autowired
	PlateService plateService;
	@Autowired
	AttentionService attentionService;
	@Autowired
	CollectService collectService;
	@Autowired
	EnjoyService enjoyService;
	@Autowired
	VisitController visitController;
	@Autowired
	VisitService visitService;
	@Autowired
	PhotoProService photoProService;

	// 用户系统-帖子初始条数（第一页）
	private static final int articlePageSize = PageUtil.getArticlePageSize();
	// 用户系统-帖子追加条数（出第一页外）
	private static final String articleDefaultPageSize = "10";

	// 管理系统-帖子初始条数（第一页）
	private static final int adminArticlePageSize = PageUtil.getAdminArticlePageSize();
	// 管理系统-用户初始条数（第一页）
	private static final int adminUserPageSize = PageUtil.getAdminUserPageSize();
	// 管理系统-访问记录初始条数（第一页）
	private static final int adminVisitPageSize = PageUtil.getAdminVisitPageSize();

	/**
	 * 查询输出首页全部信息（不包含head）
	 * 
	 * @return
	 */
	@RequestMapping("/getAll")
	@ResponseBody
	public Map getAll(Map<Object, Object> map2, HttpServletRequest request, HttpSession session) {

		Map<Object, Object> map = new HashMap<>();
		articleController.getArticle(map, 1, articlePageSize);
		List<Article> listArticle = (List<Article>) map.get("listArticle");
		int count = listArticle.size();

		for (int i = 0; i < count; i++) {

			// 将每一条帖子对应的id单独抽出来
			int fid = listArticle.get(i).getFid();
			// 再通过每一个帖子的id查找出对应的评论信息
			commentService.getCommentFidMap(fid, map);
			// 将上一步查出的对应的评论信息存放到listComment里
			List<Comment> listComment = (List<Comment>) map.get("listComment");

			// 为map预设一个随帖子id变化而变化的key
			String listCommentFid = "listComment_" + fid;
			// 将每一个帖子下对应的所有评论存入map中（其key是随帖子id变化而变化的）
			map.put(listCommentFid, listComment);
		}
		//去除多余信息
		map.remove("listComment");

		// 查询板块信息（无条件）
		List<Plate> plate = plateService.getPlate();
		map.put("plate", plate);

		// 查询关注信息(无条件)
		List<Attention> attention = attentionService.getAttention();
		map.put("attention", attention);

		// 查询收藏信息（无条件）
		List<Collect> collect = collectService.getCollect();
		map.put("collect", collect);

		// 查询点赞信息（无条件）
		List<Enjoy> enjoy = enjoyService.getEnjoy();
		map.put("enjoy", enjoy);

		// 热门帖子
		List<Article> listHotArticle = articleService.getHotArticle();
		map.put("listHotArticle", listHotArticle);

		// 统计访问信息-国家
		visitService.visitCountryStatistic(map);

		// 统计访问信息-中国省份
		visitService.visitProvinceStatistic(map);

		return map;
	}

	/**
	 * 追加更多的帖子信息（帖子+评论+关注+收藏）
	 *
	 * @return
	 */
	@RequestMapping("/appendMore")
	@ResponseBody
	public Map appendMore(@RequestParam(required=true,defaultValue="1") int pageStart, @RequestParam(required=true,defaultValue=articleDefaultPageSize)int pageSize) {

		Map<Object, Object> map = new HashMap<>();
		articleController.getArticle(map, pageStart, pageSize);
		List<Article> listArticle = (List<Article>) map.get("listArticle");
		int count = listArticle.size();

		for (int i = 0; i < count; i++) {

			// 将每一条帖子对应的id单独抽出来
			int fid = listArticle.get(i).getFid();
			// 再通过每一个帖子的id查找出对应的评论信息
			commentService.getCommentFidMap(fid, map);
			// 将上一步查出的对应的评论信息存放到listComment里
			List<Comment> listComment = (List<Comment>) map.get("listComment");

			// 为map预设一个随帖子id变化而变化的key
			String listCommentFid = "listComment_" + fid;
			// 将每一个帖子下对应的所有评论存入map中（其key是随帖子id变化而变化的）
			map.put(listCommentFid, listComment);
		}
		//去除多余信息
		map.remove("listComment");

		// 查询关注信息(无条件)
		List<Attention> attention = attentionService.getAttention();
		map.put("attention", attention);

		// 查询收藏信息（无条件）
		List<Collect> collect = collectService.getCollect();
		map.put("collect", collect);

		// 查询点赞信息（无条件）
		List<Enjoy> enjoy = enjoyService.getEnjoy();
		map.put("enjoy", enjoy);

		return map;
	}

	/**
	 * 查询输出-管理员-首页分页信息（不包含head）
	 * @return
	 */
	@RequestMapping("/getAll_Admin")
	@ResponseBody
	public Map getAll_Admin() {
		Map<Object, Object> map = new HashMap<>();

		// 查询板块信息（无条件）
		plateController.getPlate(map);
		// 查询用户信息（分页）
		userController.getUser(map,1,adminUserPageSize);
		// 查询帖子信息（分页）
		articleController.getArticleAdmin(map, 1, adminArticlePageSize);
		// 查询访问信息（分页）
		visitController.getVisit(map, 1, adminVisitPageSize);

		return map;
	}

	/**
	 * 按帖子标题模糊查询（搜索框搜索）
	 * 
	 * @param request
	 * @param map
	 * @param map2
	 * @return
	 */
	@RequestMapping("/getArticleTitle")
	public String getArticleTitle(HttpServletRequest request, Map<Object, Object> map, Map<Object, Object> map2) {

		articleController.getArticleTitle(request.getParameter("articleTitle"), map);
		List<Article> listArticle = (List<Article>) map.get("listArticle");
		int count = listArticle.size();

		for (int i = 0; i < count; i++) {

			// 将每一条帖子对应的id单独抽出来
			int fid = listArticle.get(i).getFid();
			// 再通过每一个帖子的id查找出对应的评论信息
			commentService.getCommentFidMap(fid, map);
			// 将上一步查出的对应的评论信息存放到listComment里
			List<Comment> listComment = (List<Comment>) map.get("listComment");

			// 为map预设一个随帖子id变化而变化的key
			String listCommentFid = "listComment_" + fid;
			// 将每一个帖子下对应的所有评论存入map中（其key是随帖子id变化而变化的）
			map.put(listCommentFid, listComment);

			// 再将map存入map2
			map2.put("map", map);
		}

		// 查询板块信息（无条件）
		List<Plate> plate = plateService.getPlate();
		map.put("plate", plate);

		return "list";
	}

	/**
	 * 按帖子板块查询出帖子（通过审核的）
	 * 
	 * @return
	 */
	@RequestMapping("/getArticleBid/{bid}")
	@ResponseBody
	public Map getArticleBid(@PathVariable int bid) {
		Map<Object, Object> map = new HashMap<>();
		articleController.getArticleBid(bid, map);
		List<Article> listArticle = (List<Article>) map.get("listArticle");
		int count = listArticle.size();

		for (int i = 0; i < count; i++) {

			// 将每一条帖子对应的id单独抽出来
			int fid = listArticle.get(i).getFid();
			// 再通过每一个帖子的id查找出对应的评论信息
			commentService.getCommentFidMap(fid, map);
			// 将上一步查出的对应的评论信息存放到listComment里
			List<Comment> listComment = (List<Comment>) map.get("listComment");

			// 为map预设一个随帖子id变化而变化的key
			String listCommentFid = "listComment_" + fid;
			// 将每一个帖子下对应的所有评论存入map中（其key是随帖子id变化而变化的）
			map.put(listCommentFid, listComment);
		}
		//去除多余信息
		map.remove("listComment");

		// 查询板块信息（无条件）
		List<Plate> plate = plateService.getPlate();
		map.put("plate", plate);

		// 查询关注信息(无条件)
		List<Attention> attention = attentionService.getAttention();
		map.put("attention", attention);

		// 查询收藏信息（无条件）
		List<Collect> collect = collectService.getCollect();
		map.put("collect", collect);

		// 查询点赞信息（无条件）
		List<Enjoy> enjoy = enjoyService.getEnjoy();
		map.put("enjoy", enjoy);

		return map;
	}

	/**
	 * 获取相册信息
	 * @return
	 */
	@RequestMapping("/getPhoto")
	@ResponseBody
	public Map<Object, Object> getPhoto(HttpSession session) {
		Map<Object, Object> map = new HashMap<>();

		int userid=(int) session.getAttribute("userid");
		//获取相册分类信息(按userid)
		map.put("listPhotoPros", photoProService.getPhotoPro(userid));

		return map;
	}

}
