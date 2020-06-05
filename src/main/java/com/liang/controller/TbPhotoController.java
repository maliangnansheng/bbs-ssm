package com.liang.controller;

import com.liang.bean.TbPhoto;
import com.liang.code.ReturnT;
import com.liang.service.TbPhotoService;
import com.liang.utils.FileUploadUtil;
import com.liang.utils.PathUtil;
import com.liang.utils.ThumbnailatorUtil;
import com.liang.utils.UUIDUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RequestMapping("/tbPhotoController")
@Controller
public class TbPhotoController {
	@Autowired
	TbPhotoService tbPhotoService;
	@Autowired
	FileUploadUtil fileUploadUtil;
	@Autowired
	PathUtil pathUtil;
	@Autowired
	ThumbnailatorUtil thumbnailatorUtil;

	/**
	 * 上传照片
	 * @param file
	 * @param request
	 * @param session
	 * @param fid
	 * @return
	 * @throws IOException
	 */
	@PostMapping("/setTbPhoto/{fid}")
	@ResponseBody
	public ReturnT<?> setTbPhoto(@RequestParam("photo") MultipartFile file, HttpServletRequest request, HttpSession session, @PathVariable String fid) {
		try {
			// 当前文件大小
			long currentFileSize = file.getSize();
			// 上传源文件允许的最大值
			long fileLength = thumbnailatorUtil.getFileLength();
			if (currentFileSize <= fileLength) {
				TbPhoto tbPhoto=new TbPhoto();
				tbPhoto.setPhoto(fileUploadUtil.fileUpload(file, pathUtil.getPhotoPath()));
				tbPhoto.setFid(fid);
				tbPhoto.setUserid((String) session.getAttribute("userid"));
				//保存到数据库
				tbPhoto.setXid(UUIDUtil.getRandomUUID());
				tbPhotoService.setTbPhoto(tbPhoto);

				return ReturnT.success("上传照片成功");
			} else {
				return ReturnT.fail("请上传不超过 " + fileLength/(1024*1024) + "M 的照片!");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ReturnT.fail("上传照片失败");
		}
	}

	/**
	 * 删除某一张照片
	 * @param xid
	 * @return
	 */
	@DeleteMapping("/deleteTbPhoto/{xid}")
	@ResponseBody
	public ReturnT<?> deleteTbPhoto(@PathVariable String xid, HttpServletRequest request) {
		try {
			// 删除照片（数据库）
			tbPhotoService.deleteTbPhoto(xid);
			return ReturnT.success("删除照片成功");
		} catch (Exception e) {
			e.printStackTrace();
			return ReturnT.fail("删除照片成功");
		}
	}

	/**
	 * 获取相册分类下的对应的照片
	 * @param fid 相册id
	 * @param session
	 * @return
	 */
	@GetMapping("/getTbPhoto/{fid}")
	@ResponseBody
	public ReturnT<?> getTbPhoto(@PathVariable String fid, HttpSession session) {
		Map<String, Object> map = new HashMap<>();
		try {
			TbPhoto tbPhoto=new TbPhoto(fid, (String)session.getAttribute("userid"));
			map.put("listTbPhotos", tbPhotoService.getTbPhoto(tbPhoto));
			return new ReturnT<>(HttpStatus.OK, "获取照片数据成功", map);
		} catch (Exception e) {
			e.printStackTrace();
			return ReturnT.fail("获取照片数据失败");
		}
	}
}