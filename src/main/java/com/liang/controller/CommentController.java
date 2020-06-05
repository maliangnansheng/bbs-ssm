package com.liang.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.liang.bean.impl.CommentImpl;
import com.liang.code.ReturnT;
import com.liang.service.UserService;
import com.liang.service.ViaService;
import com.liang.utils.UUIDUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.liang.bean.Comment;
import com.liang.service.CommentService;

@RequestMapping("/api/rest/nanshengbbs/v3.0/comment")
@Controller
public class CommentController {
	@Autowired
	CommentService commentService;
	@Autowired
	UserService userService;
	@Autowired
	ViaService viaService;

	/**
	 * 添加评论
	 * @param comment
	 */
	@PostMapping("/setComment")
	@ResponseBody
	public ReturnT<?> setComment(Comment comment) {
		try {
			if (comment.getPcontent().trim().isEmpty()){	//无评论内容
				return ReturnT.fail(HttpStatus.NOT_FOUND, "请输入评论内容!");
			}
			//新增评论
			comment.setPid(UUIDUtil.getRandomUUID());
			commentService.setComment(comment);
			return ReturnT.success("评论成功");
		} catch (Exception e) {
			e.printStackTrace();
			return ReturnT.fail("评论失败");
		}
	}

	/**
	 * 按pid删除评论表
	 * @return
	 */
	@DeleteMapping("/deleteComment/{pid}")
	@ResponseBody
	public ReturnT<?> deleteComment(@PathVariable String pid) {
		try {
			commentService.deleteComment(pid);
			return ReturnT.success("删除评论成功");
		} catch (Exception e) {
			e.printStackTrace();
			return ReturnT.fail("删除评论失败");
		}
	}
	
	/**
	 * 按文章id（fid）获取评论表信息
	 * @param fid
	 */
	@GetMapping("/getCommentFid/{fid}")
	@ResponseBody
	public ReturnT<?> getCommentFid(@PathVariable String fid) {
		Map<String, Object> map = new HashMap<>();
		try {
			// 通过fid查找出对应的评论信息
			map.put("listComment", commentService.getCommentImplFid(fid));
			return new ReturnT<>(HttpStatus.OK, "获取评论数据成功", map);
		} catch (Exception e) {
			e.printStackTrace();
			return ReturnT.fail("获取评论数据失败");
		}
	}

	/**
	 * 按文章id（fid）获取文章的评论数
	 * @param fid
	 */
	@GetMapping("/getCountFid/{fid}")
	@ResponseBody
	public ReturnT<?> getCountFid(@PathVariable String fid) {
		Map<String, Object> map = new HashMap<>();
		try {
			map.put("commentCount", commentService.getCountFid(fid));
			return new ReturnT<>(HttpStatus.OK, "获取文章评论数成功", map);
		} catch (Exception e) {
			e.printStackTrace();
			return ReturnT.fail("获取文章评论数失败");
		}
	}

	/**
	 * 最新评论
	 * @return
	 */
	@GetMapping("/getNewComment")
	@ResponseBody
	public ReturnT<?> getNewComment() {
		Map<String, Object> map = new HashMap<>();
		try {
			List<CommentImpl> listNewComment = commentService.getNewComment();
			map.put("listNewComment", listNewComment);
			return new ReturnT<>(HttpStatus.OK, "获取最新评论数据成功", map);
		} catch (Exception e) {
			e.printStackTrace();
			return ReturnT.fail("获取最新评论数据失败");
		}
	}
}
