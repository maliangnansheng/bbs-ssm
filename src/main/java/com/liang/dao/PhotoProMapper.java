package com.liang.dao;


import com.liang.bean.PhotoPro;
import com.liang.bean.TbPhoto;

import java.util.List;

public interface PhotoProMapper {

    //删除相册
    int deleteByPrimaryKey(Integer fid);

    //创建相册
    int insert(PhotoPro record);

    int insertSelective(PhotoPro record);

    // 按fid（相册id）查询相册信息
    PhotoPro selectByPrimaryKey(Integer fid);

    int updateByPrimaryKeySelective(PhotoPro record);

    int updateByPrimaryKey(PhotoPro record);

    //获取相册分类信息(按userid)
	List<PhotoPro> selectByUserid(int userid);

	// 编辑相册
    void updateName(PhotoPro photoPro);

    // 按userid和name（相册名）查询相册信息
    List<PhotoPro> selectByName(PhotoPro photoPro);
}