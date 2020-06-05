package com.liang.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.liang.bean.impl.ArticleImpl;
import com.liang.utils.PageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.liang.bean.Article;
import com.liang.dao.ArticleMapper;

import javax.annotation.PostConstruct;

@Service
public class ArticleService {
	@Autowired
	ArticleMapper articleMapper;
	@Autowired
	PageUtil pageUtil;

	// 用户系统-文章初始条数（第一页）
	private int articlePageSize;
	// 管理系统-文章初始条数（第一页）
	private int adminArticlePageSize;

	@PostConstruct
	private void init(){
		articlePageSize = pageUtil.getArticlePageSize();
		adminArticlePageSize = pageUtil.getAdminArticlePageSize();
	}

    /**
	 * 向数据库插入发帖信息
	 * @param article
	 */
	public void setArticle(Article article) {
		
		articleMapper.insert(article);
	}

	/**
	 * 按fid删除文章
	 * @param fid
	 */
	public void deleteArticle(String fid) {

		articleMapper.deleteByKey(fid);
	}

	/**
	 * 删除用户对应的文章信息(按userid)
	 * @param userid
	 */
	public void deleteArticleUserid(String userid) {

		articleMapper.deleteByUserid(userid);
	}

	/**
	 * 修改文章
	 * @param article
	 */
	public void updateArticle(Article article) {

		articleMapper.updateByKey(article);
	}

	/**
	 * 更改文章审核状态
	 * @param article
	 */
	public void updateArticleStatus(Article article) {

		articleMapper.updateStatusByKey(article);
	}

	/**
	 * 获取发帖表信息（分页）
	 * @param pageStart
	 * @param pageSize
	 * @return
	 */
	public List<ArticleImpl> getArticle(int pageStart, int pageSize, String userid) {
		Map<String, Object> map = new HashMap<>();
		if (pageStart == 1) {
			map.put("offset",(pageStart-1)*pageSize);
		} else {
			map.put("offset",(pageStart-2)*pageSize + articlePageSize);
		}
		map.put("limit", pageSize);
		map.put("userid", userid);

		return articleMapper.selectPassArticleImplPaging(map);
	}

	/**
	 * 获取发帖表信息（分页）
	 * @param bid 按板块查询
	 * @param pageStart
	 * @param pageSize
	 * @return
	 */
	public List<ArticleImpl> getArticleBid(String bid, int pageStart, int pageSize, String userid) {
		Map<String, Object> map = new HashMap<>();
		if (pageStart == 1) {
			map.put("offset",(pageStart-1)*pageSize);
		} else {
			map.put("offset",(pageStart-2)*pageSize + articlePageSize);
		}
		map.put("bid", bid);
		map.put("limit", pageSize);
		map.put("userid", userid);

		return articleMapper.selectPassArticleImplPaging(map);
	}

	/**
	 * 查询发帖表信息（分页）-管理员
	 * @param pageStart
	 * @param pageSize
	 * @return
	 */
	public List<ArticleImpl> getArticleAdmin(int pageStart, int pageSize) {
		Map<String, Object> map = new HashMap<>();
		if (pageStart == 1) {
			map.put("offset",(pageStart-1)*pageSize);
		} else {
			map.put("offset",(pageStart-2)*pageSize + adminArticlePageSize);
		}
		map.put("limit",pageSize);
		return articleMapper.selectArticleImplPaging(map);
	}

	/**
	 * 按userid查询发帖表信息（通过审核）
	 * @param userid
	 * @return
	 */
	public List<Article> getPassArticleUserid(String userid) {
		
		return articleMapper.selectPassArticleByUserid(userid);
	}

	/**
	 * 按userid获取文章信息（所有审核状态）
	 * @param userid
	 * @return
	 */
	public List<Article> getArticleUserid(String userid) {

		return articleMapper.selectArticleByUserid(userid);
	}

	/**
	 * 获取userid的总文章数
	 * @param map
	 * @return
	 */
	public int getArticleCountByUserid(Map<String, Object> map) {

		return articleMapper.selectArticleCountByUserid(map);
	}

	/**
	 * 按fid查询发帖表信息
	 * @return
	 */
	public Article getArticleKey(String fid) {

		return articleMapper.selectArticleByKey(fid);
	}

	/**
	 * 按fid查询发帖表信息
	 * @param fid
	 * @param userid
	 * @return
	 */
	public ArticleImpl getArticleFidUserid(String fid, String userid) {
		Map<String, Object> map = new HashMap<>();
		map.put("fid", fid);
		map.put("userid", userid);

		return articleMapper.selectArticleImplByKeyU(map);
	}

	/**
	 * 总贴数
	 * @return
	 */
    public int getCount() {
    	return articleMapper.selectCount();
    }

    /**
	 * 总贴数
	 * @return
	 */
    public int getPassArticleCountByBid(String bid) {
    	return articleMapper.selectPassArticleCountByBid(bid);
    }

	/**
	 * 热门文章
	 * @return
	 */
	public List<Article> getHotArticle() {
		return articleMapper.selectHotArticle();
	}

	/**
	 * 获取userid用户评论过的文章信息
	 * @param map
	 * @return
	 */
    public List<ArticleImpl> getAnswerArticleUserid(Map<String, Object> map) {
		return articleMapper.selectArticleImplByUserid(map);
    }

	/**
	 * 获取userid评论过的文章总数
	 * @param map
	 * @return
	 */
	public int getAnswerArticleCountByUserid(Map<String, Object> map) {
		return articleMapper.selectArticleImplCountByUserid(map);
	}

	/**
	 * 按userid获取收藏的文章信息
	 * @param map
	 * @return
	 */
    public List<ArticleImpl> getCollectArticleUserid(Map<String, Object> map) {
		return articleMapper.selectCollectArticleImplByUserid(map);
    }

	/**
	 * 获取userid收藏总数
	 * @param map
	 * @return
	 */
	public int getCollectCountByUserid(Map<String, Object> map) {

		return articleMapper.selectCollectCountByUserid(map);
	}
}
