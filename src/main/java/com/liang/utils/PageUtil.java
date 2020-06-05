package com.liang.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@PropertySource({"classpath:pageconfig.properties"})
@Component
public class PageUtil {
	// 用户系统-文章初始条数（第一页）
	@Value("${articlePageSize}")
	private int articlePageSize;
	// 用户系统-文章追加条数（出第一页外）
	@Value("${articleDefaultPageSize}")
	private int articleDefaultPageSize;

	// 管理系统-文章初始条数（第一页）
	@Value("${adminArticlePageSize}")
	private int adminArticlePageSize;
	// 管理系统-文章追加条数（出第一页外）
	@Value("${adminArticleDefaultPageSize}")
	private int adminArticleDefaultPageSize;
	// 管理系统-用户初始条数（第一页）
	@Value("${adminUserPageSize}")
	private int adminUserPageSize;
	// 管理系统-用户追加条数（出第一页外）
	@Value("${adminUserDefaultPageSize}")
	private int adminUserDefaultPageSize;
	// 管理系统-访问记录初始条数（第一页）
	@Value("${adminVisitPageSize}")
	private int adminVisitPageSize;
	// 管理系统-访问记录追加条数（出第一页外）
	@Value("${adminVisitDefaultPageSize}")
	private int adminVisitDefaultPageSize;

	public int getArticlePageSize() {
		return articlePageSize;
	}

	public void setArticlePageSize(int articlePageSize) {
		this.articlePageSize = articlePageSize;
	}

	public int getArticleDefaultPageSize() {
		return articleDefaultPageSize;
	}

	public void setArticleDefaultPageSize(int articleDefaultPageSize) {
		this.articleDefaultPageSize = articleDefaultPageSize;
	}

	public int getAdminArticlePageSize() {
		return adminArticlePageSize;
	}

	public void setAdminArticlePageSize(int adminArticlePageSize) {
		this.adminArticlePageSize = adminArticlePageSize;
	}

	public int getAdminArticleDefaultPageSize() {
		return adminArticleDefaultPageSize;
	}

	public void setAdminArticleDefaultPageSize(int adminArticleDefaultPageSize) {
		this.adminArticleDefaultPageSize = adminArticleDefaultPageSize;
	}

	public int getAdminUserPageSize() {
		return adminUserPageSize;
	}

	public void setAdminUserPageSize(int adminUserPageSize) {
		this.adminUserPageSize = adminUserPageSize;
	}

	public int getAdminUserDefaultPageSize() {
		return adminUserDefaultPageSize;
	}

	public void setAdminUserDefaultPageSize(int adminUserDefaultPageSize) {
		this.adminUserDefaultPageSize = adminUserDefaultPageSize;
	}

	public int getAdminVisitPageSize() {
		return adminVisitPageSize;
	}

	public void setAdminVisitPageSize(int adminVisitPageSize) {
		this.adminVisitPageSize = adminVisitPageSize;
	}

	public int getAdminVisitDefaultPageSize() {
		return adminVisitDefaultPageSize;
	}

	public void setAdminVisitDefaultPageSize(int adminVisitDefaultPageSize) {
		this.adminVisitDefaultPageSize = adminVisitDefaultPageSize;
	}
}
