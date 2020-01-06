package com.liang.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.liang.utils.PageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.liang.bean.Article;
import com.liang.dao.ArticleMapper;

@Service
public class ArticleService {
	
	@Autowired
	ArticleMapper articleMapper;

	// 用户系统-帖子初始条数（第一页）
	private static final int articlePageSize = PageUtil.getArticlePageSize();

	// 管理系统-帖子初始条数（第一页）
	private static final int adminArticlePageSize = PageUtil.getAdminArticlePageSize();

    /**
	 * 向数据库插入发帖信息
	 * @param article
	 */
	public void setArticle(Article article) {
		
		articleMapper.insert(article);
	}

	/**
	 * 查询发帖表信息（分页）-首页
	 * @return
	 */
	public List<Article> getArticle(int pageStart, int pageSize) {
		Map<Object,Object> map = new HashMap<>();
		if (pageStart == 1) {
			map.put("offset",(pageStart-1)*pageSize);
		} else {
			map.put("offset",(pageStart-2)*pageSize + articlePageSize);
		}
		map.put("limit",pageSize);
		return articleMapper.selectByArticle(map);
	}

	/**
	 * 查询发帖表信息（分页）-管理员
	 * @param pageStart
	 * @param pageSize
	 * @return
	 */
	public List<Article> getArticleAdmin(int pageStart, int pageSize) {
		Map<Object,Object> map = new HashMap<>();
		if (pageStart == 1) {
			map.put("offset",(pageStart-1)*pageSize);
		} else {
			map.put("offset",(pageStart-2)*pageSize + adminArticlePageSize);
		}
		map.put("limit",pageSize);
		return articleMapper.selectByArticleAdmin(map);
	}
	
	/**
	 * 按帖子标题模糊查询（搜索框搜索）
	 * @param articleTitle
	 * @return
	 */
	public List<Article> getArticleTitle(String articleTitle) {
		
		return articleMapper.selectByArticleTitle(articleTitle);
	}
	
	/**
	 * 按帖子板块查询出帖子（通过审核的）
	 * @param bid
	 * @return
	 */
	public List<Article> getArticleBid(int bid) {

		return articleMapper.selectByArticleBid(bid);
	}

	/**
	 * 按userid查询发帖表信息
	 * @return
	 */
	public List<Article> getArticleId(int userid) {
		
		return articleMapper.selectByArticleId(userid);
	}

	/**
	 * 按fid查询发帖表信息
	 * @return
	 */
	public Article getArticleKey(int fid) {
		
		return articleMapper.selectByPrimaryKey(fid);
	}

	/**
	 * 按fid删除帖子
	 * @param fid
	 */
	public void deleteArticle(int fid) {

		articleMapper.deleteByPrimaryKey(fid);
	}

	/**
	 * 修改帖子表
	 * @param article
	 */
	public void updateArticle(Article article) {
		
		articleMapper.updateByPrimaryKey(article);
	}

	/**
	 * 修改article表的status属性（修改审核状态）
	 * @param article
	 */
	public void updateArticleStatus(Article article) {
		
		articleMapper.updateArticleStatus(article);
	}

	/**
	 * 删除用户对应的帖子信息(按userid)
	 * @param userid
	 */
	public void deleteArticleUserid(int userid) {
		
		articleMapper.deleteByUserid(userid);
	}

	/**
	 * 总贴数
	 * @return
	 */
    public int getCount() {
    	return articleMapper.selectCount();
    }

	/**
	 * 热门帖子
	 * @return
	 */
	public List<Article> getHotArticle() {
		return articleMapper.getHotArticle();
	}
}
