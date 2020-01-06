package com.liang.dao;


import com.liang.bean.TbPhoto;

import java.util.List;

public interface TbPhotoMapper {

    //删除某一张照片
    int deleteByPrimaryKey(Integer xid);

    //上传照片
    int insert(TbPhoto record);

    int insertSelective(TbPhoto record);

    // 按xid查询照片信息
    TbPhoto selectByPrimaryKey(Integer xid);

    int updateByPrimaryKeySelective(TbPhoto record);

    int updateByPrimaryKey(TbPhoto record);

    //获取相册分类下的对应的照片
	List<TbPhoto> selectByFidAndUserid(TbPhoto tbPhoto);

	//删除相册对应的照片
	void deleteByFid(int fid);
}