package com.liang.controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.liang.bean.Via;
import com.liang.service.ViaService;
import com.liang.utils.PathUtil;

@RequestMapping("/viaController")
@Controller
public class ViaController {

	@Autowired
	ViaService viaService;
	
	/**
	 * 上传用户头像（插入、修改）
	 * @param file
	 * @param session
	 * @return
	 * @throws IOException 
	 */
	@RequestMapping("/setUserPhoto")
	@ResponseBody
	public Map setUserPhoto(@RequestParam("photo") MultipartFile file, HttpSession session, HttpServletRequest request) throws IOException {

		Map<Object,Object> map = new HashMap<>();
		try {
			String projectname;	//项目名称
			projectname = request.getSession().getServletContext().getRealPath("/");
			projectname=projectname.substring(0,projectname.length()-1);
			if (projectname.indexOf("/")==-1) {//在非linux系统下
				projectname = projectname.substring(projectname.lastIndexOf("\\"),projectname.length());
			} else {//在linux系统下
				projectname = projectname.substring(projectname.lastIndexOf("/"),projectname.length());
			}

			//文件（图片）路径
			String filePath = PathUtil.getCommonPath()+projectname+PathUtil.getUserPath();

			//用于存放新生成的文件名字(不重复)
			String newFileName = null;
			//肯定报错啊，int=null,,但是只有登录的时候才能进入该页面，故不用判断是否登录
			int userid=(int) session.getAttribute("userid");
			Via via=new Via();
			via.setUserid(userid);

			// 获取上传图片的文件名及其后缀(获取原始图片的拓展名)
			String fileName = file.getOriginalFilename();

			//如果该用户还没有上传过头像，则进行新增操作
			if (viaService.getVia(userid)==null) {

				//选择了头像的情况下
				if(!fileName.equals("")) {
					//生成新的文件名字(不重复)
					newFileName = UUID.randomUUID() + fileName;
					// 封装上传文件位置的全路径
					File targetFile = new File(filePath, newFileName);
					System.out.println("封装上传文件位置的全路径:"+targetFile);
					// 把本地文件上传到封装上传文件位置
					file.transferTo(targetFile);

					via.setPhoto(newFileName);
					// 将via保存到数据库
					viaService.setUserPhoto(via);
				}

				//如果该用户上传过头像，则进行修改操作
			} else {

				//选择了头像的情况下
				if(!fileName.equals("")) {
					// 获取取要删除用户对应的头像的文件名（通过userid获取头像信息）
					String fileNameNew = viaService.getVia(userid).getPhoto();
					// 封装上传文件位置的全路径
					File targetFile = new File(filePath, fileNameNew);
					System.out.println("封装上传文件位置的全路径:"+targetFile);
					//删除帖子对应的图片（实际删除）
					targetFile.delete();

					//生成新的文件名字(不重复)
					newFileName = UUID.randomUUID() + fileName;
					// 封装上传文件位置的全路径
					targetFile = new File(filePath, newFileName);
					// 把本地文件上传到封装上传文件位置
					file.transferTo(targetFile);

					via.setPhoto(newFileName);
					// 将via保存到数据库(修改)
					viaService.updateVia(via);
				}
			}

			map.put("resultCode",200);
		}catch (Exception e){
			map.put("resultCode",404);
		}
		
		return map;
	}
	
}
