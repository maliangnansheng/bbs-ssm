package com.liang.dao;

import com.liang.bean.Article;
import com.liang.bean.impl.ArticleImpl;

import java.util.List;
import java.util.Map;

public interface ArticleMapper {

	// 向数据库插入文章信息
	void insert(Article record);

	// 按fid删除文章信息
	void deleteByKey(String fid);

	// 删除userid对应的文章信息
	void deleteByUserid(String userid);

	// 修改文章信息
	void updateByKey(Article record);

	// 更改文章审核状态
	void updateStatusByKey(Article record);

	// 查询“通过审核”的文章信息（分页）
	List<ArticleImpl> selectPassArticleImplPaging(Map<String, Object> map);

	// 查询文章信息（分页）
	List<ArticleImpl> selectArticleImplPaging(Map<String, Object> map);
	
	// 按userid查询“通过审核”文章信息
	List<Article> selectPassArticleByUserid(String userid);

	// 按userid查询文章信息
	List<Article> selectArticleByUserid(String userid);

	// 按fid查询文章信息
	Article selectArticleByKey(String fid);

	// 按fid和userid查询文章信息
	ArticleImpl selectArticleImplByKeyU(Map<String, Object> map);

    // 查询热门文章
    List<Article> selectHotArticle();

    // 查询userid评论过的文章信息
    List<ArticleImpl> selectArticleImplByUserid(Map<String, Object> map);

	// 查询userid收藏的文章信息
    List<ArticleImpl> selectCollectArticleImplByUserid(Map<String, Object> map);

	// 总文章数
	int selectCount();

	// 某板块下文章总数
	int selectPassArticleCountByBid(String bid);

	// 查询userid的总文章数
	int selectArticleCountByUserid(Map<String, Object> map);

	// 查询userid评论过的文章总数
	int selectArticleImplCountByUserid(Map<String, Object> map);

	// 获取某用户的收藏总数
	int selectCollectCountByUserid(Map<String, Object> map);
}