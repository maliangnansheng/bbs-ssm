package com.liang.utils;

import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.geometry.Positions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * google使用的开源的工具类-Thumbnailator
 * 问题：经过使用后的反馈，这个工具无法正确压缩出png格式的图片
 * 解决：建议将图片压缩后的格式设置成jpg来解决；.outputFormat("jpg")
 * @author maliang
 * @create 2020-06-01 15:57
 */
@PropertySource({"classpath:pathconfig.properties"})
@Component
public class ThumbnailatorUtil {
    // 上传源文件允许的最大值不得大于fileLength
    @Value("${source.file.length}")
    private long fileLength;
    // 压缩后的图片大小不得大于imgLength
    @Value("${compress.img.length}")
    private long imgLength;
    // 需要压缩的图片格式
    @Value("${compress.img.suffix}")
    private String suffix;

    private List<String> suffixList = null;

    @PostConstruct
    private void init(){
        if (StringUtil.isNotEmpty(suffix)){
            suffixList = Stream.of(suffix.split("(, *)+")).map(s -> s.trim().toLowerCase()).collect(Collectors.toList());
        }
    }

    public long getFileLength() {
        return fileLength;
    }

    public void setFileLength(long fileLength) {
        this.fileLength = fileLength;
    }

    public List<String> getSuffixList() {
        return suffixList;
    }

    public void setSuffixList(List<String> suffixList) {
        this.suffixList = suffixList;
    }

    /**
     * 按照比例进行缩放
     * @param sourceImg 原图片路径
     * @param resultImg 处理后的图片路径
     * @param del 是否删除源文件（true删除、false不删）
     * @return 处理后的图片路径
     * @throws IOException
     */
    public void getScale(String sourceImg, String resultImg, boolean del) throws IOException {
        System.out.println(suffixList);
        File file = new File(sourceImg);
        if (file.length() > imgLength) {
            System.out.println("图片压缩中...");
            Thumbnails.of(sourceImg).scale(0.9f).outputQuality(0.7f).toFile(resultImg);
            file = new File(resultImg);
            while (file.length() > imgLength) {
                Thumbnails.of(resultImg).scale(0.9f).outputQuality(0.7f).toFile(resultImg);
            }
        } else {
            Thumbnails.of(sourceImg).scale(1f).toFile(resultImg);
        }
        if (del) {
            new File(sourceImg).delete();
            System.out.println("源文件删除");
        }
        System.out.println("图片压缩完成");
    }

    /**
     * 裁剪
     * @param sourceImg 原图片路径
     * @param resultImg 处理后的图片路径
     * @param del 是否删除源文件（true删除、false不删）
     * @throws IOException
     */
    public void getRegion(String sourceImg, String resultImg, boolean del) throws IOException {
        System.out.println(suffixList);
        // 图片中心150*150的区域
        Thumbnails.of(sourceImg).sourceRegion(Positions.CENTER, 10000, 10000).size(150, 150).keepAspectRatio(false)
                .toFile(resultImg);
        if (del) {
            new File(sourceImg).delete();
            System.out.println("源文件删除");
        }
        System.out.println("图片剪切完成");
        /*// 图片右下400*400的区域
        Thumbnails.of(sourceImg).sourceRegion(Positions.BOTTOM_RIGHT, 400, 400).size(200, 200).keepAspectRatio(false)
                .toFile(resultImg);
        // 指定坐标
        Thumbnails.of(sourceImg).sourceRegion(600, 500, 400, 400).size(200, 200).keepAspectRatio(false)
                .toFile(resultImg);*/
    }

    /**
     * 按指定大小进行缩放（比例不变）
     * @param sourceImg 原图片路径
     * @param resultImg 处理后的图片路径
     * @throws IOException
     */
    public void getSize(String sourceImg, String resultImg) throws IOException {
        /*
         * size(width,height) 若图片横比200小，高比300小，不变
         * 若图片横比200小，高比300大，高缩小到300，图片比例不变 若图片横比200大，高比300小，横缩小到200，图片比例不变
         * 若图片横比200大，高比300大，图片按比例缩小，横为200或高为300
         */
        Thumbnails.of(sourceImg).size(200, 300).toFile(resultImg);
    }

    /**
     * 不按照比例，指定大小进行缩放
     * @param sourceImg 原图片路径
     * @param resultImg 处理后的图片路径
     * @throws IOException
     */
    public void getKeepAspectRatio(String sourceImg, String resultImg) throws IOException {
        Thumbnails.of(sourceImg).size(120, 120).keepAspectRatio(false).toFile(resultImg);
    }

    /**
     * 旋转
     * @param sourceImg 原图片路径
     * @param resultImg 处理后的图片路径
     * @throws IOException
     */
    private void getRotate(String sourceImg, String resultImg) throws IOException {
        Thumbnails.of(sourceImg).size(1280, 1024).rotate(90).toFile(resultImg);
    }

    /**
     * 水印
     * @param sourceImg 原图片路径
     * @param resultImg 处理后的图片路径
     * @param watermark 水印图路径
     * @throws IOException
     */
    public void getWatermark(String sourceImg, String resultImg, String watermark) throws IOException {
        Thumbnails.of(sourceImg).size(1280, 1024).watermark(Positions.BOTTOM_RIGHT, ImageIO.read(new File(watermark)), 0.5f)
                .outputQuality(0.8f).toFile(resultImg);
    }

    /**
     * 转化图像格式
     * @param sourceImg 原图片路径
     * @param resultImg 处理后的图片路径
     * @throws IOException
     */
    public void getFormat(String sourceImg, String resultImg) throws IOException {
        Thumbnails.of(sourceImg).size(1280, 1024).outputFormat("gif").toFile(resultImg);
    }

    /**
     * 输出到OutputStream
     * @param sourceImg 原图片路径
     * @param resultImg 处理后的图片路径
     * @throws IOException
     */
    public void getOutputStream(String sourceImg, String resultImg) throws IOException {
        OutputStream os = new FileOutputStream(resultImg);
        Thumbnails.of(sourceImg).size(1280, 1024).toOutputStream(os);
    }

    /**
     * 输出到BufferedImage
     * @param sourceImg 原图片路径
     * @param resultImg 处理后的图片路径
     * @throws IOException
     */
    public void getBufferedImage(String sourceImg, String resultImg) throws IOException {
        BufferedImage thumbnail = Thumbnails.of(sourceImg).size(1280, 1024).asBufferedImage();
        ImageIO.write(thumbnail, "jpg", new File(resultImg));
    }
}
