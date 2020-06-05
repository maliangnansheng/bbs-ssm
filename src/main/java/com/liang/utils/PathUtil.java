package com.liang.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@PropertySource({"classpath:pathconfig.properties"})
@Component
public class PathUtil {
	// 文章图片（题图）
	@Value("${articlePath}")
	private String articlePath;
	// 文章图片（配图）
	@Value("${illustrationPath}")
	private String illustrationPath;
	// 用户头像
	@Value("${userPath}")
	private String userPath;
	// 用户相册
	@Value("${photoPath}")
	private String photoPath;

	public String getArticlePath() {
		return articlePath;
	}

	public void setArticlePath(String articlePath) {
		this.articlePath = articlePath;
	}

	public String getIllustrationPath() {
		return illustrationPath;
	}

	public void setIllustrationPath(String illustrationPath) {
		this.illustrationPath = illustrationPath;
	}

	public String getUserPath() {
		return userPath;
	}

	public void setUserPath(String userPath) {
		this.userPath = userPath;
	}

	public String getPhotoPath() {
		return photoPath;
	}

	public void setPhotoPath(String photoPath) {
		this.photoPath = photoPath;
	}
}
