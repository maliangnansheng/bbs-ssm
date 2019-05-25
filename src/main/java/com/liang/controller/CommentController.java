package com.liang.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.liang.bean.Comment;
import com.liang.service.CommentService;

@RequestMapping("/commentController")
@Controller
public class CommentController {

	@Autowired
	CommentService commentService;
	
	/**
	 * 按帖子id（fid）查询评论表信息
	 * @param fid
	 */
	@RequestMapping("/getCommentFid/{fid}")
	@ResponseBody
	public Map getCommentFid(@PathVariable int fid) {
		Map<Object, Object> map = new HashMap<>();
		List<Comment> listComment = commentService.getCommentFid(fid);
		map.put("listComment", listComment);
		return map;
	}

	/**
	 * 按帖子id（fid）查询该条帖子的评论数
	 * @param fid
	 */
	@RequestMapping("/getCountFid/{fid}")
	@ResponseBody
	public Map getCountFid(@PathVariable int fid) {
		Map<Object, Object> map = new HashMap<>();
		int count = commentService.getCountFid(fid);
		map.put("commentCount", count);
		return map;
	}
	
	/**
	 * 添加评论
	 * @param comment
	 */
	@RequestMapping("/setComment")
	@ResponseBody
	public Map setComment(Comment comment) {
		Map<Object, Object> map = new HashMap<>();
		if (comment.getPcontent().trim().isEmpty()){	//无评论内容
			map.put("resultCode",201);
			return map;
		}
		try {
			//新增评论
			commentService.setComment(comment);
			map.put("resultCode",200);
		}catch (Exception e){
			map.put("resultCode",404);
		}

		return map;
	}
	
	/**
	 * 按pid删除评论表
	 * @return
	 */
	@RequestMapping("/deleteComment/{pid}")
	@ResponseBody
	public Map deleteComment(@PathVariable int pid) {
		Map<Object, Object> map = new HashMap<>();
		try {
			commentService.deleteComment(pid);
			map.put("resultCode",200);
		}catch (Exception e){
			map.put("resultCode",404);
		}

		return map;
	}
	
	
	
}
