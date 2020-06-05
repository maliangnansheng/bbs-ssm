package com.liang.utils;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@PropertySource({"classpath:pathconfig.properties"})
@Component
public class FileUploadUtil {
    @Autowired
    ThumbnailatorUtil thumbnailatorUtil;
    @Autowired
    QiniuUtil qiniuUtil;

    private static Logger logger = LoggerFactory.getLogger(FileUploadUtil.class);
    // 文件存储根路径
    @Value("${data.store.local}")
    private String rootPath;
    // 允许上传的文件后缀名
    @Value("${data.store.local.suffix}")
    private String suffix;

    private List<String> suffixList = null;

    @PostConstruct
    private void init(){
        if (StringUtil.isNotEmpty(suffix)){
            suffixList = Stream.of(suffix.split("(, *)+")).map(s -> s.trim().toLowerCase()).collect(Collectors.toList());
        }
    }

    /**
     * 文件上传到七牛云
     * @param file 源文件
     * @param type 类型（文章/头像/...）
     * @return
     * @throws Exception
     */
    public String fileUpload(MultipartFile file, String type) throws Exception {
        return null;
    }

    /**
     * 保存文件
     * @param file 源文件
     * @param folder 文件夹名称（介于前者与后者之间）
     * @return 全路径
     */
    public String save(MultipartFile file, String folder){
        return null;
    }

    /**
     * 删除文件
     * @param fulPath 全路径
     */
    public static void del(String fulPath){

    }

    /**
     * 构造存储文件名
     * @param orginalName 原始文件名
     * @return 返回新的文件名
     */
    public String generateFileName(String orginalName){
        return DateUtil.getNowDate() + "_" + orginalName;//“上传时间_文件名”
    }

    /**
     * 构造目标文件路径
     * @param folder 文件夹名称（介于前者与后者之间）
     * @param fileName 文件名
     * @return 目标文件路径
     */
    public String generateStorePath(String folder, String fileName){
        return null;
    }

    /**
     * 保存文件到指定目录
     * @param path 目标目录
     * @param file 文件
     * @return
     */
    public String storeData(String path, MultipartFile file){
        return null;
    }

    /**
     * 检查文件后缀名
     * @param fileName 文件名
     * @return 通过检查为true，不通过为false
     */
    public boolean checkFile(String fileName){
        return true;
    }
}