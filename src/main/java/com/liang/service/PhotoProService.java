package com.liang.service;

import com.liang.bean.PhotoPro;
import com.liang.bean.impl.PhotoProImpl;
import com.liang.dao.PhotoProMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhotoProService {

	@Autowired
	PhotoProMapper photoProMapper;

	/**
	 * 创建相册
	 * @param photoPro
	 */
	public void setPhotoPro(PhotoPro photoPro) {

		photoProMapper.insert(photoPro);
	}

	/**
	 * 删除相册
	 * @param fid
	 */
	public void deletePhotoPro(String fid) {

		photoProMapper.deleteByKey(fid);
	}

	/**
	 * 编辑相册
	 * @param photoPro
	 */
	public void updateName(PhotoPro photoPro) {
		photoProMapper.updateNameByKey(photoPro);
	}

	/**
	 * 获取相册分类信息(按userid)
	 * @param userid
	 */
	public List<PhotoProImpl> getPhotoPro(String userid) {

		return photoProMapper.selectPhotoProImplByUserid(userid);
	}

	/**
	 * 按fid（相册id）查询相册信息
	 * @param fid
	 */
	public PhotoPro selectByPrimaryKey(String fid) {
		return photoProMapper.selectPhotoProByKey(fid);
	}

	/**
	 * 按userid和name（相册名）查询相册信息
	 * @param photoPro
	 * @return
	 */
	public List<PhotoPro> selectByName(PhotoPro photoPro) {
		return photoProMapper.selectPhotoProByUN(photoPro);
	}
}
