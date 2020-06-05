package com.liang.service;

import com.liang.bean.TbPhoto;
import com.liang.dao.TbPhotoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TbPhotoService {

	@Autowired
	TbPhotoMapper tbPhotoMapper;
	
	/**
	 * 上传照片
	 * @param tbPhoto
	 */
	public void setTbPhoto(TbPhoto tbPhoto) {

		tbPhotoMapper.insert(tbPhoto);
	}

	/**
	 * 删除某一张照片
	 * @param xid
	 */
	public void deleteTbPhoto(String xid) {

		tbPhotoMapper.deleteByKey(xid);
	}

	/**
	 * 删除相册对应的照片
	 * @param fid
	 */
	public void deleteTbPhotoFid(String fid) {

		tbPhotoMapper.deleteByFid(fid);
	}

	/**
	 * 获取相册分类下的对应的照片
	 * @param tbPhoto
	 * @return
	 */
	public List<TbPhoto> getTbPhoto(TbPhoto tbPhoto) {

		return tbPhotoMapper.selectTbPhotoByFU(tbPhoto);
	}

	/**
	 * 按xid查询照片信息
	 * @param xid
	 */
	public TbPhoto getTbPhotoXid(String xid) {

		return tbPhotoMapper.selectTbPhotoByKey(xid);
	}

}
