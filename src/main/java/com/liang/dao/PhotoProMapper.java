package com.liang.dao;

import com.liang.bean.PhotoPro;
import com.liang.bean.impl.PhotoProImpl;

import java.util.List;

public interface PhotoProMapper {

    // 创建相册
    void insert(PhotoPro record);

    // 删除相册
    void deleteByKey(String fid);

    // 编辑相册
    void updateNameByKey(PhotoPro photoPro);

    // 按fid（相册id）查询相册信息
    PhotoPro selectPhotoProByKey(String fid);

    // 查询某用户的相册分类信息
	List<PhotoProImpl> selectPhotoProImplByUserid(String userid);

    // 按userid和name（相册名）查询相册信息
    List<PhotoPro> selectPhotoProByUN(PhotoPro photoPro);
}