package com.liang.dao;

import com.liang.bean.TbPhoto;

import java.util.List;

public interface TbPhotoMapper {

    // 上传照片
    void insert(TbPhoto record);

    // 删除某一张照片
    void deleteByKey(String xid);

    // 删除相册对应的照片
    void deleteByFid(String fid);

    // 按xid查询照片信息
    TbPhoto selectTbPhotoByKey(String xid);

    // 获取相册分类下的对应的照片
	List<TbPhoto> selectTbPhotoByFU(TbPhoto tbPhoto);
}