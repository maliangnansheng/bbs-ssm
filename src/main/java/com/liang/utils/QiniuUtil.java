package com.liang.utils;

import com.google.gson.Gson;
import com.qiniu.common.QiniuException;
import com.qiniu.http.Response;
import com.qiniu.storage.Configuration;
import com.qiniu.storage.Region;
import com.qiniu.storage.UploadManager;
import com.qiniu.storage.model.DefaultPutRet;
import com.qiniu.util.Auth;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;

/**
 * @author maliang
 * @create 2020-05-26 16:11
 */
@PropertySource({"classpath:76.properties"})
@Component
public class QiniuUtil {
    // 需要操作的账号的AccessKey
    @Value("${76.AccessKey}")
    private String AccessKey;
    // 需要操作的账号的SecretKey
    @Value("${76.SecretKey}")
    private String SecretKey;
    // 要上传的空间
    @Value("${76.bucket}")
    private String bucket;
    // 域名
    @Value("${76.domin}")
    private String domin;

    // 密钥
    private Auth auth;
    // token
    private String upToken;
    // 构造一个带指定 Region 对象的配置类（华南）
    private Configuration cfg;
    // 创建上传对象
    private UploadManager uploadManager;

    @PostConstruct
    private void init(){
        auth = Auth.create(AccessKey, SecretKey);
        upToken = auth.uploadToken(bucket);
        cfg = new Configuration(Region.huanan());
        uploadManager = new UploadManager(cfg);
    }

    public String getDomin() {
        return domin;
    }

    public void setDomin(String domin) {
        this.domin = domin;
    }

    /**
     * 普通上传（上传本地文件）
     * @param localFilePath 文件全路径
     * @param fileName 七牛保存的文件名
     * @throws IOException
     */
    public String upload(String localFilePath, String fileName) throws QiniuException {
        return null;
    }

    /**
     * 字节数组上传
     * @param uploadBytes 文件字节数组
     * @param fileName 七牛保存的文件名
     * @throws IOException
     */
    public String upload(byte[] uploadBytes, String fileName) throws Exception {
        // 调用put方法上传
        Response res = uploadManager.put(uploadBytes, fileName, upToken);
        // 解析上传成功的结果
        DefaultPutRet putRet = new Gson().fromJson(res.bodyString(), DefaultPutRet.class);
        return putRet.key;
    }

    /**
     * 数据流上传
     * @param inputStream 文件数据流
     * @param fileName 七牛保存的文件名
     * @throws IOException
     */
    public String upload(InputStream inputStream, String fileName) throws Exception {
        // 调用put方法上传
        Response res = uploadManager.put(inputStream, fileName, upToken, null, null);
        // 解析上传成功的结果
        DefaultPutRet putRet = new Gson().fromJson(res.bodyString(), DefaultPutRet.class);
        return putRet.key;
    }
}