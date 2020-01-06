package com.liang.controller;

import com.liang.bean.TbPhoto;
import com.liang.service.TbPhotoService;
import com.liang.utils.PathUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RequestMapping("/tbPhotoController")
@Controller
public class TbPhotoController {

	@Autowired
	TbPhotoService tbPhotoService;

	/**
	 * 上传照片
	 * @param file
	 * @param request
	 * @param session
	 * @param fid
	 * @return
	 * @throws IOException
	 */
	@RequestMapping("/setTbPhoto/{fid}")
	@ResponseBody
	public Map<Object, Object> setTbPhoto(@RequestParam("photo") MultipartFile file,HttpServletRequest request,HttpSession session, @PathVariable int fid) throws IOException {
		Map<Object, Object> map = new HashMap<>();
		try {
			TbPhoto tbPhoto=new TbPhoto();

			String projectname;	//项目名称
			projectname = request.getSession().getServletContext().getRealPath("/");
			projectname=projectname.substring(0,projectname.length()-1);
			if (projectname.indexOf("/")==-1) {//在非linux系统下
				projectname = projectname.substring(projectname.lastIndexOf("\\"),projectname.length());
			} else {//在linux系统下
				projectname = projectname.substring(projectname.lastIndexOf("/"),projectname.length());
			}
			System.out.println("项目名称:"+projectname);

			//文件（图片）路径
			String filePath = PathUtil.getCommonPath()+projectname+PathUtil.getPhotoPath();

			// 获取上传图片的文件名及其后缀(获取原始图片的拓展名)
			String fileName = file.getOriginalFilename();

			if(!fileName.equals("")) {
				//生成新的文件名字(不重复)
				String newFileName = UUID.randomUUID() + fileName;
				// 封装上传文件位置的全路径
				File targetFile = new File(filePath, newFileName);
				System.out.println("上传相册的全路径:" + targetFile);
				// 把本地文件上传到封装上传文件位置
				file.transferTo(targetFile);

				tbPhoto.setPhoto(newFileName);
				tbPhoto.setFid(fid);
				tbPhoto.setUserid((int)session.getAttribute("userid"));
			}

			//保存到数据库
			tbPhotoService.setTbPhoto(tbPhoto);

			map.put("resultCode",200);
		} catch (Exception e){
			map.put("resultCode",404);
		}


		
		return map;
	}


	/**
	 * 获取相册分类下的对应的照片
	 * @param fid 相册id
	 * @param session
	 * @return
	 */
	@RequestMapping("/getTbPhoto/{fid}")
	@ResponseBody
	public Map<Object, Object> getTbPhoto(@PathVariable int fid, HttpSession session) {
		Map<Object, Object> map = new HashMap<>();

		int userid=(int)session.getAttribute("userid");
		TbPhoto tbPhoto=new TbPhoto(fid,userid);
		
		map.put("listTbPhotos", tbPhotoService.getTbPhoto(tbPhoto));
		
		return map;
	}


	/**
	 * 删除某一张照片
	 * @param xid
	 * @return
	 */
	@RequestMapping("/deleteTbPhoto/{xid}")
	@ResponseBody
	public Map<Object,Object> deleteTbPhoto(@PathVariable int xid, HttpServletRequest request) {
		Map<Object,Object> map = new HashMap<>();
		try {
			//按xid查询照片信息取
			TbPhoto tbPhoto = tbPhotoService.getTbPhotoXid(xid);

			/*------------------------------------------删除图片-------------------------------------------------*/
			String projectname;	//项目名称
			projectname = request.getSession().getServletContext().getRealPath("/");
			projectname=projectname.substring(0,projectname.length()-1);
			if (projectname.indexOf("/")==-1) {//在非linux系统下
				projectname = projectname.substring(projectname.lastIndexOf("\\"),projectname.length());
			} else {//在linux系统下
				projectname = projectname.substring(projectname.lastIndexOf("/"),projectname.length());
			}

			//文件（图片）路径
			String filePath = PathUtil.getCommonPath()+projectname+PathUtil.getPhotoPath();

			// 获取要删除照片名称
			String fileName = tbPhoto.getPhoto();
			// 封装上传文件位置的全路径
			File targetFile = new File(filePath, fileName);

			//删除对应的图片（实际删除）
			targetFile.delete();
			/*------------------------------------------删除图片-end--------------------------------------------*/

			// 删除照片（数据库）
			tbPhotoService.deleteTbPhoto(xid);

			map.put("resultCode",200);
		}catch (Exception e){
			map.put("resultCode",404);
		}

		return map;
	}
	
	
}
