package com.liang.utils;

import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author maliang
 * @create 2019-12-30 11:57
 */
public class CommonUtil {
    /**
     * 获取项目名称
     * @param request
     * @return
     */
    public static String projectName(HttpServletRequest request){
        String projectName;	//项目名称
        projectName = request.getSession().getServletContext().getRealPath("/");
        projectName = projectName.substring(0, projectName.length()-1);
        if (projectName.indexOf("/") == -1) {//在非linux系统下
            projectName = projectName.substring(projectName.lastIndexOf("\\"), projectName.length());
        } else {//在linux系统下
            projectName = projectName.substring(projectName.lastIndexOf("/"), projectName.length());
        }
        System.out.println("项目名称:" + projectName);

        return projectName;
    }

    /**
     * 把本地文件上传到封装的文件位置
     * @param file 源文件
     * @param filePath 文件（图片）路径
     * @return 生成新的文件名字
     */
    public static String myTransferTo(MultipartFile file, String filePath) throws IOException {
        //用于存放新生成的文件名字(不重复)
        String newFileName = "";
        if (file != null) {
            // 获取上传图片的文件名及其后缀(获取原始图片的拓展名)
            String fileName = file.getOriginalFilename();
            //生成新的文件名字(不重复)
            newFileName = UUID.randomUUID() + fileName;
            // 封装上传文件位置的全路径
            File targetFile = new File(filePath, newFileName);
            System.out.println("封装上传文件位置的全路径:" + targetFile);
            // 把本地文件上传到封装上传文件位置
            file.transferTo(targetFile);
        }

        return newFileName;
    }

    /**
     * 去除字符串里的中文
     * @param str
     * @return
     */
    public static String getRemoveChinese(String str){
        // 中文正则
        String REGEX_CHINESE = "[\u4e00-\u9fa5]";
        // 去除中文
        Pattern pat = Pattern.compile(REGEX_CHINESE);
        Matcher mat = pat.matcher(str);
        return mat.replaceAll("");
    }

    /**
     * 获取文件后缀名
     * @param filename
     * @return
     */
    public static String getFileSuffix(String filename){
        int pos = filename.lastIndexOf(".");
        if(pos == -1){
            return null;
        }
        return filename.substring(pos+1);
    }

}
