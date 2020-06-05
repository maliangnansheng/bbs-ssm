package com.liang.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.liang.bean.Plate;
import com.liang.dao.PlateMapper;

@Service
public class PlateService {

	@Autowired
	PlateMapper plateMapper;

	/**
	 * 新增板块信息
	 * @param plate
	 */
	public void setPlate(Plate plate) {
		
		plateMapper.insert(plate);
	}

	/**
	 * 按bid删除板块信息
	 * @param plate_delete
	 */
	public void deletePlate(Plate plate_delete) {

		plateMapper.deleteByKey(plate_delete.getBid());
	}

	/**
	 * 修改板块
	 * @param plate
	 */
	public void updatePlate(Plate plate) {
		
		plateMapper.updateByKey(plate);
	}

	/**
	 * 查询板块信息（无条件）
	 * @return
	 */
	public List<Plate> getPlate() {

		return plateMapper.selectPlate();
	}

	/**
	 * 按板块ID查询板块信息
	 * @param bid
	 * @return
	 */
	public Plate getPlateId(String bid) {

		return plateMapper.selectPlateByKey(bid);
	}

	/**
	 * 板块名查询板块信息
	 * @param plate
	 * @return
	 */
	public List<Plate> getPlateName(Plate plate) {

		return plateMapper.selectPlateByName(plate);
	}

	/**
	 * 总板块数
	 * @return
	 */
    public int getCount() {
    	return plateMapper.selectCount();
    }
}
