package com.liang.controller;

import com.liang.bean.PhotoPro;
import com.liang.service.PhotoProService;
import com.liang.service.TbPhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RequestMapping("/photoProController")
@Controller
public class PhotoProController {

	@Autowired
	PhotoProService photoProService;
	@Autowired
	TbPhotoService tbPhotoService;
	
	/**
	 * 创建相册
	 * @param photoPro
	 * @param session
	 * @return
	 */
	@RequestMapping("/setPhotoPro")
	@ResponseBody
	public Map<Object,Object> setPhotoPro(PhotoPro photoPro, HttpSession session) {
		Map<Object,Object> map = new HashMap<>();
		try {
			int userid = (int) session.getAttribute("userid");
			photoPro.setUserid(userid);
			if (photoProService.selectByName(photoPro).size() == 0){	// 不存在该相册名
				photoProService.setPhotoPro(photoPro);

				map.put("resultCode",200);
			} else {
				map.put("resultCode",201);
			}
		}catch (Exception e){
			map.put("resultCode",404);
		}

		return map;
	}


	/**
	 * 编辑相册
	 * @return
	 */
	@RequestMapping("/updatePhotoPro")
	@ResponseBody
	public Map<Object,Object> updatePhotoPro(PhotoPro photoPro, HttpSession session) {
		Map<Object,Object> map = new HashMap<>();
		try {
			int userid = (int) session.getAttribute("userid");
			photoPro.setUserid(userid);
			if (photoProService.selectByName(photoPro).size() == 0) {    // 不存在该相册名
				photoProService.updateName(photoPro);

				map.put("resultCode",200);
			} else {
				map.put("resultCode",201);
			}
		}catch (Exception e){
			map.put("resultCode",404);
		}

		return map;
	}


	/**
	 * 删除相册
	 * @return
	 */
	@RequestMapping("/deletePhotoPro")
	@ResponseBody
	public Map<Object,Object> deletePhotoPro(HttpServletRequest request) {
		Map<Object,Object> map = new HashMap<>();
		try {
			int fid = Integer.parseInt(request.getParameter("fid"));
			//删除相册对应的照片
			tbPhotoService.deleteTbPhotoFid(fid);
			//删除相册
			photoProService.deletePhotoPro(fid);

			map.put("resultCode",200);
		}catch (Exception e){
			map.put("resultCode",404);
		}

		return map;
	}

	/**
	 * 按fid（相册id）查询相册信息
	 * @return
	 */
	@RequestMapping("/getPhotoProFid/{fid}")
	@ResponseBody
	public Map<Object,Object> selectByPrimaryKey(@PathVariable int fid) {
		Map<Object,Object> map = new HashMap<>();

		//查询相册
		PhotoPro photoPro = photoProService.selectByPrimaryKey(fid);
		map.put("photoPro",photoPro);

		return map;
	}
	
	
	
}
